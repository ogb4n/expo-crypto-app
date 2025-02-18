import { Stack, useRouter, useGlobalSearchParams } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

interface CryptoDetails {
  symbol: string;
  lastPrice: string;
  priceChangePercent: string;
  volume: string;
  highPrice: string;
  lowPrice: string;
  openPrice: string;
  quoteVolume: string;
  count: number;
  baseSymbol?: string;
  logoUrl?: string;
}

const BINANCE_API_URL = 'https://api.binance.com/api/v3';

const getCryptoLogo = (symbol: string) => {
  return `https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/${symbol.toLowerCase()}.png`;
};

export default function CryptoDetails() {
  const { id } = useGlobalSearchParams();
  const router = useRouter();
  const [cryptoData, setCryptoData] = useState<CryptoDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCryptoDetails();
    const interval = setInterval(fetchCryptoDetails, 10000); 
    return () => clearInterval(interval);
  }, [id]);

  const fetchCryptoDetails = async () => {
    try {
      setError(null);
      const response = await fetch(`${BINANCE_API_URL}/ticker/24hr?symbol=${id}`);
      const data = await response.json();
      
      if (data.symbol) {
        const baseSymbol = data.symbol.replace('USDT', '');
        setCryptoData({
          ...data,
          baseSymbol,
          logoUrl: getCryptoLogo(baseSymbol)
        });
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des détails :', error);
      setError("Impossible de charger les données");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  if (error || !cryptoData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>{error || "Données non disponibles"}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchCryptoDetails}>
          <Text style={styles.retryText}>Réessayer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen 
        options={{
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          ),
          title: cryptoData.baseSymbol || 'Détails',
        }} 
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.symbol}>{cryptoData.baseSymbol}/USDT</Text>
          <Text style={styles.price}>${parseFloat(cryptoData.lastPrice).toFixed(2)}</Text>
          <Text 
            style={[
              styles.priceChange,
              { color: parseFloat(cryptoData.priceChangePercent) > 0 ? '#16a34a' : '#dc2626' }
            ]}
          >
            {parseFloat(cryptoData.priceChangePercent) > 0 ? '+' : ''}
            {parseFloat(cryptoData.priceChangePercent).toFixed(2)}%
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Volume 24h (USDT)</Text>
            <Text style={styles.statValue}>
              ${parseFloat(cryptoData.quoteVolume).toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Plus Haut 24h</Text>
            <Text style={styles.statValue}>${parseFloat(cryptoData.highPrice).toFixed(2)}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Plus Bas 24h</Text>
            <Text style={styles.statValue}>${parseFloat(cryptoData.lowPrice).toFixed(2)}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Prix d'ouverture</Text>
            <Text style={styles.statValue}>${parseFloat(cryptoData.openPrice).toFixed(2)}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Nombre de trades</Text>
            <Text style={styles.statValue}>{cryptoData.count.toLocaleString()}</Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FA',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    marginLeft: 16,
  },
  header: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  symbol: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  priceChange: {
    fontSize: 18,
    fontWeight: '600',
  },
  statsContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  statLabel: {
    fontSize: 16,
    color: '#6b7280',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
    fontSize: 16,
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