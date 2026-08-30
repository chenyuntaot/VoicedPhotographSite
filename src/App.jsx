import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  Camera,
  Check,
  Headset,
  ImageSquare,
  LockKey,
  Microphone,
  Pause,
  Play,
  SpeakerHigh,
  Waveform,
  X,
} from "@phosphor-icons/react";

const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

function AppleMark() {
  return (
    <svg
      className="apple-mark"
      viewBox="0 0 384 512"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5c0 26.9 4.9 54.7 14.7 83.4 13.1 36.7 60.2 126.7 107.2 125.2 24.6-.6 42-17.5 74.2-17.5 31.2 0 47.3 17.5 74.8 17.5 47.4-.7 89.2-82.5 101.6-119.3-63.5-29.9-60.1-86.5-60.1-88.3 0-2 .1-3.9.3-5.8ZM260.2 104.5c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3Z" />
    </svg>
  );
}

const boardMemories = [
  {
    className: "memory memory-hike",
    image: asset("assets/memories/forest.webp"),
    alt: "森林中徒步的旅行回忆",
    caption: "林间的风",
  },
  {
    className: "memory memory-dinner",
    image: asset("assets/memories/dinner.webp"),
    alt: "与家人朋友一起晚餐",
    caption: "那晚的笑声",
  },
  {
    className: "memory memory-grandparents",
    image: asset("assets/memories/grandparents.webp"),
    alt: "家中长辈的合照",
    caption: "外公外婆",
  },
  {
    className: "memory memory-baby",
    image: asset("assets/memories/baby-standing.webp"),
    alt: "刚刚学会站立的宝宝",
    caption: "第一次站稳",
  },
];

const voiceNotes = [
  {
    className: "voice-note note-coral",
    paper: asset("assets/papers/coral.webp"),
    title: "咖啡店里的笑声",
    duration: "0:18",
    color: "#d75f89",
  },
  {
    className: "voice-note note-butter",
    paper: asset("assets/papers/butter.webp"),
    title: "一起吃饭的晚上",
    duration: "0:32",
    color: "#c98d04",
  },
  {
    className: "voice-note note-mint",
    paper: asset("assets/papers/mint.webp"),
    title: "宝宝第一次喊妈妈",
    duration: "0:08",
    color: "#258b66",
  },
];

const screens = [
  {
    src: asset("assets/screens/home.webp"),
    alt: "留声相册照片墙界面",
    label: "照片墙",
  },
  {
    src: asset("assets/screens/photo-preview.webp"),
    alt: "留声相册照片预览界面",
    label: "照片预览",
  },
  {
    src: asset("assets/screens/voice-memory-couple.webp"),
    alt: "留声相册声音记忆界面",
    label: "声音记忆",
  },
];

