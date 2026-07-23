import { component$, useStylesScoped$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import { cartTotal, formatPrice, getCartDetails, mockCart } from "../../../data/marketplace";
import styles from "../shop.css?inline";

export default component$(() => {
  useStylesScoped$(styles);

  const items = getCartDetails(mockCart);
  const total = cartTotal(mockCart);

  return (
    <section class="shop-page container">
      <h1>購物車</h1>
      {items.length === 0 ? (
        <div class="empty-panel">
          <p>購物車仲係空空如也，去商城揀返幾件本地好物先啦。</p>
          <a class="btn primary link" href="/shop">
            前往商城
          </a>
        </div>
      ) : (
        <div class="cart-layout">
          <div class="cart-panel">
            {items.map((item) => (
              <article class="cart-item" key={item.slug + item.variant}>
                <img
                  src={item.product.cover}
                  alt={item.product.title}
                  loading="lazy"
                  width={120}
                  height={120}
                />
                <div>
                  <h3>{item.product.title}</h3>
                  <p>規格: {item.variant}</p>
                  <p>數量: {item.quantity}</p>
                  <p>{formatPrice(item.product.price * item.quantity)}</p>
                </div>
              </article>
            ))}
          </div>

          <aside class="summary-panel">
            <h2>訂單摘要</h2>
            <div class="row-between">
              <span>商品小計</span>
              <strong>{formatPrice(total)}</strong>
            </div>
            <div class="row-between">
              <span>運費估算</span>
              <span>{formatPrice(35)}</span>
            </div>
            <div class="row-between">
              <span>總計</span>
              <strong>{formatPrice(total + 35)}</strong>
            </div>
            <div class="action-row">
              <a class="btn primary link" href="/shop/checkout">
                進入結帳
              </a>
              <a class="btn link" href="/shop">
                繼續購物
              </a>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
});

export const head: DocumentHead = {
  title: "購物車 | 潮流商城",
};
