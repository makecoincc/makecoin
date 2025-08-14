'use client'
import { useState } from 'react';
import { Button, Input, Card, CardBody, Link, Divider } from '@heroui/react';
import { EyeIcon, EyeSlashIcon, UserIcon, LockClosedIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import AppNavbar from '@/components/Navbar';
import { useLanguage } from '@/contexts/LanguageContext';

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
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const { t } = useLanguage();

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t('nameRequired');
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('invalidEmail');
    }
    
    if (!formData.password) {
      newErrors.password = t('passwordRequired');
    } else if (formData.password.length < 6) {
      newErrors.password = t('passwordTooShort');
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('passwordMismatch');
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* 导航栏 */}
      <AppNavbar />
      
      {/* 主要内容区域 */}
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 relative">
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
                {t('createAccount')}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">{t('fillInfo')}</p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <Input
                  type="text"
                  label={t('name')}
                  placeholder={t('enterName')}
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
                  label={t('emailAddress')}
                  placeholder={t('enterEmail')}
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
                  label={t('password')}
                  placeholder={t('enterPasswordHint')}
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
                  label={t('confirmPassword')}
                  placeholder={t('reEnterPassword')}
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
                  {isLoading ? t('creating') : t('createAccountBtn')}
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.8 }}
              >
                <Divider className="my-6" />
                
                <div className="text-center">
                  <span className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-300">{t('haveAccount')}</span>
                  <Link href="/login" className="text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 font-semibold ml-1 transition-colors">
                    {t('loginNow')}
                  </Link>
                </div>
              </motion.div>
            </form>
          </CardBody>
        </Card>
        </motion.div>
      </div>
    </div>
  );
}