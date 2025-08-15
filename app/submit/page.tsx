'use client'
import { useState } from 'react';
import { Button, Input, Textarea, Card, CardBody, CardHeader, Switch, Select, SelectItem } from '@heroui/react';
import { CloudArrowUpIcon, LinkIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import AppNavbar from '@/components/Navbar';
import { useLanguage } from '@/contexts/LanguageContext';

interface FormData {
    title: string;
    category: string;
    author: string;
    email: string;
    website: string;
    tags: string;
    description: string;
    imageUrl: string;
    imageFile: File | null;
}

export default function SubmitPage() {
    const { t } = useLanguage();
    const [formData, setFormData] = useState<FormData>({
        title: '',
        category: '',
        author: '',
        email: '',
        website: '',
        tags: '',
        description: '',
        imageUrl: '',
        imageFile: null
    });

    const [isLoading, setIsLoading] = useState(false);
    const [useImageUpload, setUseImageUpload] = useState(true);
    const [dragActive, setDragActive] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const categories = [
        { value: 'tech', label: t('technology') },
        { value: 'design', label: t('design') },
        { value: 'business', label: t('business') },
        { value: 'education', label: t('education') },
        { value: 'entertainment', label: t('entertainment') },
        { value: 'other', label: t('other') }
    ];

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // 清除对应字段的错误信息
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleFileUpload = (file: File) => {
        if (file && file.type.startsWith('image/')) {
            setFormData(prev => ({ ...prev, imageFile: file, imageUrl: '' }));
            setErrors(prev => ({ ...prev, image: '' }));
        } else {
            setErrors(prev => ({ ...prev, image: t('invalidImageFile') }));
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileUpload(e.dataTransfer.files[0]);
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.title.trim()) {
            newErrors.title = t('titleRequired');
        }

        if (!formData.category) {
            newErrors.category = t('categoryRequired');
        }

        if (!formData.author.trim()) {
            newErrors.author = t('authorRequired');
        }

        if (!formData.email.trim()) {
            newErrors.email = t('emailRequired');
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = t('invalidEmail');
        }

        if (!formData.description.trim()) {
            newErrors.description = t('descriptionRequired');
        }

        if (useImageUpload && !formData.imageFile) {
            newErrors.image = t('imageRequired');
        } else if (!useImageUpload && !formData.imageUrl.trim()) {
            newErrors.image = t('imageUrlRequired');
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

        // 模拟提交请求
        setTimeout(() => {
            console.log('提交的数据:', formData);
            setIsLoading(false);
            // 这里可以添加成功提示或跳转
            alert(t('submitSuccess'));
        }, 2000);
    };

    const removeImage = () => {
        setFormData(prev => ({ ...prev, imageFile: null, imageUrl: '' }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <AppNavbar />

            <div className="max-w-4xl mx-auto py-6 md:py-12 px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Card className="bg-white dark:bg-gray-800 shadow-xl border-0 transition-colors duration-300">
                        <CardHeader className="pb-6 md:pb-8 pt-6 md:pt-10">
                            <div className="text-center w-full">
                                <h1
                                    className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4 cursor-pointer select-none"
                                    onDoubleClick={() => {
                                        setFormData({
                                            title: '',
                                            category: '',
                                            author: '',
                                            email: '',
                                            website: '',
                                            tags: '',
                                            description: '',
                                            imageUrl: '',
                                            imageFile: null
                                        });
                                        setUseImageUpload(true);
                                        setErrors({});
                                    }}
                                    title={t('doubleClickReset')}
                                >
                                    {t('submitInformation')}
                                </h1>
                                <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
                                    {t('fillSubmitInfo')}
                                </p>
                            </div>
                        </CardHeader>

                        <CardBody className="pt-0 px-4 md:px-10 pb-6 md:pb-10">
                            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                                {/* 标题 - 单行 */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.1 }}
                                >
                                    <Input
                                        label={t('title')}
                                        description={t('titleDescription')}
                                        placeholder={t('enterTitle')}
                                        value={formData.title}
                                        onChange={(e) => handleInputChange('title', e.target.value)}
                                        isRequired
                                        variant="bordered"
                                        labelPlacement="outside"
                                        isInvalid={!!errors.title}
                                        errorMessage={errors.title}
                                        classNames={{
                                            input: "text-gray-900 dark:text-white",
                                            inputWrapper: "border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 focus-within:!border-blue-500 dark:focus-within:!border-blue-400 data-[focus=true]:!border-blue-500 dark:data-[focus=true]:!border-blue-400 bg-white dark:bg-gray-700 transition-colors",
                                            label: "!text-gray-900 dark:!text-gray-100 font-semibold",
                                            description: "!text-gray-700 dark:!text-gray-300"
                                        }}
                                    />
                                </motion.div>

                                {/* 分类和作者 - 一行两个 */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.2 }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
                                >
                                    <Select
                                        label={t('category')}
                                        description={t('categoryDescription')}
                                        placeholder={t('selectCategory')}
                                        selectedKeys={formData.category ? [formData.category] : []}
                                        onSelectionChange={(keys) => {
                                            const selectedKey = Array.from(keys)[0] as string;
                                            handleInputChange('category', selectedKey || '');
                                        }}
                                        isRequired
                                        variant="bordered"
                                        labelPlacement="outside"
                                        isInvalid={!!errors.category}
                                        errorMessage={errors.category}
                                        classNames={{
                                            trigger: "border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 focus:border-blue-500 dark:focus:border-blue-400 data-[open=true]:border-blue-500 dark:data-[open=true]:border-blue-400 bg-white dark:bg-gray-700 transition-colors",
                                            value: "text-gray-900 dark:text-white",
                                            label: "!text-gray-900 dark:!text-gray-100 font-semibold",
                                            description: "!text-gray-700 dark:!text-gray-300",
                                            listbox: "bg-white dark:bg-gray-800",
                                            popoverContent: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg rounded-lg"
                                        }}
                                    >
                                        {categories.map((category) => (
                                            <SelectItem
                                                key={category.value}
                                                classNames={{
                                                    base: "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 data-[selected=true]:bg-blue-50 dark:data-[selected=true]:bg-blue-900/20",
                                                    title: "text-gray-900 dark:text-white"
                                                }}
                                            >
                                                {category.label}
                                            </SelectItem>
                                        ))}
                                    </Select>

                                    <Input
                                        label={t('author')}
                                        description={t('authorDescription')}
                                        placeholder={t('enterAuthor')}
                                        value={formData.author}
                                        onChange={(e) => handleInputChange('author', e.target.value)}
                                        isRequired
                                        variant="bordered"
                                        labelPlacement="outside"
                                        isInvalid={!!errors.author}
                                        errorMessage={errors.author}
                                        classNames={{
                                            input: "text-gray-900 dark:text-white",
                                            inputWrapper: "border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 focus-within:!border-blue-500 dark:focus-within:!border-blue-400 data-[focus=true]:!border-blue-500 dark:data-[focus=true]:!border-blue-400 bg-white dark:bg-gray-700 transition-colors",
                                            label: "!text-gray-900 dark:!text-gray-100 font-semibold",
                                            description: "!text-gray-700 dark:!text-gray-300"
                                        }}
                                    />
                                </motion.div>

                                {/* 邮箱和网站 - 一行两个 */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.3 }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
                                >
                                    <Input
                                        type="email"
                                        label={t('email')}
                                        description={t('emailDescription')}
                                        placeholder={t('enterEmailAddress')}
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        isRequired
                                        variant="bordered"
                                        labelPlacement="outside"
                                        isInvalid={!!errors.email}
                                        errorMessage={errors.email}
                                        classNames={{
                                            input: "text-gray-900 dark:text-white",
                                            inputWrapper: "border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 focus-within:!border-blue-500 dark:focus-within:!border-blue-400 data-[focus=true]:!border-blue-500 dark:data-[focus=true]:!border-blue-400 bg-white dark:bg-gray-700 transition-colors",
                                            label: "!text-gray-900 dark:!text-gray-100 font-semibold",
                                            description: "!text-gray-700 dark:!text-gray-300"
                                        }}
                                    />

                                    <Input
                                        type="url"
                                        label={t('website')}
                                        description={t('websiteDescription')}
                                        placeholder={t('enterWebsite')}
                                        value={formData.website}
                                        onChange={(e) => handleInputChange('website', e.target.value)}
                                        variant="bordered"
                                        labelPlacement="outside"
                                        classNames={{
                                            input: "text-gray-900 dark:text-white",
                                            inputWrapper: "border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 focus-within:!border-blue-500 dark:focus-within:!border-blue-400 data-[focus=true]:!border-blue-500 dark:data-[focus=true]:!border-blue-400 bg-white dark:bg-gray-700 transition-colors",
                                            label: "!text-gray-900 dark:!text-gray-100 font-semibold",
                                            description: "!text-gray-700 dark:!text-gray-300"
                                        }}
                                    />
                                </motion.div>

                                {/* 标签 - 单行 */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.4 }}
                                >
                                    <Input
                                        label={t('tags')}
                                        description={t('tagsDescription')}
                                        placeholder={t('enterTags')}
                                        value={formData.tags}
                                        onChange={(e) => handleInputChange('tags', e.target.value)}
                                        variant="bordered"
                                        labelPlacement="outside"
                                        classNames={{
                                            input: "text-gray-900 dark:text-white",
                                            inputWrapper: "border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 focus-within:!border-blue-500 dark:focus-within:!border-blue-400 data-[focus=true]:!border-blue-500 dark:data-[focus=true]:!border-blue-400 bg-white dark:bg-gray-700 transition-colors",
                                            label: "!text-gray-900 dark:!text-gray-100 font-semibold",
                                            description: "!text-gray-700 dark:!text-gray-300"
                                        }}
                                    />
                                </motion.div>

                                {/* 描述 - 长文本 */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.5 }}
                                >
                                    <Textarea
                                        label={t('description')}
                                        description={t('descriptionDescription')}
                                        placeholder={t('enterDescription')}
                                        value={formData.description}
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                        isRequired
                                        variant="bordered"
                                        labelPlacement="outside"
                                        minRows={4}
                                        maxRows={8}
                                        isInvalid={!!errors.description}
                                        errorMessage={errors.description}
                                        classNames={{
                                            input: "text-gray-900 dark:text-white",
                                            inputWrapper: "border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 focus-within:!border-blue-500 dark:focus-within:!border-blue-400 data-[focus=true]:!border-blue-500 dark:data-[focus=true]:!border-blue-400 bg-white dark:bg-gray-700 transition-colors",
                                            label: "!text-gray-900 dark:!text-gray-100 font-semibold",
                                            description: "!text-gray-700 dark:!text-gray-300"
                                        }}
                                    />
                                </motion.div>

                                {/* 图片上传/URL切换 */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.6 }}
                                    className="space-y-4"
                                >
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <label className="text-sm font-semibold !text-gray-900 dark:!text-gray-100">
                                                {t('image')} <span className="text-red-500">*</span>
                                            </label>
                                            <div className="flex items-center gap-3">
                                                <span className={`text-sm ${!useImageUpload ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
                                                    URL
                                                </span>
                                                <Switch
                                                    isSelected={useImageUpload}
                                                    onValueChange={setUseImageUpload}
                                                    size="sm"
                                                    color="primary"
                                                />
                                                <span className={`text-sm ${useImageUpload ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
                                                    {t('uploadImage')}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {t('imageDescription')}
                                        </p>
                                    </div>

                                    {useImageUpload ? (
                                        // 文件上传区域 - 小正方形设计
                                        <div className="space-y-3">
                                            <div className="flex items-start gap-3 md:gap-4">
                                                <div
                                                    className={`relative w-16 h-16 border-2 border-dashed rounded-lg flex items-center justify-center transition-all duration-200 ${dragActive
                                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                                        : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                                                        } ${errors.image ? 'border-red-500' : ''}`}
                                                    onDragEnter={handleDrag}
                                                    onDragLeave={handleDrag}
                                                    onDragOver={handleDrag}
                                                    onDrop={handleDrop}
                                                >
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                    />

                                                    {formData.imageFile ? (
                                                        <div className="relative">
                                                            <PhotoIcon className="w-8 h-8 text-green-500" />
                                                            <button
                                                                type="button"
                                                                onClick={removeImage}
                                                                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                                                            >
                                                                <XMarkIcon className="w-3 h-3" />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <CloudArrowUpIcon className="w-8 h-8 text-gray-400" />
                                                    )}
                                                </div>

                                                <div className="flex-1">
                                                    {formData.imageFile ? (
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                                {formData.imageFile.name}
                                                            </p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                {(formData.imageFile.size / 1024 / 1024).toFixed(2)} MB
                                                            </p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                                {t('clickToReplace')}
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                                {t('uploadImage')}
                                                            </p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                {t('clickOrDrag')}
                                                            </p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                {t('recommendedFormat')}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            {errors.image && (
                                                <p className="text-sm text-red-500">{errors.image}</p>
                                            )}
                                        </div>
                                    ) : (
                                        // URL 输入
                                        <Input
                                            type="url"
                                            label={t('imageUrl')}
                                            description={t('imageUrlDescription')}
                                            placeholder={t('enterImageUrl')}
                                            value={formData.imageUrl}
                                            onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                                            isRequired
                                            variant="bordered"
                                            labelPlacement="outside"
                                            startContent={<LinkIcon className="w-4 h-4 text-gray-500" />}
                                            isInvalid={!!errors.image}
                                            errorMessage={errors.image}
                                            classNames={{
                                                input: "text-gray-900 dark:text-white",
                                                inputWrapper: "border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 focus-within:!border-blue-500 dark:focus-within:!border-blue-400 data-[focus=true]:!border-blue-500 dark:data-[focus=true]:!border-blue-400 bg-white dark:bg-gray-700 transition-colors",
                                                label: "!text-gray-900 dark:!text-gray-100 font-semibold",
                                                description: "!text-gray-700 dark:!text-gray-300"
                                            }}
                                        />
                                    )}
                                </motion.div>

                                {/* 提交按钮 */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.7 }}
                                    className="pt-6 md:pt-8"
                                >
                                    <Button
                                        type="submit"
                                        size="lg"
                                        isLoading={isLoading}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                                    >
                                        {isLoading
                                            ? t('submitting')
                                            : t('submitInfo')
                                        }
                                    </Button>
                                </motion.div>
                            </form>
                        </CardBody>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}