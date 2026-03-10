import imgBhindiLadyfinger from "../../public/assets/generated/bhindi-ladyfinger.dim_600x600.jpg";
import imgBrinjalBlack from "../../public/assets/generated/brinjal_black_bharta.dim_600x600.jpg";
import imgBroccoli from "../../public/assets/generated/broccoli_fresh.dim_600x600.jpg";
// Direct relative-path imports so Vite bundles every image into the build output
import imgDrumstick from "../../public/assets/generated/drumstick-sahjan.dim_600x600.jpg";
// New products from user upload (cropped from IMG_20260310_102553)
import imgGawarClusterBeans from "../../public/assets/generated/gawar-cluster-beans.dim_600x600.jpg";
import imgGinger from "../../public/assets/generated/ginger-real.dim_600x600.jpg";
import imgCapsicum from "../../public/assets/generated/green-capsicum-shimla-mirch.dim_600x600.jpg";
import imgIvyGourd from "../../public/assets/generated/ivy-gourd-real.dim_600x600.jpg";
import imgKakadiGreenCucumber from "../../public/assets/generated/kakadi-green-cucumber.dim_600x600.jpg";
import imgKakadiWhiteCucumber from "../../public/assets/generated/kakadi-white-cucumber.dim_600x600.jpg";
import imgLemon from "../../public/assets/generated/lemon_limboo.dim_600x600.jpg";
import imgMadrasKakdi from "../../public/assets/generated/madras_kakdi_yellow.dim_600x600.jpg";
import imgMatarGreenPeas from "../../public/assets/generated/matar-green-peas.dim_600x600.jpg";
// New products from user upload (cropped from IMG_20260310_183634)
import imgMushroom from "../../public/assets/generated/mushroom_packet.dim_600x600.jpg";
import imgOnion from "../../public/assets/generated/onion-kanda.dim_600x600.jpg";
import imgRadish from "../../public/assets/generated/radish_mulli.dim_600x600.jpg";
import imgSweetPotatoReal from "../../public/assets/generated/sweet-potato-shakarkandi.dim_600x600.jpg";
import imgTaroRoot from "../../public/assets/generated/taro-root-real.dim_600x600.jpg";
import imgAmla from "../../public/assets/generated/veg_amla_new.dim_600x600.jpg";
import imgAshGourd from "../../public/assets/generated/veg_ashgourd_real.dim_600x600.jpg";
import imgBeetroot from "../../public/assets/generated/veg_beetroot_real.dim_600x600.jpg";
// User-uploaded crops (real photos)
import imgBitterGourd from "../../public/assets/generated/veg_bittergourd.dim_600x600.png";
import imgBottleGourd from "../../public/assets/generated/veg_bottlegourd.dim_600x600.png";
import imgBrinjal from "../../public/assets/generated/veg_brinjal.dim_600x600.png";
import imgCabbage from "../../public/assets/generated/veg_cabbage.dim_600x600.png";
import imgCarrot from "../../public/assets/generated/veg_carrot.dim_600x600.png";
import imgCauliflower from "../../public/assets/generated/veg_cauliflower.dim_600x600.png";
import imgCoconut from "../../public/assets/generated/veg_coconut_piece.dim_600x600.jpg";
import imgCurryLeaves from "../../public/assets/generated/veg_curry_leaves_bunch.dim_600x600.jpg";
import imgFenugreek from "../../public/assets/generated/veg_fenugreek_bunch.dim_600x600.jpg";
import imgFrenchBeans from "../../public/assets/generated/veg_frenchbeans_real.dim_600x600.jpg";
import imgGarlic from "../../public/assets/generated/veg_garlic_real.dim_600x600.jpg";
import imgGreenSmallBrinjal from "../../public/assets/generated/veg_greensmallbrinjal_new.dim_600x600.jpg";
import imgMintBunch from "../../public/assets/generated/veg_mint_bunch.dim_600x600.jpg";
import imgPotato from "../../public/assets/generated/veg_potato.dim_600x600.png";
import imgPumpkin from "../../public/assets/generated/veg_pumpkin.dim_600x600.png";
import imgRawMango from "../../public/assets/generated/veg_rawmango_real.dim_600x600.jpg";
import imgRawPapaya from "../../public/assets/generated/veg_rawpapaya_real.dim_600x600.jpg";
import imgRidgeGourd from "../../public/assets/generated/veg_ridgegourd.dim_600x600.png";
import imgSpinach from "../../public/assets/generated/veg_spinach_bunch.dim_600x600.jpg";
import imgSpringOnion from "../../public/assets/generated/veg_spring_onion_bunch.dim_600x600.jpg";
import imgSweetCorn from "../../public/assets/generated/veg_sweet_corn_piece.dim_600x600.jpg";
import imgTomato from "../../public/assets/generated/veg_tomato.dim_600x600.png";
import imgYam from "../../public/assets/generated/yam-suran.dim_600x600.jpg";

