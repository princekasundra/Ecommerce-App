import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../components/CartItem';
import { clearCart } from '../store/slices/cartSlice';

const CartScreen = ({ navigation }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode); // ✅ theme state
  const dispatch = useDispatch();

  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  // ✅ Styles that adapt to theme
  const themedStyles = getThemedStyles(isDarkMode);

  return (
    <View style={themedStyles.container}>
      {cartItems.length === 0 ? (
        <Text style={themedStyles.emptyText}>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={({ item }) => <CartItem item={item} />}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={themedStyles.list}
          />
          <View style={themedStyles.footer}>
            <Text style={themedStyles.total}>Total: ₹{totalPrice}</Text>
            <TouchableOpacity
              style={themedStyles.checkoutButton}
              onPress={() => navigation.navigate('Checkout')}
            >
              <Text style={themedStyles.buttonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

// ✅ Function to generate styles dynamically based on theme
const getThemedStyles = (darkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? '#121212' : '#f0f0f0',
    },
    list: {
      padding: 10,
    },
    emptyText: {
      textAlign: 'center',
      fontSize: 18,
      marginTop: 50,
      color: darkMode ? '#ffffff' : '#000000',
    },
    footer: {
      padding: 20,
      backgroundColor: darkMode ? '#1e1e1e' : '#fff',
      borderTopWidth: 1,
      borderColor: darkMode ? '#444' : '#ddd',
    },
    total: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: darkMode ? '#ffffff' : '#000000',
    },
    checkoutButton: {
      backgroundColor: darkMode ? '#040008ff' : '#007AFF',
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

export default CartScreen;
