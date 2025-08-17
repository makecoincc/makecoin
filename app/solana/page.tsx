'use client'
import { Button, Card, CardBody } from '@heroui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AppNavbar from '@/components/Navbar';
import { useLanguage } from '@/contexts/LanguageContext';

export default function SolanaPage() {
    const { t } = useLanguage();

    // Solana 特性卡片数据
    const solanaFeatures = [
        {
            title: t('fastTransactions'),
            description: t('fastTransactionsDesc'),
            icon: '⚡',
            color: 'from-yellow-400 to-orange-500',
            buttonText: t('learnMore'),
            href: 'https://docs.solana.com/introduction'
        },
        {
            title: t('lowFees'),
            description: t('lowFeesDesc'),
            icon: '💰',
            color: 'from-green-400 to-emerald-500',
            buttonText: t('explore'),
            href: 'https://solanabeach.io'
        },
        {
            title: t('developerFriendly'),
            description: t('developerFriendlyDesc'),
            icon: '👨‍💻',
            color: 'from-blue-400 to-cyan-500',
            buttonText: t('viewDocs'),
            href: 'https://docs.solana.com'
        },
        {
            title: t('proofOfHistory'),
            description: t('proofOfHistoryDesc'),
            icon: '🕐',
            color: 'from-purple-400 to-pink-500',
            buttonText: t('learnMore'),
            href: 'https://docs.solana.com/cluster/synchronization'
        },
        {
            title: t('ecosystem'),
            description: t('ecosystemDesc'),
            icon: '🌐',
            color: 'from-indigo-400 to-purple-500',
            buttonText: t('explore'),
            href: 'https://solana.com/ecosystem'
        },
        {
            title: t('scalability'),
            description: t('scalabilityDesc'),
            icon: '📈',
            color: 'from-red-400 to-pink-500',
            buttonText: t('getStarted'),
            href: 'https://docs.solana.com/developing/programming-model/overview'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 relative overflow-hidden">
            {/* 背景粒子效果 */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-20"
                        animate={{
                            x: [0, 1200],
                            y: [
                                Math.random() * 800,
                                Math.random() * 800
                            ],
                            opacity: [0, 0.6, 0]
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "linear"
                        }}
                        style={{
                            left: -10,
                            top: Math.random() * 100 + '%'
                        }}
                    />
                ))}
            </div>
            
            {/* 背景网格 */}
            <div className="absolute inset-0 opacity-5 dark:opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px'
                }}></div>
            </div>
            
            <AppNavbar />

            <div className="container mx-auto px-4 py-8">
                {/* 页面头部 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 max-w-4xl mx-auto"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-8"
                    >
                        <div className="relative inline-flex items-center justify-center mb-6">
                            {/* 外层旋转光环 */}
                            <motion.div 
                                className="absolute w-32 h-32 border-4 border-purple-300/30 rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            />
                            
                            {/* 中层旋转光环 */}
                            <motion.div 
                                className="absolute w-28 h-28 border-2 border-blue-300/40 rounded-full"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            />
                            
                            {/* 主图标 */}
                            <motion.div 
                                className="w-24 h-24 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-4xl shadow-2xl relative overflow-hidden"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <motion.span
                                    animate={{ 
                                        rotate: [0, 5, -5, 0],
                                        scale: [1, 1.1, 1]
                                    }}
                                    transition={{ 
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="relative z-10"
                                >
                                    ◎
                                </motion.span>
                                
                                {/* 内部光效 */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
                                
                                {/* 脉冲效果 */}
                                <motion.div 
                                    className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-0"
                                    animate={{ 
                                        opacity: [0, 0.3, 0],
                                        scale: [1, 1.2, 1]
                                    }}
                                    transition={{ 
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                            </motion.div>
                            
                            {/* 背景光晕 */}
                            <div className="absolute inset-0 w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 dark:from-purple-400 dark:via-blue-400 dark:to-cyan-400 bg-clip-text text-transparent mb-6"
                    >
                        {t('solanaTitle')}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8"
                    >
                        {t('solanaDescription')}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Button
                            as={Link}
                            href="https://solana.com"
                            target="_blank"
                            size="lg"
                            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            {t('getStarted')}
                        </Button>
                        <Button
                            as={Link}
                            href="https://docs.solana.com"
                            target="_blank"
                            size="lg"
                            variant="bordered"
                            className="border-purple-300 dark:border-purple-600 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                        >
                            {t('viewDocs')}
                        </Button>
                    </motion.div>
                </motion.div>

                {/* 特性卡片网格 */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
                        {t('solanaFeatures')}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {solanaFeatures.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30, rotateX: -15 }}
                                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                transition={{ 
                                    duration: 0.7, 
                                    delay: 1.2 + index * 0.15,
                                    type: "spring",
                                    stiffness: 100
                                }}
                                whileHover={{ 
                                    y: -15, 
                                    rotateY: 5,
                                    scale: 1.02,
                                    transition: { duration: 0.3 }
                                }}
                                className="h-full perspective-1000"
                            >
                                <div className="relative group h-full">
                                    {/* 外层光晕效果 */}
                                    <div className={`absolute -inset-1 bg-gradient-to-r ${feature.color} rounded-3xl blur-lg opacity-20 group-hover:opacity-50 transition-all duration-500`}></div>
                                    
                                    {/* 内层光晕 */}
                                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.color} rounded-2xl blur opacity-30 group-hover:opacity-70 transition-all duration-300`}></div>
                                    
                                    <Card className="relative h-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-0 overflow-hidden group-hover:shadow-2xl transition-all duration-500 rounded-2xl">
                                        {/* 顶部彩色条 */}
                                        <div className={`h-2 w-full bg-gradient-to-r ${feature.color} relative overflow-hidden`}>
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                        </div>
                                        
                                        <CardBody className="p-8 flex flex-col h-full relative">
                                            {/* 背景装饰圆 */}
                                            <div className="absolute top-4 right-4 w-24 h-24 opacity-5 dark:opacity-10 overflow-hidden">
                                                <motion.div 
                                                    className={`w-full h-full bg-gradient-to-br ${feature.color} rounded-full`}
                                                    animate={{ 
                                                        rotate: [0, 360],
                                                        scale: [1, 1.1, 1]
                                                    }}
                                                    transition={{ 
                                                        duration: 20,
                                                        repeat: Infinity,
                                                        ease: "linear"
                                                    }}
                                                />
                                            </div>
                                            
                                            {/* 图标和标题区域 */}
                                            <motion.div 
                                                className="flex items-start mb-6"
                                                whileHover={{ scale: 1.05 }}
                                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                            >
                                                <div className="relative mr-4">
                                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-3xl shadow-xl group-hover:shadow-2xl transition-all duration-300 relative overflow-hidden`}>
                                                        <motion.span
                                                            animate={{ 
                                                                rotate: [0, 10, -10, 0],
                                                                scale: [1, 1.1, 1]
                                                            }}
                                                            transition={{ 
                                                                duration: 3,
                                                                repeat: Infinity,
                                                                repeatType: "reverse",
                                                                ease: "easeInOut"
                                                            }}
                                                            className="relative z-10"
                                                        >
                                                            {feature.icon}
                                                        </motion.span>
                                                        
                                                        {/* 图标内部光效 */}
                                                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                        
                                                        {/* 旋转光环 */}
                                                        <motion.div 
                                                            className="absolute inset-0 border-2 border-white/30 rounded-2xl"
                                                            animate={{ rotate: 360 }}
                                                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                                        />
                                                    </div>
                                                    
                                                    {/* 图标外部光晕 */}
                                                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-40 blur-xl transition-all duration-500 scale-110`}></div>
                                                </div>
                                                
                                                <div className="flex-1">
                                                    <motion.h3 
                                                        className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-500"
                                                        whileHover={{ x: 5 }}
                                                    >
                                                        {feature.title}
                                                    </motion.h3>
                                                    
                                                    {/* 动态下划线 */}
                                                    <motion.div 
                                                        className={`h-1 bg-gradient-to-r ${feature.color} rounded-full`}
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: "60%" }}
                                                        transition={{ duration: 0.8, delay: 0.5 }}
                                                    />
                                                </div>
                                            </motion.div>
                                            
                                            {/* 描述文本 */}
                                            <motion.p 
                                                className="text-gray-600 dark:text-gray-300 mb-8 flex-grow leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300"
                                                whileHover={{ x: 2 }}
                                            >
                                                {feature.description}
                                            </motion.p>
                                            
                                            {/* 按钮 */}
                                            <motion.div
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <Button
                                                    as={Link}
                                                    href={feature.href}
                                                    target="_blank"
                                                    className={`w-full bg-gradient-to-r ${feature.color} text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-0 relative overflow-hidden group/btn`}
                                                >
                                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                                        {feature.buttonText}
                                                        <motion.span
                                                            animate={{ x: [0, 3, 0] }}
                                                            transition={{ duration: 1.5, repeat: Infinity }}
                                                        >
                                                            →
                                                        </motion.span>
                                                    </span>
                                                    
                                                    {/* 按钮滑动效果 */}
                                                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out"></div>
                                                    
                                                    {/* 按钮边框光效 */}
                                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                                                    
                                                    {/* 按钮脉冲效果 */}
                                                    <motion.div 
                                                        className={`absolute inset-0 rounded-xl bg-gradient-to-r ${feature.color} opacity-0`}
                                                        animate={{ 
                                                            opacity: [0, 0.3, 0],
                                                            scale: [1, 1.05, 1]
                                                        }}
                                                        transition={{ 
                                                            duration: 2,
                                                            repeat: Infinity,
                                                            delay: index * 0.3
                                                        }}
                                                    />
                                                </Button>
                                            </motion.div>
                                            
                                            {/* 底部装饰点阵 */}
                                            <div className="flex justify-center mt-6 space-x-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.color}`}
                                                        animate={{
                                                            scale: [0.8, 1.2, 0.8],
                                                            opacity: [0.3, 1, 0.3]
                                                        }}
                                                        transition={{
                                                            duration: 2,
                                                            repeat: Infinity,
                                                            delay: i * 0.1
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                            
                                            {/* 卡片内部粒子效果 */}
                                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                                {[...Array(3)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        className={`absolute w-1 h-1 bg-gradient-to-r ${feature.color} rounded-full opacity-40`}
                                                        animate={{
                                                            x: [0, 100, 200],
                                                            y: [100, 50, 0],
                                                            opacity: [0, 1, 0]
                                                        }}
                                                        transition={{
                                                            duration: 3,
                                                            repeat: Infinity,
                                                            delay: i * 1,
                                                            ease: "easeInOut"
                                                        }}
                                                        style={{
                                                            left: `${Math.random() * 100}%`,
                                                            top: `${Math.random() * 100}%`
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </CardBody>
                                    </Card>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* 底部行动号召 */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.8 }}
                    className="text-center bg-gradient-to-r from-purple-500/10 to-blue-500/10 dark:from-purple-500/20 dark:to-blue-500/20 rounded-3xl p-12 border border-purple-200 dark:border-purple-700"
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Ready to build on Solana?
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                        Join thousands of developers building the future of decentralized applications on the fastest blockchain.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            as={Link}
                            href="https://docs.solana.com/getstarted/hello-world"
                            target="_blank"
                            size="lg"
                            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            Start Building
                        </Button>
                        <Button
                            as={Link}
                            href="https://solana.com/developers"
                            target="_blank"
                            size="lg"
                            variant="bordered"
                            className="border-purple-300 dark:border-purple-600 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                        >
                            Developer Resources
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}