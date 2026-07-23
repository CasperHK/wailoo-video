import { component$ } from "@builder.io/qwik";
import styles from "./header.module.css";

export default component$(() => {
  return (
    <header class={styles.header}>
      <div class={["container", styles.wrapper]}>
        <div class={styles.logo}>
          <a href="/" title="WaiLoo.video">
            <span class={styles.brand}>圍爐 WaiLoo.video</span>
          </a>
        </div>

        <ul class={styles.navList}>
          <li>
            <a href="/shop">商城</a>
          </li>
          <li>
            <a href="/#featured">精選</a>
          </li>
          <li>
            <a href="/#creators">創作者</a>
          </li>
          <li>
            <a href="/#news">新聞</a>
          </li>
          <li>
            <a href="/videos/neon-second-scene">影片內頁</a>
          </li>
        </ul>

        <div class={styles.actions}>
          <a href="/shop" class={styles.primaryCta}>
            購物
          </a>
          <a href="/shop/cart" class={styles.secondaryCta}>
            購物車
          </a>
        </div>
      </div>
    </header>
  );
});
