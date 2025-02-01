import React from 'react';
import { SafeAreaView } from 'react-native';
import SearchInterests from '../src/components/SearchInterests';

// import App from "../App";

export default function Page() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SearchInterests />
    </SafeAreaView>
  );
}

