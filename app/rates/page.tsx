'use client';

import { Wave } from 'react-animated-text';

import Container from '@/components/Container/Container';
import Section from '@/components/Section/Section';
import Heading from '@/components/Heading/Heading';

import css from './RatesPage.module.css';
import { useEffect } from 'react';
import { latestRates } from '@/lib/service/exchangeAPI';
import { useCurrencyStore } from '@/lib/stores/currencyStore';

export default function RatesPage() {
  const isError = false;
  const baseCurrency = useCurrencyStore((state) => state.baseCurrency);
  useEffect(() => {
    const getRates = async () => {
      try {
        const data = await latestRates(baseCurrency);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getRates();
  }, [baseCurrency]);

  return (
    <main className={css.main}>
      <Section>
        <Container>
          <Heading
            info
            bottom
            title={
              <Wave
                text={`$ $ $ Current exchange rate for 1 ${'UAH'} $ $ $`}
                effect="fadeOut"
                effectChange={4.0}
              />
            }
          />

          {isError && (
            <Heading error title="Something went wrong...😐 We cannot show current rates!" />
          )}
        </Container>
      </Section>
    </main>
  );
}
