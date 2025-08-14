'use client'
import { useState, useEffect } from 'react';
import { Button, Input, Card, CardBody, Link, Divider } from '@heroui/react';
import { EyeIcon, EyeSlashIcon, UserIcon, LockClosedIcon, EnvelopeIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);
  
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

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = '请输入姓名';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = '请输入邮箱';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }
    
    if (!formData.password) {
      newErrors.password = '请输入密码';
    } else if (formData.password.length < 6) {
      newErrors.password = '密码至少需要6个字符';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '两次输入的密码不一致';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // 模拟注册请求
    setTimeout(() => {
      console.log('注册信息:', formData);
      setIsLoading(false);
      // 这里可以添加实际的注册逻辑
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // 清除对应字段的错误信息
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
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
          className="absolute -top-40 -right-40 w-80 h-80 bg-gray-200 dark:bg-gray-700/20 rounded-full opacity-60"
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
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-300 dark:bg-gray-600/20 rounded-full opacity-40"
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
                创建账户
              </h1>
              <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">请填写以下信息完成注册</p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <Input
                  type="text"
                  label="姓名"
                  placeholder="请输入您的姓名"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  isRequired
                  variant="bordered"
                  startContent={<UserIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />}
                  isInvalid={!!errors.name}
                  errorMessage={errors.name}
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
                  type="email"
                  label="邮箱地址"
                  placeholder="请输入您的邮箱"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  isRequired
                  variant="bordered"
                  startContent={<EnvelopeIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />}
                  isInvalid={!!errors.email}
                  errorMessage={errors.email}
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
              >
                <Input
                  label="密码"
                  placeholder="请输入密码（至少6个字符）"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
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
                  isInvalid={!!errors.password}
                  errorMessage={errors.password}
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
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <Input
                  label="确认密码"
                  placeholder="请再次输入密码"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  isRequired
                  variant="bordered"
                  startContent={<LockClosedIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleConfirmVisibility}
                    >
                      {isConfirmVisible ? (
                        <EyeSlashIcon className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors" />
                      ) : (
                        <EyeIcon className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors" />
                      )}
                    </button>
                  }
                  type={isConfirmVisible ? "text" : "password"}
                  isInvalid={!!errors.confirmPassword}
                  errorMessage={errors.confirmPassword}
                  classNames={{
                    input: "text-gray-900 dark:text-white",
                    inputWrapper: "border-gray-300 dark:border-gray-600 hover:border-gray-900 dark:hover:border-gray-300 focus-within:border-gray-900 dark:focus-within:border-gray-300 bg-white dark:bg-gray-700 transition-colors",
                    label: "text-gray-700 dark:text-gray-300"
                  }}
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Button
                  type="submit"
                  size="lg"
                  isLoading={isLoading}
                  className="w-full bg-gray-900 dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-gray-900 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isLoading ? '注册中...' : '创建账户'}
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.8 }}
              >
                <Divider className="my-6" />
                
                <div className="text-center">
                  <span className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-300">已有账户？</span>
                  <Link href="/login" className="text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 font-semibold ml-1 transition-colors">
                    立即登录
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