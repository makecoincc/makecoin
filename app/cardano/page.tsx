'use client'
import { useState, useRef, useEffect } from 'react';
import { Button } from '@heroui/react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Link from 'next/link';
import AppNavbar from '@/components/Navbar';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CardanoPage() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [activeSection, setActiveSection] = useState(0);

  // 视差效果
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  // Cardano 特性数据 - 时间轴设计
  const cardanoFeatures = [
    {
      title: t('research'),
      description: t('researchDesc'),
      icon: '🎓',
      year: '2015',
      color: '#0F172A',
      lightColor: '#1E293B',
      href: 'https://cardano.org/research/'
    },
    {
      title: t('sustainability'),
      description: t('sustainabilityDesc'),
      icon: '🌿',
      year: '2017',
      color: '#064E3B',
      lightColor: '#065F46',
      href: 'https://cardano.org/sustainability/'
    },
    {
      title: t('governance'),
      description: t('governanceDesc'),
      icon: '🗳️',
      year: '2020',
      color: '#1E1B4B',
      lightColor: '#312E81',
      href: 'https://cardano.org/governance/'
    },
    {
      title: t('smartContract'),
      description: t('smartContractDesc'),
      icon: '📋',
      year: '2021',
      color: '#7C2D12',
      lightColor: '#9A3412',
      href: 'https://developers.cardano.org/docs/smart-contracts/'
    },
    {
      title: t('interop'),
      description: t('interopDesc'),
      icon: '🌉',
      year: '2022',
      color: '#581C87',
      lightColor: '#6B21A8',
      href: 'https://cardano.org/enterprise/'
    },
    {
      title: t('scalable'),
      description: t('scalableDesc'),
      icon: '⚡',
      year: '2023',
      color: '#BE185D',
      lightColor: '#DB2777',
      href: 'https://hydra.family/'
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-slate-100 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 overflow-x-hidden">
      <AppNavbar />
      
      {/* 视差背景层 */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          style={{ y: y1, opacity }}
          className="absolute inset-0 bg-gradient-to-br from-blue-200/20 to-purple-200/20 dark:from-blue-800/20 dark:to-purple-800/20"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute inset-0"
        >
          {/* 几何装饰 */}
          <div className="absolute top-20 left-10 w-32 h-32 border-2 border-blue-300/30 dark:border-blue-600/30 rotate-45"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border-2 border-purple-300/30 dark:border-purple-600/30 rotate-12"></div>
          <div className="absolute bottom-40 left-1/4 w-16 h-16 border-2 border-indigo-300/30 dark:border-indigo-600/30 -rotate-12"></div>
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
              {/* Cardano 标志 */}
              <div className="inline-flex items-center justify-center w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-500 dark:to-indigo-600 rounded-full mb-8 shadow-2xl">
                <span className="text-3xl lg:text-4xl text-white">₳</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 text-slate-800 dark:text-slate-100"
            >
              {t('cardanoTitle')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              {t('cardanoDescription')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Button
                as={Link}
                href="https://cardano.org"
                target="_blank"
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {t('getStarted')}
              </Button>
              <Button
                as={Link}
                href="https://docs.cardano.org"
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
              <div className="text-sm mb-2">{t('cardanoJourney')}</div>
              <div className="text-2xl">↓</div>
            </motion.div>
          </div>
        </section>

        {/* 时间轴区域 */}
        <section className="py-20 px-4 sm:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl lg:text-4xl font-bold text-center mb-16 text-slate-800 dark:text-slate-100"
            >
              {t('cardanoJourney')}
            </motion.h2>

            {/* 时间轴容器 */}
            <div className="relative">
              {/* 中央时间线 */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-400 via-indigo-500 to-purple-600 rounded-full hidden lg:block"></div>

              {/* 移动端时间线 */}
              <div className="absolute left-8 w-1 h-full bg-gradient-to-b from-blue-400 via-indigo-500 to-purple-600 rounded-full lg:hidden"></div>

              {cardanoFeatures.map((feature, index) => {
                const isEven = index % 2 === 0;
                
                return (
                  <TimelineCard
                    key={index}
                    feature={feature}
                    index={index}
                    isEven={isEven}
                    isActive={activeSection === index}
                    onActivate={() => setActiveSection(index)}
                  />
                );
              })}
            </div>
          </div>
        </section>

        {/* 底部行动区域 */}
        <section className="py-20 px-4 sm:px-8 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h3 className="text-3xl lg:text-4xl font-bold mb-6 text-slate-800 dark:text-slate-100">
              Join the Cardano Revolution
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Be part of a blockchain platform that prioritizes sustainability, research, and community governance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                as={Link}
                href="https://cardano.org/stake-pool-delegation/"
                target="_blank"
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Staking
              </Button>
              <Button
                as={Link}
                href="https://developers.cardano.org"
                target="_blank"
                size="lg"
                variant="bordered"
                className="border-slate-400 dark:border-slate-500 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Developer Portal
              </Button>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}

// 时间轴卡片组件类型定义
interface CardanoFeature {
  title: string;
  description: string;
  icon: string;
  year: string;
  color: string;
  lightColor: string;
  href: string;
}

// 时间轴卡片组件
function TimelineCard({ 
  feature, 
  index, 
  isEven, 
  isActive, 
  onActivate 
}: { 
  feature: CardanoFeature; 
  index: number; 
  isEven: boolean; 
  isActive: boolean; 
  onActivate: () => void; 
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      onActivate();
    }
  }, [isInView, onActivate]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`relative flex items-center mb-16 lg:mb-24 ${
        isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
      }`}
    >
      {/* 时间轴节点 */}
      <div className="absolute left-8 lg:left-1/2 transform lg:-translate-x-1/2 w-6 h-6 bg-white dark:bg-slate-800 border-4 border-blue-500 rounded-full z-10 shadow-lg">
        <motion.div
          className="w-full h-full bg-blue-500 rounded-full"
          animate={{ scale: isActive ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
        />
      </div>

      {/* 年份标签 */}
      <div className={`absolute left-16 lg:left-1/2 transform lg:-translate-x-1/2 lg:-translate-y-12 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg ${
        isEven ? 'lg:translate-x-8' : 'lg:-translate-x-8'
      }`}>
        {feature.year}
      </div>

      {/* 卡片内容 */}
      <motion.div
        className={`w-full lg:w-5/12 ml-16 lg:ml-0 ${
          isEven ? 'lg:mr-auto lg:pr-16' : 'lg:ml-auto lg:pl-16'
        }`}
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div 
          className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700"
          style={{ 
            background: `linear-gradient(135deg, ${feature.color}10, ${feature.lightColor}20)` 
          }}
        >
          <div className="flex items-center mb-4">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mr-4 shadow-lg"
              style={{ backgroundColor: feature.color }}
            >
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              {feature.title}
            </h3>
          </div>
          
          <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
            {feature.description}
          </p>
          
          <Button
            as={Link}
            href={feature.href}
            target="_blank"
            size="sm"
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md hover:shadow-lg transition-all duration-300"
          >
            {feature.title === 'Academic Research' ? 'Read Papers' : 'Learn More'} →
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}