import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Adminlogin = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (username === 'admin' && password === '123') {
      await AsyncStorage.setItem('isAdminLoggedIn', 'true');
      navigation.navigate('StudentRegistration');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default Adminlogin;
