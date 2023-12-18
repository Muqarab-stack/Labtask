import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ route }) => {
  const [studentName, setStudentName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedStudentName = await AsyncStorage.getItem('@studentName');
        const storedRegistrationNumber = await AsyncStorage.getItem(
          '@studentRegistrationNumber'
        );

        setStudentName(storedStudentName);
        setRegistrationNumber(storedRegistrationNumber);
      } catch (error) {
        console.error('Home screen data fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          <Text>Welcome, {studentName}</Text>
          <Text>Registration Number: {registrationNumber}</Text>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
