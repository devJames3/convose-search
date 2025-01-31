import React from 'react';
import { SafeAreaView } from 'react-native';
import SearchInterests from './src/components/SearchInterests';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SearchInterests />
    </SafeAreaView>
  );
}
