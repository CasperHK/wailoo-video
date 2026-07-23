import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

const featuredVideos = [
  {
    title: "霓虹下的第二場戲",
    creator: "阿朗導演工作室",
    genre: "微電影",
    duration: "12:41",
  },
  {
    title: "旺角凌晨三點",
    creator: "街角攝影社",
    genre: "紀實短片",
    duration: "08:19",
  },
  {
    title: "海風與鐵路",
    creator: "離島影像計劃",
    genre: "實驗影像",
    duration: "06:55",
  },
  {
    title: "告別錄影帶",
    creator: "菲林復興組",
    genre: "短片",
    duration: "10:07",
  },
  {
    title: "雨夜天橋",
    creator: "城景聲音部",
    genre: "音樂影像",
    duration: "04:44",
  },
  {
    title: "天光墟日記",
    creator: "新界小隊",
    genre: "人物故事",
    duration: "09:28",
  },
];

const creators = [
  {
    name: "阿晴",
    role: "導演 / 編劇",
    note: "擅長城市人物與街角對白。",
  },
  {
    name: "Kenji",
    role: "攝影 / 調色",
    note: "偏愛霓虹夜景與16:9電影感。",
  },
  {
    name: "Momo Lab",
    role: "剪接 / 聲音設計",
    note: "主力情緒節奏與環境聲敘事。",
  },
  {
    name: "細佬樂隊",
    role: "獨立配樂",
    note: "提供原創OST與現場錄音素材。",
  },
];

const pulseNotes = [
  {
    from: "@lokfilm",
    text: "第二幕轉場好靚，尤其係巴士窗反光接鐵路聲嗰下。",
  },
  {
    from: "@yan_editor",
    text: "你個ending留白好有膽色，我想知點樣做ambient層次。",
  },
  {
    from: "@hongkongframes",
    text: "節奏再慢半拍會更入心，但鏡頭語言已經非常成熟。",
  },
];

const newsCards = [
  {
    title: "本週策展：城市夜行特輯",
    tag: "策展",
  },
  {
    title: "創作筆記：低預算拍出電影感",
    tag: "Blog",
  },
  {
    title: "社群消息：七月圍爐放映會",
    tag: "社群",
  },
];

export default component$(() => {
  return (
    <div class="home-page">
      <section class="hero-section">
        <div class="container hero-shell">
          <p class="hero-chip">香港本土影像創作者聚落</p>
          <h1>自己友，睇好戲。</h1>
          <p class="hero-copy">
            由創作者策展，唔靠演算法推送。你可以即刻開播精彩作品，
            亦可以開爐發佈屬於你嘅故事。
          </p>
          <div class="hero-actions">
            <a href="#featured" class="button button-primary">
              立即觀看精選
            </a>
            <a href="#creators" class="button button-ghost">
              成為爐主
            </a>
          </div>
        </div>
        <div aria-hidden="true" class="hero-glow"></div>
      </section>

      <section id="featured" class="container section-block">
        <div class="section-head">
          <h2>精選作品</h2>
          <a href="#" class="text-link">
            查看全部
          </a>
        </div>
        <div class="video-rail" role="list" aria-label="精選作品列表">
          {featuredVideos.map((video) => (
            <article class="video-card" role="listitem" key={video.title}>
              <div class="video-thumb" aria-hidden="true">
                <span>{video.duration}</span>
              </div>
              <h3>{video.title}</h3>
              <p>{video.creator}</p>
              <span class="meta-pill">{video.genre}</span>
            </article>
          ))}
        </div>
      </section>

      <section class="container section-block values-grid">
        <article class="value-card">
          <h3>無演算法焦慮</h3>
          <p>唔使鬥點擊，作品由社群策展與口碑自然發酵。</p>
        </article>
        <article class="value-card">
          <h3>重交流評論</h3>
          <p>聚焦劇本、鏡頭、剪接語言，留言區係創作討論場。</p>
        </article>
        <article class="value-card">
          <h3>創作者主權</h3>
          <p>你嘅工作室、你嘅作品履歷，完整呈現個人風格。</p>
        </article>
      </section>

      <section id="creators" class="container section-block">
        <div class="section-head">
          <h2>爐主工作室</h2>
          <a href="#" class="text-link">
            探索更多創作者
          </a>
        </div>
        <div class="creator-grid">
          {creators.map((creator) => (
            <article class="creator-card" key={creator.name}>
              <h3>{creator.name}</h3>
              <p class="creator-role">{creator.role}</p>
              <p>{creator.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="community" class="container section-block pulse-section">
        <div class="section-head">
          <h2>社群脈搏</h2>
        </div>
        <div class="pulse-grid">
          {pulseNotes.map((note) => (
            <blockquote class="pulse-note" key={note.from}>
              <p>{note.text}</p>
              <cite>{note.from}</cite>
            </blockquote>
          ))}
        </div>
      </section>

      <section class="container section-block split-highlight">
        <article class="split-card">
          <h3>本地素材共創池</h3>
          <p>共享香港街景B-roll、原創OST，降低獨立拍攝門檻。</p>
          <a href="#" class="text-link">
            進入素材池
          </a>
        </article>
        <article class="split-card">
          <h3>新聞與Blog</h3>
          <p>追蹤潮流資訊、品牌專訪、創作筆記與放映活動。</p>
          <a href="#" class="text-link">
            瀏覽最新文章
          </a>
        </article>
      </section>

      <section id="news" class="container section-block news-block">
        <div class="section-head">
          <h2>最新動向</h2>
          <a href="#" class="text-link">
            查看全部消息
          </a>
        </div>
        <div class="news-grid">
          {newsCards.map((item) => (
            <article class="news-card" key={item.title}>
              <span class="meta-pill">{item.tag}</span>
              <h3>{item.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section class="container final-cta">
        <h2>圍埋一爐，拍出香港嘅故事。</h2>
        <p>加入社群，搵到觀眾、同行與下一位合作拍檔。</p>
        <div class="hero-actions">
          <a href="#featured" class="button button-primary">
            即刻睇片
          </a>
          <a href="#creators" class="button button-ghost">
            開始創作
          </a>
        </div>
      </section>
    </div>
  );
});

export const head: DocumentHead = {
  title: "圍爐 WaiLoo.video | 自己友，睇好戲",
  meta: [
    {
      name: "description",
      content: "香港本土影像創作者與觀眾社群平台，精選作品、深度交流、共同創作。",
    },
  ],
};
