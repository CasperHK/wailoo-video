import { $, component$, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";

import { findProduct, formatPrice } from "../../../data/marketplace";
import styles from "../shop.css?inline";

export const useProduct = routeLoader$(({ params, status }) => {
  const product = findProduct(params.slug);
  if (!product) {
    status(404);
    return null;
  }
  return product;
});

export default component$(() => {
  useStylesScoped$(styles);

  const productSignal = useProduct();
  const product = productSignal.value;

  if (!product) {
    return (
      <section class="shop-page container">
        <div class="empty-panel">
          <h1>搵唔到產品</h1>
          <p>呢件產品可能已下架，或者連結已變更。你可以返回商城再揀其他作品。</p>
          <a class="btn primary link" href="/shop">
            返回商城
          </a>
        </div>
      </section>
    );
  }

  const selectedVariant = useSignal(product.variants[0]);
  const quantity = useSignal(1);
  const feedback = useSignal("");

  const onAddCart = $(() => {
    feedback.value = `已加入購物車: ${product.title} (${selectedVariant.value}) x${quantity.value}`;
  });

  return (
    <section class="shop-page container">
      <p class="stock-note">
        <a href="/shop">商城</a> / {product.category}
      </p>

      <div class="product-layout">
        <article>
          <div class="product-gallery">
            <img src={product.cover} alt={product.title} width={1200} height={900} />
          </div>

          <div class="product-panel">
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <div class="price-row">
              <span class="price-now">{formatPrice(product.price)}</span>
              {product.originalPrice && <span class="price-old">{formatPrice(product.originalPrice)}</span>}
            </div>
            <p class="stock-note">剩餘庫存 {product.stock} 件</p>

            <div class="variant-row" aria-label="款式選擇">
              {product.variants.map((variant) => (
                <button
                  key={variant}
                  type="button"
                  class="variant-chip"
                  onClick$={() => {
                    selectedVariant.value = variant;
                  }}
                >
                  {variant}
                </button>
              ))}
            </div>

            <div class="variant-row" aria-label="購買數量">
              {[1, 2, 3].map((amount) => (
                <button
                  key={amount}
                  type="button"
                  class="variant-chip"
                  onClick$={() => {
                    quantity.value = amount;
                  }}
                >
                  {amount} 件
                </button>
              ))}
            </div>

            <div class="action-row">
              <a
                class="btn primary link"
                href={`/shop/checkout?buyNow=true&slug=${product.slug}&variant=${encodeURIComponent(selectedVariant.value)}&qty=${quantity.value}`}
              >
                立即購買
              </a>
              <button type="button" class="btn" onClick$={onAddCart}>
                加入購物車
              </button>
              <a class="btn link" href="/shop/cart">
                查看購物車
              </a>
            </div>
            {feedback.value && <p class="feedback">{feedback.value}</p>}
          </div>
        </article>

        <aside class="summary-panel">
          <h2>品牌 / 創作者</h2>
          <p>{product.brand}</p>
          <p>已選規格: {selectedVariant.value}</p>
          <p>數量: {quantity.value}</p>
          <div class="row-between">
            <span>小計</span>
            <strong>{formatPrice(product.price * quantity.value)}</strong>
          </div>
          <div class="action-row">
            <a class="btn primary link" href="/shop/checkout">
              前往結帳
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const product = resolveValue(useProduct);
  if (!product) {
    return { title: "產品不存在 | 圍爐商店" };
  }
  return {
    title: `${product.title} | 潮流商城`,
    meta: [
      {
        name: "description",
        content: product.description,
      },
    ],
  };
};
