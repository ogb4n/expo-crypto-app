import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, FlatList, RefreshControl, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useRecentCryptoStore } from '../store/useRecentCryptoStore';
import { cryptoApi } from '../app/api/api';
import { CryptoData } from '../app/api/types';

const MarketList = () => {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const addRecentCrypto = useRecentCryptoStore(state => state.addRecentCrypto);

  const fetchCryptos = async () => {
    try {
      setError(null);
      const data = await cryptoApi.getMarketData();
      setCryptos(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des cryptomonnaies :', error);
      setError('Impossible de charger les données');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptos();
    const interval = setInterval(fetchCryptos, 10000);
    return () => clearInterval(interval);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchCryptos().finally(() => setRefreshing(false));
  }, []);

  const handleImageError = (symbol: string) => {
    console.log(`Erreur de chargement du logo pour ${symbol}`);
  };

  const handleCryptoPress = (item: CryptoData) => {
    addRecentCrypto({
      symbol: item.symbol,
      baseSymbol: item.baseSymbol!,
      lastPrice: item.lastPrice,
      priceChangePercent: item.priceChangePercent,
      logoUrl: item.logoUrl
    });
    
    router.push(`/crypto/${item.symbol}`);
  };

  const renderItem = ({ item }: { item: CryptoData }) => (
    <TouchableOpacity 
      onPress={() => handleCryptoPress(item)}
      className="bg-white/90 p-4 my-1 rounded-xl flex-row items-center"
    >
      <Image 
        source={{ uri: item.logoUrl }}
        className="w-8 h-8 rounded-full mr-3"
        onError={() => handleImageError(item.baseSymbol)}
      />
      
      <View className="flex-1">
        <Text className="text-base font-medium text-gray-900">
          {item.baseSymbol}
        </Text>
        <Text className="text-xs text-gray-500">
          Vol: ${parseFloat(item.volume).toLocaleString(undefined, { maximumFractionDigits: 2 })}
        </Text>
      </View>
      
      <View className="items-end">
        <Text className="text-sm font-medium text-gray-900">
          ${parseFloat(item.lastPrice).toFixed(2)}
        </Text>
        <Text 
          className={`text-sm font-semibold ${
            parseFloat(item.priceChangePercent) > 0 
              ? 'text-green-600' 
              : 'text-red-600'
          }`}
        >
          {parseFloat(item.priceChangePercent) > 0 ? '+' : ''}
          {parseFloat(item.priceChangePercent).toFixed(2)}%
        </Text>
        <Text className="text-xs text-gray-500">
          H: ${parseFloat(item.highPrice).toFixed(2)} L: ${parseFloat(item.lowPrice).toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={fetchCryptos}
        >
          <Text style={styles.retryText}>Réessayer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={cryptos}
      renderItem={renderItem}
      keyExtractor={(item) => item.symbol}
      contentContainerStyle={styles.listContainer}
      refreshControl={
        <RefreshControl 
          refreshing={refreshing} 
          onRefresh={onRefresh}
          tintColor="#4B5563"
        />
      }
      showsVerticalScrollIndicator={false}
      maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 2,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#3B82F6',
    padding: 12,
    borderRadius: 8,
  },
  retryText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default MarketList;