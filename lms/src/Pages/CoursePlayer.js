import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Play,
  Lock,
  CheckCircle,
  Clock,
  Menu,
  X,
  Pause,
  ChevronRight,
  ChevronLeft,
  Volume2,
  Video,
  Download,
  MessageCircle,
  Slash,
} from "lucide-react";
import Hls from "hls.js";
import "./CoursePlayer.css";
/* ----------------- Dummy course (fallback) ----------------- */
const dummyCourse = {
  title: "Study Course — Offline Mode",
  price: 0,
  videos: [
    {
      id: 1,
      title: "Welcome to the Course",
      url: "https://cdn.pixabay.com/vimeo/696435618/online-108369.mp4?width=1280",
      duration: "0:20",
      locked: false,
      captions: null,
      thumbnail: "https://i.ytimg.com/vi_webp/aJOTlE1K90k/maxresdefault.webp",
      chapters: [
        { t: 0, label: "Course Intro" }
      ]
    },

    {
      id: 2,
      title: "Whiteboard Explanation — Basics",
      url: "https://cdn.pixabay.com/vimeo/458085284/blackboard-40039.mp4?width=1280",
      duration: "0:35",
      locked: false,
      captions: null,
      thumbnail: "https://i.ytimg.com/vi_webp/1IqH3uliwJY/maxresdefault.webp",
      chapters: [
        { t: 0, label: "Setup" },
        { t: 10, label: "Explanation" }
      ]
    },

    {
      id: 3,
      title: "Teacher Explaining Concept",
      url: "https://cdn.pixabay.com/vimeo/336278824/teacher-21922.mp4?width=1280",
      duration: "0:50",
      locked: false,
      captions: null,
      thumbnail: "https://i.ytimg.com/vi_webp/0r5J9M0tUf8/maxresdefault.webp",
      chapters: [
        { t: 0, label: "Topic Intro" },
        { t: 20, label: "Deep Dive" }
      ]
    },

    {
      id: 4,
      title: "Study Notes Writing Session",
      url: "https://cdn.pixabay.com/vimeo/497018163/writing-52752.mp4?width=1280",
      duration: "0:25",
      locked: false,
      captions: null,
      thumbnail: "https://i.ytimg.com/vi_webp/HQmmM_qwG4k/maxresdefault.webp",
      chapters: [
        { t: 0, label: "Start Writing" }
      ]
    },

    {
      id: 5,
      title: "Coding Tutorial — Screen Recording",
      url: "https://cdn.pixabay.com/vimeo/620363981/code-104363.mp4?width=1280",
      duration: "0:40",
      locked: false,
      captions: null,
      thumbnail: "https://i.ytimg.com/vi_webp/dQw4w9WgXcQ/maxresdefault.webp",
      chapters: [
        { t: 0, label: "Environment Setup" },
        { t: 15, label: "Coding Start" }
      ]
    }
  ]
};


/* ----------------- Utility ----------------- */
const isHls = (src) => typeof src === "string" && src.endsWith(".m3u8");

