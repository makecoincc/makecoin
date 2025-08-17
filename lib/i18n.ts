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

    // Solana 页面
    solana: 'Solana',
    solanaTitle: 'Solana 生态系统',
    solanaDescription: 'Solana 是一个高性能的区块链平台，专为去中心化应用和加密货币而设计。它以其快速的交易速度、低费用和强大的开发者生态系统而闻名。',
    solanaFeatures: 'Solana 特性',

    // Solana 卡片
    fastTransactions: '快速交易',
    fastTransactionsDesc: '每秒处理超过 65,000 笔交易，为用户提供近乎即时的体验',
    lowFees: '低手续费',
    lowFeesDesc: '平均交易费用不到 $0.01，让微交易成为可能',
    developerFriendly: '开发者友好',
    developerFriendlyDesc: '丰富的工具和文档，支持多种编程语言构建 dApps',
    proofOfHistory: '历史证明',
    proofOfHistoryDesc: '创新的共识机制，提供可验证的时间排序',
    ecosystem: '生态系统',
    ecosystemDesc: '蓬勃发展的 DeFi、NFT 和 Web3 应用生态系统',
    scalability: '可扩展性',
    scalabilityDesc: '无需分片即可实现高吞吐量和低延迟',

    // 按钮文本
    learnMore: '了解更多',
    getStarted: '开始使用',
    explore: '探索',
    viewDocs: '查看文档',

    // Ethereum 页面
    ethereum: 'Ethereum',
    ethereumTitle: 'Ethereum 生态系统',
    ethereumDescription: 'Ethereum 是世界领先的可编程区块链平台，为去中心化应用、智能合约和数字资产提供强大的基础设施。',
    ethereumFeatures: 'Ethereum 核心特性',

    // Ethereum 卡片
    smartContracts: '智能合约',
    smartContractsDesc: '自动执行的合约，代码即法律，无需第三方信任',
    decentralized: '去中心化',
    decentralizedDesc: '全球分布式网络，没有单点故障，真正的去中心化',
    programmable: '可编程性',
    programmableDesc: '灵活的编程环境，支持复杂的去中心化应用开发',
    security: '安全性',
    securityDesc: '经过时间验证的安全机制，保护数十亿美元的数字资产',
    community: '社区驱动',
    communityDesc: '全球最大的区块链开发者社区，持续创新和改进',
    interoperability: '互操作性',
    interoperabilityDesc: '与其他区块链和传统系统的无缝集成能力',

    // 按钮文本
    discover: '发现',
    buildNow: '立即构建',
    joinCommunity: '加入社区',
    
    // Polygon 页面
    polygon: 'Polygon',
    polygonTitle: 'Polygon 生态系统',
    polygonDescription: 'Polygon 是以太坊的扩容解决方案，提供更快的交易速度和更低的费用，同时保持与以太坊的完全兼容性。',
    polygonFeatures: '探索 Polygon 特性',
    
    // Polygon 卡片
    layerTwo: '二层扩容',
    layerTwoDesc: '基于以太坊的二层解决方案，提供闪电般的交易速度',
    lowCost: '超低费用',
    lowCostDesc: '交易费用低至几分钱，让 DeFi 和 NFT 更加普及',
    ethCompatible: '以太坊兼容',
    ethCompatibleDesc: '完全兼容以太坊虚拟机，无缝迁移现有应用',
    carbonNeutral: '碳中和',
    carbonNeutralDesc: '环保的权益证明机制，致力于可持续发展',
    multichain: '多链架构',
    multichainDesc: '支持多种区块链解决方案，满足不同需求',
    developer: '开发者友好',
    developerDesc: '丰富的工具和资源，助力开发者快速构建应用',
    
    // 按钮文本
    tryNow: '立即体验',
    startBuilding: '开始构建',
    
    // Cardano 页面
    cardano: 'Cardano',
    cardanoTitle: 'Cardano 生态系统',
    cardanoDescription: 'Cardano 是第三代区块链平台，基于同行评议的研究和循证方法构建，致力于创建更加可持续和包容的全球经济系统。',
    cardanoJourney: 'Cardano 发展历程',
    
    // Cardano 特性
    research: '学术研究',
    researchDesc: '基于同行评议的学术研究，确保每个功能都经过严格验证',
    sustainability: '可持续发展',
    sustainabilityDesc: '环保的权益证明共识机制，能耗比比特币低99.95%',
    governance: '去中心化治理',
    governanceDesc: '社区驱动的治理系统，让每个持币者都能参与决策',
    smartContract: '智能合约',
    smartContractDesc: '基于 Plutus 平台的功能性智能合约，更安全可靠',
    interop: '互操作性',
    interopDesc: '跨链桥接技术，实现与其他区块链的无缝连接',
    scalable: '可扩展性',
    scalableDesc: 'Hydra 协议提供理论上无限的扩展能力',
    
    // 导航菜单
    blockchains: '区块链',
    
    // Avalanche 页面
    avalanche: 'Avalanche',
    avalancheTitle: 'Avalanche 生态系统',
    avalancheDescription: 'Avalanche 是一个开放、可编程的智能合约平台，为去中心化应用提供近乎即时的交易确认和更高的吞吐量。',
    avalancheFeatures: 'Avalanche 核心优势',
    
    // Avalanche 特性
    consensus: '雪崩共识',
    consensusDesc: '革命性的雪崩共识协议，实现亚秒级交易确认和高吞吐量',
    subnets: '子网架构',
    subnetsDesc: '灵活的子网系统，允许创建定制化的区块链网络',
    compatibility: 'EVM 兼容',
    compatibilityDesc: '完全兼容以太坊虚拟机，轻松迁移现有 DApp',
    finality: '即时确认',
    finalityDesc: '交易在1-2秒内获得最终确认，用户体验极佳',
    validators: '验证者网络',
    validatorsDesc: '去中心化的验证者网络，确保网络安全和去中心化',
    crosschain: '跨链互操作',
    crosschainDesc: '原生跨链功能，实现不同区块链间的无缝资产转移',
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

    // Solana page
    solana: 'Solana',
    solanaTitle: 'Solana Ecosystem',
    solanaDescription: 'Solana is a high-performance blockchain platform designed for decentralized applications and cryptocurrencies. It\'s known for its fast transaction speeds, low fees, and robust developer ecosystem.',
    solanaFeatures: 'Solana Features',

    // Solana cards
    fastTransactions: 'Fast Transactions',
    fastTransactionsDesc: 'Process over 65,000 transactions per second, providing near-instant experience for users',
    lowFees: 'Low Fees',
    lowFeesDesc: 'Average transaction cost under $0.01, making micro-transactions possible',
    developerFriendly: 'Developer Friendly',
    developerFriendlyDesc: 'Rich tools and documentation, supporting multiple programming languages for dApp development',
    proofOfHistory: 'Proof of History',
    proofOfHistoryDesc: 'Innovative consensus mechanism providing verifiable time ordering',
    ecosystem: 'Ecosystem',
    ecosystemDesc: 'Thriving ecosystem of DeFi, NFT, and Web3 applications',
    scalability: 'Scalability',
    scalabilityDesc: 'High throughput and low latency without sharding',

    // Button text
    learnMore: 'Learn More',
    getStarted: 'Get Started',
    explore: 'Explore',
    viewDocs: 'View Docs',

    // Ethereum page
    ethereum: 'Ethereum',
    ethereumTitle: 'Ethereum Ecosystem',
    ethereumDescription: 'Ethereum is the world\'s leading programmable blockchain platform, providing powerful infrastructure for decentralized applications, smart contracts, and digital assets.',
    ethereumFeatures: 'Ethereum Core Features',

    // Ethereum cards
    smartContracts: 'Smart Contracts',
    smartContractsDesc: 'Self-executing contracts where code is law, no third-party trust required',
    decentralized: 'Decentralized',
    decentralizedDesc: 'Global distributed network with no single point of failure, truly decentralized',
    programmable: 'Programmable',
    programmableDesc: 'Flexible programming environment supporting complex decentralized application development',
    security: 'Security',
    securityDesc: 'Time-tested security mechanisms protecting billions of dollars in digital assets',
    community: 'Community Driven',
    communityDesc: 'World\'s largest blockchain developer community, continuously innovating and improving',
    interoperability: 'Interoperability',
    interoperabilityDesc: 'Seamless integration capabilities with other blockchains and traditional systems',

    // Button text
    discover: 'Discover',
    buildNow: 'Build Now',
    joinCommunity: 'Join Community',
    
    // Polygon page
    polygon: 'Polygon',
    polygonTitle: 'Polygon Ecosystem',
    polygonDescription: 'Polygon is Ethereum\'s scaling solution, providing faster transaction speeds and lower fees while maintaining full compatibility with Ethereum.',
    polygonFeatures: 'Explore Polygon Features',
    
    // Polygon cards
    layerTwo: 'Layer 2 Scaling',
    layerTwoDesc: 'Ethereum Layer 2 solution providing lightning-fast transaction speeds',
    lowCost: 'Ultra Low Fees',
    lowCostDesc: 'Transaction fees as low as a few cents, making DeFi and NFTs more accessible',
    ethCompatible: 'Ethereum Compatible',
    ethCompatibleDesc: 'Fully compatible with Ethereum Virtual Machine, seamless migration of existing apps',
    carbonNeutral: 'Carbon Neutral',
    carbonNeutralDesc: 'Eco-friendly Proof of Stake mechanism, committed to sustainable development',
    multichain: 'Multi-chain Architecture',
    multichainDesc: 'Supports multiple blockchain solutions to meet different needs',
    developer: 'Developer Friendly',
    developerDesc: 'Rich tools and resources to help developers build applications quickly',
    
    // Button text
    tryNow: 'Try Now',
    startBuilding: 'Start Building',
    
    // Cardano page
    cardano: 'Cardano',
    cardanoTitle: 'Cardano Ecosystem',
    cardanoDescription: 'Cardano is a third-generation blockchain platform built on peer-reviewed research and evidence-based methods, committed to creating a more sustainable and inclusive global economic system.',
    cardanoJourney: 'Cardano Journey',
    
    // Cardano features
    research: 'Academic Research',
    researchDesc: 'Based on peer-reviewed academic research, ensuring every feature is rigorously validated',
    sustainability: 'Sustainability',
    sustainabilityDesc: 'Eco-friendly Proof of Stake consensus mechanism, 99.95% less energy than Bitcoin',
    governance: 'Decentralized Governance',
    governanceDesc: 'Community-driven governance system allowing every token holder to participate in decisions',
    smartContract: 'Smart Contracts',
    smartContractDesc: 'Functional smart contracts based on Plutus platform, more secure and reliable',
    interop: 'Interoperability',
    interopDesc: 'Cross-chain bridging technology for seamless connection with other blockchains',
    scalable: 'Scalability',
    scalableDesc: 'Hydra protocol provides theoretically unlimited scaling capabilities',
    
    // Navigation menu
    blockchains: 'Blockchains',
    
    // Avalanche page
    avalanche: 'Avalanche',
    avalancheTitle: 'Avalanche Ecosystem',
    avalancheDescription: 'Avalanche is an open, programmable smart contracts platform providing near-instant transaction finality and higher throughput for decentralized applications.',
    avalancheFeatures: 'Avalanche Core Advantages',
    
    // Avalanche features
    consensus: 'Avalanche Consensus',
    consensusDesc: 'Revolutionary Avalanche consensus protocol achieving sub-second transaction finality and high throughput',
    subnets: 'Subnet Architecture',
    subnetsDesc: 'Flexible subnet system allowing creation of customized blockchain networks',
    compatibility: 'EVM Compatible',
    compatibilityDesc: 'Fully compatible with Ethereum Virtual Machine, easy migration of existing DApps',
    finality: 'Instant Finality',
    finalityDesc: 'Transactions receive final confirmation in 1-2 seconds, excellent user experience',
    validators: 'Validator Network',
    validatorsDesc: 'Decentralized validator network ensuring network security and decentralization',
    crosschain: 'Cross-chain Interoperability',
    crosschainDesc: 'Native cross-chain functionality enabling seamless asset transfer between different blockchains',
  }
};

export const useI18n = (language: Language) => {
  const t = (key: keyof typeof translations.zh): string => {
    return translations[language][key] || key;
  };

  return { t };
};