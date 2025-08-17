'use client'
import { useState } from 'react';
import { Button } from '@heroui/react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import AppNavbar from '@/components/Navbar';
import { useLanguage } from '@/contexts/LanguageContext';

export default function EthereumPage() {
  const { t } = useLanguage();
  const [activeFeature, setActiveFeature] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Ethereum 特性数据 - 完全不同的结构
  const ethereumFeatures = [
    {
      title: t('smartContracts'),
      description: t('smartContractsDesc'),
      icon: '📋',
      color: '#10B981',
      stats: '2M+ Contracts',
      href: 'https://ethereum.org/en/smart-contracts/'
    },
    {
      title: t('decentralized'),
      description: t('decentralizedDesc'),
      icon: '🌍',
      color: '#3B82F6',
      stats: '15K+ Nodes',
      href: 'https://ethereum.org/en/decentralized-autonomous-organizations/'
    },
    {
      title: t('programmable'),
      description: t('programmableDesc'),
      icon: '💻',
      color: '#8B5CF6',
      stats: '500K+ Developers',
      href: 'https://ethereum.org/en/developers/'
    },
    {
      title: t('security'),
      description: t('securityDesc'),
      icon: '🛡️',
      color: '#EF4444',
      stats: '$100B+ Secured',
      href: 'https://ethereum.org/en/security/'
    },
    {
      title: t('community'),
      description: t('communityDesc'),
      icon: '🤝',
      color: '#06B6D4',
      stats: '1M+ Members',
      href: 'https://ethereum.org/en/community/'
    },
    {
      title: t('interoperability'),
      description: t('interoperabilityDesc'),
      icon: '🔗',
      color: '#F59E0B',
      stats: '50+ Bridges',
      href: 'https://ethereum.org/en/bridges/'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <AppNavbar />

      {/* 动态背景 - 移动端优化 */}
      <div className="fixed inset-0 z-0">
        {/* 动态网格 - 响应式数量 */}
        <div className="absolute inset-0 opacity-10 lg:opacity-20">
          {/* 移动端显示较少的网格线 */}
          <div className="block lg:hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-px h-10 bg-gradient-to-b from-transparent via-blue-500 to-transparent"
                style={{
                  left: `${(i % 5) * 20}%`,
                  top: `${Math.floor(i / 5) * 25}%`,
                }}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scaleY: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </div>

          {/* 桌面端显示完整网格 */}
          <div className="hidden lg:block">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-px h-20 bg-gradient-to-b from-transparent via-blue-500 to-transparent"
                style={{
                  left: `${(i % 10) * 10}%`,
                  top: `${Math.floor(i / 10) * 20}%`,
                }}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scaleY: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </div>
        </div>

        {/* 流动的光线 */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 lg:via-blue-500/10 to-transparent"
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative z-10">
        {/* 响应式布局：桌面端分屏，移动端垂直堆叠 */}
        <div className="min-h-screen flex flex-col lg:flex-row">
          {/* 左侧/顶部：主要内容 */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-8 lg:py-0">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="text-center lg:text-left"
            >
              {/* 大标题 - 响应式字体大小 */}
              <div className="mb-6 lg:mb-8">
                <motion.div
                  className="text-4xl sm:text-6xl lg:text-8xl font-black mb-2 lg:mb-4"
                  style={{
                    background: 'linear-gradient(45deg, #ffffff, #60A5FA, #A78BFA)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  ETH
                </motion.div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-300 mb-4 lg:mb-6">
                  {t('ethereumTitle')}
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
                  {t('ethereumDescription')}
                </p>
              </div>

              {/* 统计数据 - 响应式网格 */}
              <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 lg:mb-12">
                {[
                  { label: 'Total Value Locked', value: '$50B+' },
                  { label: 'Daily Transactions', value: '1.2M+' },
                  { label: 'Active Addresses', value: '800K+' },
                  { label: 'DApps Built', value: '3000+' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="border-l-2 border-blue-500 pl-3 lg:pl-4"
                  >
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* 行动按钮 - 响应式布局 */}
              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center lg:justify-start">
                <Button
                  as={Link}
                  href="https://ethereum.org"
                  target="_blank"
                  className="bg-white text-black hover:bg-gray-200 font-semibold px-6 lg:px-8 py-2 lg:py-3 w-full sm:w-auto"
                >
                  {t('getStarted')}
                </Button>
                <Button
                  as={Link}
                  href="https://ethereum.org/en/developers/docs/"
                  target="_blank"
                  variant="bordered"
                  className="border-white text-white hover:bg-white hover:text-black px-6 lg:px-8 py-2 lg:py-3 w-full sm:w-auto"
                >
                  {t('viewDocs')}
                </Button>
              </div>
            </motion.div>
          </div>

          {/* 右侧/底部：交互式特性展示 */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-8 lg:py-0">
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <h2 className="text-2xl sm:text-3xl font-light mb-8 lg:mb-12 text-center">
                {t('ethereumFeatures')}
              </h2>

              {/* 垂直特性列表 - 移动端优化 */}
              <div className="space-y-3 lg:space-y-4">
                {ethereumFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    className={`relative p-4 lg:p-6 border border-gray-700 rounded-lg cursor-pointer transition-all duration-300 ${activeFeature === index ? 'bg-gray-800 border-blue-500' : 'hover:border-gray-500'
                      }`}
                    onClick={() => setActiveFeature(index)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* 左侧指示器 */}
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: activeFeature === index ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 lg:space-x-4 flex-1 min-w-0">
                        <motion.div
                          className="text-2xl lg:text-3xl flex-shrink-0"
                          animate={{
                            scale: hoveredIndex === index ? 1.2 : 1,
                            rotate: hoveredIndex === index ? 10 : 0
                          }}
                        >
                          {feature.icon}
                        </motion.div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-lg lg:text-xl font-medium truncate">{feature.title}</h3>
                          <div className="text-xs lg:text-sm text-gray-400">{feature.stats}</div>
                        </div>
                      </div>

                      <motion.div
                        className="w-3 h-3 rounded-full flex-shrink-0 ml-2"
                        style={{ backgroundColor: feature.color }}
                        animate={{
                          scale: activeFeature === index ? [1, 1.5, 1] : 1,
                        }}
                        transition={{
                          duration: 2,
                          repeat: activeFeature === index ? Infinity : 0
                        }}
                      />
                    </div>

                    {/* 展开的描述 */}
                    <AnimatePresence>
                      {activeFeature === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-3 lg:mt-4 pt-3 lg:pt-4 border-t border-gray-600"
                        >
                          <p className="text-sm lg:text-base text-gray-300 mb-3 lg:mb-4 leading-relaxed">{feature.description}</p>
                          <Button
                            as={Link}
                            href={feature.href}
                            target="_blank"
                            size="sm"
                            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white w-full sm:w-auto"
                          >
                            Learn More →
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* 底部滚动指示器 - 移动端优化 */}
        <motion.div
          className="fixed bottom-4 lg:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-2 lg:bg-transparent lg:backdrop-blur-none lg:px-0 lg:py-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          {ethereumFeatures.map((_, index) => (
            <motion.button
              key={index}
              className={`w-2 h-2 lg:w-2 lg:h-2 rounded-full transition-all duration-300 touch-manipulation ${activeFeature === index ? 'bg-blue-500 w-6 lg:w-8' : 'bg-gray-600'
                }`}
              onClick={() => setActiveFeature(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}