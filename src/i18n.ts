import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      "home": "Home",
      "login": "Login",
      "register": "Register",
      "logout": "Logout",
      "profile": "Profile",
      
      // Profile
      "personalCenter": "Personal Center",
      "personalInfo": "Personal Info",
      "myBicycles": "My Bicycles",
      "messages": "Messages",
      "accountSettings": "Account Settings",
      "youHaveNoMessages": "You don't have any messages",
      "messagesWillAppearHere": "New messages will appear here",
      "browseBicycles": "Browse Bicycles",
      "publishNewBike": "Publish New Bike",
      "youHaveNotPublishedAnyBikes": "You haven't published any bicycles",
      "startPublishingYourFirstBike": "Start publishing your first bicycle",
      "publishNow": "Publish Now",
      
      // Order related
      "orderHistory": "Order History",
      "myOrders": "My Orders",
      "mySales": "My Sales",
      "orderDetails": "Order Details",
      "orderDate": "Order Date",
      "orderStatus": "Order Status",
      "orderTotal": "Order Total",
      "orderNumber": "Order Number",
      "viewDetails": "View Details",
      "youHaveNoOrders": "You don't have any orders",
      "youHaveNoSales": "You don't have any sales",
      "orderProcessing": "Processing",
      "orderShipped": "Shipped",
      "orderDelivered": "Delivered",
      "orderCancelled": "Cancelled",
      "trackOrder": "Track Order",
      "buyerInformation": "Buyer Information",
      "sellerInformation": "Seller Information",
      "paymentMethod": "Payment Method",
      "shippingAddress": "Shipping Address",

      // Bicycle Details
      "location": "Location",
      "condition": "Condition",
      "brand": "Brand",
      "model": "Model",
      "year": "Year",
      "frameSize": "Frame Size",
      "wheelSize": "Wheel Size",
      "yearsOfUse": "Years of Use",
      "sellerInformation": "Seller Information",
      "contactSeller": "Contact Seller",
      "askQuestion": "Ask a question about this bicycle...",
      "sendMessage": "Send Message",
      "description": "Description",
      "makeOffer": "Make Offer",
      "yourOffer": "Your Offer",
      "submit": "Submit",
      
      // Checkout
      "buyNow": "Buy Now",
      "checkoutProcess": "Checkout Process",
      "shipping": "Shipping",
      "payment": "Payment",
      "confirmation": "Confirmation",
      "shippingInformation": "Shipping Information",
      "paymentInformation": "Payment Information",
      "confirmOrder": "Confirm Order",
      "placeOrder": "Place Order",
      "returnToShopping": "Return to Shopping",
      "continueToPayment": "Continue to Payment",
      "backToShipping": "Back to Shipping",
      "reviewYourOrder": "Review Your Order",
      "orderSummary": "Order Summary",
      "subtotal": "Subtotal",
      "tax": "Tax",
      "total": "Total",
      
      // Search
      "findPerfectBike": "Find the perfect bike for your needs",
      "searchPlaceholder": "Search for brands, models, or keywords...",
      "search": "Search",
      "priceRange": "Price Range",
      "anyPrice": "Any Price",
      "bikeType": "Bike Type",
      "allTypes": "All Types",
      "allBrands": "All Brands",
      "allLocations": "All Locations",
      "advancedSearchOptions": "Advanced Search Options"
    }
  },
  zh: {
    translation: {
      // 導航
      "home": "首頁",
      "login": "登入",
      "register": "註冊",
      "logout": "登出",
      "profile": "個人資料",
      
      // 個人資料
      "personalCenter": "個人中心",
      "personalInfo": "個人資訊",
      "myBicycles": "我的自行車",
      "messages": "消息中心",
      "accountSettings": "帳戶設置",
      "youHaveNoMessages": "您沒有任何消息",
      "messagesWillAppearHere": "當您有新的消息時會顯示在這裡",
      "browseBicycles": "瀏覽自行車",
      "publishNewBike": "發佈新車",
      "youHaveNotPublishedAnyBikes": "您還沒有發佈任何自行車",
      "startPublishingYourFirstBike": "開始發佈您的第一輛自行車吧",
      "publishNow": "立即發佈",
      
      // 訂單相關
      "orderHistory": "訂單記錄",
      "myOrders": "我的訂單",
      "mySales": "我的銷售",
      "orderDetails": "訂單詳情",
      "orderDate": "訂單日期",
      "orderStatus": "訂單狀態",
      "orderTotal": "訂單總額",
      "orderNumber": "訂單編號",
      "viewDetails": "查看詳情",
      "youHaveNoOrders": "您沒有任何訂單",
      "youHaveNoSales": "您沒有任何銷售記錄",
      "orderProcessing": "處理中",
      "orderShipped": "已出貨",
      "orderDelivered": "已送達",
      "orderCancelled": "已取消",
      "trackOrder": "追蹤訂單",
      "buyerInformation": "買家資訊",
      "sellerInformation": "賣家資訊",
      "paymentMethod": "付款方式",
      "shippingAddress": "配送地址",
      
      // 自行車詳情
      "location": "地點",
      "condition": "狀況",
      "brand": "品牌",
      "model": "型號",
      "year": "年份",
      "frameSize": "車架尺寸",
      "wheelSize": "輪胎尺寸",
      "yearsOfUse": "使用年限",
      "sellerInformation": "賣家資訊",
      "contactSeller": "聯絡賣家",
      "askQuestion": "詢問關於這輛自行車的問題...",
      "sendMessage": "發送訊息",
      "description": "描述",
      "makeOffer": "出價",
      "yourOffer": "您的出價",
      "submit": "提交",
      
      // 結帳
      "buyNow": "立即購買",
      "checkoutProcess": "結帳流程",
      "shipping": "配送",
      "payment": "付款",
      "confirmation": "確認",
      "shippingInformation": "配送資訊",
      "paymentInformation": "付款資訊",
      "confirmOrder": "確認訂單",
      "placeOrder": "下單",
      "returnToShopping": "返回購物",
      "continueToPayment": "繼續到付款",
      "backToShipping": "返回配送",
      "reviewYourOrder": "檢查您的訂單",
      "orderSummary": "訂單摘要",
      "subtotal": "小計",
      "tax": "稅金",
      "total": "總計",
      
      // 搜尋
      "findPerfectBike": "找到適合您的完美自行車",
      "searchPlaceholder": "搜尋品牌、型號或關鍵字...",
      "search": "搜尋",
      "priceRange": "價格範圍",
      "anyPrice": "任何價格",
      "bikeType": "自行車類型",
      "allTypes": "所有類型",
      "allBrands": "所有品牌",
      "allLocations": "所有地點",
      "advancedSearchOptions": "進階搜尋選項"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'zh',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
