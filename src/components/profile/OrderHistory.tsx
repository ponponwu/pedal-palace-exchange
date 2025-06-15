
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, Bike, Eye } from 'lucide-react';

// Mock order data with more comprehensive information
const mockOrders = [
  {
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
    }
  },
  {
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
    }
  },
  {
    id: 'ORD-11223344',
    date: '2025-04-20',
    status: 'shipped',
    total: 1599.99,
    subtotal: 1499.99,
    shipping: 25.00,
    tax: 75.00,
    items: [
      { 
        title: 'Specialized Allez Elite', 
        image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400',
        brand: 'Specialized',
        model: 'Allez Elite',
        condition: 'Excellent',
        price: 1499.99
      }
    ],
    buyer: { name: '王五', email: 'wang@example.com' },
    shippingAddress: {
      fullName: '王五',
      addressLine1: '台中市西屯區台灣大道三段99號',
      city: '台中市',
      state: '台灣',
      postalCode: '407',
      country: '台灣',
      phoneNumber: '+886-955-123-456'
    },
    paymentMethod: {
      cardName: '王五',
      cardNumber: '**** **** **** 9012',
      expiryMonth: '03',
      expiryYear: '2027'
    }
  }
];

const mockSales = [
  {
    id: 'ORD-55667788',
    date: '2025-06-05',
    status: 'shipped',
    total: 2199.99,
    subtotal: 2099.99,
    shipping: 25.00,
    tax: 75.00,
    items: [
      { 
        title: 'Cannondale SuperSix EVO', 
        image: 'https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=400',
        brand: 'Cannondale',
        model: 'SuperSix EVO',
        condition: 'Like New',
        price: 2099.99
      }
    ],
    buyer: { name: '陳六', email: 'chen@example.com', phone: '+886-911-222-333' },
    shippingAddress: {
      fullName: '陳六',
      addressLine1: '新北市板橋區文化路一段188號',
      city: '新北市',
      state: '台灣',
      postalCode: '220',
      country: '台灣',
      phoneNumber: '+886-911-222-333'
    }
  }
];

const OrderHistory = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('orders');
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  // Function to render the status badge with appropriate color
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

  // Order details modal/view
  const OrderDetailsView = ({ order, onClose }: { order: any, onClose: () => void }) => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">訂單詳情 #{order.id}</h2>
          <Button variant="outline" onClick={onClose}>返回</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Order Info */}
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-3">訂單資訊</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">訂單編號:</span>
                  <span className="font-medium">{order.id}</span>
                </div>
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
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-3">配送地址</h3>
              <div className="text-sm space-y-1">
                <p className="font-medium">{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.addressLine1}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
                <p>{order.shippingAddress.country}</p>
                <p className="text-gray-600">電話: {order.shippingAddress.phoneNumber}</p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-3">付款方式</h3>
              <div className="text-sm space-y-1">
                <p className="font-medium">{order.paymentMethod.cardName}</p>
                <p>信用卡: {order.paymentMethod.cardNumber}</p>
                <p>有效期限: {order.paymentMethod.expiryMonth}/{order.paymentMethod.expiryYear}</p>
              </div>
            </div>
          </div>

          {/* Order Items & Summary */}
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-3">商品詳情</h3>
              {order.items.map((item: any, index: number) => (
                <div key={index} className="flex items-center space-x-4 p-3 border rounded-md">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.brand} {item.model}</p>
                    <p className="text-sm text-gray-600">狀況: {item.condition}</p>
                    <p className="font-semibold">${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-3">訂單摘要</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>小計:</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>運費:</span>
                  <span>${order.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>稅金:</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                  <span>總計:</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Orders table
  const OrdersTable = ({ orders }: { orders: any[] }) => {
    if (orders.length === 0) {
      return (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">{t('youHaveNoOrders')}</h3>
          <Button className="mt-4" variant="outline" onClick={() => window.location.href = '/'}>
            {t('browseBicycles')}
          </Button>
        </div>
      );
    }
    
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('orderNumber')}</TableHead>
              <TableHead>{t('orderDate')}</TableHead>
              <TableHead>{t('orderStatus')}</TableHead>
              <TableHead>{t('orderTotal')}</TableHead>
              <TableHead>{t('orderDetails')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">#{order.id}</TableCell>
                <TableCell>{new Date(order.date).toLocaleDateString('zh-TW')}</TableCell>
                <TableCell>{renderStatusBadge(order.status)}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    {t('viewDetails')}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };
  
  // Sales table
  const SalesTable = ({ sales }: { sales: any[] }) => {
    if (sales.length === 0) {
      return (
        <div className="text-center py-12">
          <Bike className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">{t('youHaveNoSales')}</h3>
          <Button className="mt-4" variant="outline" onClick={() => window.location.href = '/upload'}>
            {t('publishNewBike')}
          </Button>
        </div>
      );
    }
    
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('orderNumber')}</TableHead>
              <TableHead>{t('orderDate')}</TableHead>
              <TableHead>{t('orderStatus')}</TableHead>
              <TableHead>{t('buyerInformation')}</TableHead>
              <TableHead>{t('orderTotal')}</TableHead>
              <TableHead>{t('orderDetails')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell className="font-medium">#{sale.id}</TableCell>
                <TableCell>{new Date(sale.date).toLocaleDateString('zh-TW')}</TableCell>
                <TableCell>{renderStatusBadge(sale.status)}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{sale.buyer.name}</div>
                    <div className="text-sm text-gray-600">{sale.buyer.email}</div>
                  </div>
                </TableCell>
                <TableCell>${sale.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setSelectedOrder(sale)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    {t('viewDetails')}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  // If viewing order details, show that instead
  if (selectedOrder) {
    return <OrderDetailsView order={selectedOrder} onClose={() => setSelectedOrder(null)} />;
  }
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="orders">{t('myOrders')}</TabsTrigger>
          <TabsTrigger value="sales">{t('mySales')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="orders" className="mt-6">
          <OrdersTable orders={mockOrders} />
        </TabsContent>
        
        <TabsContent value="sales" className="mt-6">
          <SalesTable sales={mockSales} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrderHistory;
