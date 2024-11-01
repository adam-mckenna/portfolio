import React, { useEffect, useState } from "react";
import hasScrolledToTop from "../helpers/hasScrolledToTop";

const Links: { [key: string]: string } = {
  // Targetting the '#top' as this will take the user back to the top of the page,
  // instead of slightly below if we just used the '#about' anchor.
  top: "About",
  experience: "Experience",
  portfolio: "Portfolio",
  "career-breaks": "Career Breaks",
};

const ObserverOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const Nav = () => {
  const [visibleSections, setVisibleSections] = useState(new Set());

  const [currentView, setCurrentView] = useState("top");

  const isAtTop = hasScrolledToTop();

  const ObserverCallback: IntersectionObserverCallback = (entries) => {
    entries.forEach(({ isIntersecting, target }) =>
      setVisibleSections(
        isIntersecting
          ? (prev) => new Set(prev).add(target)
          : (prev) => {
              const newSet = new Set(prev);
              newSet.delete(target);
              return newSet;
            },
      ),
    );
  };

  useEffect(() => {
    if (isAtTop) {
      setCurrentView("top");
    }
  }, [isAtTop]);

  useEffect(() => {
    const navLinks = [
      document.getElementById("about"),
      document.getElementById("experience"),
      document.getElementById("portfolio"),
      document.getElementById("career-breaks"),
    ];

    const observer = new IntersectionObserver(
      ObserverCallback,
      ObserverOptions,
    );

    navLinks.forEach((element) => observer.observe(element as HTMLElement));

    return () =>
      navLinks.forEach((element) => observer.unobserve(element as HTMLElement));
  }, []);

  useEffect(() => {
    const elementsInView = visibleSections.entries().next().value;
    const latestElement = elementsInView && (elementsInView[0] as HTMLElement);

    if (latestElement) {
      const targetAnchor =
        latestElement.id === "about" ? "top" : latestElement.id;
      setCurrentView(targetAnchor);
    }
  }, [visibleSections]);

  return (
    <nav className="max-lg:hidden lg:mt-12">
      <ul>
        {Object.keys(Links).map((link, i) => (
          <li key={i}>
            <a
              className={`${i >= 1 ? "mt-4" : ""} ${currentView === link ? "" : "opacity-50"} block text-xl font-bold uppercase hover:opacity-100 focus:opacity-100`}
              href={`#${Links[link]}`}
            >
              {Links[link]}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
