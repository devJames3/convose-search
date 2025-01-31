import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, ActivityIndicator, Image } from 'react-native';
import { fetchInterests } from '../services/api';
import styles from '../styles/styles';

/**
 * Generates a unique but consistent color for each item based on its ID and Name.
 * The same item will always have the same color.
 */
const getColorForItem = (id, name) => {
  const colors = ['#FF5733', '#33A1FF', '#33FF57', '#FF33A1', '#A133FF', '#FFC300', '#FF6347', '#4682B4', '#20B2AA', '#FF1493'];

  // Combine id and name for a more unique and consistent hash
  let hash = 0;
  const combined = id + name;
  for (let i = 0; i < combined.length; i++) {
    hash = combined.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
};

const SearchInterests = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [from, setFrom] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setResults([]);
    setFrom(0);
    setHasMore(true);
  }, [query]);

  useEffect(() => {
    const fetchData = async () => {
      if (query.length > 0) {
        setLoading(true);
        const data = await fetchInterests(query, 10, from);
        if (data.length === 0) setHasMore(false);
        setResults((prev) => [...prev, ...data]);
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchData, 500);
    return () => clearTimeout(timer);
  }, [query, from]);

  const formatInterestName = (name) => {
    const match = name.match(/(.*?)\s*\[(.*?)\]/);
    return match ? { main: match[1], secondary: match[2] } : { main: name, secondary: null };
  };

  const loadMore = () => {
    if (hasMore && !loading) setFrom((prev) => prev + 10);
  };

  return (
    <View style={styles.container}>
      {/* FlatList positioned above the search bar */}
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const { main, secondary } = formatInterestName(item.name);
          const bgColor = getColorForItem(item.id, item.name); // Pass both id and name

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
        // Reverse the FlatList to show from bottom to top
        inverted
      />

      {/* Centered Search Bar */}
      <View style={styles.searchContainer}>

        {/* Loading Indicator */}
        {loading && from === 0 ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
        ) : null}


        <TextInput
          style={styles.input}
          placeholder="Search interests..."
          value={query}
          onChangeText={setQuery}
        />
      </View>

      
    </View>
  );
};

export default SearchInterests;
