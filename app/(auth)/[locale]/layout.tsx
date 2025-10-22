import AnimatedLayout from "@/app/provider/AnimatedLayout";
import { MainProvider } from "@/app/provider/MainProvider";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

export default async function AuthLayout(
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
        <main className="h-screen relative">
          <AnimatedLayout>
            {children}
          </AnimatedLayout>
        </main>
      </MainProvider>
    </NextIntlClientProvider>
  );
}
