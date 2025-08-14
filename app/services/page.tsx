'use client'
import { Button } from '@heroui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AppNavbar from '@/components/Navbar';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ServicesPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <AppNavbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 max-w-2xl"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            {language === 'zh' ? '我们的服务' : 'Our Services'}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {language === 'zh' 
              ? '这是服务页面，正在建设中...' 
              : 'This is the services page, under construction...'
            }
          </p>
          <Link href="/">
            <Button color="primary">
              {language === 'zh' ? '返回首页' : 'Back to Home'}
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}