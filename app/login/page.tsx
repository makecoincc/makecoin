'use client'
import { useState } from 'react';
import { Button, Input, Card, CardBody, Link, Divider } from '@heroui/react';
import { EyeIcon, EyeSlashIcon, UserIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const toggleVisibility = () => setIsVisible(!isVisible);

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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
            {/* 简洁的背景装饰 */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-60"
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
                    className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 rounded-full opacity-40"
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
                <Card className="bg-white shadow-xl border-0">
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
                                className="w-16 h-16 bg-gray-900 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                            >
                                <UserIcon className="w-8 h-8 text-white" />
                            </motion.div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                欢迎回来
                            </h1>
                            <p className="text-gray-600">请登录您的账户</p>
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
                                    startContent={<UserIcon className="w-4 h-4 text-gray-500" />}
                                    classNames={{
                                        input: "text-gray-900",
                                        inputWrapper: "border-gray-300 hover:border-gray-900 focus-within:border-gray-900 transition-colors",
                                        label: "text-gray-700"
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
                                    startContent={<LockClosedIcon className="w-4 h-4 text-gray-500" />}
                                    endContent={
                                        <button
                                            className="focus:outline-none"
                                            type="button"
                                            onClick={toggleVisibility}
                                        >
                                            {isVisible ? (
                                                <EyeSlashIcon className="w-4 h-4 text-gray-500 hover:text-gray-700 transition-colors" />
                                            ) : (
                                                <EyeIcon className="w-4 h-4 text-gray-500 hover:text-gray-700 transition-colors" />
                                            )}
                                        </button>
                                    }
                                    type={isVisible ? "text" : "password"}
                                    classNames={{
                                        input: "text-gray-900",
                                        inputWrapper: "border-gray-300 hover:border-gray-900 focus-within:border-gray-900 transition-colors",
                                        label: "text-gray-700"
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
                                    <input type="checkbox" className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900 focus:ring-2" />
                                    <span className="text-sm text-gray-600">记住我</span>
                                </label>
                                <Link href="#" size="sm" className="text-gray-900 hover:text-gray-700 font-medium transition-colors">
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
                                    className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
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
                                    <span className="text-gray-600 text-sm">还没有账户？</span>
                                    <Link href="/register" className="text-gray-900 hover:text-gray-700 font-semibold ml-1 transition-colors">
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