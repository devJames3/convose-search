import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, FlatList, Text, Image, Animated } from 'react-native';
import { fetchInterests } from '../services/api';
import styles from '../styles/styles';


// random colors for avatar
const getColorForItem = (id, name) => {
  const colors = ['#FF5733', '#33A1FF', '#33FF57', '#FF33A1', '#A133FF', '#FFC300', '#FF6347', '#4682B4', '#20B2AA', '#FF1493'];

  const hash = [...(id + name)].reduce((acc, char) => acc * 31 + char.charCodeAt(0), 0);

  return colors[Math.abs(hash) % colors.length];
};

// Custom Skeleton Loader
const SkeletonLoader = () => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.skeletonContainer}>
      {[...Array(5)].map((_, index) => (
        <Animated.View key={index} style={[styles.skeletonItem, { opacity }]} />
      ))}
    </View>
  );
};

const SearchInterests = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [from, setFrom] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [cache, setCache] = useState({});
  const [error, setError] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true)

  const prevQueryRef = useRef("");

  useEffect(() => {
    
    const fetchData = async () => {
      setError(null); 

      const cacheResult = cache[query?.toLowerCase()] || (cache[query?.toLowerCase()[0]] ? cache[query?.toLowerCase()[0]][query?.toLowerCase()] : null);
      if (cacheResult) {
        console.log("I am using cache")
        if(query.length > 1){
          console.log("Iam in > 1 query")
          setCache((prev) => {
            console.log("first letter", query.toLowerCase()[0])
            console.log({"prev": prev[query.toLowerCase()[0]][query.toLowerCase()]})
            setResults(prev[query.toLowerCase()[0]][query.toLowerCase()]);
            return prev
          })
        }else {

          setCache((prev) => {
              setResults(prev[query.toLowerCase()][query.toLowerCase()]);
              return prev
          })
        }
        setLoading(false);
      } else{
        try {
          if(cache[""]){
            let popularInterests = searchInterestsInCache(cache[""][""], query);
            setResults(popularInterests);
          }

          if (query.length > prevQueryRef.current.length && query !== "" && query.length > 1) {
            console.log("cache int", cache[query.toLowerCase()[0]][query.toLowerCase().slice(0, -1)], query.toLowerCase()[0], query.toLowerCase().slice(0, -1))
            console.log(cache)
            let cacheInterests = searchInterestsInCache(cache[query.toLowerCase()[0]][query.toLowerCase().slice(0, -1)], query.toLowerCase().slice(0, -1))
            setResults(cacheInterests);
          }

          prevQueryRef.current = query;
          
          setLoading(true)
          const data = await fetchInterests(query, 15, 0);

          if(data.length === 0) {
            setError('No interests found for this search term.');
          }else {
            setResults((prevResults) => (JSON.stringify(prevResults) !== JSON.stringify(data) ? data : prevResults));
            console.log({results})
            if (query.length > 1){
              console.log(query.length)
              console.log("I am using >1")
              setCache((prev) => ({ ...prev, [query.toLowerCase()[0]]: { 
                ...prev[query.toLowerCase()[0]], [query.toLowerCase()] : data 
                } 
              }));
              console.log(cache)
            }else {
              setCache((prev) => ({ ...prev, [query.toLowerCase()]: {
                ...prev[query.toLowerCase()], [query.toLowerCase()] : data} }));
              console.log(cache)

            }
            setHasMore(data.length > 0);
            setFrom(15);
          }
        }catch(err) {
          setError('An error occurred while fetching the data.' + err);
        }
      }

      setLoading(false);
    };

    const timer = setTimeout(fetchData, 500);
    return () => clearTimeout(timer);

  }, [query]);

  const loadMore = async () => {
    if (!hasMore || loading) return;

    // setLoading(true);
    const data = await fetchInterests(query, 10, from);
    if (data.length === 0) {
      setHasMore(false);
    } else {
      setResults((prev) => {
        const merged = [...prev, ...data];
        const uniqueResults = Array.from(new Map(merged.map(item => [item.id, item])).values());
        return uniqueResults;
      });

      if (query.length > 1){
        setCache((prev) => ({
          ...prev, 
          [query.toLowerCase()[0]]: { [query.toLowerCase()] : [...prev[query.toLowerCase()[0]][query.toLowerCase()], ...data]} 
        }));
      }else {
        setCache((prev) => ({ 
          ...prev, 
          [query.toLowerCase()]: { [query.toLowerCase()] : [...prev[query.toLowerCase()][query.toLowerCase()], ...data] } 
        }));
      }

      setFrom((prev) => prev + 10);
    }

    setLoading(false);
  };

  // Extract the Main interest name and secondary interests
  const formatInterestName = (name) => {
    const match = /\s*\[(.*?)\]/.exec(name);
    return { 
      main: match ? name.replace(match[0], "").trim() : name, 
      secondary: match ? match[1] : null 
    };
  };

  const searchInterestsInCache = (interests, searchTerm) => {
    if (!searchTerm) return [];

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    const filtered = interests
      .filter(interest => interest.name.toLowerCase().startsWith(lowerCaseSearchTerm))
      .sort((a, b) => (b.match || 0) - (a.match || 0)); // Sort by match (popularity)

    // if (filtered.length === 0) {
    //   setInitialLoad(true).

    return filtered;
  };



  return (
    <View style={styles.container}>

      <Text style={styles.title}>Convose Interest Search</Text>

      {/* Show Skeleton Loader when loading */}
      {loading && initialLoad ? <SkeletonLoader /> : null}

      {/* Error message */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()} 
        renderItem={({ item }) => {
          const { main, secondary } = formatInterestName(item.name);
          const bgColor = getColorForItem(item.id, item.name);

          return (
            <View style={styles.listItem}>
              {item.avatar ? (
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
              ) : (
                <View style={[styles.placeholderAvatar, { backgroundColor: bgColor }]}>
                  <Text style={styles.placeholderText}>{main.charAt(0).toUpperCase()}</Text>
                </View>
              )}
              <View>
                <Text style={styles.listText}>{main}</Text>
                {secondary && <Text style={styles.secondaryText}>{secondary}</Text>}
              </View>
            </View>
          );
        }}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        inverted
      />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
        ref={prevQueryRef}
          style={styles.input}
          placeholder="Search interests..."
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            setInitialLoad(false);
            if (!text) {
              setResults([]);
              setFrom(0);
              setHasMore(false);
              setError(null);
              setInitialLoad(false);
            }
          }}
        />
      </View>
    </View>
  );
};

export default SearchInterests;
