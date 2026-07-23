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
            <a href="#featured">精選</a>
          </li>
          <li>
            <a href="#creators">創作者</a>
          </li>
          <li>
            <a href="#news">新聞</a>
          </li>
        </ul>

        <div class={styles.actions}>
          <a href="#featured" class={styles.primaryCta}>
            睇片
          </a>
          <a href="#creators" class={styles.secondaryCta}>
            開爐
          </a>
        </div>
      </div>
    </header>
  );
});
