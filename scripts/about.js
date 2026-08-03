/*==========================================
        GROUP FOOTPRINT
==========================================*/

document.addEventListener("DOMContentLoaded", () => {

  const impactSection = document.querySelector(".impact-section");

  const worldMap = document.getElementById("worldMap");

  const counters = document.querySelectorAll(".counter");

  let hasAnimated = false;

  const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting && !hasAnimated) {

        hasAnimated = true;

        worldMap.classList.add("show");

        animateCounters();

        locateVisitor();

      }

    });

  }, {

    threshold: 0.4

  });

  observer.observe(impactSection);

});

/*==========================================
        COUNTERS
==========================================*/

/*==========================================
        PREMIUM COUNTERS
==========================================*/

function animateCounters() {

  const counters = document.querySelectorAll(".counter");

  counters.forEach(counter => {

    const target = Number(counter.dataset.target);

    const duration = 2200;

    const start = performance.now();

    function update(time) {

      const progress = Math.min((time - start) / duration, 1);

      const ease = 1 - Math.pow(1 - progress, 3);

      counter.textContent = Math.floor(ease * target) + "+";

      if (progress < 1) {

        requestAnimationFrame(update);

      }

    }

    requestAnimationFrame(update);

  });

}
/*==========================================
        USER LOCATION
==========================================*/

function locateVisitor() {

  if (!navigator.geolocation) {

    return;

  }

  navigator.geolocation.getCurrentPosition(position => {

    const lat = position.coords.latitude;

    const lng = position.coords.longitude;

    placeMarker(lat, lng);

  });

}

/*==========================================
        MAP CONVERSION
==========================================*/

function placeMarker(lat, lng) {

  const pin = document.getElementById("user-location-pin");

  const map = document.querySelector(".map-wrapper");

  const x = ((lng + 180) / 360) * 100;

  const y = ((90 - lat) / 180) * 100;

  pin.style.left = x + "%";

  pin.style.top = y + "%";

  pin.style.display = "block";

  pin.setAttribute("title", "You are here");
}