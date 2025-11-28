import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet, Button } from 'react-native';
import ProductCard from '../components/ProductCard';
import { API_BASE } from '../constants/api';
import { useAccessibility } from '../components/AccessibilityContext';

type Product = {
  id: number;
  title: string;
  description?: string;
  price?: number;
  image?: string;
};

export default function Productos() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { largeText } = useAccessibility();

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = `${API_BASE}/products`;
      console.log('Fetching products from', url);
      const res = await fetch(url);
      console.log('Fetch status', res.status);
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data: Product[] = await res.json();
      setItems(data);
    } catch (err: any) {
      console.error('Error fetching products:', err);
      setError(err?.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  if (loading) return (
    <View style={styles.center}>
      <ActivityIndicator size="large" />
      <Text>Cargando productos...</Text>
    </View>
  );

  if (error) return (
    <View style={styles.center}>
      <Text style={{ color: 'red', marginBottom: 12 }}>Error: {error}</Text>
      <Button title="Reintentar" onPress={load} />
    </View>
  );

  if (!items.length) {
    return (
      <View style={styles.center}>
        <Text>No hay productos disponibles.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        numColumns={2}
        keyExtractor={(i) => String(i.id)}
        renderItem={({ item }) => (
          <ProductCard
            id={item.id}
            title={item.title}
            price={item.price}
            image={{
              uri: item.image ? (item.image.startsWith('http') ? item.image : `${API_BASE}${item.image}`) : undefined,
            }}
            largeText={largeText}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: '#fff' },
  list: { paddingBottom: 24 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});