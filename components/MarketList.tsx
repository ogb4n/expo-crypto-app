import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { styled } from 'nativewind';

const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd';

const MarketList = () => {
  const [cryptos, setCryptos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchCryptos();
  }, []);

  const fetchCryptos = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setCryptos(data.slice(0, 50));
    } catch (error) {
      console.error('Erreur lors de la récupération des cryptomonnaies :', error);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchCryptos().finally(() => setRefreshing(false));
  }, []);

  const renderItem = ({ item }) => (
    <View className="bg-white/90 p-4 my-2 rounded-2xl flex-row items-center shadow-lg">
      <Image source={{ uri: item.image }} className="w-12 h-12 mr-4" />
      <View className="flex-1">
        <Text className="text-lg font-semibold text-gray-900">{item.name}</Text>
        <Text className="text-sm text-gray-500">{item.symbol.toUpperCase()}</Text>
      </View>
      <Text className="text-lg font-bold text-gray-900">${item.current_price.toFixed(2)}</Text>
    </View>
  );

  return (
    <FlatList
      data={cryptos}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
});

export default MarketList;