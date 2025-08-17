'use client'
import { useState, useEffect } from 'react';
import { Button } from '@heroui/react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import AppNavbar from '@/components/Navbar';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PolygonPage() {
    const { t } = useLanguage();
    const [currentCard, setCurrentCard] = useState(0);
    const [isAutoPlay, setIsAutoPlay] = useState(true);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Polygon 特性数据 - 游戏化设计
    const polygonFeatures = [
        {
            title: t('layerTwo'),
            description: t('layerTwoDesc'),
            icon: '⚡',
            bgColor: 'from-yellow-400 via-orange-500 to-red-500',
            accentColor: '#F59E0B',
            stats: { value: '65,000+', label: 'TPS' },
            href: 'https://polygon.technology/polygon-pos'
        },
        {
            title: t('lowCost'),
            description: t('lowCostDesc'),
            icon: '💎',
            bgColor: 'from-emerald-400 via-teal-500 to-cyan-500',
            accentColor: '#10B981',
            stats: { value: '$0.01', label: 'Avg Fee' },
            href: 'https://polygon.technology/gas-tracker'
        },
        {
            title: t('ethCompatible'),
            description: t('ethCompatibleDesc'),
            icon: '🔗',
            bgColor: 'from-blue-400 via-indigo-500 to-purple-500',
            accentColor: '#3B82F6',
            stats: { value: '100%', label: 'EVM Compatible' },
            href: 'https://polygon.technology/developers'
        },
        {
            title: t('carbonNeutral'),
            description: t('carbonNeutralDesc'),
            icon: '🌱',
            bgColor: 'from-green-400 via-emerald-500 to-teal-500',
            accentColor: '#059669',
            stats: { value: 'Carbon', label: 'Negative' },
            href: 'https://polygon.technology/sustainability'
        },
        {
            title: t('multichain'),
            description: t('multichainDesc'),
            icon: '🌐',
            bgColor: 'from-pink-400 via-rose-500 to-red-500',
            accentColor: '#EC4899',
            stats: { value: '10+', label: 'Solutions' },
            href: 'https://polygon.technology/solutions'
        },
        {
            title: t('developer'),
            description: t('developerDesc'),
            icon: '👨‍💻',
            bgColor: 'from-violet-400 via-purple-500 to-indigo-500',
            accentColor: '#8B5CF6',
            stats: { value: '37,000+', label: 'dApps' },
            href: 'https://polygon.technology/ecosystem'
        }
    ];

    // 自动轮播
    useEffect(() => {
        if (!isAutoPlay) return;

        const interval = setInterval(() => {
            setCurrentCard((prev) => (prev + 1) % polygonFeatures.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [isAutoPlay, polygonFeatures.length]);

    // 鼠标跟踪
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const nextCard = () => {
        setCurrentCard((prev) => (prev + 1) % polygonFeatures.length);
    };

    const prevCard = () => {
        setCurrentCard((prev) => (prev - 1 + polygonFeatures.length) % polygonFeatures.length);
    };

    const currentFeature = polygonFeatures[currentCard];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white overflow-hidden relative">
            <AppNavbar />

            {/* 动态鼠标跟随光标 */}
            <motion.div
                className="fixed w-6 h-6 bg-white/20 rounded-full pointer-events-none z-50 mix-blend-difference"
                animate={{
                    x: mousePosition.x - 12,
                    y: mousePosition.y - 12,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
            />

            {/* 动态背景粒子 */}
            <div className="absolute inset-0">
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white/10 rounded-full"
                        animate={{
                            x: [0, Math.random() * 1200],
                            y: [Math.random() * 800, Math.random() * 800],
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0]
                        }}
                        transition={{
                            duration: Math.random() * 20 + 10,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                        }}
                        style={{
                            left: Math.random() * 100 + '%',
                            top: Math.random() * 100 + '%'
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 min-h-screen flex flex-col">
                {/* 游戏化头部 */}
                <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-8">
                    <div className="max-w-7xl mx-auto w-full">

                        {/* 主标题区域 */}
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="text-center mb-8 lg:mb-16"
                        >
                            <motion.div
                                className="inline-block mb-6"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-2xl lg:text-3xl shadow-2xl">
                                    ⬟
                                </div>
                            </motion.div>

                            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 lg:mb-6">
                                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                                    {t('polygonTitle')}
                                </span>
                            </h1>

                            <p className="text-lg lg:text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
                                {t('polygonDescription')}
                            </p>
                        </motion.div>

                        {/* 轮播卡片区域 */}
                        <div className="relative">
                            <motion.h2
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-2xl lg:text-3xl font-semibold text-center mb-8 lg:mb-12"
                            >
                                {t('polygonFeatures')}
                            </motion.h2>

                            {/* 主卡片容器 */}
                            <div className="relative h-96 lg:h-[500px] mb-8">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentCard}
                                        initial={{ opacity: 0, rotateY: 90, scale: 0.8 }}
                                        animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                                        exit={{ opacity: 0, rotateY: -90, scale: 0.8 }}
                                        transition={{ duration: 0.6, type: "spring" }}
                                        className="absolute inset-0 flex items-center justify-center"
                                    >
                                        <div
                                            className={`relative w-full max-w-md lg:max-w-lg h-full bg-gradient-to-br ${currentFeature.bgColor} rounded-3xl p-8 lg:p-12 shadow-2xl overflow-hidden`}
                                            onMouseEnter={() => setIsAutoPlay(false)}
                                            onMouseLeave={() => setIsAutoPlay(true)}
                                        >
                                            {/* 卡片背景装饰 */}
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

                                            {/* 卡片内容 */}
                                            <div className="relative z-10 h-full flex flex-col">
                                                <motion.div
                                                    className="text-6xl lg:text-8xl mb-6"
                                                    animate={{
                                                        rotate: [0, 10, -10, 0],
                                                        scale: [1, 1.1, 1]
                                                    }}
                                                    transition={{
                                                        duration: 4,
                                                        repeat: Infinity,
                                                        ease: "easeInOut"
                                                    }}
                                                >
                                                    {currentFeature.icon}
                                                </motion.div>

                                                <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-white">
                                                    {currentFeature.title}
                                                </h3>

                                                <p className="text-white/90 mb-6 lg:mb-8 leading-relaxed flex-grow">
                                                    {currentFeature.description}
                                                </p>

                                                {/* 统计数据 */}
                                                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-6">
                                                    <div className="text-center">
                                                        <div className="text-2xl lg:text-3xl font-bold text-white">
                                                            {currentFeature.stats.value}
                                                        </div>
                                                        <div className="text-white/80 text-sm">
                                                            {currentFeature.stats.label}
                                                        </div>
                                                    </div>
                                                </div>

                                                <Button
                                                    as={Link}
                                                    href={currentFeature.href}
                                                    target="_blank"
                                                    className="w-full bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 transition-all duration-300"
                                                    size="lg"
                                                >
                                                    {t('tryNow')} →
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                                {/* 导航按钮 */}
                                <button
                                    onClick={prevCard}
                                    className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-20"
                                >
                                    ←
                                </button>
                                <button
                                    onClick={nextCard}
                                    className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-20"
                                >
                                    →
                                </button>
                            </div>

                            {/* 卡片指示器 */}
                            <div className="flex justify-center space-x-3 mb-8">
                                {polygonFeatures.map((_, index) => (
                                    <motion.button
                                        key={index}
                                        onClick={() => setCurrentCard(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${currentCard === index ? 'bg-white scale-125' : 'bg-white/40'
                                            }`}
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                    />
                                ))}
                            </div>

                            {/* 缩略图预览 */}
                            <div className="hidden lg:flex justify-center space-x-4 mb-8">
                                {polygonFeatures.map((feature, index) => (
                                    <motion.button
                                        key={index}
                                        onClick={() => setCurrentCard(index)}
                                        className={`relative w-20 h-20 rounded-xl overflow-hidden transition-all duration-300 ${currentCard === index ? 'ring-4 ring-white scale-110' : 'opacity-60 hover:opacity-80'
                                            }`}
                                        whileHover={{ scale: currentCard === index ? 1.1 : 1.05 }}
                                    >
                                        <div className={`w-full h-full bg-gradient-to-br ${feature.bgColor} flex items-center justify-center text-2xl`}>
                                            {feature.icon}
                                        </div>
                                    </motion.button>
                                ))}
                            </div>

                            {/* 底部行动按钮 */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1, duration: 0.8 }}
                                className="text-center"
                            >
                                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                                    <Button
                                        as={Link}
                                        href="https://polygon.technology"
                                        target="_blank"
                                        size="lg"
                                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                                    >
                                        {t('getStarted')}
                                    </Button>
                                    <Button
                                        as={Link}
                                        href="https://docs.polygon.technology"
                                        target="_blank"
                                        size="lg"
                                        variant="bordered"
                                        className="border-white/30 text-white hover:bg-white/10 transition-all duration-300"
                                    >
                                        {t('viewDocs')}
                                    </Button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}