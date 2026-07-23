import { component$, useStylesScoped$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import { formatPrice, products } from "../../data/marketplace";
import styles from "./shop.css?inline";

const categories = ["全部", "服飾", "設計師周邊", "影音實體"];

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <section class="shop-page container">
      <div class="shop-hero">
        <h1>潮流商城</h1>
        <p>
          本地獨立品牌服飾、設計師周邊、影音實體紀念品集中地。揀啱就即買，或者先放入購物車慢慢配搭。
        </p>
        <div class="filter-row" aria-label="分類篩選">
          {categories.map((item) => (
            <span class="filter-chip" key={item}>
              {item}
            </span>
          ))}
        </div>
      </div>

      <div class="shop-section">
        <h2>本週上架</h2>
        <div class="product-grid">
          {products.map((product) => (
            <article class="product-card" key={product.slug}>
              <a href={`/shop/${product.slug}`} class="product-link" aria-label={`查看 ${product.title}`}>
                <img
                  class="product-thumb"
                  src={product.cover}
                  alt={product.title}
                  loading="lazy"
                  width={1200}
                  height={900}
                />
                <div class="product-body">
                  <div class="product-meta">
                    <span class="badge">{product.category}</span>
                    {product.badge && <span class="badge">{product.badge}</span>}
                  </div>
                  <h3 class="product-title">{product.title}</h3>
                  <p class="product-brand">{product.brand}</p>
                  <div class="price-row">
                    <span class="price-now">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span class="price-old">{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>
                  <p class="stock-note">庫存 {product.stock} 件</p>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: "潮流商城 | 圍爐 WaiLoo.video",
  meta: [
    {
      name: "description",
      content: "選購本地獨立品牌服飾、設計師周邊與影音實體作品。",
    },
  ],
};
