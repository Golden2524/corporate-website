//======================================================
// TECHNOLOGY LEARNING — SKILL CARD SLIDESHOW
//======================================================

document.addEventListener("DOMContentLoaded", () => {

  const slideshows = document.querySelectorAll(
    ".technology-skill-slideshow"
  );

  slideshows.forEach((slideshow) => {

    const slides = slideshow.querySelectorAll(
      ".technology-skill-slide"
    );

    if (slides.length <= 1) return;

    let currentSlide = 0;

    setInterval(() => {

      slides[currentSlide].classList.remove("active");

      currentSlide =
        (currentSlide + 1) % slides.length;

      slides[currentSlide].classList.add("active");

    }, 4000);

  });

});


//======================================================
// TECHNOLOGY LEARNING — APPLICATION
//======================================================

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("technologyLearningForm");

  if (!form) return;


  /*====================================================
        AUTO-SELECT SKILL FROM SECTION 2
  ====================================================*/

  const applyLinks = document.querySelectorAll(
    '[data-learning-skill]'
  );

  applyLinks.forEach((link) => {

    link.addEventListener("click", () => {

      const skill = link.dataset.learningSkill;

      if (!skill) return;

      const skillInput = form.querySelector(
        `input[name="skills[]"][value="${skill}"]`
      );

      if (skillInput) {
        skillInput.checked = true;
      }

    });

  });


  /*====================================================
        FORM VALIDATION
  ====================================================*/

  form.addEventListener("submit", (event) => {

    event.preventDefault();

    const status =
      document.getElementById(
        "technologyLearningFormStatus"
      );

    const selectedSkills =
      form.querySelectorAll(
        'input[name="skills[]"]:checked'
      );

    if (selectedSkills.length === 0) {

      if (status) {

        status.hidden = false;

        status.textContent =
          "Please select at least one technology skill you would like to learn.";

      }

      return;
    }


    /*==================================================
          SUCCESS STATE
    ==================================================*/

    if (status) {

      status.hidden = false;

      status.textContent =
        "Thank you. Your technology learning application has been received.";

    }

  });

});


//======================================================
// TECHNOLOGY LEARNING — CTA ACCESSIBILITY
//======================================================

document.addEventListener("DOMContentLoaded", () => {

  const cta = document.querySelector(
    ".technology-learning-cta"
  );

  if (!cta) return;


  /*====================================================
        REDUCED MOTION
  ====================================================*/

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

  const updateMotionPreference = () => {

    cta.classList.toggle(
      "technology-learning-reduced-motion",
      reducedMotion.matches
    );

  };

  updateMotionPreference();


  /*====================================================
        LISTEN FOR SYSTEM PREFERENCE CHANGES
  ====================================================*/

  if (typeof reducedMotion.addEventListener === "function") {

    reducedMotion.addEventListener(
      "change",
      updateMotionPreference
    );

  }


  /*====================================================
        KEYBOARD FOCUS
  ====================================================*/

  const ctaLinks = cta.querySelectorAll(
    "a, button"
  );

  ctaLinks.forEach((link) => {

    link.addEventListener("focus", () => {

      cta.classList.add(
        "technology-learning-cta-focused"
      );

    });

    link.addEventListener("blur", () => {

      if (!cta.querySelector(":focus")) {

        cta.classList.remove(
          "technology-learning-cta-focused"
        );

      }

    });

  });

});