export type UnitType = "kg" | "bunch" | "piece";

export type Product = {
  id: number;
  name: string;
  hindiName: string;
  pricePerKg: number; // in paise: for kg=price/kg, for bunch/piece=price per unit
  stockGrams: number; // for kg=grams; for bunch/piece=unit count (stored as integer)
  image: string;
  unitType?: UnitType; // defaults to "kg" if not set
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
  minOrderValue?: number; // minimum cart subtotal in paise to qualify for this discount
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
  message: "Mon\u2013Sat: 7am\u201310pm | Sun: 8am\u20136pm",
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
    image: imgSweetPotatoReal,
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
    id: 27,
    name: "Fresh French Beans",
    hindiName: "French Beans",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: imgFrenchBeans,
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
    id: 39,
    name: "Fresh Raw Mango",
    hindiName: "Kaccha Aam",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: imgRawMango,
  },
  {
    id: 44,
    name: "Fresh Green Small Brinjal",
    hindiName: "Choti Hari Baingan",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: imgGreenSmallBrinjal,
  },
  {
    id: 46,
    name: "Fresh Amla",
    hindiName: "Amla (Indian Gooseberry)",
    pricePerKg: 3000,
    stockGrams: 50000,
    image: imgAmla,
  },
  // Bunch products
  {
    id: 50,
    name: "Fenugreek",
    hindiName: "Methi",
    pricePerKg: 2000,
    stockGrams: 100,
    image: imgFenugreek,
    unitType: "bunch" as UnitType,
  },
  {
    id: 51,
    name: "Spinach",
    hindiName: "Palak",
    pricePerKg: 2000,
    stockGrams: 100,
    image: imgSpinach,
    unitType: "bunch" as UnitType,
  },
  {
    id: 52,
    name: "Spring Onion",
    hindiName: "Hara Pyaaz",
    pricePerKg: 2000,
    stockGrams: 100,
    image: imgSpringOnion,
    unitType: "bunch" as UnitType,
  },
  {
    id: 53,
    name: "Curry Leaves",
    hindiName: "Kadi Patta",
    pricePerKg: 2000,
    stockGrams: 100,
    image: imgCurryLeaves,
    unitType: "bunch" as UnitType,
  },
  {
    id: 54,
    name: "Mint",
    hindiName: "Pudina",
    pricePerKg: 2000,
    stockGrams: 100,
    image: imgMintBunch,
    unitType: "bunch" as UnitType,
  },
  // Piece products
  {
    id: 55,
    name: "Coconut",
    hindiName: "Nariyal",
    pricePerKg: 3000,
    stockGrams: 100,
    image: imgCoconut,
    unitType: "piece" as UnitType,
  },
  {
    id: 56,
    name: "Sweet Corn",
    hindiName: "Makki / Sweet Corn",
    pricePerKg: 3000,
    stockGrams: 100,
    image: imgSweetCorn,
    unitType: "piece" as UnitType,
  },
  // Products from user upload IMG_20260310_102553
  {
    id: 57,
    name: "Fresh Cluster Beans",
    hindiName: "Gawar",
    pricePerKg: 4000,
    stockGrams: 50000,
    image: imgGawarClusterBeans,
  },
  {
    id: 58,
    name: "Fresh Green Peas",
    hindiName: "Matar",
    pricePerKg: 5000,
    stockGrams: 50000,
    image: imgMatarGreenPeas,
  },
  {
    id: 59,
    name: "Fresh Ladyfinger",
    hindiName: "Bhindi",
    pricePerKg: 6000,
    stockGrams: 50000,
    image: imgBhindiLadyfinger,
  },
  {
    id: 60,
    name: "Fresh White Cucumber",
    hindiName: "Safed Kakadi",
    pricePerKg: 6000,
    stockGrams: 50000,
    image: imgKakadiWhiteCucumber,
  },
  {
    id: 62,
    name: "Fresh Green Cucumber",
    hindiName: "Kakadi",
    pricePerKg: 4000,
    stockGrams: 50000,
    image: imgKakadiGreenCucumber,
  },
  // Products from user upload IMG_20260310_183634
  {
    id: 63,
    name: "Fresh Mushroom",
    hindiName: "Mushroom",
    pricePerKg: 4000,
    stockGrams: 100,
    image: imgMushroom,
    unitType: "piece" as UnitType,
  },
  {
    id: 64,
    name: "Fresh Radish",
    hindiName: "Mulli",
    pricePerKg: 1000,
    stockGrams: 100,
    image: imgRadish,
    unitType: "piece" as UnitType,
  },
  {
    id: 65,
    name: "Big Brinjal Black",
    hindiName: "Bharta Baingan",
    pricePerKg: 5000,
    stockGrams: 50000,
    image: imgBrinjalBlack,
  },
  {
    id: 66,
    name: "Fresh Broccoli",
    hindiName: "Broccoli",
    pricePerKg: 6000,
    stockGrams: 50000,
    image: imgBroccoli,
  },
  {
    id: 67,
    name: "Fresh Madras Kakdi",
    hindiName: "Peeli Kakdi",
    pricePerKg: 6000,
    stockGrams: 50000,
    image: imgMadrasKakdi,
  },
  {
    id: 68,
    name: "Fresh Lemon",
    hindiName: "Limboo",
    pricePerKg: 500,
    stockGrams: 100,
    image: imgLemon,
    unitType: "piece" as UnitType,
  },
];

