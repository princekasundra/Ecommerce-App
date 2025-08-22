import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { addToCart } from '../store/slices/cartSlice';
import { RootState } from '../store/store';

type RootStackParamList = {
  ProductDetail: { product: Product };
};

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  rating: { rate: number; count: number };
};

type ProductDetailScreenProps = {
  route: RouteProp<RootStackParamList, 'ProductDetail'>;
};

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ route }) => {
  const { product } = route.params;
  const dispatch = useDispatch();
  

  const isDarkMode = useSelector((state) => state.theme.isDarkMode); // get theme

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#121212' : '#fff' },
      ]}
    >
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>
          {product.title}
        </Text>
        <Text style={[styles.price, { color: isDarkMode ? '#ccc' : '#888' }]}>
          ₹{product.price}
        </Text>
        <Text style={[styles.description, { color: isDarkMode ? '#ddd' : '#333' }]}>
          {product.description}
        </Text>
        <Text style={[styles.rating, { color: isDarkMode ? '#aaa' : '#333' }]}>
          Rating: {product.rating.rate} ({product.rating.count} reviews)
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  details: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#b4592cff',
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

export default ProductDetailScreen;
