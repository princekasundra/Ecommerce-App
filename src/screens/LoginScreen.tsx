import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { login } from '../store/slices/authSlice';
import { RootState } from '../store';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  ProductDetail: { product: { id: number; title: string; price: number; image: string; description: string; rating: { rate: number; count: number } } };
  Cart: undefined;
  Checkout: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp>();
const isDarkMode = useSelector((state) => state.theme.isDarkMode); // ✅ theme state

  const handleLogin = () => {
    if (email && password) {
      dispatch(login({ email }));
      navigation.navigate('Home');
    } else {
      Alert.alert('Error', 'Please enter email and password');
    }
  };

  

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#f0f0f0' }]}>
      <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>Login</Text>
      <TextInput
        style={[
          styles.input,
          { backgroundColor: isDarkMode ? '#1e1e1e' : '#fff', color: isDarkMode ? '#fff' : '#000' },
        ]}
        placeholder="Email"
        placeholderTextColor={isDarkMode ? '#bbb' : '#666'}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={[
          styles.input,
          { backgroundColor: isDarkMode ? '#1e1e1e' : '#fff', color: isDarkMode ? '#fff' : '#000' },
        ]}
        placeholder="Password"
        placeholderTextColor={isDarkMode ? '#bbb' : '#666'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={[styles.button, { backgroundColor: isDarkMode ? '#007ACC' : '#007AFF' }]} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
