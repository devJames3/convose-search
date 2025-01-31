import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, ActivityIndicator, Image } from 'react-native';
import { fetchInterests } from '../services/api';
import styles from '../styles/styles';

const SearchInterests = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [from, setFrom] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setResults([]);  // Clear previous results when query changes
    setFrom(0);
    setHasMore(true);
  }, [query]);

  useEffect(() => {
    const fetchData = async () => {
      if (query.length > 2) {
        setLoading(true);
        const data = await fetchInterests(query, 10, from);
        if (data.length === 0) setHasMore(false);
        setResults((prev) => [...prev, ...data]);
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchData, 500); // Debounce API calls
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
      <TextInput
        style={styles.input}
        placeholder="Search interests..."
        value={query}
        onChangeText={setQuery}
      />
      {loading && from === 0 ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const { main, secondary } = formatInterestName(item.name);
            return (
              <View style={styles.listItem}>
                {item.avatar && <Image source={{ uri: item.avatar }} style={styles.avatar} />}
                <View>
                  <Text style={styles.listText}>{main}</Text>
                  {secondary && <Text style={styles.secondaryText}>{secondary}</Text>}
                </View>
              </View>
            );
          }}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
};

export default SearchInterests;
