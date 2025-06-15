import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { ArrowLeft, Package, MapPin, CreditCard, Truck, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Mock order data - in a real app, this would be fetched based on the order ID
const mockOrderData = {
  'ORD-12345678': {
    id: 'ORD-12345678',
    date: '2025-06-10',
    status: 'processing',
    total: 1299.99,
    subtotal: 1199.99,
    shipping: 25.00,
    tax: 75.00,
    items: [
      { 
        title: 'Giant TCR Advanced Pro 2', 
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400',
        brand: 'Giant',
        model: 'TCR Advanced Pro 2',
        condition: 'Like New',
        price: 1199.99
      }
    ],
    buyer: { name: '張三', email: 'chang@example.com' },
    shippingAddress: {
      fullName: '張三',
      addressLine1: '台北市信義區信義路五段7號',
      city: '台北市',
      state: '台灣',
      postalCode: '110',
      country: '台灣',
      phoneNumber: '+886-912-345-678'
    },
    paymentMethod: {
      cardName: '張三',
      cardNumber: '**** **** **** 1234',
      expiryMonth: '12',
      expiryYear: '2025'
    },
    trackingNumber: 'TW1234567890',
    estimatedDelivery: '2025-06-15'
  },
  'ORD-87654321': {
    id: 'ORD-87654321',
    date: '2025-05-15',
    status: 'delivered',
    total: 899.50,
    subtotal: 799.50,
    shipping: 25.00,
    tax: 75.00,
    items: [
      { 
        title: 'Trek Mountain Bike X-Caliber 8', 
        image: 'https://images.unsplash.com/photo-1544191696-15693072f80a?w=400',
        brand: 'Trek',
        model: 'X-Caliber 8',
        condition: 'Good',
        price: 799.50
      }
    ],
    buyer: { name: '李四', email: 'li@example.com' },
    shippingAddress: {
      fullName: '李四',
      addressLine1: '高雄市前金區中正四路211號',
      city: '高雄市',
      state: '台灣',
      postalCode: '801',
      country: '台灣',
      phoneNumber: '+886-987-654-321'
    },
    paymentMethod: {
      cardName: '李四',
      cardNumber: '**** **** **** 5678',
      expiryMonth: '09',
      expiryYear: '2026'
    },
    trackingNumber: 'TW0987654321',
    estimatedDelivery: 'Delivered on 2025-05-18'
  }
};

const OrderDetail = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  console.log('Order ID from URL:', orderId);
  console.log('Available order keys:', Object.keys(mockOrderData));
  
  const order = orderId ? mockOrderData[orderId as keyof typeof mockOrderData] : null;

  console.log('Found order:', order);

  if (!order) {
    return (
      <MainLayout>
        <div className="container max-w-4xl px-4 py-16 mx-auto text-center">
          <h1 className="mb-4 text-2xl font-bold">找不到訂單</h1>
          <p className="mb-4 text-gray-600">訂單編號: {orderId}</p>
          <p className="mb-8 text-gray-600">我們無法找到您要查看的訂單資訊。</p>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">可用的訂單:</p>
            <div className="space-y-2">
              {Object.keys(mockOrderData).map(id => (
                <Link key={id} to={`/order/${id}`}>
                  <Button variant="outline" size="sm">
                    查看訂單 {id}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
          <Button className="mt-8" onClick={() => navigate('/profile')}>
            返回個人資料
          </Button>
        </div>
      </MainLayout>
    );
  }

  const renderStatusBadge = (status: string) => {
    let color = '';
    let label = '';
    
    switch(status) {
      case 'processing':
        color = 'bg-blue-100 text-blue-800';
        label = t('orderProcessing');
        break;
      case 'shipped':
        color = 'bg-amber-100 text-amber-800';
        label = t('orderShipped');
        break;
      case 'delivered':
        color = 'bg-green-100 text-green-800';
        label = t('orderDelivered');
        break;
      case 'cancelled':
        color = 'bg-red-100 text-red-800';
        label = t('orderCancelled');
        break;
      default:
        color = 'bg-gray-100 text-gray-800';
        label = status;
    }
    
    return (
      <Badge className={`${color} border-0`}>{label}</Badge>
    );
  };

  const getProgressSteps = (status: string) => {
    const steps = [
      { key: 'processing', label: '處理中', icon: Package },
      { key: 'shipped', label: '已出貨', icon: Truck },
      { key: 'delivered', label: '已送達', icon: Check }
    ];

    const statusOrder = ['processing', 'shipped', 'delivered'];
    const currentIndex = statusOrder.indexOf(status);

    return steps.map((step, index) => ({
      ...step,
      isCompleted: index <= currentIndex,
      isCurrent: index === currentIndex
    }));
  };

  const progressSteps = getProgressSteps(order.status);

  return (
    <MainLayout>
      <div className="container max-w-6xl px-4 py-8 mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => navigate('/profile')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回
            </Button>
            <div>
              <h1 className="text-2xl font-bold">訂單詳情</h1>
              <p className="text-gray-600">訂單編號: #{order.id}</p>
            </div>
          </div>
          {renderStatusBadge(order.status)}
        </div>

        {/* Order Progress */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">訂單進度</h2>
          <div className="flex items-center justify-between">
            {progressSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.key} className="flex flex-col items-center flex-1">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                    step.isCompleted 
                      ? 'bg-green-600 text-white' 
                      : step.isCurrent 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-400'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className={`mt-2 text-sm ${
                    step.isCompleted || step.isCurrent ? 'text-gray-900 font-medium' : 'text-gray-400'
                  }`}>
                    {step.label}
                  </p>
                  {index < progressSteps.length - 1 && (
                    <div className={`absolute top-6 left-1/2 w-full h-0.5 ${
                      step.isCompleted ? 'bg-green-600' : 'bg-gray-200'
                    }`} style={{ transform: 'translateX(50%)', zIndex: -1 }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Package className="w-5 h-5 mr-2 text-blue-600" />
                訂購商品
              </h2>
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 border rounded-md">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-gray-600">{item.brand} {item.model}</p>
                    <p className="text-sm text-gray-500">狀況: {item.condition}</p>
                    <p className="text-xl font-bold text-blue-600 mt-2">${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">訂單摘要</h2>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">商品價格</TableCell>
                    <TableCell className="text-right">${order.subtotal.toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">運費</TableCell>
                    <TableCell className="text-right">${order.shipping.toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">稅金</TableCell>
                    <TableCell className="text-right">${order.tax.toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow className="border-t-2">
                    <TableCell className="font-bold text-lg">總計</TableCell>
                    <TableCell className="font-bold text-lg text-blue-600 text-right">${order.total.toFixed(2)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Tracking Information */}
            {order.trackingNumber && (
              <div className="p-6 bg-white rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <Truck className="w-5 h-5 mr-2 text-green-600" />
                  物流追蹤
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">追蹤號碼:</span>
                    <span className="font-mono text-blue-600">{order.trackingNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">預計送達:</span>
                    <span>{order.estimatedDelivery}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    追蹤包裹
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Addresses & Payment */}
          <div className="space-y-6">
            {/* Order Details */}
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">訂單資訊</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">訂單日期:</span>
                  <span>{new Date(order.date).toLocaleDateString('zh-TW')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">訂單狀態:</span>
                  <span>{renderStatusBadge(order.status)}</span>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-green-600" />
                配送地址
              </h2>
              <div className="text-sm space-y-1">
                <p className="font-medium">{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.addressLine1}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
                <p>{order.shippingAddress.country}</p>
                <p className="text-gray-600 mt-2">電話: {order.shippingAddress.phoneNumber}</p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-purple-600" />
                付款方式
              </h2>
              <div className="text-sm space-y-1">
                <p className="font-medium">{order.paymentMethod.cardName}</p>
                <p>信用卡: {order.paymentMethod.cardNumber}</p>
                <p>有效期限: {order.paymentMethod.expiryMonth}/{order.paymentMethod.expiryYear}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button variant="outline" size="sm" className="w-full">
                下載收據
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                聯絡客服
              </Button>
              {order.status === 'delivered' && (
                <Button size="sm" className="w-full">
                  評價商品
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrderDetail;
