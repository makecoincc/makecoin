'use client'
import { Button, Card, CardBody, CardHeader } from '@heroui/react';
import Link from 'next/link';
import AppNavbar from '@/components/Navbar';

export default function DashboardPage() {
  const handleLogout = () => {
    // 这里可以添加登出逻辑
    console.log('用户登出');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* 导航栏 */}
      <AppNavbar />

      {/* 主要内容 */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* 用户信息栏 */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 rounded-lg mb-6 p-4 transition-colors duration-300">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white">仪表板</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-600 dark:text-gray-300">欢迎，用户</span>
              <Button
                color="danger"
                variant="light"
                size="sm"
                onClick={handleLogout}
              >
                登出
              </Button>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">欢迎来到您的仪表板</h2>
          <p className="text-gray-600">这里是您的个人工作空间</p>
        </div>

        {/* 卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">个人资料</h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 mb-4">管理您的个人信息和设置</p>
              <Button color="primary" variant="flat" size="sm">
                查看详情
              </Button>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">项目管理</h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 mb-4">创建和管理您的项目</p>
              <Button color="secondary" variant="flat" size="sm">
                查看项目
              </Button>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">数据分析</h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 mb-4">查看您的数据统计和分析</p>
              <Button color="success" variant="flat" size="sm">
                查看报告
              </Button>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">消息中心</h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 mb-4">查看最新的通知和消息</p>
              <Button color="warning" variant="flat" size="sm">
                查看消息
              </Button>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">设置</h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 mb-4">配置应用程序设置</p>
              <Button color="default" variant="flat" size="sm">
                打开设置
              </Button>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">帮助支持</h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 mb-4">获取帮助和技术支持</p>
              <Button color="primary" variant="flat" size="sm">
                联系支持
              </Button>
            </CardBody>
          </Card>
        </div>

        {/* 返回首页链接 */}
        <div className="mt-8 text-center">
          <Link href="/">
            <Button variant="light">
              返回首页
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}