import React, { useState } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchScreen = ({ route }) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);

      const registrationNumber = route.params.registrationNumber;
      const key = `@courses_${registrationNumber}`;
      const courses = JSON.parse((await AsyncStorage.getItem(key)) || '[]');

      const result = courses.filter(
        (course) =>
          course.courseId.includes(searchInput) ||
          course.courseTitle.includes(searchInput)
      );

      setSearchResult(JSON.stringify(result));
    } catch (error) {
      console.error('Search error:', error);
      Alert.alert('An error occurred during search');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Search by Course ID or Title"
        value={searchInput}
        onChangeText={setSearchInput}
      />
      <Button title="Search" onPress={handleSearch} />
      {loading && <ActivityIndicator size="small" color="#0000ff" />}
      <Text>Search Result: {searchResult}</Text>
    </View>
  );
};

export default SearchScreen;
