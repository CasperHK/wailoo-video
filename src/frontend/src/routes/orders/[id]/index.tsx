import { component$, useStylesScoped$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";

import { formatPrice, orders, statusSteps } from "../../../data/marketplace";
import styles from "../../shop/shop.css?inline";

export const useOrderDetail = routeLoader$(({ params, status }) => {
  const order = orders.find((item) => item.id === params.id) || null;
  if (!order) {
    status(404);
  }
  return order;
});

export default component$(() => {
  useStylesScoped$(styles);

  const order = useOrderDetail().value;

  if (!order) {
    return (
      <section class="shop-page container">
        <div class="empty-panel">
          <h1>搵唔到訂單</h1>
          <p>請檢查訂單編號，或者返回訂單列表再選擇。</p>
          <a class="btn primary link" href="/orders">
            返回訂單列表
          </a>
        </div>
      </section>
    );
  }

  return (
    <section class="shop-page container">
      <h1>訂單詳情</h1>
      <div class="shop-section product-layout">
        <article class="order-panel">
          <div class="row-between">
            <h2>#{order.id}</h2>
            <span class="status-chip">{order.status}</span>
          </div>
          <p class="stock-note">建立日期: {order.createdAt}</p>
          <p>{order.itemCount} 件商品，總額 {formatPrice(order.total)}</p>
          <div class="timeline">
            {statusSteps.map((step) => (
              <div
                key={step}
                class={[
                  "timeline-step",
                  statusSteps.indexOf(step) <= statusSteps.indexOf(order.status)
                    ? "active"
                    : "",
                ]}
              >
                {step}
              </div>
            ))}
          </div>
        </article>

        <aside class="summary-panel">
          <h2>下一步</h2>
          <p>你可以繼續瀏覽商城，或者查看其他歷史訂單。</p>
          <div class="action-row">
            <a class="btn primary link" href="/shop">
              返回商城
            </a>
            <a class="btn link" href="/orders">
              全部訂單
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const order = resolveValue(useOrderDetail);
  return {
    title: order ? `訂單 ${order.id} | 潮流商城` : "訂單不存在 | 潮流商城",
  };
};
