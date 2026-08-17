/*======================================================
        INVESTORS — PERFORMANCE & VALUE
======================================================*/

document.addEventListener("DOMContentLoaded", () => {

  const performanceSection =
    document.querySelector(".investors-performance-section");

  if (!performanceSection) {
    return;
  }


  /*====================================================
        COUNTERS
  ====================================================*/

  const counters =
    performanceSection.querySelectorAll(".counter");


  let hasAnimated = false;


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

            observer.unobserve(performanceSection);

          }

        });

      },
      {
        threshold: 0.35
      }
    );


  observer.observe(performanceSection);


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

        const easedProgress =
          1 - Math.pow(
            1 - progress,
            3
          );


        const value =
          Math.floor(
            easedProgress * target
          );


        counter.textContent =
          `${value}+`;


        if (progress < 1) {

          requestAnimationFrame(updateCounter);

        } else {

          counter.textContent =
            `${target}+`;

        }

      }


      requestAnimationFrame(updateCounter);

    });

  }

});