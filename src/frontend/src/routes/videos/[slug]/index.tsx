import { $, component$, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";

import styles from "./video-detail.css?inline";

type AspectMode = "landscape" | "portrait";

type VideoComment = {
  author: string;
  text: string;
  time: string;
};

type Creator = {
  name: string;
  handle: string;
  followers: string;
  bio: string;
};

type VideoDetail = {
  slug: string;
  title: string;
  genre: string;
  duration: string;
  aspect: AspectMode;
  poster: string;
  src: string;
  creator: Creator;
  tags: string[];
  publishedAt: string;
  views: string;
  likes: number;
  saves: number;
  description: string;
  credits: string[];
  comments: VideoComment[];
  related: string[];
};

const videoLibrary: VideoDetail[] = [
  {
    slug: "neon-second-scene",
    title: "霓虹下的第二場戲",
    genre: "微電影",
    duration: "12:41",
    aspect: "landscape",
    poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1400&q=80",
    src: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    creator: {
      name: "阿朗導演工作室",
      handle: "@alongfilm",
      followers: "12.8k",
      bio: "專注拍攝香港夜色與人物情緒，擅長城市詩意敘事。",
    },
    tags: ["城市夜景", "人物故事", "16:9"],
    publishedAt: "2026-07-18",
    views: "28,941",
    likes: 892,
    saves: 314,
    description:
      "一個送貨員與前女友在霓虹街角重遇，兩人沿住巴士線回到當年未講完的對白。",
    credits: ["導演: 阿朗", "攝影: Kenji", "剪接: Momo Lab", "配樂: 細佬樂隊"],
    comments: [
      {
        author: "@lokfilm",
        text: "第二幕嘅轉場真係好順，天橋落雨聲接巴士引擎好有畫面。",
        time: "2 小時前",
      },
      {
        author: "@yan_editor",
        text: "ending留白夠膽識，可唔可以分享下你係點做嗰層ambient?",
        time: "5 小時前",
      },
    ],
    related: ["mongkok-3am", "ferry-wind-rail", "bridge-in-rain"],
  },
  {
    slug: "mongkok-3am",
    title: "旺角凌晨三點",
    genre: "紀實短片",
    duration: "08:19",
    aspect: "portrait",
    poster: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=900&q=80",
    src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    creator: {
      name: "街角攝影社",
      handle: "@mkcollective",
      followers: "7.4k",
      bio: "用直屏紀錄夜間小人物，保留街頭最真實嘅聲音。",
    },
    tags: ["街頭", "紀實", "9:16"],
    publishedAt: "2026-07-11",
    views: "17,582",
    likes: 503,
    saves: 188,
    description: "凌晨旺角，清潔工、的士司機、宵夜檔老闆各自講述一晚。",
    credits: ["導演: 阿芊", "攝影: 啟明", "收音: 黎仔"],
    comments: [
      {
        author: "@cityframes",
        text: "第一人稱行鏡好有臨場感，字幕節奏再慢少少會更舒服。",
        time: "1 日前",
      },
    ],
    related: ["neon-second-scene", "farewell-vhs", "market-dawn-notes"],
  },
  {
    slug: "ferry-wind-rail",
    title: "海風與鐵路",
    genre: "實驗影像",
    duration: "06:55",
    aspect: "landscape",
    poster: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1300&q=80",
    src: "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    creator: {
      name: "離島影像計劃",
      handle: "@islandlab",
      followers: "4.1k",
      bio: "探索島嶼地景與聲音記憶，偏好慢節奏觀影。",
    },
    tags: ["實驗", "聲景", "16:9"],
    publishedAt: "2026-06-29",
    views: "11,230",
    likes: 290,
    saves: 201,
    description: "渡輪浪聲與輕鐵節奏對位，拼貼出香港邊界嘅呼吸。",
    credits: ["導演: 阿珊", "聲音設計: Kiko", "調色: Kenji"],
    comments: [
      {
        author: "@filmgrain",
        text: "聲畫分離做得好，特別係第二段空鏡停留。",
        time: "3 日前",
      },
    ],
    related: ["neon-second-scene", "bridge-in-rain", "farewell-vhs"],
  },
  {
    slug: "farewell-vhs",
    title: "告別錄影帶",
    genre: "短片",
    duration: "10:07",
    aspect: "landscape",
    poster: "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=1200&q=80",
    src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    creator: {
      name: "菲林復興組",
      handle: "@vhsrevive",
      followers: "5.6k",
      bio: "收藏舊媒體文化，用影像重構本地流行記憶。",
    },
    tags: ["懷舊", "敘事", "16:9"],
    publishedAt: "2026-06-21",
    views: "14,805",
    likes: 420,
    saves: 132,
    description: "一卷舊錄影帶，帶出一家人錯過多年嘅和解時刻。",
    credits: ["導演: 阿義", "編劇: 子柔", "配樂: 細佬樂隊"],
    comments: [],
    related: ["mongkok-3am", "market-dawn-notes", "ferry-wind-rail"],
  },
  {
    slug: "bridge-in-rain",
    title: "雨夜天橋",
    genre: "音樂影像",
    duration: "04:44",
    aspect: "portrait",
    poster: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=900&q=80",
    src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    creator: {
      name: "城景聲音部",
      handle: "@citysounddept",
      followers: "8.9k",
      bio: "以節奏剪接同現場錄音，重塑香港夜行感。",
    },
    tags: ["MV", "夜景", "9:16"],
    publishedAt: "2026-06-15",
    views: "22,156",
    likes: 711,
    saves: 400,
    description: "雨夜步行節拍，配上低頻合成器，呈現城市呼吸。",
    credits: ["導演: 阿峰", "音樂: Haze Unit", "攝影: Wing"],
    comments: [
      {
        author: "@beatmakerhk",
        text: "呢種低頻同雨聲融合好正，想聽你嘅混音設定。",
        time: "8 小時前",
      },
    ],
    related: ["neon-second-scene", "mongkok-3am", "ferry-wind-rail"],
  },
  {
    slug: "market-dawn-notes",
    title: "天光墟日記",
    genre: "人物故事",
    duration: "09:28",
    aspect: "landscape",
    poster: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1300&q=80",
    src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    creator: {
      name: "新界小隊",
      handle: "@ntstorylab",
      followers: "6.0k",
      bio: "關注地方人物故事，記錄早市與鄉郊生活。",
    },
    tags: ["社區", "人物", "16:9"],
    publishedAt: "2026-06-08",
    views: "12,044",
    likes: 365,
    saves: 149,
    description: "由天未光到人潮散去，跟住檔主走一晚天光墟。",
    credits: ["導演: 阿花", "攝影: Thomas", "收音: 木木"],
    comments: [
      {
        author: "@docuview",
        text: "檔主訪談好真實，鏡頭留白位好有力量。",
        time: "2 日前",
      },
    ],
    related: ["farewell-vhs", "mongkok-3am", "neon-second-scene"],
  },
];

