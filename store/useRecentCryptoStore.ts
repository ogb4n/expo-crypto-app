import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RecentCrypto {
  symbol: string;
  baseSymbol: string;
  lastPrice: string;
  priceChangePercent: string;
  logoUrl?: string;
  timestamp: number;
}

interface RecentCryptoState {
  recentCryptos: RecentCrypto[];
  addRecentCrypto: (crypto: Omit<RecentCrypto, 'timestamp'>) => void;
  clearRecentCryptos: () => void;
}

export const useRecentCryptoStore = create<RecentCryptoState>()(
  persist(
    (set) => ({
      recentCryptos: [],
      addRecentCrypto: (crypto) => {
        set((state) => {
          const newRecentCryptos = state.recentCryptos
            .filter(item => item.symbol !== crypto.symbol)
            .slice(0, 4);

          return {
            recentCryptos: [{
              ...crypto,
              timestamp: Date.now()
            }, ...newRecentCryptos]
          };
        });
      },
      clearRecentCryptos: () => set({ recentCryptos: [] }),
    }),
    {
      name: 'recent-crypto-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);