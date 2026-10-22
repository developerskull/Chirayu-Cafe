// ============================================================
// CHIRAYU CAFE — MENU DATA
// Edit this file to update menu items, prices, and categories.
// Each item has: id, mr (Marathi name), en (English name), price, veg (always true here)
// ============================================================

export interface MenuItem {
  id: string;
  mr: string; // Marathi name
  en: string; // English name
  price: number; // in ₹
  veg: boolean;
  badge?: string; // optional: "Popular", "New", "Best Seller", "Chef's Special"
  badgeMr?: string; // optional Marathi badge: "लोकप्रिय", "बेस्ट सेलर", "खास"
  descEn?: string;
  descMr?: string;
  spicy?: boolean;
  isCheese?: boolean;
}

export interface ComboDeal {
  id: string;
  en: string;
  mr: string;
  descEn: string;
  descMr: string;
  originalPrice: number;
  dealPrice: number;
  badgeEn?: string;
  badgeMr?: string;
  emoji: string;
}

export interface MenuCategory {
  id: string;
  mr: string; // Marathi category name
  en: string; // English category name
  icon: string; // emoji icon
  items: MenuItem[];
}

export const menuCategories: MenuCategory[] = [
  {
    id: "tea",
    mr: "टी",
    en: "Tea",
    icon: "🍵",
    items: [
      { id: "tea-1", mr: "टी", en: "Tea", price: 15, veg: true },
      { id: "tea-2", mr: "मसाला टी", en: "Masala Tea", price: 20, veg: true, badge: "Popular" },
      { id: "tea-3", mr: "ब्लॅक टी", en: "Black Tea", price: 15, veg: true },
      { id: "tea-4", mr: "ग्रीन टी", en: "Green Tea", price: 25, veg: true },
    ],
  },
  {
    id: "coffee",
    mr: "कॉफी",
    en: "Coffee",
    icon: "☕",
    items: [
      { id: "coffee-1", mr: "हॉट कॉफी", en: "Hot Coffee", price: 25, veg: true },
      { id: "coffee-2", mr: "कोल्ड कॉफी", en: "Cold Coffee", price: 50, veg: true, badge: "Popular" },
      { id: "coffee-3", mr: "कोल्ड कॉफी आईस्क्रीम", en: "Cold Coffee Ice-cream", price: 90, veg: true },
      { id: "coffee-4", mr: "आईस कोल्ड कॉफी", en: "Iced Cold Coffee", price: 90, veg: true },
      { id: "coffee-5", mr: "क्रश कोल्ड कॉफी", en: "Crush Cold Coffee", price: 90, veg: true },
    ],
  },
  {
    id: "milkshake",
    mr: "मिल्कशेक",
    en: "Milkshake",
    icon: "🥛",
    items: [
      { id: "shake-1", mr: "ओरिओ मिल्कशेक", en: "Oreo Milkshake", price: 90, veg: true, badge: "Best Seller" },
      { id: "shake-2", mr: "कीट-कॅट मिल्कशेक", en: "Kit-Kat Milkshake", price: 90, veg: true },
      { id: "shake-3", mr: "चॉकलेट", en: "Chocolate Milkshake", price: 80, veg: true },
    ],
  },
  {
    id: "icecream",
    mr: "आईस्क्रीम",
    en: "Ice Cream",
    icon: "🍦",
    items: [
      { id: "ice-1", mr: "मँगो", en: "Mango", price: 50, veg: true },
      { id: "ice-2", mr: "कुकीज अँड क्रीम", en: "Cookies & Cream", price: 70, veg: true, badge: "Popular" },
      { id: "ice-3", mr: "पाईनॅपल", en: "Pineapple", price: 60, veg: true },
      { id: "ice-4", mr: "व्हेनीला", en: "Vanilla", price: 50, veg: true },
      { id: "ice-5", mr: "टेनडोर कोकोनट", en: "Tender Coconut", price: 80, veg: true },
      { id: "ice-6", mr: "राजभोग", en: "Rajbhog", price: 70, veg: true },
      { id: "ice-7", mr: "बटर स्कॉच", en: "Butterscotch", price: 70, veg: true },
      { id: "ice-8", mr: "अमेरिकन नटस", en: "American Nuts", price: 70, veg: true },
      { id: "ice-9", mr: "पेरू", en: "Guava", price: 50, veg: true },
      { id: "ice-10", mr: "सीताफळ", en: "Custard Apple", price: 50, veg: true },
    ],
  },
  {
    id: "mojito",
    mr: "मोजिटो",
    en: "Mojito",
    icon: "🍹",
    items: [
      { id: "moj-1", mr: "ब्लू मोजिटो", en: "Blue Mojito", price: 90, veg: true, badge: "Best Seller" },
      { id: "moj-2", mr: "मिंट मोजिटो", en: "Mint Mojito", price: 100, veg: true },
      { id: "moj-3", mr: "ब्लू-बेरी मोजिटो", en: "Blueberry Mojito", price: 100, veg: true },
    ],
  },
  {
    id: "sandwich",
    mr: "सँडविच",
    en: "Sandwich",
    icon: "🥪",
    items: [
      { id: "sand-1", mr: "नॉन-ग्रील व्हेज सँडविच", en: "Non-Grill Veg Sandwich", price: 35, veg: true },
      { id: "sand-2", mr: "ग्रील व्हेज सँडविच", en: "Grill Veg Sandwich", price: 45, veg: true },
      { id: "sand-3", mr: "टोस्ट चीज सँडविच", en: "Toast Cheese Sandwich", price: 70, veg: true },
      { id: "sand-4", mr: "मायो व्हेज सँडविच", en: "Mayo Veg Sandwich", price: 50, veg: true },
      { id: "sand-5", mr: "मायो व्हेज चीज सँडविच", en: "Mayo Veg Cheese Sandwich", price: 70, veg: true },
      { id: "sand-6", mr: "चॉकलेट सँडविच", en: "Chocolate Sandwich", price: 80, veg: true },
      { id: "sand-7", mr: "चॉकलेट चीज सँडविच", en: "Chocolate Cheese Sandwich", price: 90, veg: true },
      { id: "sand-8", mr: "तंदुरी चीज सँडविच", en: "Tandoori Cheese Sandwich", price: 70, veg: true },
      { id: "sand-9", mr: "शेझवान चीज सँडविच", en: "Schezwan Cheese Sandwich", price: 75, veg: true },
      { id: "sand-10", mr: "चिरायू स्पेशल सँडविच", en: "Chirayu Special Sandwich", price: 100, veg: true, badge: "Best Seller" },
      { id: "sand-11", mr: "पनीर ग्रील चीज सँडविच", en: "Paneer Grill Cheese Sandwich", price: 100, veg: true },
      { id: "sand-12", mr: "व्हेज डबल चीज सँडविच", en: "Veg Double Cheese Sandwich", price: 100, veg: true },
      { id: "sand-13", mr: "ब्रेड बटर सँडविच", en: "Bread Butter Sandwich", price: 30, veg: true },
      { id: "sand-14", mr: "ग्रेव्ही बटर सँडविच", en: "Gravy Butter Sandwich", price: 40, veg: true },
      { id: "sand-15", mr: "पनीर व्हेज ग्रिल सँडविच", en: "Paneer Veg Grill Sandwich", price: 80, veg: true },
      { id: "sand-16", mr: "पनीर व्हेज चीज ग्रिल सँडविच", en: "Paneer Veg Cheese Grill Sandwich", price: 100, veg: true },
      { id: "sand-17", mr: "पनीर व्हेज डबल चीज ग्रिल सँडविच", en: "Paneer Veg Double Cheese Grill Sandwich", price: 110, veg: true },
      { id: "sand-18", mr: "पनीर कॉर्न चीज ग्रिल सँडविच", en: "Paneer Corn Cheese Grill Sandwich", price: 100, veg: true },
      { id: "sand-19", mr: "पनीर कॉर्न ग्रिल सँडविच", en: "Paneer Corn Grill Sandwich", price: 80, veg: true },
      { id: "sand-20", mr: "पनीर कॉर्न डबल चीज सँडविच", en: "Paneer Corn Double Cheese Sandwich", price: 120, veg: true },
      { id: "sand-21", mr: "व्हेज जंबो डबल चीज ग्रिल सँडविच", en: "Veg Jumbo Double Cheese Grill Sandwich", price: 120, veg: true },
    ],
  },
  {
    id: "pasta",
    mr: "पास्ता",
    en: "Pasta",
    icon: "🍝",
    items: [
      { id: "pasta-1", mr: "व्हाईट सॉस पास्ता", en: "White Sauce Pasta", price: 130, veg: true },
      { id: "pasta-2", mr: "रेड सॉस पास्ता", en: "Red Sauce Pasta", price: 110, veg: true },
    ],
  },
  {
    id: "snacks",
    mr: "स्नॅक्स",
    en: "Snacks",
    icon: "🍟",
    items: [
      { id: "snack-1", mr: "वडापाव", en: "Vadapav", price: 18, veg: true, badge: "Popular" },
      { id: "snack-2", mr: "पाववडा", en: "Pavvada", price: 18, veg: true },
      { id: "snack-3", mr: "सँडविच", en: "Sandwich", price: 20, veg: true },
      { id: "snack-4", mr: "क्रिस्पी चीज वडापाव", en: "Crispy Cheese Vadapav", price: 40, veg: true },
      { id: "snack-5", mr: "बटर चीज वडापाव", en: "Butter Cheese Vadapav", price: 30, veg: true },
      { id: "snack-6", mr: "मोजो चीज वडापाव क्रिस्पी", en: "Mojo Cheese Vadapav Crispy", price: 40, veg: true },
      { id: "snack-7", mr: "तंदुरी चीज वडापाव", en: "Tandoori Cheese Vadapav", price: 40, veg: true },
      { id: "snack-8", mr: "शेझवान चीज वडापाव", en: "Schezwan Cheese Vadapav", price: 40, veg: true },
      { id: "snack-9", mr: "अल्ट्रा वडापाव", en: "Ultra Vadapav", price: 45, veg: true },
      { id: "snack-10", mr: "कांदा भजी", en: "Kanda Bhaji", price: 50, veg: true },
      { id: "snack-11", mr: "बटाटा भजी", en: "Batata Bhaji", price: 50, veg: true },
      { id: "snack-12", mr: "मिक्स भजी", en: "Mix Bhaji", price: 50, veg: true },
      { id: "snack-13", mr: "मिरची भजी", en: "Mirchi Bhaji", price: 50, veg: true },
    ],
  },
  {
    id: "juice",
    mr: "जूस",
    en: "Juice",
    icon: "🍊",
    items: [
      { id: "juice-1", mr: "ॲपल", en: "Apple", price: 50, veg: true },
      { id: "juice-2", mr: "चिक्कू", en: "Chikoo", price: 50, veg: true },
      { id: "juice-3", mr: "पाईनॅपल", en: "Pineapple", price: 30, veg: true },
      { id: "juice-4", mr: "ऑरेंज", en: "Orange", price: 50, veg: true },
      { id: "juice-5", mr: "मोसंबी", en: "Mosambi", price: 50, veg: true },
      { id: "juice-6", mr: "डाळींब", en: "Pomegranate", price: 50, veg: true },
      { id: "juice-7", mr: "टरबूज/खरबूज मिक्स", en: "Watermelon/Muskmelon Mix", price: 30, veg: true },
      { id: "juice-8", mr: "ऑरेंज/मोसंबी मिक्स", en: "Orange/Mosambi Mix", price: 50, veg: true },
      { id: "juice-9", mr: "पाईनॅपल मिल्क मिक्स", en: "Pineapple Milk Mix", price: 50, veg: true },
      { id: "juice-10", mr: "पाईनॅपल आईस्क्रीम मिक्स", en: "Pineapple Ice-cream Mix", price: 60, veg: true },
      { id: "juice-11", mr: "ॲपल/चिक्कू मिक्स", en: "Apple/Chikoo Mix", price: 50, veg: true },
      { id: "juice-12", mr: "लिंबू पाणी", en: "Lemon Water", price: 20, veg: true },
    ],
  },
  {
    id: "chaat",
    mr: "चाट पार्टी",
    en: "Chaat Party",
    icon: "🌶️",
    items: [
      { id: "chaat-1", mr: "सिंपल चाट पुरी", en: "Simple Chaat Puri", price: 25, veg: true },
      { id: "chaat-2", mr: "चीज चाट पुरी", en: "Cheese Chaat Puri", price: 50, veg: true, badge: "Best Seller" },
      { id: "chaat-3", mr: "सुकी पुरी", en: "Sukhi Puri", price: 30, veg: true },
      { id: "chaat-4", mr: "चीज सुक्या पुरी", en: "Cheese Sukhi Puri", price: 40, veg: true },
      { id: "chaat-5", mr: "मिक्स मसाला पुरी", en: "Mix Masala Puri", price: 40, veg: true },
      { id: "chaat-6", mr: "मिक्स मसाला चीज पुरी", en: "Mix Masala Cheese Puri", price: 50, veg: true },
        ],
  },
  {
    id: "fries",
    mr: "फ्राईज",
    en: "Fries",
    icon: "🍟",
    items: [
      { id: "fries-1", mr: "फ्रेंच फ्राईज", en: "French Fries", price: 80, veg: true },
      { id: "fries-2", mr: "पेरी-पेरी फ्राईज", en: "Peri-Peri Fries", price: 90, veg: true },
      { id: "fries-3", mr: "मोजो फ्राईज", en: "Mojo Fries", price: 100, veg: true },
      { id: "fries-4", mr: "चीज फ्राईज", en: "Cheese Fries", price: 110, veg: true, badge: "Best Seller" },
      { id: "fries-5", mr: "तंदुरी फ्राईज", en: "Tandoori Fries", price: 100, veg: true },
      { id: "fries-6", mr: "डबल चीज फ्राईज", en: "Double Cheese Fries", price: 110, veg: true },
      { id: "fries-7", mr: "मसाला फ्राईज", en: "Masala Fries", price: 120, veg: true },
    ],
  },
  {
    id: "maggi",
    mr: "मॅगी",
    en: "Maggi",
    icon: "🍜",
    items: [
      { id: "maggi-1", mr: "प्लेन मॅगी", en: "Plain Maggi", price: 50, veg: true },
      { id: "maggi-2", mr: "मसाला मॅगी", en: "Masala Maggi", price: 60, veg: true },
      { id: "maggi-3", mr: "चीज मॅगी", en: "Cheese Maggi", price: 70, veg: true },
      { id: "maggi-4", mr: "व्हेजिटेबल मॅगी", en: "Vegetable Maggi", price: 60, veg: true },
      { id: "maggi-5", mr: "व्हेजिटेबल चीज मॅगी", en: "Vegetable Cheese Maggi", price: 70, veg: true },
      { id: "maggi-6", mr: "शेझवान चीज मॅगी", en: "Schezwan Cheese Maggi", price: 70, veg: true },
      { id: "maggi-7", mr: "पेरी-पेरी चीज मॅगी", en: "Peri-Peri Cheese Maggi", price: 80, veg: true },
      { id: "maggi-8", mr: "बटर चीज मॅगी", en: "Butter Cheese Maggi", price: 70, veg: true },
    ],
  },
];

