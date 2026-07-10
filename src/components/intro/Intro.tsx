"use client";

import { useEffect, useState } from "react";
import styles from "./Intro.module.css";

type IntroStage = "welcome" | "hello" | "fade" | "complete";

export default function Intro() {
  const [stage, setStage] = useState<IntroStage>("welcome");

  useEffect(() => {
    if (localStorage.getItem("introSeen") === "true") {
      setTimeout(() => {
        setStage("complete");
      }, 0);
    }
  }, []);
  const isComplete = stage === "complete";

  useEffect(() => {
    const introActive = !isComplete;

    if (!introActive) {
      return;
    }

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isComplete]);

  useEffect(() => {
    const heroHidden = stage === "welcome" || stage === "hello";

    document.body.classList.toggle("intro-active", heroHidden);
  }, [stage]);

  useEffect(() => {
    return () => {
      document.body.classList.remove("intro-active");
    };
  }, []);

  useEffect(() => {
    if (stage === "complete") {
      return;
    }

    if (stage === "welcome") {
      console.log("INTRO: WELCOME");

      const helloTimer = window.setTimeout(() => {
        setStage("hello");
      }, 2000);

      return () => {
        window.clearTimeout(helloTimer);
      };
    }

    if (stage === "hello") {
      console.log("INTRO: HELLO");

      const fadeTimer = window.setTimeout(() => {
        setStage("fade");
      }, 2000);

      return () => {
        window.clearTimeout(fadeTimer);
      };
    }

    const completeTimer = window.setTimeout(() => {
      console.log("INTRO: COMPLETE");
      localStorage.setItem("introSeen", "true");
      setStage("complete");
    }, 500);

    return () => {
      window.clearTimeout(completeTimer);
    };
  }, [stage]);

  const completeIntro = () => {
    console.log("INTRO: COMPLETE");
    localStorage.setItem("introSeen", "true");
    setStage("complete");
  };

  if (isComplete) {
    return null;
  }

  return (
    <div className={`${styles.overlay} ${stage === "fade" ? styles.hidden : ""}`}>
      <img
        className={styles.image}
        src="/intro-silhouette.webp"
        alt=""
        aria-hidden="true"
      />
      <div className={styles.darkOverlay} />
      <button className={styles.skip} type="button" onClick={completeIntro}>
        SKIP
      </button>
      <div
        className={`${styles.text} ${
          stage === "welcome" ? styles.welcomeText : styles.helloText
        } ${stage === "fade" ? styles.textHidden : ""}`}
      >
        {stage === "welcome" ? "WELCOME" : "HELLO, I'M"}
      </div>
    </div>
  );
}
