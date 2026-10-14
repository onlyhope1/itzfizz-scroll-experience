import Hero from "@/app/components/hero";
import ScrollJourney from "@/app/components/scroll-journey";

export default function Home() {
  return (
    <main>
      <Hero />
      <ScrollJourney />
      <footer className="site-footer" id="contact">
        <div>
          <p className="footer-eyebrow">ITZFIZZ / THE JOURNEY CONTINUES</p>
          <h2>Keep moving forward.</h2>
        </div>
        <div className="footer-links">
          <a
            href="https://github.com/onlyhope1/itzfizz-scroll-experience"
            target="_blank"
            rel="noreferrer"
          >
            Follow the build on GitHub <span aria-hidden="true">↗</span>
          </a>
          <a href="#home">Back to the top ↑</a>
        </div>
      </footer>
    </main>
  );
}