export const useVideoDetail = routeLoader$(({ params, status }) => {
  const video = videoLibrary.find((item) => item.slug === params.slug) ?? null;

  if (!video) {
    status(404);
  }

  return video;
});

export default component$(() => {
  useStylesScoped$(styles);

  const videoSignal = useVideoDetail();
  const video = videoSignal.value;

  if (!video) {
    return (
      <section class="video-page container">
        <div class="not-found-card">
          <p class="breadcrumb">影片不存在</p>
          <h1>搵唔到你想睇嘅片</h1>
          <p>可能影片已下架，或者連結有誤。你可以先返回首頁睇下精選作品。</p>
          <a href="/#featured" class="action-button primary">
            返回精選
          </a>
        </div>
      </section>
    );
  }

  const liked = useSignal(false);
  const saved = useSignal(false);
  const followed = useSignal(false);
  const likeCount = useSignal(video.likes);
  const saveCount = useSignal(video.saves);
  const comments = useSignal(video.comments);
  const draftComment = useSignal("");
  const shareState = useSignal("");

  const relatedVideos = video.related
    .map((slug) => videoLibrary.find((item) => item.slug === slug))
    .filter((item): item is VideoDetail => !!item);

  const onToggleLike = $(() => {
    liked.value = !liked.value;
    likeCount.value += liked.value ? 1 : -1;
  });

  const onToggleSave = $(() => {
    saved.value = !saved.value;
    saveCount.value += saved.value ? 1 : -1;
  });

  const onToggleFollow = $(() => {
    followed.value = !followed.value;
  });

  const onShare = $(async () => {
    const shareUrl =
      typeof window !== "undefined"
        ? window.location.href
        : "https://wailoo.video/videos/" + video.slug;

    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(shareUrl);
      shareState.value = "連結已複製，快啲分享比朋友睇。";
      return;
    }

    shareState.value = "目前裝置唔支援自動複製，請手動複製網址。";
  });

  const onSubmitComment = $(() => {
    const message = draftComment.value.trim();

    if (!message) {
      return;
    }

    comments.value = [
      {
        author: "@you",
        text: message,
        time: "剛剛",
      },
      ...comments.value,
    ];

    draftComment.value = "";
  });

  return (
    <section class="video-page container">
      <p class="breadcrumb">
        <a href="/#featured">首頁</a> / <span>{video.genre}</span>
      </p>

      <div class="video-layout">
        <article>
          <div class={["player-frame", video.aspect]}>
            <video controls poster={video.poster} preload="metadata">
              <source src={video.src} type="video/mp4" />
              你的瀏覽器暫時唔支援播放影片。
            </video>
          </div>

          <div class="meta-panel">
            <h1>{video.title}</h1>
            <div class="meta-row">
              <span>{video.views} 次觀看</span>
              <span>{video.publishedAt}</span>
              <span>{video.duration}</span>
            </div>
            <div class="tag-row" aria-label="影片標籤">
              {video.tags.map((tag) => (
                <span class="meta-pill" key={tag}>
                  {tag}
                </span>
              ))}
            </div>

            <div class="action-row">
              <button
                type="button"
                class={["action-button", liked.value ? "active" : ""]}
                onClick$={onToggleLike}
              >
                {liked.value ? "已讚好" : "讚好"} {likeCount.value}
              </button>
              <button
                type="button"
                class={["action-button", saved.value ? "active" : ""]}
                onClick$={onToggleSave}
              >
                {saved.value ? "已收藏" : "收藏"} {saveCount.value}
              </button>
              <button type="button" class="action-button" onClick$={onShare}>
                分享
              </button>
            </div>
            {shareState.value && <p class="feedback-text">{shareState.value}</p>}
          </div>

          <div class="creator-panel">
            <div>
              <p class="creator-name">{video.creator.name}</p>
              <p class="creator-handle">
                {video.creator.handle} ・ {video.creator.followers} 追蹤者
              </p>
              <p class="creator-bio">{video.creator.bio}</p>
            </div>
            <button
              type="button"
              class={["action-button", "primary", followed.value ? "active" : ""]}
              onClick$={onToggleFollow}
            >
              {followed.value ? "追蹤中" : "追蹤創作者"}
            </button>
          </div>

          <div class="description-panel">
            <h2>故事簡介</h2>
            <p>{video.description}</p>
            <h3>製作名單</h3>
            <ul>
              {video.credits.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>

          <div id="comments" class="comments-panel">
            <div class="section-head">
              <h2>留言區</h2>
              <span>{comments.value.length} 則留言</span>
            </div>

            <form class="comment-form" preventdefault:submit onSubmit$={onSubmitComment}>
              <label for="comment-input">你想點講呢條片？</label>
              <textarea
                id="comment-input"
                value={draftComment.value}
                onInput$={(event) => {
                  const target = event.target as HTMLTextAreaElement;
                  draftComment.value = target.value;
                }}
                placeholder="分享你對劇本、鏡頭、剪接或者聲音嘅觀察"
              ></textarea>
              <button type="submit" class="action-button primary">
                發表留言
              </button>
            </form>

            <div class="comment-list">
              {comments.value.length > 0 ? (
                comments.value.map((comment, index) => (
                  <article
                    class={[
                      "comment-card",
                      index === 0 ? "pinned" : "",
                    ]}
                    key={comment.author + comment.time + comment.text}
                  >
                    <p>{comment.text}</p>
                    <cite>
                      {comment.author} ・ {comment.time}
                    </cite>
                  </article>
                ))
              ) : (
                <p class="empty-state">做第一個留言嘅觀眾，講下你最深刻嘅一幕。</p>
              )}
            </div>
          </div>
        </article>

        <aside class="related-panel" aria-label="相關影片">
          <div class="section-head">
            <h2>相關影片</h2>
          </div>
          <div class="related-list">
            {relatedVideos.map((item) => (
              <a href={`/videos/${item.slug}`} class="related-card" key={item.slug}>
                <div class={["thumb-mini", item.aspect]}>
                  <span>{item.duration}</span>
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.creator.name}</p>
                  <span class="meta-pill">{item.genre}</span>
                </div>
              </a>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const video = resolveValue(useVideoDetail);

  if (!video) {
    return {
      title: "影片不存在 | 圍爐 WaiLoo.video",
      meta: [
        {
          name: "description",
          content: "搵唔到你要瀏覽嘅影片。",
        },
      ],
    };
  }

  return {
    title: `${video.title} | 圍爐 WaiLoo.video`,
    meta: [
      {
        name: "description",
        content: video.description,
      },
    ],
  };
};
