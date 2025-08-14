'use client'
import { useState, useEffect } from 'react';
import { Button, Input, Card, CardBody, Link, Divider } from '@heroui/react';
import { EyeIcon, EyeSlashIcon, UserIcon, LockClosedIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const router = useRouter();

    const toggleVisibility = () => setIsVisible(!isVisible);
    
    // 初始化主题
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
        setIsDark(shouldBeDark);
        document.documentElement.classList.toggle('dark', shouldBeDark);
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        document.documentElement.classList.toggle('dark', newTheme);
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // 模拟登录请求
        setTimeout(() => {
            console.log('登录信息:', { email, password });
            setIsLoading(false);
            // 登录成功后跳转到仪表板
            router.push('/dashboard');
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 transition-colors duration-300">
            {/* 主题切换按钮 */}
            <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                onClick={toggleTheme}
                className="fixed top-6 right-6 z-50 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
            >
                {isDark ? (
                    <SunIcon className="w-5 h-5 text-yellow-500" />
                ) : (
                    <MoonIcon className="w-5 h-5 text-gray-700" />
                )}
            </motion.button>

            {/* 简洁的背景装饰 */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 dark:bg-blue-900/20 rounded-full opacity-60"
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 dark:bg-indigo-900/20 rounded-full opacity-40"
                    animate={{
                        scale: [1.1, 1, 1.1],
                        rotate: [360, 180, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-md"
            >
                <Card className="bg-white dark:bg-gray-800 shadow-xl border-0 transition-colors duration-300">
                    <CardBody className="p-8">
                        {/* 标题区域 */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-center mb-8"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="w-16 h-16 bg-gray-900 dark:bg-gray-100 rounded-2xl mx-auto mb-6 flex items-center justify-center transition-colors duration-300"
                            >
                                <UserIcon className="w-8 h-8 text-white dark:text-gray-900" />
                            </motion.div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                                欢迎回来
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">请登录您的账户</p>
                        </motion.div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.3 }}
                            >
                                <Input
                                    type="email"
                                    label="邮箱地址"
                                    placeholder="请输入您的邮箱"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    isRequired
                                    variant="bordered"
                                    startContent={<UserIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />}
                                    classNames={{
                                        input: "text-gray-900 dark:text-white",
                                        inputWrapper: "border-gray-300 dark:border-gray-600 hover:border-gray-900 dark:hover:border-gray-300 focus-within:border-gray-900 dark:focus-within:border-gray-300 bg-white dark:bg-gray-700 transition-colors",
                                        label: "text-gray-700 dark:text-gray-300"
                                    }}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.4 }}
                            >
                                <Input
                                    label="密码"
                                    placeholder="请输入您的密码"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    isRequired
                                    variant="bordered"
                                    startContent={<LockClosedIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />}
                                    endContent={
                                        <button
                                            className="focus:outline-none"
                                            type="button"
                                            onClick={toggleVisibility}
                                        >
                                            {isVisible ? (
                                                <EyeSlashIcon className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors" />
                                            ) : (
                                                <EyeIcon className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors" />
                                            )}
                                        </button>
                                    }
                                    type={isVisible ? "text" : "password"}
                                    classNames={{
                                        input: "text-gray-900 dark:text-white",
                                        inputWrapper: "border-gray-300 dark:border-gray-600 hover:border-gray-900 dark:hover:border-gray-300 focus-within:border-gray-900 dark:focus-within:border-gray-300 bg-white dark:bg-gray-700 transition-colors",
                                        label: "text-gray-700 dark:text-gray-300"
                                    }}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.5 }}
                                className="flex justify-between items-center"
                            >
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded focus:ring-gray-900 dark:focus:ring-gray-300 focus:ring-2" />
                                    <span className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">记住我</span>
                                </label>
                                <Link href="#" size="sm" className="text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 font-medium transition-colors">
                                    忘记密码？
                                </Link>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                <Button
                                    type="submit"
                                    size="lg"
                                    isLoading={isLoading}
                                    className="w-full bg-gray-900 dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-gray-900 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    {isLoading ? '登录中...' : '登录'}
                                </Button>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.4, delay: 0.7 }}
                            >
                                <Divider className="my-6" />

                                <div className="text-center">
                                    <span className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-300">还没有账户？</span>
                                    <Link href="/register" className="text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 font-semibold ml-1 transition-colors">
                                        立即注册
                                    </Link>
                                </div>
                            </motion.div>
                        </form>
                    </CardBody>
                </Card>
            </motion.div>
        </div>
    );
}