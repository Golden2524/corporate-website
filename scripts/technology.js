/*=====================================================
        TECHNOLOGY HERO — PARALLAX
======================================================*/

document.addEventListener("DOMContentLoaded", () => {

  const hero = document.querySelector(".technology-hero-section");

  if (!hero) return;

  const visual = hero.querySelector(".technology-hero-visual");

  if (!visual) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const isTouchDevice =
    window.matchMedia("(hover: none)").matches;

  if (reduceMotion || isTouchDevice) return;


  hero.addEventListener("mousemove", (event) => {

    const rect = hero.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) /
      rect.width - 0.5;

    const y =
      (event.clientY - rect.top) /
      rect.height - 0.5;


    visual.style.transform = `
      translate3d(
        ${x * 10}px,
        ${y * 8}px,
        0
      )
    `;

  });


  hero.addEventListener("mouseleave", () => {

    visual.style.transform =
      "translate3d(0, 0, 0)";

  });

});