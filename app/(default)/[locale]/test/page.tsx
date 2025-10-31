'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardBody, Button, Tabs, Tab } from '@heroui/react';

// 示例组件
const DashboardComponent = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="space-y-6"
  >
    <Card>
      <CardBody>
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-primary/10 p-4 rounded-lg">
            <h3 className="font-semibold text-primary">Total Users</h3>
            <p className="text-2xl font-bold">1,234</p>
          </div>
          <div className="bg-success/10 p-4 rounded-lg">
            <h3 className="font-semibold text-success">Revenue</h3>
            <p className="text-2xl font-bold">$12,345</p>
          </div>
          <div className="bg-warning/10 p-4 rounded-lg">
            <h3 className="font-semibold text-warning">Orders</h3>
            <p className="text-2xl font-bold">567</p>
          </div>
        </div>
      </CardBody>
    </Card>
  </motion.div>
);

const ProfileComponent = () => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    transition={{ duration: 0.3 }}
    className="space-y-6"
  >
    <Card>
      <CardBody>
        <h2 className="text-2xl font-bold mb-4">Profile Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">JD</span>
            </div>
            <div>
              <h3 className="font-semibold">John Doe</h3>
              <p className="text-default-500">john.doe@example.com</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">First Name</label>
              <input className="w-full p-2 border rounded-lg" defaultValue="John" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Last Name</label>
              <input className="w-full p-2 border rounded-lg" defaultValue="Doe" />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  </motion.div>
);

const SettingsComponent = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.3 }}
    className="space-y-6"
  >
    <Card>
      <CardBody>
        <h2 className="text-2xl font-bold mb-4">Settings</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Notifications</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                <span>Email notifications</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span>Push notifications</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                <span>SMS notifications</span>
              </label>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Privacy</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                <span>Make profile public</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span>Allow data collection</span>
              </label>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  </motion.div>
);

const AnalyticsComponent = () => (
  <motion.div
    initial={{ opacity: 0, rotateY: 90 }}
    animate={{ opacity: 1, rotateY: 0 }}
    exit={{ opacity: 0, rotateY: -90 }}
    transition={{ duration: 0.4 }}
    className="space-y-6"
  >
    <Card>
      <CardBody>
        <h2 className="text-2xl font-bold mb-4">Analytics</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4 rounded-lg">
              <h3 className="font-semibold">Page Views</h3>
              <p className="text-3xl font-bold">45,678</p>
              <p className="text-sm text-success">+12% from last month</p>
            </div>
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 p-4 rounded-lg">
              <h3 className="font-semibold">Unique Visitors</h3>
              <p className="text-3xl font-bold">12,345</p>
              <p className="text-sm text-success">+8% from last month</p>
            </div>
          </div>
          <div className="h-64 bg-default-100 rounded-lg flex items-center justify-center">
            <p className="text-default-500">Chart placeholder</p>
          </div>
        </div>
      </CardBody>
    </Card>
  </motion.div>
);

// 组件映射
const components = {
  dashboard: DashboardComponent,
  profile: ProfileComponent,
  settings: SettingsComponent,
  analytics: AnalyticsComponent,
} as const;

type ComponentKey = keyof typeof components;

// 主页面组件
export default function AnimatedTabsPage() {
  const [activeKey, setActiveKey] = useState<ComponentKey>('dashboard');

  const tabItems = [
    { key: 'dashboard', title: 'Dashboard', icon: '📊' },
    { key: 'profile', title: 'Profile', icon: '👤' },
    { key: 'settings', title: 'Settings', icon: '⚙️' },
    { key: 'analytics', title: 'Analytics', icon: '📈' },
  ] as const;

  const ActiveComponent = components[activeKey];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-default-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Animated Dashboard
          </h1>
          <p className="text-default-600 mt-2">
            Switch between components with smooth animations
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <Tabs
            selectedKey={activeKey}
            onSelectionChange={(key) => setActiveKey(key as ComponentKey)}
            variant="bordered"
            classNames={{
              tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
              cursor: "w-full bg-primary",
              tab: "max-w-fit px-0 h-12",
              tabContent: "group-data-[selected=true]:text-primary"
            }}
          >
            {tabItems.map((item) => (
              <Tab
                key={item.key}
                title={
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.title}</span>
                  </div>
                }
              />
            ))}
          </Tabs>
        </motion.div>

        {/* Alternative Button Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-8 justify-center"
        >
          {tabItems.map((item) => (
            <Button
              key={item.key}
              variant={activeKey === item.key ? "solid" : "bordered"}
              color={activeKey === item.key ? "primary" : "default"}
              onPress={() => setActiveKey(item.key)}
              startContent={<span>{item.icon}</span>}
              className="transition-all duration-200"
            >
              {item.title}
            </Button>
          ))}
        </motion.div>

        {/* Content Area with Animation */}
        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeKey}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ActiveComponent />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12 text-default-500"
        >
          <p>Built with Next.js, Framer Motion, and HeroUI</p>
        </motion.div>
      </div>
    </div>
  );
}