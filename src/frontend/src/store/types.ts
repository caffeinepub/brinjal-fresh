export type Product = {
  id: number;
  name: string;
  hindiName: string;
  pricePerKg: number; // in paise, 3000 = ₹30
  stockGrams: number; // 50000 = 50kg
  image: string;
};

export type OrderItem = {
  productId: number;
  productName: string;
  quantityGrams: number;
  priceAtOrder: number; // total price in paise
};

export type Order = {
  id: number;
  customerName: string;
  address: string;
  phone: string;
  items: OrderItem[];
  totalAmountPaise: number;
  timestamp: number;
  status: "pending" | "confirmed" | "delivered";
};

export type Discount = {
  id: number;
  label: string;
  description: string;
  discountPercent: number;
  active: boolean;
};

export type CartItem = {
  product: Product;
  quantityGrams: number;
};

export type DeliveryTiming = {
  message: string;
  active: boolean;
};

export const INITIAL_DELIVERY_TIMING: DeliveryTiming = {
  message: "Mon–Sat: 7am–10pm | Sun: 8am–6pm",
  active: false,
};

// Quantity options in grams
export const QUANTITY_OPTIONS = [
  { label: "250g", grams: 250 },
  { label: "500g", grams: 500 },
  { label: "750g", grams: 750 },
  { label: "1 kg", grams: 1000 },
  { label: "1.25 kg", grams: 1250 },
  { label: "1.5 kg", grams: 1500 },
  { label: "1.75 kg", grams: 1750 },
  { label: "2 kg", grams: 2000 },
  { label: "2.5 kg", grams: 2500 },
  { label: "3 kg", grams: 3000 },
  { label: "3.5 kg", grams: 3500 },
  { label: "4 kg", grams: 4000 },
  { label: "5 kg", grams: 5000 },
  { label: "6 kg", grams: 6000 },
  { label: "7 kg", grams: 7000 },
  { label: "8 kg", grams: 8000 },
  { label: "9 kg", grams: 9000 },
  { label: "10 kg", grams: 10000 },
  { label: "12 kg", grams: 12000 },
  { label: "15 kg", grams: 15000 },
  { label: "20 kg", grams: 20000 },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Fresh Onion",
    hindiName: "Kanda",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: "/assets/generated/onion.dim_600x600.jpg",
  },
  {
    id: 2,
    name: "Fresh Potato",
    hindiName: "Batate",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: "/assets/generated/potato.dim_600x600.jpg",
  },
  {
    id: 3,
    name: "Fresh Tomato",
    hindiName: "Tamatar",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: "/assets/generated/tomato.dim_600x600.jpg",
  },
  {
    id: 4,
    name: "Fresh Brinjal",
    hindiName: "Baingan",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: "/assets/generated/brinjal.dim_600x600.jpg",
  },
  {
    id: 5,
    name: "Fresh Cabbage",
    hindiName: "Patta Gobhi",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: "/assets/generated/cabbage.dim_600x600.jpg",
  },
  {
    id: 6,
    name: "Fresh Cauliflower",
    hindiName: "Phool Gobhi",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: "/assets/generated/cauliflower.dim_600x600.jpg",
  },
  {
    id: 7,
    name: "Fresh Carrot",
    hindiName: "Gajar",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: "/assets/generated/carrot.dim_600x600.jpg",
  },
  {
    id: 8,
    name: "Fresh Capsicum",
    hindiName: "Shimla Mirch",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: "/assets/generated/capsicum.dim_600x600.jpg",
  },
  {
    id: 9,
    name: "Fresh Green Chilli",
    hindiName: "Hari Mirch",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: "/assets/generated/green-chilli.dim_600x600.jpg",
  },
  {
    id: 10,
    name: "Fresh Lady Finger",
    hindiName: "Bhindi",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: "/assets/generated/ladyfinger.dim_600x600.jpg",
  },
  {
    id: 11,
    name: "Fresh Cucumber",
    hindiName: "Kheera",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: "/assets/generated/cucumber.dim_600x600.jpg",
  },
  {
    id: 12,
    name: "Fresh Bottle Gourd",
    hindiName: "Lauki",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: "/assets/generated/bottle-gourd.dim_600x600.jpg",
  },
  {
    id: 13,
    name: "Fresh Bitter Gourd",
    hindiName: "Karela",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: "/assets/generated/bitter-gourd.dim_600x600.jpg",
  },
  {
    id: 14,
    name: "Fresh Ridge Gourd",
    hindiName: "Turai",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: "/assets/generated/ridge-gourd.dim_600x600.jpg",
  },
  {
    id: 15,
    name: "Fresh Pumpkin",
    hindiName: "Kaddu",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: "/assets/generated/pumpkin.dim_600x600.jpg",
  },
  {
    id: 16,
    name: "Fresh Beetroot",
    hindiName: "Chukandar",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: "/assets/generated/beetroot.dim_600x600.jpg",
  },
  {
    id: 17,
    name: "Fresh Sweet Potato",
    hindiName: "Shakarkandi",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: "/assets/generated/sweet-potato.dim_600x600.jpg",
  },
  {
    id: 18,
    name: "Fresh Yam",
    hindiName: "Suran",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: "/assets/generated/yam.dim_600x600.jpg",
  },
  {
    id: 19,
    name: "Fresh Raw Banana",
    hindiName: "Kacha Kela",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: "/assets/generated/raw-banana.dim_600x600.jpg",
  },
  {
    id: 20,
    name: "Fresh Drumstick",
    hindiName: "Sahjan",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: "/assets/generated/drumstick.dim_600x600.jpg",
  },
  {
    id: 21,
    name: "Fresh Taro Root",
    hindiName: "Arbi",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: "/assets/generated/taro-root.dim_600x600.jpg",
  },
  {
    id: 22,
    name: "Fresh Ginger",
    hindiName: "Adrak",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: "/assets/generated/ginger.dim_600x600.jpg",
  },
  {
    id: 23,
    name: "Fresh Garlic",
    hindiName: "Lahsun",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: "/assets/generated/garlic.dim_600x600.jpg",
  },
  {
    id: 24,
    name: "Fresh Mint",
    hindiName: "Pudina",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: "/assets/generated/mint.dim_600x600.jpg",
  },
  {
    id: 25,
    name: "Fresh Cluster Beans",
    hindiName: "Gawar",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: "/assets/generated/cluster-beans.dim_600x600.jpg",
  },
  {
    id: 26,
    name: "Fresh Green Peas",
    hindiName: "Matar",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: "/assets/generated/green-peas.dim_600x600.jpg",
  },
  {
    id: 27,
    name: "Fresh French Beans",
    hindiName: "French Beans",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: "/assets/generated/french-beans.dim_600x600.jpg",
  },
  {
    id: 28,
    name: "Fresh Broad Beans",
    hindiName: "Papdi",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: "/assets/generated/broad-beans.dim_600x600.jpg",
  },
  {
    id: 29,
    name: "Fresh Snake Gourd",
    hindiName: "Chichinda",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: "/assets/generated/snake-gourd.dim_600x600.jpg",
  },
  {
    id: 30,
    name: "Fresh Pointed Gourd",
    hindiName: "Parwal",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: "/assets/generated/pointed-gourd.dim_600x600.jpg",
  },
  {
    id: 31,
    name: "Fresh Ash Gourd",
    hindiName: "Petha",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: "/assets/generated/ash-gourd.dim_600x600.jpg",
  },
  {
    id: 32,
    name: "Fresh Ivy Gourd",
    hindiName: "Tindora",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: "/assets/generated/ivy-gourd.dim_600x600.jpg",
  },
  {
    id: 33,
    name: "Fresh Raw Papaya",
    hindiName: "Kacha Papita",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: "/assets/generated/raw-papaya.dim_600x600.jpg",
  },
  {
    id: 34,
    name: "Fresh Zucchini",
    hindiName: "Zucchini",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: "/assets/generated/zucchini.dim_600x600.jpg",
  },
  {
    id: 35,
    name: "Fresh Yellow Capsicum",
    hindiName: "Peeli Shimla Mirch",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: "/assets/generated/yellow-capsicum.dim_600x600.jpg",
  },
  {
    id: 36,
    name: "Fresh Red Capsicum",
    hindiName: "Lal Shimla Mirch",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: "/assets/generated/red-capsicum.dim_600x600.jpg",
  },
  {
    id: 37,
    name: "Fresh Baby Corn",
    hindiName: "Baby Makka",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: "/assets/generated/baby-corn.dim_600x600.jpg",
  },
  {
    id: 38,
    name: "Fresh Corn",
    hindiName: "Makka",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: "/assets/generated/corn.dim_600x600.jpg",
  },
  {
    id: 39,
    name: "Fresh Raw Mango",
    hindiName: "Kaccha Aam",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: "/assets/generated/raw-mango.dim_600x600.jpg",
  },
];

export const INITIAL_DISCOUNTS: Discount[] = [
  {
    id: 1,
    label: "Grand Opening Sale!",
    description: "Get 10% off on all vegetables this week",
    discountPercent: 10,
    active: true,
  },
];

// Helpers
export function calcPrice(pricePerKg: number, grams: number): number {
  return Math.round((pricePerKg * grams) / 1000);
}

export function formatRupees(paise: number): string {
  return `₹${(paise / 100).toFixed(2)}`;
}

export function stockLabel(grams: number): {
  label: string;
  level: "good" | "low" | "out";
} {
  if (grams <= 0) return { label: "Out of Stock", level: "out" };
  if (grams < 5000)
    return { label: `Low Stock: ${(grams / 1000).toFixed(1)}kg`, level: "low" };
  return { label: `In Stock: ${(grams / 1000).toFixed(0)}kg`, level: "good" };
}
