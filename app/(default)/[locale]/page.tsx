'use client'

import {useTranslations} from 'next-intl';

// import Hero from '@/components/Hero';
// import CoinTools from '@/components/CoinTools';
import ChainTools from '@/components/ChainTools';
import Faqs from '@/components/Faqs';

export default function Home() {
  const t = useTranslations('home');
  return (  
    <>
      {/* <Hero /> */}
      {/* <CoinTools /> */}
      <div>{t('home')}</div>
      <ChainTools />
      <Faqs />
    </>
  );
}