'use client'
import { Button } from '@heroui/react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">欢迎来到我的应用</h1>
        <p className="text-gray-600 text-lg">一个现代化的 Web 应用程序</p>
        
        <div className="flex gap-4 justify-center">
          <Link href="/login">
            <Button color="primary" size="lg">
              登录
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="bordered" size="lg">
              注册
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
