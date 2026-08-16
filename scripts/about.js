console.log("ABOUT.JS IS RUNNING");

/*======================================================
        ABOUT PAGE — GLOBAL FOOTPRINT & IMPACT
======================================================*/

document.addEventListener("DOMContentLoaded", () => {

  const impactSection =
    document.querySelector(".about-impact-section");

  const worldMap =
    document.getElementById("worldMap");

  const counters =
    document.querySelectorAll(
      ".about-impact-section .counter"
    );

  const pin =
    document.getElementById("user-location-pin");


  /*====================================================
        SAFETY CHECK
  ====================================================*/

  if (!impactSection || !worldMap) {
    return;
  }


  /*====================================================
        ANIMATION STATE
  ====================================================*/

  let hasAnimated = false;


  /*====================================================
        INTERSECTION OBSERVER
  ====================================================*/

  const observer = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (
          entry.isIntersecting &&
          !hasAnimated
        ) {

          hasAnimated = true;


          /* Map animation */

          worldMap.classList.add("show");


          /* Counter animation */

          animateCounters();


          /* User location */

          locateVisitor();

        }

      });

    },
    {

      threshold: 0.15,
      rootMargin: "0px 0px -80px 0px"

    }
  );


  observer.observe(impactSection);


  /*====================================================
        COUNTER ANIMATION
  ====================================================*/

  function animateCounters() {

    counters.forEach(counter => {

      const target =
        Number(counter.dataset.target);

      const duration = 2200;

      const start =
        performance.now();


      function update(time) {

        const progress =
          Math.min(
            (time - start) / duration,
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
          value + "+";


        if (progress < 1) {

          requestAnimationFrame(update);

        }

      }


      requestAnimationFrame(update);

    });

  }


  /*====================================================
        USER LOCATION
  ====================================================*/

  function locateVisitor() {

    if (!navigator.geolocation) {

      return;

    }


    navigator.geolocation.getCurrentPosition(

      position => {

        const lat =
          position.coords.latitude;

        const lng =
          position.coords.longitude;


        placeMarker(lat, lng);

      },

      error => {

        console.warn(
          "Unable to determine visitor location.",
          error.message
        );

      }

    );

  }


  /*====================================================
        MAP LOCATION CONVERSION
  ====================================================*/

  function placeMarker(lat, lng) {

    if (!pin || !worldMap) {

      return;

    }


    /*
      Convert longitude to horizontal position.
      -180 → 0%
       180 → 100%
    */

    const x =
      ((lng + 180) / 360) * 100;


    /*
      Convert latitude to vertical position.
      90 → 0%
      -90 → 100%
    */

    const y =
      ((90 - lat) / 180) * 100;


    pin.style.left =
      `${x}%`;

    pin.style.top =
      `${y}%`;


    pin.style.display =
      "block";


    pin.setAttribute(
      "title",
      "You are here"
    );

  }

});