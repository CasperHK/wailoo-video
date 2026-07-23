import { component$ } from "@builder.io/qwik";
import { useServerTimeLoader } from "../../../routes/layout";
import styles from "./footer.module.css";

export default component$(() => {
  const serverTime = useServerTimeLoader();

  return (
    <footer class={styles.footer}>
      <div class={["container", styles.shell]}>
        <div>
          <p class={styles.brand}>圍爐 WaiLoo.video</p>
          <p class={styles.caption}>自己友，睇好戲。唔使爭流量，最緊要識欣賞。</p>
        </div>

        <nav class={styles.links} aria-label="footer links">
          <a href="#featured">精選作品</a>
          <a href="#creators">創作者</a>
          <a href="#community">社群脈搏</a>
        </nav>

        <p class={styles.date}>更新日期: {serverTime.value.date}</p>
      </div>
    </footer>
  );
});
