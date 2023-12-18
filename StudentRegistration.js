import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StudentRegistrationScreen = ({ navigation }) => {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [studentName, setStudentName] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async () => {
    try {
      if (!registrationNumber || !studentName || !password) {
        Alert.alert('All fields are required');
        return;
      }
      const existingRegistrationNumber = await AsyncStorage.getItem(
        '@studentRegistrationNumber'
      );
      if (existingRegistrationNumber === registrationNumber) {
        Alert.alert('Registration number already exists');
        return;
      }
      await AsyncStorage.setItem('@studentRegistrationNumber', registrationNumber);
      await AsyncStorage.setItem('@studentName', studentName);
      await AsyncStorage.setItem('@studentPassword', password);

      Alert.alert('Registration successful');
      navigation.navigate('Studentlogin'); 
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('An error occurred during registration');
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
        placeholder="Student Name"
        value={studentName}
        onChangeText={setStudentName}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegistration} />
    </View>
  );
};

export default StudentRegistrationScreen;
