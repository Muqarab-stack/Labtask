import React, { useState } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StudentLoginScreen = ({ navigation }) => {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const storedRegistrationNumber = await AsyncStorage.getItem(
        '@studentRegistrationNumber'
      );
      const storedPassword = await AsyncStorage.getItem('@studentPassword');

      if (
        registrationNumber === storedRegistrationNumber &&
        password === storedPassword
      ) {
        await AsyncStorage.setItem('isStudentLoggedIn', 'true');
        navigation.navigate('CourseRegistration');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Registration Number"
        value={registrationNumber}
        onChangeText={setRegistrationNumber}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      {loading && <ActivityIndicator size="small" color="#0000ff" />}
    </View>
  );
};

export default StudentLoginScreen;
