import React, { useEffect, useState } from "react";
import hasScrolledToTop from "../helpers/hasScrolledToTop";

const Links: { [key: string]: any } = {
  About: "top",
  Experience: "experience",
  Portfolio: "portfolio",
  "Career Breaks": "career-breaks",
};

// todo: give this a SERIOUS refactor
const Nav = () => {
  const [visibleElements, setVisibleElements] = useState(new Set());

  const [currentView, setCurrentView] = useState("top");

  const isAtTop = hasScrolledToTop();

  useEffect(() => {
    if (isAtTop) {
      setCurrentView("top");
    }
  }, [isAtTop]);

  useEffect(() => {
    // Select the external element outside React
    const targetElements = [
      document.getElementById("about"),
      document.getElementById("experience"),
      document.getElementById("portfolio"),
      document.getElementById("career-breaks"),
    ];

    // Create the IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add to the visible elements set
            setVisibleElements((prev) => new Set(prev).add(entry.target));
            // console.log(`Element in view: ${entry.target.id}`);
          } else {
            // Remove from the visible elements set
            setVisibleElements((prev) => {
              const newSet = new Set(prev);
              newSet.delete(entry.target);
              return newSet;
            });
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      },
    );

    // Observe each element
    targetElements.forEach((el) => observer.observe(el as HTMLElement));

    // Cleanup observer on unmount
    return () => {
      targetElements.forEach((el) => observer.unobserve(el as HTMLElement));
    };
  }, []);

  useEffect(() => {
    if (
      visibleElements.entries().next().value &&
      visibleElements.entries().next().value[0].id
    ) {
      console.log(currentView);
      setCurrentView(
        visibleElements.entries().next().value[0].id === "about"
          ? "top"
          : visibleElements.entries().next().value[0].id,
      );
    }
  }, [visibleElements]);

  return (
    <nav className="max-lg:hidden lg:mt-12">
      <ul>
        {Object.keys(Links).map((link, i) => (
          <li key={i}>
            <a
              className={`${i >= 1 ? "mt-4" : ""} ${currentView === Links[link] ? "" : "opacity-50"} block text-xl font-bold uppercase hover:opacity-100 focus:opacity-100`}
              href={`#${Links[link]}`}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