export const INITIAL_DISCOUNTS: Discount[] = [
  {
    id: 1,
    label: "Grand Opening Sale!",
    description: "Get 10% off on orders of ₹300 or more",
    discountPercent: 10,
    active: true,
    minOrderValue: 30000, // ₹300 in paise
  },
];

// Helpers
export function calcPrice(pricePerKg: number, grams: number): number {
  return Math.round((pricePerKg * grams) / 1000);
}

// For bunch/piece: pricePerUnit is stored in pricePerKg field, quantity is units
export function calcPriceForUnit(product: Product, quantity: number): number {
  const unit = product.unitType ?? "kg";
  if (unit === "kg") {
    return calcPrice(product.pricePerKg, quantity); // quantity = grams
  }
  // bunch or piece: pricePerKg holds price-per-unit in paise, quantity = number of units
  return product.pricePerKg * quantity;
}

export function formatRupees(paise: number): string {
  return `\u20b9${(paise / 100).toFixed(0)}`;
}

export function stockLabel(
  stockGrams: number,
  unitType?: UnitType,
): {
  label: string;
  level: "good" | "low" | "out";
} {
  const unit = unitType ?? "kg";
  if (unit === "bunch" || unit === "piece") {
    const unitLabel = unit === "bunch" ? "bunches" : "pcs";
    if (stockGrams <= 0) return { label: "Out of Stock", level: "out" };
    if (stockGrams < 10)
      return { label: `Low: ${stockGrams} ${unitLabel}`, level: "low" };
    return { label: `${stockGrams} ${unitLabel}`, level: "good" };
  }
  // kg
  if (stockGrams <= 0) return { label: "Out of Stock", level: "out" };
  if (stockGrams < 5000)
    return { label: `Low: ${(stockGrams / 1000).toFixed(1)}kg`, level: "low" };
  return {
    label: `In Stock: ${(stockGrams / 1000).toFixed(0)}kg`,
    level: "good",
  };
}
