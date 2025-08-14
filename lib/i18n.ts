export type Language = 'zh' | 'en';

// 语言配置
export const languages = {
  zh: {
    code: 'zh',
    name: '中文',
    nativeName: '中文',
    flag: '🇨🇳'
  },
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸'
  }
  // 未来可以添加更多语言：
  // ja: {
  //   code: 'ja',
  //   name: 'Japanese',
  //   nativeName: '日本語',
  //   flag: '🇯🇵'
  // },
  // ko: {
  //   code: 'ko',
  //   name: 'Korean',
  //   nativeName: '한국어',
  //   flag: '🇰🇷'
  // }
};

export const translations = {
  zh: {
    // 通用
    home: '首页',
    about: '关于',
    services: '服务',
    contact: '联系',
    
    // 登录页面
    welcomeBack: '欢迎回来',
    pleaseLogin: '请登录您的账户',
    emailAddress: '邮箱地址',
    enterEmail: '请输入您的邮箱',
    password: '密码',
    enterPassword: '请输入您的密码',
    rememberMe: '记住我',
    forgotPassword: '忘记密码？',
    login: '登录',
    loggingIn: '登录中...',
    noAccount: '还没有账户？',
    signUpNow: '立即注册',
    
    // 注册页面
    createAccount: '创建账户',
    fillInfo: '请填写以下信息完成注册',
    name: '姓名',
    enterName: '请输入您的姓名',
    enterPasswordHint: '请输入密码（至少6个字符）',
    confirmPassword: '确认密码',
    reEnterPassword: '请再次输入密码',
    creating: '注册中...',
    createAccountBtn: '创建账户',
    haveAccount: '已有账户？',
    loginNow: '立即登录',
    
    // 验证错误
    nameRequired: '请输入姓名',
    emailRequired: '请输入邮箱',
    invalidEmail: '请输入有效的邮箱地址',
    passwordRequired: '请输入密码',
    passwordTooShort: '密码至少需要6个字符',
    passwordMismatch: '两次输入的密码不一致',
  },
  en: {
    // Common
    home: 'Home',
    about: 'About',
    services: 'Services',
    contact: 'Contact',
    
    // Login page
    welcomeBack: 'Welcome Back',
    pleaseLogin: 'Please sign in to your account',
    emailAddress: 'Email Address',
    enterEmail: 'Enter your email',
    password: 'Password',
    enterPassword: 'Enter your password',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    login: 'Login',
    loggingIn: 'Logging in...',
    noAccount: "Don't have an account?",
    signUpNow: 'Sign up now',
    
    // Register page
    createAccount: 'Create Account',
    fillInfo: 'Please fill in the information below to register',
    name: 'Name',
    enterName: 'Enter your name',
    enterPasswordHint: 'Enter password (at least 6 characters)',
    confirmPassword: 'Confirm Password',
    reEnterPassword: 'Re-enter your password',
    creating: 'Creating...',
    createAccountBtn: 'Create Account',
    haveAccount: 'Already have an account?',
    loginNow: 'Login now',
    
    // Validation errors
    nameRequired: 'Please enter your name',
    emailRequired: 'Please enter your email',
    invalidEmail: 'Please enter a valid email address',
    passwordRequired: 'Please enter your password',
    passwordTooShort: 'Password must be at least 6 characters',
    passwordMismatch: 'Passwords do not match',
  }
};

export const useI18n = (language: Language) => {
  const t = (key: keyof typeof translations.zh): string => {
    return translations[language][key] || key;
  };

  return { t };
};