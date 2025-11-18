import Header from "@/components/header";
import Footer from "@/components/footer";
import Banner from "@/components/banner";
import { MainProvider } from "@/app/provider/main-provider";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

export default async function DefaultLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{locale: string}>;
  }
) {
  const params = await props.params;

  const {
    locale
  } = params;

  const {
    children
  } = props;

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