function Polaroid({ className, image, alt, caption }) {
  return (
    <figure className={className}>
      <img src={image} alt={alt} />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function VoiceNote({ note, activeNote, onToggle }) {
  const isPlaying = activeNote === note.title;

  return (
    <button
      className={`${note.className}${isPlaying ? " is-playing" : ""}`}
      onClick={() => onToggle(note.title)}
      aria-label={`${isPlaying ? "暂停" : "播放"}${note.title}`}
      style={{ backgroundImage: `url(${note.paper})` }}
    >
      <span className="note-play" style={{ color: note.color }}>
        {isPlaying ? <Pause weight="fill" /> : <Play weight="fill" />}
      </span>
      <span className="note-copy">
        <strong>{note.title}</strong>
        <Waveform className="note-wave" weight="duotone" aria-hidden="true" />
      </span>
      <span className="note-duration">{note.duration}</span>
    </button>
  );
}

function DownloadDialog({ open, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    closeRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="download-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="download-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button ref={closeRef} className="dialog-close" onClick={onClose} aria-label="关闭">
          <X weight="bold" />
        </button>
        <img src={asset("assets/app-icon.webp")} alt="" className="dialog-icon" />
        <p className="eyebrow">留声相册</p>
        <h2 id="download-title">很快就能下载了</h2>
        <p>App Store 链接上线后，这个按钮会直接带你前往下载页面。</p>
        <button className="dialog-confirm" onClick={onClose}>
          <Check weight="bold" />
          我知道了
        </button>
      </section>
    </div>
  );
}

export function App() {
  const [activeNote, setActiveNote] = useState(null);
  const [activeScreen, setActiveScreen] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);

  const toggleNote = (title) => {
    setActiveNote((current) => (current === title ? null : title));
  };

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="留声相册首页">
          <img src={asset("assets/app-icon.webp")} alt="" />
          <span>留声相册</span>
        </a>
        <nav aria-label="主导航">
          <a className="support-nav-link" href="#support">技术支持</a>
          <a href="#story">故事</a>
          <a href="#app">界面</a>
          <a href="#privacy">隐私</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">一张照片 · 一段声音</p>
            <h1 id="hero-title">
              把故事，
              <br />
              留在<span className="marker">照片旁边</span>
            </h1>
            <p className="hero-description">
              拍下一刻，也录下那一刻想说的话。
              <br />
              多年以后，照片依然有声音。
            </p>
            <address className="hero-support-card" id="support" aria-labelledby="support-card-title">
              <p className="support-card-label" id="support-card-title">
                <Headset weight="duotone" aria-hidden="true" />
                技术支持
              </p>
              <p>
                开发者／个人信息处理者：<strong>陈云涛</strong>
              </p>
              <p>
                联系邮箱：
                <a href="mailto:chenyuntao020123@163.com">
                  <strong>chenyuntao020123@163.com</strong>
                </a>
              </p>
            </address>
            <button className="download-button" onClick={() => setDialogOpen(true)}>
              <AppleMark />
              <span>
                <small>即将上架</small>
                App Store
              </span>
            </button>
            <p className="iphone-label">为 iPhone 设计</p>
            <a className="scroll-cue" href="#support">
              获取技术支持
              <ArrowDown />
            </a>
          </div>

          <div className="hero-visual" aria-label="照片和声音组成的记忆墙">
            <div className="board-frame">
              <div className="cork-board">
                {boardMemories.map((memory) => (
                  <Polaroid key={memory.caption} {...memory} />
                ))}
                {voiceNotes.map((note) => (
                  <VoiceNote
                    key={note.title}
                    note={note}
                    activeNote={activeNote}
                    onToggle={toggleNote}
                  />
                ))}
              </div>
            </div>
            <Polaroid
              className="memory memory-couple"
              image={asset("assets/memories/couple-cafe.webp")}
              alt="在咖啡店微笑的两个人"
              caption="两周年纪念日"
            />
          </div>
        </section>

        <section className="story-section" id="story" aria-labelledby="story-title">
          <div className="story-photo-wrap">
            <div className="story-photo">
              <img src={asset("assets/memories/baby-hand.webp")} alt="宝宝握住家人的手" />
              <div className="story-photo-caption">
                <span>2026.08.26</span>
                <button
                  onClick={() => toggleNote("第一声妈妈")}
                  aria-label={activeNote === "第一声妈妈" ? "暂停声音" : "播放声音"}
                >
                  {activeNote === "第一声妈妈" ? (
                    <Pause weight="fill" />
                  ) : (
                    <Play weight="fill" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="story-copy">
            <p className="eyebrow">记忆不只是画面</p>
            <h2 id="story-title">
              看见一张照片，
              <br />
              <span className="marker">听见一段回忆</span>
            </h2>
            <p className="section-intro">
              照片保留当时的样子，声音保留那一刻的温度。把两者放在一起，才是一段完整的记忆。
            </p>
            <ol className="steps">
              <li>
                <span className="step-number step-coral">1</span>
                <ImageSquare weight="duotone" />
                <div>
                  <strong>留下照片</strong>
                  <p>拍摄，或从相册选择珍贵的一刻。</p>
                </div>
              </li>
              <li>
                <span className="step-number step-butter">2</span>
                <Microphone weight="duotone" />
                <div>
                  <strong>录下声音</strong>
                  <p>一张照片，可以收藏多段讲述。</p>
                </div>
              </li>
              <li>
                <span className="step-number step-mint">3</span>
                <SpeakerHigh weight="duotone" />
                <div>
                  <strong>随时重听</strong>
                  <p>回到照片，也回到声音发生的那天。</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section className="app-section" id="app" aria-labelledby="app-title">
          <div className="section-heading">
            <p className="eyebrow">真实应用界面</p>
            <h2 id="app-title">每段回忆，都有自己的位置</h2>
            <p>整理照片、打开回忆、重听声音。这里展示的每一个画面都来自真实 App。</p>
          </div>

          <div className="screen-stage">
            {screens.map((screen, index) => {
              const offset = (index - activeScreen + screens.length) % screens.length;
              const visualClass = offset === 0 ? "is-center" : offset === 1 ? "is-right" : "is-left";
              return (
                <button
                  key={screen.src}
                  className={`screen-card ${visualClass}`}
                  onClick={() => setActiveScreen(index)}
                  aria-label={`查看${screen.label}界面`}
                  aria-pressed={activeScreen === index}
                >
                  <img src={screen.src} alt={screen.alt} />
                  <span>{screen.label}</span>
                </button>
              );
            })}
          </div>

          <div className="screen-selector" role="group" aria-label="选择应用界面">
            {screens.map((screen, index) => (
              <button
                key={screen.label}
                className={activeScreen === index ? "is-active" : ""}
                onClick={() => setActiveScreen(index)}
              >
                {screen.label}
              </button>
            ))}
          </div>
        </section>

        <section className="privacy-section" id="privacy" aria-labelledby="privacy-title">
          <div className="privacy-icon">
            <LockKey weight="duotone" />
          </div>
          <div className="privacy-copy">
            <p className="eyebrow">你的回忆，默认只属于你</p>
            <h2 id="privacy-title">先保存在本机，再决定是否分享</h2>
            <p className="privacy-description">
              照片与录音优先保存在你的设备上。没有默认公开的主页，也不会要求你先注册账号才能开始记录。
            </p>
          </div>
        </section>
      </main>

      <footer>
        <a className="brand brand-footer" href="#top">
          <img src={asset("assets/app-icon.webp")} alt="" />
          <span>留声相册</span>
        </a>
        <p>让照片被看见，也让故事被听见。</p>
        <button onClick={() => setDialogOpen(true)}>
          <Camera weight="duotone" />
          App Store 即将上线
        </button>
      </footer>

      <DownloadDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
}
