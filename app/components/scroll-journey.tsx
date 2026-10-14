"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const chapters = [
  {
    number: "01",
    eyebrow: "A little further",
    title: <>WELCOME<br />ITZ<span className="accent">FIZZ</span></>,
    description: "Good ideas deserve room to move.",
  },
  {
    number: "02",
    eyebrow: "Make every move count",
    title: <>DRIVE<br /><span className="accent">IDEAS.</span></>,
    description: "A clear direction turns momentum into progress.",
  },
  {
    number: "03",
    eyebrow: "Built around the details",
    title: <>BUILT FOR<br /><span className="accent">SPEED</span></>,
    description: "Thoughtful work makes the whole journey feel faster.",
  },
  {
    number: "04",
    eyebrow: "Keep looking ahead",
    title: <>BEYOND<br /><span className="accent">LIMITS</span></>,
    description: "There is always another road worth taking.",
  },
];

export default function ScrollJourney() {
  const journeyRef = useRef<HTMLElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    const journey = journeyRef.current;
    if (!journey) return;

    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const image = journey.querySelector<HTMLElement>(".journey-image");
        const panels = gsap.utils.toArray<HTMLElement>(".journey-panel", journey);
        const blueWash = journey.querySelector<HTMLElement>(".journey-wash--blue");
        const redWash = journey.querySelector<HTMLElement>(".journey-wash--red");

        if (!image || panels.length !== chapters.length || !blueWash || !redWash) return;

        gsap.set(panels.slice(1), { autoAlpha: 0, y: 24 });

        let timeline: gsap.core.Timeline | null = null;
        timeline = gsap.timeline({
          scrollTrigger: {
            id: "story-scroll",
            trigger: journey,
            start: "top top",
            end: () => "+=" + window.innerHeight * chapters.length,
            pin: true,
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
          onUpdate: () => {
            const nextChapter = Math.min(
              chapters.length - 1,
              Math.floor((timeline?.progress() ?? 0) * chapters.length),
            );
            setActiveChapter((current) => current === nextChapter ? current : nextChapter);
          },
        });

        timeline
          .to(image, { scale: 1.06, xPercent: 1, duration: 1, ease: "none" }, 0)
          .to(image, { scale: 1.12, xPercent: 2, duration: 1, ease: "none" }, 1)
          .to(image, { scale: 1.19, xPercent: 4, duration: 1, ease: "none" }, 2)
          .to(image, { scale: 1.25, xPercent: 6, duration: 1, ease: "none" }, 3)
          .to(blueWash, { autoAlpha: 0.28, duration: 1, ease: "none" }, 1)
          .to(redWash, { autoAlpha: 0.25, duration: 1.2, ease: "none" }, 2)
          .to(panels[0], { autoAlpha: 0, y: -20, duration: 0.22 }, 0.78)
          .fromTo(panels[1], { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.28 }, 0.82)
          .to(panels[1], { autoAlpha: 0, y: -20, duration: 0.22 }, 1.78)
          .fromTo(panels[2], { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.28 }, 1.82)
          .to(panels[2], { autoAlpha: 0, y: -20, duration: 0.22 }, 2.78)
          .fromTo(panels[3], { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.28 }, 2.82);
      });
    }, journey);

    return () => {
      context.revert();
      media.revert();
    };
  }, []);

  function goToChapter(index: number) {
    const trigger = ScrollTrigger.getById("story-scroll");
    if (!trigger) return;

    const progress = index / chapters.length;
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";

    window.scrollTo({
      top: trigger.start + (trigger.end - trigger.start) * progress,
      behavior,
    });
  }

  return (
    <section
      className="journey"
      id="product"
      ref={journeyRef}
      aria-label="ITZFIZZ scroll journey"
    >
      <Image
        className="journey-image"
        src="/images/hero-car.png"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        quality={85}
      />
      <div className="journey-shade" aria-hidden="true" />
      <div className="journey-wash journey-wash--blue" aria-hidden="true" />
      <div className="journey-wash journey-wash--red" aria-hidden="true" />
      <div className="journey-light-trail" aria-hidden="true" />

      <div className="journey-topline">
        <p>ITZFIZZ <span>/</span> A story in motion</p>
        <p className="journey-scroll-label">Scroll to explore</p>
      </div>

      <div className="journey-copy">
        {chapters.map((chapter, index) => (
          <article
            className="journey-panel"
            key={chapter.number}
            aria-label={"Chapter " + chapter.number}
          >
            <p className="journey-eyebrow">
              <span>{chapter.number}</span>
              {chapter.eyebrow}
            </p>
            <h2 className="journey-title">{chapter.title}</h2>
            <p className="journey-description">{chapter.description}</p>
            {index === chapters.length - 1 && (
              <a className="journey-end-link" href="#contact">
                Keep going <span aria-hidden="true">↓</span>
              </a>
            )}
          </article>
        ))}
      </div>

      <nav className="journey-progress" aria-label="Journey chapters">
        {chapters.map((chapter, index) => (
          <button
            className={"journey-progress-step" + (activeChapter === index ? " is-active" : "")}
            type="button"
            key={chapter.number}
            aria-label={"Go to chapter " + chapter.number + ": " + chapter.eyebrow}
            aria-current={activeChapter === index ? "step" : undefined}
            onClick={() => goToChapter(index)}
          >
            <span>{chapter.number}</span>
            <span className="journey-progress-track" aria-hidden="true" />
          </button>
        ))}
      </nav>

      <p className="journey-progress-note" aria-hidden="true">
        {chapters[activeChapter].number} <span>/</span> 04
      </p>
    </section>
  );
}
