
import React from 'react';

interface OrderSummaryProps {
  bicycle: any;
}

const OrderSummary = ({ bicycle }: OrderSummaryProps) => {
  const shipping = 25; // Example shipping cost
  const tax = bicycle.price * 0.08; // Example tax calculation (8%)
  const total = bicycle.price + shipping + tax;

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
      
      <div className="flex items-center mb-4 space-x-4">
        <img 
          src={bicycle.images?.[0]} 
          alt={bicycle.title} 
          className="object-cover w-20 h-20 rounded-md"
        />
        <div>
          <h3 className="font-medium">{bicycle.title}</h3>
          <p className="text-sm text-gray-600">{bicycle.condition}</p>
        </div>
      </div>
      
      <div className="py-4 border-t border-gray-200">
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>${bicycle.price.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between pt-2 mt-2 font-semibold border-t border-gray-200">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
