import axios from 'axios';

interface Credentials {
  to: string;
  from: string;
  amount: number;
}

export interface ExchangeInfo {
  to: string;
  from: string;
  amount: number;
  rate: number;
  result: number;
}

export type Rate = [string, number];

interface ChangeCurrencyResponse {
  query: Credentials;
  info: { rate: number };
  result: number;
}

const apiKey = process.env.NEXT_PUBLIC_API_LAYER_API_KEY;

const instance = axios.create({
  baseURL: 'https://api.apilayer.com/exchangerates_data/',
  headers: { apikey: apiKey ?? '' },
});

export const exchangeCurrency = async (credentials: Credentials): Promise<ExchangeInfo> => {
  const {
    data: { query, info, result },
  } = await instance.get<ChangeCurrencyResponse>('/convert', {
    params: credentials,
  });

  return { ...query, rate: info.rate, result };
};

export const latestRates = async (baseCurrency: string): Promise<Rate[]> => {
  const { data } = await instance.get(`/latest?symbols&base=${baseCurrency}`);

  return Object.entries(data.rates);
};
