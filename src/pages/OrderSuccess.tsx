
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Check, Package, Truck, CreditCard, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OrderSuccess = () => {
  const location = useLocation();
  const { orderId, bicycle, shippingInfo, paymentInfo } = location.state || {};
  
  if (!orderId) {
    // If there's no order ID, redirect to home
    return (
      <MainLayout>
        <div className="container max-w-4xl px-4 py-16 mx-auto text-center">
          <h1 className="mb-4 text-2xl font-bold">找不到訂單資訊</h1>
          <p className="mb-8">我們無法找到您的訂單資訊。請檢查您帳戶中的訂單記錄。</p>
          <Button asChild>
            <Link to="/">返回首頁</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  const total = bicycle ? bicycle.price + 25 + (bicycle.price * 0.08) : 0;

  return (
    <MainLayout>
      <div className="container max-w-6xl px-4 py-16 mx-auto">
        <div className="p-8 bg-white rounded-lg shadow-lg">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="flex items-center justify-center w-20 h-20 text-white bg-green-600 rounded-full">
                <Check className="w-10 h-10" />
              </div>
            </div>
            
            <h1 className="mb-2 text-3xl font-bold text-green-600">訂單成功！</h1>
            <p className="mb-6 text-gray-600">感謝您的購買，您的訂單已成功提交。</p>
          </div>

          {/* Order Information Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Left Column - Order Details */}
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="p-6 border border-gray-200 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Package className="w-5 h-5 mr-2 text-blue-600" />
                  訂單詳情
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">訂單編號:</span>
                    <span className="font-semibold text-blue-600">{orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">訂單日期:</span>
                    <span>{new Date().toLocaleDateString('zh-TW')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">訂單狀態:</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      處理中
                    </span>
                  </div>
                </div>
              </div>

              {/* Bicycle Item */}
              {bicycle && (
                <div className="p-6 border border-gray-200 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">購買商品</h3>
                  <div className="flex items-center gap-4">
                    {bicycle.images && bicycle.images[0] && (
                      <img 
                        src={bicycle.images[0]} 
                        alt={bicycle.title} 
                        className="object-cover w-24 h-24 rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{bicycle.title}</h4>
                      <p className="text-gray-600">{bicycle.brand} {bicycle.model}</p>
                      <p className="text-sm text-gray-500">狀況: {bicycle.condition}</p>
                      <p className="text-xl font-bold text-blue-600 mt-2">${bicycle.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Order Summary */}
              <div className="p-6 border border-gray-200 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">費用明細</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>商品價格:</span>
                    <span>${bicycle?.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>運費:</span>
                    <span>$25.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>稅金:</span>
                    <span>${bicycle ? (bicycle.price * 0.08).toFixed(2) : '0.00'}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>總計:</span>
                      <span className="text-blue-600">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Shipping & Payment */}
            <div className="space-y-6">
              {/* Shipping Address */}
              {shippingInfo && (
                <div className="p-6 border border-gray-200 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-green-600" />
                    配送地址
                  </h3>
                  <div className="text-sm space-y-1">
                    <p className="font-medium">{shippingInfo.fullName}</p>
                    <p>{shippingInfo.addressLine1}</p>
                    {shippingInfo.addressLine2 && <p>{shippingInfo.addressLine2}</p>}
                    <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.postalCode}</p>
                    <p>{shippingInfo.country}</p>
                    <p className="text-gray-600 mt-2">電話: {shippingInfo.phoneNumber}</p>
                  </div>
                </div>
              )}

              {/* Payment Method */}
              {paymentInfo && (
                <div className="p-6 border border-gray-200 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-purple-600" />
                    付款方式
                  </h3>
                  <div className="text-sm space-y-1">
                    <p className="font-medium">{paymentInfo.cardName}</p>
                    <p>信用卡: •••• •••• •••• {paymentInfo.cardNumber?.slice(-4)}</p>
                    <p>有效期限: {paymentInfo.expiryMonth}/{paymentInfo.expiryYear}</p>
                  </div>
                </div>
              )}

              {/* Next Steps */}
              <div className="p-6 border border-gray-200 rounded-lg bg-blue-50">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Truck className="w-5 h-5 mr-2 text-blue-600" />
                  接下來的步驟
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">準備出貨</p>
                      <p className="text-gray-600">我們正在準備您的訂單，預計1-2個工作天內出貨</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">寄送追蹤資訊</p>
                      <p className="text-gray-600">出貨後將透過電子郵件發送追蹤資訊</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">預計送達</p>
                      <p className="text-gray-600">預計3-5個工作天內送達</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-center gap-4 pt-6 border-t">
            <Button asChild variant="outline" size="lg">
              <Link to="/profile">查看訂單記錄</Link>
            </Button>
            <Button asChild size="lg">
              <Link to="/">繼續購物</Link>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrderSuccess;
