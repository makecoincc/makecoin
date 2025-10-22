import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import { MainProvider } from "@/app/provider/MainProvider";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

export default async function DefaultLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({locale});

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <MainProvider>
        <div className="flex w-full flex-col">
          <Banner />
          <Header />
          <main className="relative flex grow flex-col">{children}</main>
          <Footer />
        </div>
      </MainProvider>
    </NextIntlClientProvider>
  );
}

export function generateStaticParams() {
  return [
    {locale: 'zh'},
    {locale: 'en'}
  ];
}
