/*======================================================
        BUSINESS PAGE — IMPACT METRICS
======================================================*/

document.addEventListener("DOMContentLoaded", () => {

  const impactSection =
    document.querySelector(".added-java-count");

  if (!impactSection) {
    return;
  }


  const counters =
    impactSection.querySelectorAll(".counter");


  let hasAnimated = false;


  /*====================================================
        COUNTER ANIMATION
  ====================================================*/

  function animateCounters() {

    counters.forEach(counter => {

      const target =
        Number(counter.dataset.target);

      if (isNaN(target)) {
        return;
      }


      const duration = 2200;

      const startTime =
        performance.now();


      function updateCounter(currentTime) {

        const progress =
          Math.min(
            (currentTime - startTime) / duration,
            1
          );


        /* Smooth ease-out */

        const ease =
          1 - Math.pow(
            1 - progress,
            3
          );


        const value =
          Math.floor(
            ease * target
          );


        counter.textContent =
          value;


        if (progress < 1) {

          requestAnimationFrame(updateCounter);

        } else {

          counter.textContent =
            target;

        }

      }


      requestAnimationFrame(updateCounter);

    });

  }


  /*====================================================
        INTERSECTION OBSERVER
  ====================================================*/

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (
            entry.isIntersecting &&
            !hasAnimated
          ) {

            hasAnimated = true;

            animateCounters();

            observer.unobserve(
              impactSection
            );

          }

        });

      },
      {
        threshold: 0.35
      }
    );


  observer.observe(impactSection);

});




document.addEventListener("DOMContentLoaded", () => {
  const scrollLink = document.querySelector(".scroll-indicator");

  if (!scrollLink) return;

  // 1. SMOOTH SCROLL GLIDE
  scrollLink.addEventListener("click", (e) => {
    e.preventDefault();

    // FINDS THE PARENT HERO SECTION, THE GRABS THE SECTION RIGHT BELOW IT
    const currentHero = scrollLink.closest("section") || scrollLink.closest("header");
    const targetSection = currentHero ? currentHero.nextElementSibling : null;

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });

  // 2. FADE & SINK TRANSLATION
  window.addEventListener("scroll", () => {
    const scrollDistance = window.scrollY;
    const fadeDistance = 180;

    if (scrollDistance <= fadeDistance) {
      const calculatedOpacity = 1 - (scrollDistance / fadeDistance);
      const gentleSink = scrollDistance * 0.35;

      scrollLink.style.opacity = calculatedOpacity;
      scrollLink.style.transform = `translate(-50%, ${gentleSink}px)`;
      scrollLink.style.pointerEvents = "auto";
    } else {
      scrollLink.style.opacity = "0";
      scrollLink.style.pointerEvents = "none";
    }
  })
});