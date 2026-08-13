/*======================================================
        HOMEPAGE — HERO SECTION
======================================================*/

document.addEventListener("DOMContentLoaded", () => {

  const herometricSection =
    document.querySelector(".rds-herometric-section");

  const counters =
    herometricSection?.querySelectorAll(".counter");

  let hasAnimated = false;


  /*====================================================
        SAFETY CHECK
  ====================================================*/

  if (!herometricSection) {

    return;

  }

  /*====================================================
        SECTION OBSERVER
  ====================================================*/

  const observer = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (
          entry.isIntersecting &&
          !hasAnimated
        ) {

          hasAnimated = true;

          /*--------------------------------------------
                ANIMATE COUNTERS
          --------------------------------------------*/

          animateImpactCounters(
            counters
          );

        }

      });

    },
    {
      threshold: 0.35
    }
  );


  observer.observe(herometricSection);

});








/*======================================================
        HOMEPAGE — GLOBAL FOOTPRINT & IMPACT
======================================================*/

document.addEventListener("DOMContentLoaded", () => {

  const footprintSection =
    document.querySelector(".rds-footprint-section");

  const worldMap =
    footprintSection?.querySelector(".rds-map");

  const counters =
    footprintSection?.querySelectorAll(".counter");

  const userPin =
    document.getElementById("user-location-pin");

  let hasAnimated = false;


  /*====================================================
        SAFETY CHECK
  ====================================================*/

  if (!footprintSection) {

    return;

  }

  /*====================================================
        SECTION OBSERVER
  ====================================================*/

  const observer = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (
          entry.isIntersecting &&
          !hasAnimated
        ) {

          hasAnimated = true;


          /*--------------------------------------------
                REVEAL WORLD MAP
          --------------------------------------------*/

          if (worldMap) {

            worldMap.classList.add("show");

          }


          /*--------------------------------------------
                ANIMATE COUNTERS
          --------------------------------------------*/

          animateImpactCounters(
            counters
          );


          /*--------------------------------------------
                LOCATE VISITOR
          --------------------------------------------*/

          locateVisitor();

        }

      });

    },
    {
      threshold: 0.35
    }
  );


  observer.observe(footprintSection);

});


/*======================================================
        IMPACT COUNTERS
======================================================*/

function animateImpactCounters(counters) {

  if (!counters?.length) {

    return;

  }


  counters.forEach((counter) => {

    const target =
      Number(counter.dataset.target);

    if (
      !Number.isFinite(target)
    ) {

      return;

    }


    const duration = 2200;

    const start =
      performance.now();


    /*----------------------------------------------
          COUNTER UPDATE
    ----------------------------------------------*/

    function updateCounter(time) {

      const progress =
        Math.min(
          (time - start) / duration,
          1
        );


      /* Ease-out cubic */

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
        `${value}+`;


      if (progress < 1) {

        requestAnimationFrame(
          updateCounter
        );

      }

    }


    requestAnimationFrame(
      updateCounter
    );

  });

}


/*======================================================
        USER LOCATION
======================================================*/

function locateVisitor() {

  if (
    !navigator.geolocation
  ) {

    return;

  }


  navigator.geolocation.getCurrentPosition(

    (position) => {

      const {
        latitude,
        longitude
      } = position.coords;


      placeVisitorMarker(
        latitude,
        longitude
      );

    },

    () => {

      /*
        Location access denied or unavailable.

        Nothing happens because the map already
        contains the primary ROGONTRA locations.
      */

    },

    {
      enableHighAccuracy: false,

      timeout: 8000,

      maximumAge: 300000

    }

  );

}


/*======================================================
        MAP COORDINATE CONVERSION
======================================================*/

function placeVisitorMarker(
  latitude,
  longitude
) {

  const pin =
    document.getElementById(
      "user-location-pin"
    );

  const map =
    document.querySelector(
      ".rds-map-wrapper"
    );


  if (
    !pin ||
    !map
  ) {

    return;

  }


  /*----------------------------------------------
        CONVERT LAT/LNG TO MAP POSITION
  ----------------------------------------------*/

  const x =
    ((longitude + 180) / 360) * 100;

  const y =
    ((90 - latitude) / 180) * 100;


  /*----------------------------------------------
        KEEP MARKER INSIDE MAP
  ----------------------------------------------*/

  const safeX =
    Math.max(
      1,
      Math.min(
        x,
        99
      )
    );

  const safeY =
    Math.max(
      1,
      Math.min(
        y,
        99
      )
    );


  /*----------------------------------------------
        POSITION USER MARKER
  ----------------------------------------------*/

  pin.style.left =
    `${safeX}%`;

  pin.style.top =
    `${safeY}%`;

  pin.style.display =
    "block";


  pin.setAttribute(
    "title",
    "Your location"
  );

  pin.setAttribute(
    "aria-label",
    "Your current location"
  );

}