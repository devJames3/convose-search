import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, FlatList, Text, Image, Animated } from 'react-native';
import { fetchInterests } from '../services/api';
import styles from '../styles/styles';

const getColorForItem = (id, name) => {
  const colors = ['#FF5733', '#33A1FF', '#33FF57', '#FF33A1', '#A133FF', '#FFC300', '#FF6347', '#4682B4', '#20B2AA', '#FF1493'];

  const hash = [...(id + name)].reduce((acc, char) => acc * 31 + char.charCodeAt(0), 0);

  return colors[Math.abs(hash) % colors.length];
};

// Custom Skeleton Loader.
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
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [from, setFrom] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [cache, setCache] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
  

    const fetchData = async () => {
      setError(null); 

      if (cache[query]) {
        setResults(cache[query]);
        setLoading(false);
      } else {
        try {
          
          const data = await fetchInterests(query, 15, 0);

          if(data.length === 0) {
            setError('No interests found for this search term.');
          }else {
            setResults((prevResults) => (JSON.stringify(prevResults) !== JSON.stringify(data) ? data : prevResults));
            setCache((prev) => ({ ...prev, [query]: data }));
            setHasMore(data.length > 0);
            setFrom(15);
          }
        }catch(err) {
          setError('An error occurred while fetching the data.');
        }
      }

      setLoading(false);
    };

    const timer = setTimeout(fetchData, 500);
    return () => clearTimeout(timer);

  }, [query]);

  const loadMore = async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    const data = await fetchInterests(query, 10, from);
    if (data.length === 0) {
      setHasMore(false);
    } else {
      setResults((prev) => {
        const uniqueResults = [...new Map([...prev, ...data].map(item => [item.id, item])).values()];
        return uniqueResults;
      });

      setCache((prev) => ({
        ...prev,
        [query]: [...prev[query] || [], ...data]
      }));

      setFrom((prev) => prev + 10);
    }

    setLoading(false);
  };

  const formatInterestName = (name) => {
    const match = /\s*\[(.*?)\]/.exec(name);
    return { 
      main: match ? name.replace(match[0], "").trim() : name, 
      secondary: match ? match[1] : null 
    };
  };


  return (
    <View style={styles.container}>

      <Text style={styles.title}>Convose Interest Search</Text>

      {/* Show Skeleton Loader when loading */}
      {loading && from === 0 ? <SkeletonLoader /> : null}

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
          style={styles.input}
          placeholder="Search interests..."
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            if (!text) {
              setResults([]);
              setFrom(0);
              setHasMore(false);
              setError(null);
            }
          }}
        />
      </View>
    </View>
  );
};

export default SearchInterests;