/* ----------------- Component ----------------- */
const CoursePlayer = () => {
  const { courseId } = useParams();
  const { user = null, purchasedCourses = [] } = useSelector(
    (state) => state.user || {}
  );

  const [course, setCourse] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [videoProgress, setVideoProgress] = useState({});
  const [speed, setSpeed] = useState(1);
  const [captionsOn, setCaptionsOn] = useState(false);
  const [isMini, setIsMini] = useState(false);
  const [muted, setMuted] = useState(false);

  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const playerWrapperRef = useRef(null);
  const hlsRef = useRef(null);

  const isPurchased = purchasedCourses.includes(parseInt(courseId));

  /* ----------------- Fetch course (with dummy fallback) ----------------- */
  useEffect(() => {
    let mounted = true;
    const fetchCourse = async () => {
      try {
        const res = await fetch(
          `https://YOURSERVERURL.com/api/courses/${courseId}`,
          {
            headers: {
              "x-auth-token": user?.token,
            },
          }
        );

        if (!res.ok) throw new Error("Backend unreachable");
        const data = await res.json();

        if (!data || !data.videos) {
          if (mounted) setCourse(dummyCourse);
        } else {
          if (mounted) setCourse(data);
        }
      } catch (err) {
        console.warn("Using dummy course because backend failed.", err);
        if (mounted) setCourse(dummyCourse);
      }
    };

    fetchCourse();
    return () => {
      mounted = false;
    };
  }, [courseId, user]);

  /* ----------------- Load saved progress ----------------- */
  useEffect(() => {
    const saved = localStorage.getItem(`progress_${courseId}`);
    if (saved) setVideoProgress(JSON.parse(saved));
  }, [courseId]);

  /* ----------------- HLS / Source handling ----------------- */
  const attachSource = useCallback((src) => {
    const videoEl = videoRef.current;
    if (!videoEl || !src) return;

    // If HLS stream and browser native doesn't support, use hls.js
    if (isHls(src)) {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }

      if (Hls.isSupported()) {
        const hls = new Hls({
          // optional config for low-latency or ABR
          maxBufferLength: 30,
        });
        hlsRef.current = hls;
        hls.loadSource(src);
        hls.attachMedia(videoEl);
        hls.on(Hls.Events.ERROR, function (event, data) {
          console.error("HLS error", event, data);
        });
      } else {
        // If browser can play HLS natively (Safari)
        videoEl.src = src;
      }
    } else {
      // plain mp4 or webm
      videoEl.src = src;
    }
  }, []);

  /* attach source whenever selectedVideo or course changes */
  useEffect(() => {
    if (!course) return;
    const src = course.videos[selectedVideo]?.url;
    attachSource(src);

    // attach captions if present
    const v = videoRef.current;
    // remove existing textTracks (clean)
    if (v) {
      while (v.firstChild) v.removeChild(v.firstChild); // removes <track> nodes if any
      if (course.videos[selectedVideo]?.captions) {
        const t = document.createElement("track");
        t.kind = "subtitles";
        t.label = "English";
        t.src = course.videos[selectedVideo].captions;
        t.default = captionsOn;
        v.appendChild(t);
      }
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [course, selectedVideo, attachSource, captionsOn]);

  /* ----------------- Save watch progress + simple analytics ----------------- */
  const markAsWatched = (index) => {
    const updated = { ...videoProgress, [index]: true };
    setVideoProgress(updated);
    localStorage.setItem(`progress_${courseId}`, JSON.stringify(updated));
  };

  useEffect(() => {
    if (!course) return;
    // record watched events to localStorage analytics
    const analyticsKey = `analytics_${courseId}`;
    const a = JSON.parse(localStorage.getItem(analyticsKey) || "{}");
    if (!a.videos) a.videos = {};
    // ensure current video has an object
    a.videos[course.videos[selectedVideo].id] =
      a.videos[course.videos[selectedVideo].id] || { plays: 0, paused: 0, watchedSec: 0 };
    localStorage.setItem(analyticsKey, JSON.stringify(a));
  }, [course, selectedVideo, courseId]);

  /* update analytics while video plays */
  useEffect(() => {
    let interval = null;
    const videoEl = videoRef.current;
    const analyticsKey = `analytics_${courseId}`;

    if (!videoEl) return;

    const onPlay = () => {
      const a = JSON.parse(localStorage.getItem(analyticsKey) || "{}");
      if (!a.videos) a.videos = {};
      const vidId = course.videos[selectedVideo].id;
      a.videos[vidId] = a.videos[vidId] || { plays: 0, paused: 0, watchedSec: 0 };
      a.videos[vidId].plays += 1;
      localStorage.setItem(analyticsKey, JSON.stringify(a));
      interval = setInterval(() => {
        const a2 = JSON.parse(localStorage.getItem(analyticsKey) || "{}");
        a2.videos = a2.videos || {};
        a2.videos[vidId] = a2.videos[vidId] || { plays: 0, paused: 0, watchedSec: 0 };
        a2.videos[vidId].watchedSec += 1;
        localStorage.setItem(analyticsKey, JSON.stringify(a2));
      }, 1000);
    };

    const onPause = () => {
      const a = JSON.parse(localStorage.getItem(analyticsKey) || "{}");
      const vidId = course.videos[selectedVideo].id;
      a.videos = a.videos || {};
      a.videos[vidId] = a.videos[vidId] || { plays: 0, paused: 0, watchedSec: 0 };
      a.videos[vidId].paused += 1;
      localStorage.setItem(analyticsKey, JSON.stringify(a));
      if (interval) clearInterval(interval);
    };

    videoEl.addEventListener("play", onPlay);
    videoEl.addEventListener("pause", onPause);

    return () => {
      videoEl.removeEventListener("play", onPlay);
      videoEl.removeEventListener("pause", onPause);
      if (interval) clearInterval(interval);
    };
  }, [course, selectedVideo, courseId]);

  /* ----------------- Double-tap skip (left/right clicks) ----------------- */
  const handleTap = (e) => {
    if (!videoRef.current) return;
    const rect = videoRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const half = rect.width / 2;
    const skip = 10; // seconds
    if (x < half) {
      // left half -> rewind
      videoRef.current.currentTime = Math.max(videoRef.current.currentTime - skip, 0);
      flashSkip(-skip);
    } else {
      // right half -> forward
      videoRef.current.currentTime = Math.min(
        videoRef.current.currentTime + skip,
        videoRef.current.duration || 0
      );
      flashSkip(skip);
    }
  };

  const flashRef = useRef(null);
  const flashSkip = (amount) => {
    const node = flashRef.current;
    if (!node) return;
    node.textContent = `${amount > 0 ? "+" : ""}${amount}s`;
    node.classList.add("skip-flash--show");
    clearTimeout(node._t);
    node._t = setTimeout(() => {
      node.classList.remove("skip-flash--show");
    }, 650);
  };

  /* ----------------- Auto-next and ended handler ----------------- */
  const handleVideoEnded = () => {
    markAsWatched(selectedVideo);

    const next = course.videos.findIndex(
      (v, i) => i > selectedVideo && (isPurchased || !v.locked)
    );
    if (next !== -1) {
      setSelectedVideo(next);
    }
  };

  /* ----------------- Floating mini player when scrolled ----------------- */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          // if main player intersects less than 0.5 of viewport, show mini
          if (!playerWrapperRef.current) return;
          const ratio = en.intersectionRatio;
          setIsMini(ratio < 0.4);
        });
      },
      { threshold: [0, 0.25, 0.4, 0.6, 1] }
    );

    if (playerWrapperRef.current) obs.observe(playerWrapperRef.current);
    return () => {
      obs.disconnect();
    };
  }, []);

  if (!course) return <p style={{ padding: 20 }}>Loading course...</p>;

  const currentVideo = course.videos[selectedVideo];

  /* ----------------- UI handlers ----------------- */
  const handleVideoClickInList = (index) => {
    if (course.videos[index].locked && !isPurchased) return;
    setSelectedVideo(index);
    // set currentTime to 0 and autoplay
    setTimeout(() => {
      try {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      } catch (e) {}
    }, 50);
  };

  const toggleCaptions = () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;
    for (let i = 0; i < videoEl.textTracks.length; i++) {
      videoEl.textTracks[i].mode = captionsOn ? "disabled" : "showing";
    }
    setCaptionsOn((s) => !s);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  const changeSpeed = (s) => {
    setSpeed(s);
    if (videoRef.current) videoRef.current.playbackRate = s;
  };

  const skip = (secs) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(
      0,
      Math.min((videoRef.current.currentTime || 0) + secs, videoRef.current.duration || 0)
    );
  };

  return (
    <div className="lms-container" ref={containerRef}>
      <header className="lms-header">
        <Link to="/courses" className="back-btn">
          ← Back
        </Link>

        <h1 className="course-title">{course.title}</h1>

        <button
          className="sidebar-toggle"
          onClick={() => setIsSidebarOpen((s) => !s)}
          title="Toggle playlist"
        >
          {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <div className="lms-body">
        <div className="video-section">
          <div className="player-wrapper" ref={playerWrapperRef}>
            <div
              className={`video-wrapper ${isMini ? "mini-mode" : ""}`}
              onDoubleClick={(e) => handleTap(e)}
              onClick={(e) => {
                // single click toggles play/pause
                // we check if double click will handle skip—so use single click play/pause only
                // small debounce: if double-click arrives, it handles skip; we keep simple: toggle on single click
                if (!videoRef.current) return;
                if (videoRef.current.paused) videoRef.current.play();
                else videoRef.current.pause();
              }}
            >
              <video
                ref={videoRef}
                className="real-video-player"
                controls
                controlsList="nodownload"
                preload="metadata"
                onEnded={handleVideoEnded}
                onLoadedMetadata={() => {
                  if (videoRef.current) {
                    videoRef.current.playbackRate = speed;
                    videoRef.current.muted = muted;
                  }
                }}
              />
              <div className="skip-flash" ref={flashRef}>
                +10s
              </div>
            </div>

            {/* Controls bar (custom small controls) */}
            <div className="player-controls">
              <div className="left-controls">
                <button
                  className="control-btn"
                  onClick={() =>
                    videoRef.current && (videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause())
                  }
                  title="Play / Pause"
                >
                  {videoRef.current && !videoRef.current.paused ? <Pause size={16} /> : <Play size={16} />}
                </button>

                <button className="control-btn" onClick={() => skip(-10)} title="Rewind 10s">
                  <ChevronLeft size={16} />
                </button>

                <button className="control-btn" onClick={() => skip(10)} title="Forward 10s">
                  <ChevronRight size={16} />
                </button>

                <div className="speed-select">
                  <label>Speed</label>
                  <select value={speed} onChange={(e) => changeSpeed(Number(e.target.value))}>
                    {[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((s) => (
                      <option key={s} value={s}>
                        {s}x
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="right-controls">
                <button className="control-btn" onClick={toggleCaptions} title="Toggle captions">
                  {captionsOn ? <MessageCircle size={16} /> : <Slash size={16} />}
                </button>

                <button className="control-btn" onClick={toggleMute} title="Mute / Unmute">
                  <Volume2 size={16} />
                </button>

                <button className="control-btn" title="Download (disabled)">
                  <Download size={16} />
                </button>
              </div>
            </div>

            {/* Video meta (title/chapters) */}
            <div className="video-info">
              <h2>{currentVideo.title}</h2>
              <div className="video-meta">
                <span>
                  <Clock size={16} /> {currentVideo.duration}
                </span>

                {videoProgress[selectedVideo] && (
                  <span className="completed">
                    <CheckCircle size={16} /> Completed
                  </span>
                )}

                <div className="chapter-list">
                  {currentVideo.chapters?.map((c, i) => (
                    <button
                      key={i}
                      className="chapter-btn"
                      onClick={() => {
                        if (!videoRef.current) return;
                        videoRef.current.currentTime = c.t;
                      }}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mini player (floating) */}
          {isMini && (
            <div className="floating-mini">
              <video ref={videoRef} className="mini-player" />
            </div>
          )}
        </div>

        {/* SIDEBAR / PLAYLIST */}
        <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
          <div className="sidebar-header">
            <h3>Course Content</h3>
            <span>{course.videos.length} Lectures</span>
          </div>

          <div className="playlist">
            {course.videos.map((video, index) => (
              <div
                key={video.id}
                className={`playlist-item ${selectedVideo === index ? "active" : ""} ${
                  video.locked && !isPurchased ? "locked" : ""
                }`}
                onClick={() => handleVideoClickInList(index)}
                title={video.locked && !isPurchased ? "Locked" : video.title}
              >
                <div className="item-left">
                  {selectedVideo === index ? (
                    <Play size={18} fill="white" />
                  ) : videoProgress[index] ? (
                    <CheckCircle size={18} className="completed-icon" />
                  ) : (
                    <div className="play-circle" />
                  )}

                  <span className="item-title">{video.title}</span>
                </div>

                <div className="item-right">
                  {video.locked && !isPurchased && <Lock size={14} />}
                  <span>{video.duration}</span>
                </div>
              </div>
            ))}
          </div>

          {!isPurchased && (
            <div className="buy-sidebar">
              <p>Unlock all videos + certificate</p>
              <Link to="/checkout" className="buy-btn-full">
                Buy Course • ₹{course.price || "Free"}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
