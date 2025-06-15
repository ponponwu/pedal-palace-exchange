
import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

interface CheckoutConfirmationProps {
  bicycle: any;
  shippingInfo: any;
  paymentInfo: any;
  onBack: () => void;
  onPlaceOrder: () => void;
  isSubmitting: boolean;
}

const CheckoutConfirmation = ({
  bicycle,
  shippingInfo,
  paymentInfo,
  onBack,
  onPlaceOrder,
  isSubmitting
}: CheckoutConfirmationProps) => {
  // Format card number to only show last 4 digits
  const maskedCardNumber = paymentInfo.cardNumber 
    ? `•••• •••• •••• ${paymentInfo.cardNumber.slice(-4)}` 
    : '';
    
  return (
    <div>
      <h2 className="mb-6 text-xl font-semibold">訂單確認</h2>
      
      <div className="space-y-6">
        {/* Bicycle Item */}
        <div>
          <h3 className="mb-3 text-lg font-medium">商品詳情</h3>
          <div className="p-4 border rounded-md bg-gray-50">
            <div className="flex items-center space-x-4">
              {bicycle.images && bicycle.images[0] && (
                <img 
                  src={bicycle.images[0]} 
                  alt={bicycle.title} 
                  className="w-20 h-20 object-cover rounded-md"
                />
              )}
              <div className="flex-1">
                <h4 className="font-semibold">{bicycle.title}</h4>
                <p className="text-sm text-gray-600">{bicycle.brand} {bicycle.model}</p>
                <p className="text-sm text-gray-600">狀況: {bicycle.condition}</p>
                <p className="text-lg font-bold text-blue-600">${bicycle.price.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-lg font-medium">配送地址</h3>
          <div className="p-4 border rounded-md bg-gray-50">
            <p className="font-medium">{shippingInfo.fullName}</p>
            <p>{shippingInfo.addressLine1}</p>
            {shippingInfo.addressLine2 && <p>{shippingInfo.addressLine2}</p>}
            <p>{`${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.postalCode}`}</p>
            <p>{shippingInfo.country}</p>
            <p className="mt-1">電話: {shippingInfo.phoneNumber}</p>
          </div>
        </div>
        
        <div>
          <h3 className="mb-2 text-lg font-medium">付款方式</h3>
          <div className="p-4 border rounded-md bg-gray-50">
            <p className="font-medium">{paymentInfo.cardName}</p>
            <p>信用卡號碼: {maskedCardNumber}</p>
            <p>有效期限: {paymentInfo.expiryMonth}/{paymentInfo.expiryYear}</p>
          </div>
        </div>
        
        <div>
          <h3 className="mb-2 text-lg font-medium">訂單摘要</h3>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">商品價格</TableCell>
                <TableCell>${bicycle.price.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">運費</TableCell>
                <TableCell>$25.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">稅金</TableCell>
                <TableCell>${(bicycle.price * 0.08).toFixed(2)}</TableCell>
              </TableRow>
              <TableRow className="border-t-2">
                <TableCell className="font-bold text-lg">總計</TableCell>
                <TableCell className="font-bold text-lg text-blue-600">${(bicycle.price + 25 + bicycle.price * 0.08).toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        
        <div className="flex justify-between mt-8">
          <Button type="button" variant="outline" onClick={onBack} disabled={isSubmitting}>
            返回
          </Button>
          <Button 
            onClick={onPlaceOrder} 
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? "處理中..." : "確認下單"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutConfirmation;
