'use client'
import { useRef } from 'react';
import { Button } from '@heroui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import AppNavbar from '@/components/Navbar';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AvalanchePage() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // 视差效果
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.7]);

  // Avalanche 特性数据 - 保留 Cardano 卡片样式
  const avalancheFeatures = [
    {
      title: t('consensus'),
      description: t('consensusDesc'),
      icon: '❄️',
      color: '#DC2626',
      lightColor: '#EF4444',
      stats: { value: '<1s', label: 'Finality' },
      href: 'https://docs.avax.network/learn/avalanche/avalanche-consensus'
    },
    {
      title: t('subnets'),
      description: t('subnetsDesc'),
      icon: '🏔️',
      color: '#7C2D12',
      lightColor: '#9A3412',
      stats: { value: '1000+', label: 'Validators' },
      href: 'https://docs.avax.network/learn/avalanche/subnets-overview'
    },
    {
      title: t('compatibility'),
      description: t('compatibilityDesc'),
      icon: '🔗',
      color: '#1E40AF',
      lightColor: '#2563EB',
      stats: { value: '100%', label: 'EVM Compatible' },
      href: 'https://docs.avax.network/dapps/smart-contracts'
    },
    {
      title: t('finality'),
      description: t('finalityDesc'),
      icon: '⚡',
      color: '#059669',
      lightColor: '#10B981',
      stats: { value: '4,500+', label: 'TPS' },
      href: 'https://docs.avax.network/learn/avalanche/avalanche-consensus'
    },
    {
      title: t('validators'),
      description: t('validatorsDesc'),
      icon: '🛡️',
      color: '#7C3AED',
      lightColor: '#8B5CF6',
      stats: { value: '1,300+', label: 'Validators' },
      href: 'https://docs.avax.network/nodes/validate/staking'
    },
    {
      title: t('crosschain'),
      description: t('crosschainDesc'),
      icon: '🌉',
      color: '#BE185D',
      lightColor: '#DB2777',
      stats: { value: '50+', label: 'Bridges' },
      href: 'https://docs.avax.network/learn/avalanche/avalanche-consensus'
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-red-950 dark:via-orange-950 dark:to-yellow-950 overflow-x-hidden">
      <AppNavbar />
      
      {/* 视差背景层 */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          style={{ y: y1, opacity }}
          className="absolute inset-0 bg-gradient-to-br from-red-200/30 to-orange-200/30 dark:from-red-800/20 dark:to-orange-800/20"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute inset-0"
        >
          {/* 雪花装饰 */}
          <div className="absolute top-20 left-10 w-8 h-8 text-red-300/40 dark:text-red-600/40 text-2xl">❄️</div>
          <div className="absolute top-60 right-20 w-8 h-8 text-orange-300/40 dark:text-orange-600/40 text-xl">❄️</div>
          <div className="absolute bottom-40 left-1/4 w-8 h-8 text-yellow-300/40 dark:text-yellow-600/40 text-lg">❄️</div>
          <div className="absolute top-1/3 right-1/3 w-8 h-8 text-red-300/30 dark:text-red-600/30 text-sm">❄️</div>
          <div className="absolute bottom-1/4 right-10 w-8 h-8 text-orange-300/30 dark:text-orange-600/30 text-xl">❄️</div>
        </motion.div>
      </div>

      <div className="relative z-10">
        {/* 英雄区域 */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, type: "spring" }}
              className="mb-8"
            >
              {/* Avalanche 标志 */}
              <div className="inline-flex items-center justify-center w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-red-600 to-orange-600 dark:from-red-500 dark:to-orange-500 rounded-full mb-8 shadow-2xl">
                <span className="text-3xl lg:text-4xl text-white">🔺</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 text-slate-800 dark:text-slate-100"
            >
              {t('avalancheTitle')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              {t('avalancheDescription')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Button
                as={Link}
                href="https://www.avax.network"
                target="_blank"
                size="lg"
                className="bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {t('getStarted')}
              </Button>
              <Button
                as={Link}
                href="https://docs.avax.network"
                target="_blank"
                size="lg"
                variant="bordered"
                className="border-slate-400 dark:border-slate-500 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {t('viewDocs')}
              </Button>
            </motion.div>

            {/* 滚动指示器 */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-slate-400 dark:text-slate-500"
            >
              <div className="text-sm mb-2">{t('avalancheFeatures')}</div>
              <div className="text-2xl">↓</div>
            </motion.div>
          </div>
        </section>

        {/* 特性网格区域 */}
        <section className="py-20 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl lg:text-4xl font-bold text-center mb-16 text-slate-800 dark:text-slate-100"
            >
              {t('avalancheFeatures')}
            </motion.h2>

            {/* 瀑布流网格布局 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {avalancheFeatures.map((feature, index) => (
                <FeatureCard
                  key={index}
                  feature={feature}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 统计数据区域 */}
        <section className="py-20 px-4 sm:px-8 bg-gradient-to-r from-red-100/50 to-orange-100/50 dark:from-red-900/20 dark:to-orange-900/20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
            >
              {[
                { value: '$15B+', label: 'Total Value Locked' },
                { value: '400+', label: 'Projects Built' },
                { value: '1.3K+', label: 'Active Validators' },
                { value: '2M+', label: 'Unique Addresses' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50"
                >
                  <div className="text-2xl lg:text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 底部行动区域 */}
        <section className="py-20 px-4 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h3 className="text-3xl lg:text-4xl font-bold mb-6 text-slate-800 dark:text-slate-100">
              Build on Avalanche Today
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Join the fastest smart contracts platform and experience sub-second finality with unlimited scalability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                as={Link}
                href="https://core.app"
                target="_blank"
                size="lg"
                className="bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Launch Core Wallet
              </Button>
              <Button
                as={Link}
                href="https://docs.avax.network/quickstart"
                target="_blank"
                size="lg"
                variant="bordered"
                className="border-slate-400 dark:border-slate-500 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Developer Quickstart
              </Button>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}

// 特性卡片组件类型定义
interface AvalancheFeature {
  title: string;
  description: string;
  icon: string;
  color: string;
  lightColor: string;
  stats: { value: string; label: string };
  href: string;
}

// 特性卡片组件 - 使用 Cardano 样式
function FeatureCard({ feature, index }: { feature: AvalancheFeature; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group"
    >
      <div 
        className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-200 dark:border-slate-700 h-full flex flex-col"
        style={{ 
          background: `linear-gradient(135deg, ${feature.color}10, ${feature.lightColor}20)` 
        }}
      >
        {/* 图标和标题 */}
        <div className="flex items-center mb-6">
          <motion.div 
            className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300"
            style={{ backgroundColor: feature.color }}
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
          >
            {feature.icon}
          </motion.div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300">
              {feature.title}
            </h3>
            <motion.div 
              className="h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mt-2"
              initial={{ width: 0 }}
              whileInView={{ width: "60%" }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </div>
        </div>
        
        {/* 描述 */}
        <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed flex-grow">
          {feature.description}
        </p>
        
        {/* 统计数据 */}
        <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 dark:from-red-500/20 dark:to-orange-500/20 backdrop-blur-sm rounded-xl p-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              {feature.stats.value}
            </div>
            <div className="text-slate-600 dark:text-slate-400 text-sm">
              {feature.stats.label}
            </div>
          </div>
        </div>
        
        {/* 按钮 */}
        <Button
          as={Link}
          href={feature.href}
          target="_blank"
          size="sm"
          className="w-full bg-gradient-to-r from-red-500 to-orange-600 text-white shadow-md hover:shadow-lg transition-all duration-300"
        >
          Learn More →
        </Button>
      </div>
    </motion.div>
  );
}