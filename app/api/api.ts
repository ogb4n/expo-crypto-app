import { CryptoData, CryptoDetails } from './types';

const BINANCE_API_URL = 'https://api.binance.com/api/v3';

const getCryptoLogo = (symbol: string) => {
  return `https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/${symbol.toLowerCase()}.png`;
};

export const cryptoApi = {
  getMarketData: async (): Promise<CryptoData[]> => {
    try {
      const response = await fetch(`${BINANCE_API_URL}/ticker/24hr`);
      const data = await response.json();
      
      return data
        .filter((item: CryptoData) => item.symbol.endsWith('USDT'))
        .map((item: CryptoData) => {
          const baseSymbol = item.symbol.replace('USDT', '');
          return {
            ...item,
            baseSymbol,
            logoUrl: getCryptoLogo(baseSymbol)
          };
        })
        .slice(0, 50);
    } catch (error) {
      console.error('Erreur lors de la récupération des cryptomonnaies:', error);
      throw error;
    }
  },

  getCryptoDetails: async (symbol: string): Promise<CryptoDetails> => {
    try {
      const response = await fetch(`${BINANCE_API_URL}/ticker/24hr?symbol=${symbol}`);
      const data = await response.json();
      
      if (data.symbol) {
        const baseSymbol = data.symbol.replace('USDT', '');
        return {
          ...data,
          baseSymbol,
          logoUrl: getCryptoLogo(baseSymbol)
        };
      }
      throw new Error('Crypto non trouvée');
    } catch (error) {
      console.error('Erreur lors de la récupération des détails:', error);
      throw error;
    }
  }
};