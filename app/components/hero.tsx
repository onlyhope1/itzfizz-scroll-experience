"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const navigation = [
  { label: "Home", href: "#home" },
  { label: "Product", href: "#product" },
  { label: "Features", href: "#features" },
  { label: "Contact", href: "#contact" },
];

const metrics = [
  { value: "200%", label: "Faster", detail: "performance" },
  { value: "150+", label: "Happy", detail: "clients" },
  { value: "99%", label: "Uptime", detail: "reliability" },
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const context = gsap.context(() => {
      const intro = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.85 },
      });

      intro
        .fromTo(
          ".hero-brand, .hero-nav, .hero-cta",
          { autoAlpha: 0, y: -10 },
          { autoAlpha: 1, y: 0, stagger: 0.08 },
        )
        .fromTo(
          ".hero-title-line",
          { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, y: 0, stagger: 0.16, duration: 1 },
          "-=0.2",
        )
        .fromTo(
          ".hero-tagline, .hero-stat, .hero-scroll-cue",
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.65 },
          "-=0.45",
        );
    }, hero);

    return () => context.revert();
  }, []);

  return (
      <section className="hero" id="home" ref={heroRef} aria-label="ITZFIZZ introduction">
        <Image
          className="hero-image"
          src="/images/hero-car.png"
          alt="A black sports car driving along a rain-slick mountain road at night"
          fill
          priority
          sizes="100vw"
          quality={90}
        />
        <div className="hero-shade" aria-hidden="true" />

        <header className="site-header">
          <a className="hero-brand" href="#home" aria-label="ITZFIZZ home">
            ITZFIZZ
          </a>
          <nav className="hero-nav" aria-label="Main navigation">
            {navigation.map((item) => (
              <a href={item.href} key={item.label}>
                {item.label}
              </a>
            ))}
          </nav>
          <a className="hero-cta" href="#contact">
            Get Started
          </a>
        </header>

        <div className="hero-copy">
          <p className="hero-kicker">Ideas in motion</p>
          <h1 className="hero-title">
            <span className="hero-title-line">WELCOME</span>
            <span className="hero-title-line">
              ITZ<span className="accent">FIZZ</span>
            </span>
          </h1>
          <p className="hero-tagline">Drive ideas. Build tomorrow.</p>
        </div>

        <div className="hero-metrics" id="features" aria-label="Our impact">
          {metrics.map((metric) => (
            <div className="hero-stat" key={metric.label}>
              <p className="hero-stat-value">{metric.value}</p>
              <p className="hero-stat-label">
                {metric.label}
                <br />
                {metric.detail}
              </p>
            </div>
          ))}
        </div>

        <a className="hero-scroll-cue" href="#product">
          <span className="scroll-icon" aria-hidden="true">
            <span />
          </span>
          <span>Scroll to explore</span>
        </a>

        <aside className="hero-index" aria-label="Section 1 of 4">
          <span className="hero-index-current">01</span>
          <span className="hero-index-line" />
          <span>02</span>
          <span>03</span>
          <span>04</span>
        </aside>

        <span className="hero-bottom-line" aria-hidden="true" />
      </section>
  );
}
