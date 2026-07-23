export type ProductCategory = "服飾" | "設計師周邊" | "影音實體";

export type Product = {
  slug: string;
  title: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  stock: number;
  badge?: string;
  brand: string;
  cover: string;
  description: string;
  variants: string[];
};

export type CartItem = {
  slug: string;
  variant: string;
  quantity: number;
};

export type OrderStatus = "待付款" | "處理中" | "已寄出" | "已完成";

export type OrderSummary = {
  id: string;
  createdAt: string;
  status: OrderStatus;
  total: number;
  itemCount: number;
};

export const products: Product[] = [
  {
    slug: "wailoo-oversize-tee",
    title: "圍爐 Oversize Tee",
    category: "服飾",
    price: 368,
    originalPrice: 428,
    stock: 18,
    badge: "新品",
    brand: "WaiLoo Studio",
    cover:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
    description: "重磅棉料，前後雙面絲印，專為夜拍與日常穿搭設計。",
    variants: ["S", "M", "L", "XL"],
  },
  {
    slug: "harbour-film-poster",
    title: "維港放映海報套裝",
    category: "設計師周邊",
    price: 188,
    stock: 42,
    badge: "限定",
    brand: "Harbour Frames",
    cover:
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&q=80",
    description: "A3藝術紙印刷，3款主題海報，附編號收藏卡。",
    variants: ["A3 x3"],
  },
  {
    slug: "neon-second-scene-bluray",
    title: "霓虹下的第二場戲 Blu-ray",
    category: "影音實體",
    price: 248,
    stock: 12,
    brand: "阿朗導演工作室",
    cover:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
    description: "導演評論音軌 + 刪剪片段 + 劇照冊，收藏版包裝。",
    variants: ["標準版", "收藏版"],
  },
  {
    slug: "city-sound-vinyl",
    title: "城景聲音部 OST 黑膠",
    category: "影音實體",
    price: 428,
    stock: 6,
    badge: "低庫存",
    brand: "城景聲音部",
    cover:
      "https://images.unsplash.com/photo-1461360228754-6e81c478b882?auto=format&fit=crop&w=1200&q=80",
    description: "180g黑膠，收錄《雨夜天橋》原聲及未公開混音版本。",
    variants: ["黑膠 12\""],
  },
  {
    slug: "street-shot-camera-strap",
    title: "街拍相機帶",
    category: "設計師周邊",
    price: 158,
    stock: 25,
    brand: "街角攝影社",
    cover:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
    description: "耐磨織帶，快扣設計，適合長時間街拍創作。",
    variants: ["黑", "深綠", "沙色"],
  },
  {
    slug: "night-scene-hoodie",
    title: "夜景剪影連帽衛衣",
    category: "服飾",
    price: 498,
    stock: 9,
    brand: "WaiLoo Studio",
    cover:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1200&q=80",
    description: "刷毛內裡，寬鬆版型，胸前刺繡夜景剪影圖騰。",
    variants: ["M", "L", "XL"],
  },
];

export const mockCart: CartItem[] = [
  { slug: "wailoo-oversize-tee", variant: "L", quantity: 1 },
  { slug: "neon-second-scene-bluray", variant: "收藏版", quantity: 1 },
];

export const orders: OrderSummary[] = [
  { id: "WL20260723001", createdAt: "2026-07-23", status: "待付款", total: 586, itemCount: 2 },
  { id: "WL20260718009", createdAt: "2026-07-18", status: "處理中", total: 428, itemCount: 1 },
  { id: "WL20260711004", createdAt: "2026-07-11", status: "已寄出", total: 656, itemCount: 2 },
  { id: "WL20260701002", createdAt: "2026-07-01", status: "已完成", total: 188, itemCount: 1 },
];

export const statusSteps: OrderStatus[] = ["待付款", "處理中", "已寄出", "已完成"];

export function formatPrice(value: number): string {
  return `HK$${value.toLocaleString("en-HK")}`;
}

export function findProduct(slug: string): Product | undefined {
  return products.find((item) => item.slug === slug);
}

export function getCartDetails(items: CartItem[]): Array<CartItem & { product: Product }> {
  return items
    .map((item) => {
      const product = findProduct(item.slug);
      if (!product) {
        return null;
      }
      return { ...item, product };
    })
    .filter((item): item is CartItem & { product: Product } => !!item);
}

export function cartTotal(items: CartItem[]): number {
  return getCartDetails(items).reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}
