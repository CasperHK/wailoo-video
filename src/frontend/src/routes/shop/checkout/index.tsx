import { component$, useStylesScoped$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";

import { cartTotal, findProduct, formatPrice, getCartDetails, mockCart } from "../../../data/marketplace";
import styles from "../shop.css?inline";

export const useCheckoutContext = routeLoader$(({ url }) => {
  const buyNow = url.searchParams.get("buyNow") === "true";
  const slug = url.searchParams.get("slug") || "";
  const variant = url.searchParams.get("variant") || "標準";
  const quantity = Number(url.searchParams.get("qty") || "1");

  if (!buyNow || !slug) {
    return {
      mode: "cart" as const,
      entries: getCartDetails(mockCart).map((item) => ({
        title: item.product.title,
        variant: item.variant,
        quantity: item.quantity,
        subtotal: item.product.price * item.quantity,
      })),
      total: cartTotal(mockCart),
    };
  }

  const product = findProduct(slug);
  if (!product) {
    return {
      mode: "cart" as const,
      entries: [],
      total: 0,
    };
  }

  const safeQty = Number.isFinite(quantity) && quantity > 0 ? Math.floor(quantity) : 1;
  return {
    mode: "buyNow" as const,
    entries: [
      {
        title: product.title,
        variant,
        quantity: safeQty,
        subtotal: product.price * safeQty,
      },
    ],
    total: product.price * safeQty,
  };
});

export default component$(() => {
  useStylesScoped$(styles);

  const checkout = useCheckoutContext().value;

  return (
    <section class="shop-page container">
      <h1>結帳</h1>
      <p class="stock-note">
        {checkout.mode === "buyNow" ? "立即購買流程" : "購物車結帳流程"}
      </p>

      <div class="checkout-layout">
        <form class="checkout-panel checkout-form">
          <div>
            <label for="name">收件人姓名</label>
            <input id="name" name="name" placeholder="請輸入收件人姓名" />
          </div>
          <div>
            <label for="phone">聯絡電話</label>
            <input id="phone" name="phone" placeholder="請輸入電話" />
          </div>
          <div>
            <label for="address">送貨地址</label>
            <textarea id="address" name="address" placeholder="請輸入完整地址"></textarea>
          </div>
          <div>
            <label for="shipping">送貨方式</label>
            <select id="shipping" name="shipping">
              <option>順豐到付</option>
              <option>本地平郵</option>
              <option>工作室自取</option>
            </select>
          </div>
          <div>
            <label for="payment">付款方式（模擬）</label>
            <select id="payment" name="payment">
              <option>信用卡（模擬）</option>
              <option>FPS（模擬）</option>
              <option>PayMe（模擬）</option>
            </select>
          </div>
          <a class="btn primary link" href="/orders/WL20260723001">
            送出訂單（模擬）
          </a>
        </form>

        <aside class="summary-panel">
          <h2>訂單內容</h2>
          {checkout.entries.map((entry) => (
            <div class="row-between" key={entry.title + entry.variant}>
              <span>
                {entry.title} ({entry.variant}) x{entry.quantity}
              </span>
              <span>{formatPrice(entry.subtotal)}</span>
            </div>
          ))}
          <div class="row-between">
            <span>商品小計</span>
            <strong>{formatPrice(checkout.total)}</strong>
          </div>
          <div class="row-between">
            <span>運費</span>
            <span>{formatPrice(35)}</span>
          </div>
          <div class="row-between">
            <span>總計</span>
            <strong>{formatPrice(checkout.total + 35)}</strong>
          </div>
        </aside>
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: "結帳 | 潮流商城",
};
