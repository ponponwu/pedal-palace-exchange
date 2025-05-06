
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  User,
  Bike,
  MessageCircle,
  Settings,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("personal-info");

  // 如果用戶未登錄，重定向到登錄頁面
  if (!user) {
    navigate('/login');
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // 用戶信息展示組件
  const PersonalInfo = () => (
    <div className="space-y-6">
      <div className="flex flex-col items-center sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 pb-6 border-b">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user.user_metadata?.avatar_url || ""} alt={user.user_metadata?.full_name || "用戶頭像"} />
          <AvatarFallback className="text-xl">{(user.user_metadata?.full_name || user.email || "U")[0]}</AvatarFallback>
        </Avatar>
        <div className="space-y-1 text-center sm:text-left">
          <h2 className="text-2xl font-bold">{user.user_metadata?.full_name || "用戶"}</h2>
          <p className="text-gray-500">{user.email}</p>
          <p className="text-sm text-gray-500">加入時間：{new Date(user.created_at).toLocaleDateString('zh-TW')}</p>
        </div>
      </div>

      <div className="space-y-4">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-2">個人資料</h3>
            <dl className="grid gap-2 text-sm">
              <div className="grid grid-cols-3 gap-1 py-2 border-b last:border-0">
                <dt className="font-medium text-gray-500">全名</dt>
                <dd className="col-span-2">{user.user_metadata?.full_name || "未設置"}</dd>
              </div>
              <div className="grid grid-cols-3 gap-1 py-2 border-b last:border-0">
                <dt className="font-medium text-gray-500">電子郵箱</dt>
                <dd className="col-span-2">{user.email}</dd>
              </div>
              <div className="grid grid-cols-3 gap-1 py-2 border-b last:border-0">
                <dt className="font-medium text-gray-500">手機號碼</dt>
                <dd className="col-span-2">{user.phone || "未設置"}</dd>
              </div>
              <div className="grid grid-cols-3 gap-1 py-2 last:border-0">
                <dt className="font-medium text-gray-500">地址</dt>
                <dd className="col-span-2">{"未設置"}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // 我的自行車列表組件
  const MyBicycles = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">我的自行車</h3>
        <Button onClick={() => navigate('/upload')} variant="outline">發佈新車</Button>
      </div>
      <div className="text-center py-12 border rounded-lg bg-gray-50">
        <Bike className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">您還沒有發佈任何自行車</h3>
        <p className="mt-2 text-sm text-gray-500">開始發佈您的第一輛自行車吧</p>
        <Button className="mt-4 bg-marketplace-blue hover:bg-blue-600" onClick={() => navigate('/upload')}>
          立即發佈
        </Button>
      </div>
    </div>
  );

  // 消息中心組件
  const Messages = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">消息中心</h3>
      <div className="text-center py-12 border rounded-lg bg-gray-50">
        <MessageCircle className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">您沒有任何消息</h3>
        <p className="mt-2 text-sm text-gray-500">當您有新的消息時會顯示在這裡</p>
        <Button className="mt-4" variant="outline" onClick={() => navigate('/')}>
          瀏覽自行車
        </Button>
      </div>
    </div>
  );

  // 帳號設置組件
  const AccountSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">帳號設置</h3>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="password">
          <AccordionTrigger className="py-4 hover:no-underline">
            <div className="flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              <span>更改密碼</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4 pt-1">
            <div className="space-y-4 p-2">
              <p className="text-sm text-gray-500">您可以在Supabase管理面板中更改密碼。</p>
              <Button variant="outline" size="sm">
                更改密碼
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="notifications">
          <AccordionTrigger className="py-4 hover:no-underline">
            <div className="flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              <span>通知設置</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4 pt-1">
            <div className="space-y-2 p-2">
              <p className="text-sm text-gray-500">設置您想接收的通知類型。</p>
              {/* 這裡可以添加通知設置項 */}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="account">
          <AccordionTrigger className="py-4 hover:no-underline">
            <div className="flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              <span>帳號管理</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4 pt-1">
            <div className="space-y-4 p-2">
              <div className="space-y-2">
                <p className="text-sm text-gray-500">需要更改您的帳號設置？</p>
                <Button variant="outline" size="sm">
                  編輯個人資料
                </Button>
              </div>
              
              <div className="pt-4 border-t space-y-2">
                <p className="text-sm font-medium text-red-600">危險操作區域</p>
                <p className="text-sm text-gray-500">刪除您的帳號將永久移除所有數據。</p>
                <Button variant="destructive" size="sm">
                  刪除帳號
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="pt-4 mt-6 border-t">
        <Button 
          variant="outline" 
          className="w-full sm:w-auto flex items-center justify-center text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          登出帳號
        </Button>
      </div>
    </div>
  );

  return (
    <MainLayout>
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">個人中心</h1>
            
            <Tabs 
              defaultValue={activeTab} 
              onValueChange={setActiveTab} 
              className="w-full"
            >
              <TabsList className="w-full mb-6 grid grid-cols-4">
                <TabsTrigger value="personal-info" className="flex flex-col items-center sm:flex-row sm:items-center gap-1">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline-block">個人資料</span>
                </TabsTrigger>
                <TabsTrigger value="my-bicycles" className="flex flex-col items-center sm:flex-row sm:items-center gap-1">
                  <Bike className="h-4 w-4" />
                  <span className="hidden sm:inline-block">我的自行車</span>
                </TabsTrigger>
                <TabsTrigger value="messages" className="flex flex-col items-center sm:flex-row sm:items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  <span className="hidden sm:inline-block">消息中心</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex flex-col items-center sm:flex-row sm:items-center gap-1">
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline-block">帳號設置</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal-info" className="focus-visible:outline-none focus-visible:ring-0">
                <PersonalInfo />
              </TabsContent>
              
              <TabsContent value="my-bicycles" className="focus-visible:outline-none focus-visible:ring-0">
                <MyBicycles />
              </TabsContent>
              
              <TabsContent value="messages" className="focus-visible:outline-none focus-visible:ring-0">
                <Messages />
              </TabsContent>
              
              <TabsContent value="settings" className="focus-visible:outline-none focus-visible:ring-0">
                <AccountSettings />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
