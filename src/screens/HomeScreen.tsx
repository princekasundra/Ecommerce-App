import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  RefreshControl,
  Switch,
} from "react-native";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { toggleTheme } from '../store/slices/themeSlice';
const HomeScreen = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
 const dispatch = useDispatch();
  // light/dark theme
const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const token = useSelector((state: any) => state.auth.token);

  // fetch products
  const fetchProducts = async (pageNumber = 1, isRefreshing = false) => {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products?limit=10&page=${pageNumber}`
      );

      if (isRefreshing) {
        setProducts(response.data);
        setFilteredProducts(response.data);
      } else {
        setProducts((prev) => [...prev, ...response.data]);
        setFilteredProducts((prev) => [...prev, ...response.data]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // initial fetch
  useEffect(() => {
    fetchProducts();
  }, [token]);

  // search filter
  const handleSearch = (text: string) => {
    setSearch(text);
    if (text) {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  // pull to refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    fetchProducts(1, true).then(() => setRefreshing(false));
  }, []);

  // infinite scroll
  const loadMore = () => {
    if (!loadingMore) {
      setLoadingMore(true);
      const nextPage = page + 1;
      fetchProducts(nextPage).then(() => {
        setPage(nextPage);
        setLoadingMore(false);
      });
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#121212" : "#fff" },
      ]}
    >
      {/* Header with theme toggle */}
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: isDarkMode ? "#fff" : "#000" }]}>
          Products
        </Text>
        <Switch value={isDarkMode} onValueChange={()=> {dispatch(toggleTheme())}} />
      </View>

      {/* Search bar */}
      <TextInput
        placeholder="Search products..."
        placeholderTextColor={isDarkMode ? "#aaa" : "#666"}
        value={search}
        onChangeText={handleSearch}
        style={[
          styles.searchInput,
          {
            backgroundColor: isDarkMode ? "#1e1e1e" : "#fff",
            color: isDarkMode ? "#fff" : "#000",
            borderColor: isDarkMode ? "#555" : "#ccc",
          },
        ]}
      />

      {/* Products list */}
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <ProductCard product={item} isDarkMode={isDarkMode} />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={isDarkMode ? "#fff" : "#000"}
          />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          <Text style={[styles.centered, { color: isDarkMode ? "#fff" : "#000" }]}>
            No products found
          </Text>
        }
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: { fontSize: 20, fontWeight: "bold" },
  searchInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
  },
  list: { paddingBottom: 20 },
  centered: { textAlign: "center", marginTop: 20, fontSize: 16 },
});
