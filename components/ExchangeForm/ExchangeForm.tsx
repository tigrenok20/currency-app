'use client';

import { RiExchangeDollarFill } from 'react-icons/ri';

import styles from './ExchangeForm.module.css';
import { exchangeCurrency } from '@/lib/service/exchangeAPI';
import { useCurrencyStore } from '@/lib/stores/currencyStore';

export default function ExchangeForm() {
  const setExchangeInfo = useCurrencyStore((state) => state.setExchangeInfo);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    const value = formdata.get('currency') as string;

    if (value.trim() === '') {
      return;
    }

    const [amount, from, , to] = value.split(' ');

    try {
      const data = await exchangeCurrency({ to, from, amount: Number(amount) });
      setExchangeInfo(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <button className={styles.button} type="submit">
        <RiExchangeDollarFill className={styles.icon} />
      </button>

      <input
        type="text"
        pattern="^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$"
        placeholder="15 USD in UAH"
        title="Request format 15 USD in UAH"
        className={styles.input}
        name="currency"
        required
      />
    </form>
  );
}
