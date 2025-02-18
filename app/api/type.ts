export interface CryptoData {
    symbol: string;
    lastPrice: string;
    priceChangePercent: string;
    volume: string;
    highPrice: string;
    lowPrice: string;
    baseSymbol?: string;
    logoUrl?: string;
  }
  
  export interface CryptoDetails extends CryptoData {
    openPrice: string;
    quoteVolume: string;
    count: number;
  }