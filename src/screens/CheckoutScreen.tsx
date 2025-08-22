import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../store/slices/cartSlice';

const CheckoutScreen = ({ navigation }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode); // get theme
  const dispatch = useDispatch();
  const [address, setAddress] = useState('');

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const handleCheckout = () => {
    if (!address) {
      Alert.alert('Error', 'Please enter a shipping address');
      return;
    }
    Alert.alert('Success', 'Payment processed successfully!');
    dispatch(clearCart());
    navigation.navigate('Home');
  };

  const themeStyles = isDarkMode ? darkStyles : lightStyles;

  return (
    <View style={[styles.container, themeStyles.container]}>
      <Text style={[styles.title, themeStyles.text]}>Checkout</Text>
      <Text style={[styles.total, themeStyles.text]}>Total: ₹{totalPrice}</Text>
      <TextInput
        style={[styles.input, themeStyles.input]}
        placeholder="Shipping Address"
        placeholderTextColor={isDarkMode ? "#aaa" : "#555"}
        value={address}
        onChangeText={setAddress}
        multiline
      />
      <TouchableOpacity style={[styles.button, themeStyles.button]} onPress={handleCheckout}>
        <Text style={[styles.buttonText, themeStyles.buttonText]}>Complete Purchase</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  total: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  input: { padding: 15, borderRadius: 5, marginBottom: 20, minHeight: 100 },
  button: { padding: 15, borderRadius: 5, alignItems: 'center' },
  buttonText: { fontSize: 16, fontWeight: 'bold' },
});

// Light Mode
const lightStyles = StyleSheet.create({
  container: { backgroundColor: '#f0f0f0' },
  text: { color: '#000' },
  input: { backgroundColor: '#fff', color: '#000' },
  button: { backgroundColor: '#007AFF' },
  buttonText: { color: '#fff' },
});

// Dark Mode
const darkStyles = StyleSheet.create({
  container: { backgroundColor: '#121212' },
  text: { color: '#fff' },
  input: { backgroundColor: '#1e1e1e', color: '#fff' },
  button: { backgroundColor: '#0A84FF' },
  buttonText: { color: '#fff' },
});

export default CheckoutScreen;