// Best sellers for the homepage section
export const bestSellers = [
  "snack-1",   // Vadapav
  "sand-10",   // Chirayu Special Sandwich
  "chaat-2",   // Cheese Chaat Puri
  "fries-4",   // Cheese Fries
  "shake-1",   // Oreo Milkshake
  "moj-1",     // Blue Mojito
];

// Special Chirayu Combos & Celebration Deals
export const comboDeals: ComboDeal[] = [
  {
    id: "combo-1",
    en: "Chirayu Signature Duo",
    mr: "चिरायु सिग्नेचर ड्युओ",
    descEn: "Chirayu Special Sandwich + Chilled Cold Coffee",
    descMr: "चिरायू स्पेशल सँडविच + चिल्ड कोल्ड कॉफी",
    originalPrice: 150,
    dealPrice: 120,
    badgeEn: "Save ₹30",
    badgeMr: "₹३० बचत",
    emoji: "🥪☕",
  },
  {
    id: "combo-2",
    en: "Nashik Street Feast",
    mr: "नाशिक स्ट्रीट फिस्ट",
    descEn: "2x Crispy Vadapav + 1x Hot Masala Tea",
    descMr: "२x वडापाव + १x गरमागरम मसाला टी",
    originalPrice: 51,
    dealPrice: 40,
    badgeEn: "Most Popular",
    badgeMr: "सर्वाधिक पसंती",
    emoji: "🌶️🍵",
  },
  {
    id: "combo-3",
    en: "Cheese & Chill Combo",
    mr: "चीज व चिल्ड कॉम्बो",
    descEn: "Loaded Cheese Fries + Refreshing Blue Mojito",
    descMr: "लोडेड चीज फ्राईज + फ्रेश ब्लू मोजिटो",
    originalPrice: 200,
    dealPrice: 170,
    badgeEn: "Party Special",
    badgeMr: "पार्टी स्पेशल",
    emoji: "🍟🍹",
  },
  {
    id: "combo-4",
    en: "Sweet Craving Delight",
    mr: "स्वीट क्रेव्हिंग डिलाइट",
    descEn: "Chocolate Cheese Sandwich + Thick Oreo Milkshake",
    descMr: "चॉकलेट चीज सँडविच + थिक ओरिओ मिल्कशेक",
    originalPrice: 190,
    dealPrice: 160,
    badgeEn: "Kids Favourite",
    badgeMr: "मुलांचे आवडते",
    emoji: "🍫🥤",
  },
];

