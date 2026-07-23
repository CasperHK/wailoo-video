import { component$, useStylesScoped$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import { formatPrice, orders } from "../../data/marketplace";
import styles from "../shop/shop.css?inline";

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <section class="shop-page container">
      <h1>我的訂單</h1>
      <div class="shop-section order-list">
        {orders.map((order) => (
          <a class="order-card" href={`/orders/${order.id}`} key={order.id}>
            <div class="row-between">
              <h3>#{order.id}</h3>
              <span class="status-chip">{order.status}</span>
            </div>
            <p>{order.createdAt}</p>
            <p>
              {order.itemCount} 件商品 ・ {formatPrice(order.total)}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: "我的訂單 | 潮流商城",
};
