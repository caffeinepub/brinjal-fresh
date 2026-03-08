// Direct relative-path imports so Vite bundles every image into the build output
import imgAshGourd from "../../public/assets/generated/ash-gourd.dim_600x600.jpg";
import imgBabyCorn from "../../public/assets/generated/baby-corn.dim_600x600.jpg";
import imgBeetroot from "../../public/assets/generated/beetroot.dim_600x600.jpg";
import imgBitterGourd from "../../public/assets/generated/bitter-gourd.dim_600x600.jpg";
import imgBottleGourd from "../../public/assets/generated/bottle-gourd.dim_600x600.jpg";
import imgBrinjal from "../../public/assets/generated/brinjal.dim_600x600.jpg";
import imgBroadBeans from "../../public/assets/generated/broad-beans.dim_600x600.jpg";
import imgCabbage from "../../public/assets/generated/cabbage.dim_600x600.jpg";
import imgCapsicum from "../../public/assets/generated/capsicum.dim_600x600.jpg";
import imgCarrot from "../../public/assets/generated/carrot.dim_600x600.jpg";
import imgCauliflower from "../../public/assets/generated/cauliflower.dim_600x600.jpg";
import imgClusterBeans from "../../public/assets/generated/cluster-beans.dim_600x600.jpg";
import imgCorn from "../../public/assets/generated/corn.dim_600x600.jpg";
import imgCucumber from "../../public/assets/generated/cucumber.dim_600x600.jpg";
import imgDrumstick from "../../public/assets/generated/drumstick.dim_600x600.jpg";
import imgFrenchBeans from "../../public/assets/generated/french-beans.dim_600x600.jpg";
import imgGarlic from "../../public/assets/generated/garlic.dim_600x600.jpg";
import imgGinger from "../../public/assets/generated/ginger.dim_600x600.jpg";
import imgGreenChilli from "../../public/assets/generated/green-chilli.dim_600x600.jpg";
import imgGreenPeas from "../../public/assets/generated/green-peas.dim_600x600.jpg";
import imgIvyGourd from "../../public/assets/generated/ivy-gourd.dim_600x600.jpg";
import imgLadyfinger from "../../public/assets/generated/ladyfinger.dim_600x600.jpg";
import imgMint from "../../public/assets/generated/mint.dim_600x600.jpg";
import imgOnion from "../../public/assets/generated/onion.dim_600x600.jpg";
import imgPointedGourd from "../../public/assets/generated/pointed-gourd.dim_600x600.jpg";
import imgPotato from "../../public/assets/generated/potato.dim_600x600.jpg";
import imgPumpkin from "../../public/assets/generated/pumpkin.dim_600x600.jpg";
import imgRawBanana from "../../public/assets/generated/raw-banana.dim_600x600.jpg";
import imgRawMango from "../../public/assets/generated/raw-mango.dim_600x600.jpg";
import imgRawPapaya from "../../public/assets/generated/raw-papaya.dim_600x600.jpg";
import imgRedCapsicum from "../../public/assets/generated/red-capsicum.dim_600x600.jpg";
import imgRidgeGourd from "../../public/assets/generated/ridge-gourd.dim_600x600.jpg";
import imgSnakeGourd from "../../public/assets/generated/snake-gourd.dim_600x600.jpg";
import imgSweetPotato from "../../public/assets/generated/sweet-potato.dim_600x600.jpg";
import imgTaroRoot from "../../public/assets/generated/taro-root.dim_600x600.jpg";
import imgTomato from "../../public/assets/generated/tomato.dim_600x600.jpg";
import imgYam from "../../public/assets/generated/yam.dim_600x600.jpg";
import imgYellowCapsicum from "../../public/assets/generated/yellow-capsicum.dim_600x600.jpg";
import imgZucchini from "../../public/assets/generated/zucchini.dim_600x600.jpg";

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
  paymentMethod?: "upi" | "cod";
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
  { label: "2 kg", grams: 2000 },
  { label: "3 kg", grams: 3000 },
  { label: "5 kg", grams: 5000 },
  { label: "10 kg", grams: 10000 },
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
    image: imgOnion,
  },
  {
    id: 2,
    name: "Fresh Potato",
    hindiName: "Batate",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: imgPotato,
  },
  {
    id: 3,
    name: "Fresh Tomato",
    hindiName: "Tamatar",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: imgTomato,
  },
  {
    id: 4,
    name: "Fresh Brinjal",
    hindiName: "Baingan",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: imgBrinjal,
  },
  {
    id: 5,
    name: "Fresh Cabbage",
    hindiName: "Patta Gobhi",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: imgCabbage,
  },
  {
    id: 6,
    name: "Fresh Cauliflower",
    hindiName: "Phool Gobhi",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: imgCauliflower,
  },
  {
    id: 7,
    name: "Fresh Carrot",
    hindiName: "Gajar",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: imgCarrot,
  },
  {
    id: 8,
    name: "Fresh Capsicum",
    hindiName: "Shimla Mirch",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: imgCapsicum,
  },
  {
    id: 9,
    name: "Fresh Green Chilli",
    hindiName: "Hari Mirch",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: imgGreenChilli,
  },
  {
    id: 10,
    name: "Fresh Lady Finger",
    hindiName: "Bhindi",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: imgLadyfinger,
  },
  {
    id: 11,
    name: "Fresh Cucumber",
    hindiName: "Kheera",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: imgCucumber,
  },
  {
    id: 12,
    name: "Fresh Bottle Gourd",
    hindiName: "Lauki",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: imgBottleGourd,
  },
  {
    id: 13,
    name: "Fresh Bitter Gourd",
    hindiName: "Karela",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: imgBitterGourd,
  },
  {
    id: 14,
    name: "Fresh Ridge Gourd",
    hindiName: "Turai",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: imgRidgeGourd,
  },
  {
    id: 15,
    name: "Fresh Pumpkin",
    hindiName: "Kaddu",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: imgPumpkin,
  },
  {
    id: 16,
    name: "Fresh Beetroot",
    hindiName: "Chukandar",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: imgBeetroot,
  },
  {
    id: 17,
    name: "Fresh Sweet Potato",
    hindiName: "Shakarkandi",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: imgSweetPotato,
  },
  {
    id: 18,
    name: "Fresh Yam",
    hindiName: "Suran",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: imgYam,
  },
  {
    id: 19,
    name: "Fresh Raw Banana",
    hindiName: "Kacha Kela",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: imgRawBanana,
  },
  {
    id: 20,
    name: "Fresh Drumstick",
    hindiName: "Sahjan",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: imgDrumstick,
  },
  {
    id: 21,
    name: "Fresh Taro Root",
    hindiName: "Arbi",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: imgTaroRoot,
  },
  {
    id: 22,
    name: "Fresh Ginger",
    hindiName: "Adrak",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: imgGinger,
  },
  {
    id: 23,
    name: "Fresh Garlic",
    hindiName: "Lahsun",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: imgGarlic,
  },
  {
    id: 24,
    name: "Fresh Mint",
    hindiName: "Pudina",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: imgMint,
  },
  {
    id: 25,
    name: "Fresh Cluster Beans",
    hindiName: "Gawar",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: imgClusterBeans,
  },
  {
    id: 26,
    name: "Fresh Green Peas",
    hindiName: "Matar",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: imgGreenPeas,
  },
  {
    id: 27,
    name: "Fresh French Beans",
    hindiName: "French Beans",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: imgFrenchBeans,
  },
  {
    id: 28,
    name: "Fresh Broad Beans",
    hindiName: "Papdi",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: imgBroadBeans,
  },
  {
    id: 29,
    name: "Fresh Snake Gourd",
    hindiName: "Chichinda",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: imgSnakeGourd,
  },
  {
    id: 30,
    name: "Fresh Pointed Gourd",
    hindiName: "Parwal",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: imgPointedGourd,
  },
  {
    id: 31,
    name: "Fresh Ash Gourd",
    hindiName: "Petha",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: imgAshGourd,
  },
  {
    id: 32,
    name: "Fresh Ivy Gourd",
    hindiName: "Tindora",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: imgIvyGourd,
  },
  {
    id: 33,
    name: "Fresh Raw Papaya",
    hindiName: "Kacha Papita",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: imgRawPapaya,
  },
  {
    id: 34,
    name: "Fresh Zucchini",
    hindiName: "Zucchini",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: imgZucchini,
  },
  {
    id: 35,
    name: "Fresh Yellow Capsicum",
    hindiName: "Peeli Shimla Mirch",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: imgYellowCapsicum,
  },
  {
    id: 36,
    name: "Fresh Red Capsicum",
    hindiName: "Lal Shimla Mirch",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: imgRedCapsicum,
  },
  {
    id: 37,
    name: "Fresh Baby Corn",
    hindiName: "Baby Makka",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: imgBabyCorn,
  },
  {
    id: 38,
    name: "Fresh Corn",
    hindiName: "Makka",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: imgCorn,
  },
  {
    id: 39,
    name: "Fresh Raw Mango",
    hindiName: "Kaccha Aam",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: imgRawMango,
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
