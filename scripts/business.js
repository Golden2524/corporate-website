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