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
    submit: '提交',
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
    
    // 提交页面
    submitInformation: '提交信息',
    fillSubmitInfo: '请填写以下信息完成提交',
    doubleClickReset: '双击重置表单',
    title: '标题',
    titleDescription: '为您的内容起一个吸引人的标题，建议不超过50个字符',
    enterTitle: '请输入标题',
    category: '分类',
    categoryDescription: '选择最符合您内容的分类，有助于其他用户发现',
    selectCategory: '选择分类',
    author: '作者',
    authorDescription: '输入内容创作者的姓名或笔名',
    enterAuthor: '请输入作者姓名',
    email: '邮箱',
    emailDescription: '用于接收通知和反馈，不会公开显示',
    enterEmailAddress: '请输入邮箱地址',
    website: '网站',
    websiteDescription: '作者的个人网站或相关链接（可选）',
    enterWebsite: '请输入网站地址（可选）',
    tags: '标签',
    tagsDescription: '添加相关标签帮助分类，用逗号分隔，例如：技术,前端,React',
    enterTags: '请输入标签，用逗号分隔',
    description: '详细描述',
    descriptionDescription: '详细描述您的内容，包括主要特点、用途或亮点，建议100-500字',
    enterDescription: '请输入详细描述...',
    image: '图片',
    imageDescription: '上传封面图片或头像，建议64x64像素正方形，支持PNG/JPG/GIF格式',
    imageUrl: '图片地址',
    imageUrlDescription: '输入图片的网络地址，建议使用64x64像素正方形图片',
    enterImageUrl: '请输入图片地址',
    uploadImage: '上传图片',
    clickOrDrag: '点击或拖拽图片到左侧区域',
    recommendedFormat: '建议 64x64 正方形，支持 PNG/JPG/GIF',
    clickToReplace: '点击图标更换图片',
    submitting: '提交中...',
    submitInfo: '提交信息',
    
    // 分类选项
    technology: '技术',
    design: '设计',
    business: '商业',
    education: '教育',
    entertainment: '娱乐',
    other: '其他',
    
    // 提交页面验证错误
    titleRequired: '请输入标题',
    categoryRequired: '请选择分类',
    authorRequired: '请输入作者姓名',
    descriptionRequired: '请输入描述',
    imageRequired: '请上传图片',
    imageUrlRequired: '请输入图片地址',
    invalidImageFile: '请选择有效的图片文件',
    submitSuccess: '提交成功！',
  },
  en: {
    // Common
    home: 'Home',
    about: 'About',
    services: 'Services',
    submit: 'Submit',
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
    
    // Submit page
    submitInformation: 'Submit Information',
    fillSubmitInfo: 'Please fill in the following information to submit',
    doubleClickReset: 'Double click to reset form',
    title: 'Title',
    titleDescription: 'Create an attractive title for your content, recommended under 50 characters',
    enterTitle: 'Enter title',
    category: 'Category',
    categoryDescription: 'Choose the category that best fits your content to help others discover it',
    selectCategory: 'Select category',
    author: 'Author',
    authorDescription: 'Enter the name or pen name of the content creator',
    enterAuthor: 'Enter author name',
    email: 'Email',
    emailDescription: 'Used for notifications and feedback, will not be displayed publicly',
    enterEmailAddress: 'Enter email address',
    website: 'Website',
    websiteDescription: 'Author\'s personal website or related link (optional)',
    enterWebsite: 'Enter website URL (optional)',
    tags: 'Tags',
    tagsDescription: 'Add relevant tags for categorization, separated by commas, e.g.: tech,frontend,React',
    enterTags: 'Enter tags, separated by commas',
    description: 'Description',
    descriptionDescription: 'Describe your content in detail, including key features, uses, or highlights, recommended 100-500 words',
    enterDescription: 'Enter detailed description...',
    image: 'Image',
    imageDescription: 'Upload cover image or avatar, recommended 64x64 pixels square, supports PNG/JPG/GIF formats',
    imageUrl: 'Image URL',
    imageUrlDescription: 'Enter the web address of the image, recommended 64x64 pixels square',
    enterImageUrl: 'Enter image URL',
    uploadImage: 'Upload Image',
    clickOrDrag: 'Click or drag image to left area',
    recommendedFormat: 'Recommended 64x64 square, supports PNG/JPG/GIF',
    clickToReplace: 'Click icon to replace image',
    submitting: 'Submitting...',
    submitInfo: 'Submit Information',
    
    // Category options
    technology: 'Technology',
    design: 'Design',
    business: 'Business',
    education: 'Education',
    entertainment: 'Entertainment',
    other: 'Other',
    
    // Submit page validation errors
    titleRequired: 'Please enter a title',
    categoryRequired: 'Please select a category',
    authorRequired: 'Please enter author name',
    descriptionRequired: 'Please enter description',
    imageRequired: 'Please upload an image',
    imageUrlRequired: 'Please enter image URL',
    invalidImageFile: 'Please select a valid image file',
    submitSuccess: 'Submitted successfully!',
  }
};

export const useI18n = (language: Language) => {
  const t = (key: keyof typeof translations.zh): string => {
    return translations[language][key] || key;
  };

  return { t };
};