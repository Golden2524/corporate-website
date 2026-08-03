/*======================================================
            GLOBAL SCROLL REVEAL
======================================================*/

const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {

  revealElements.forEach((element) => {

    const windowHeight = window.innerHeight;

    const revealTop = element.getBoundingClientRect().top;

    const revealPoint = 120;

    if (revealTop < windowHeight - revealPoint) {

      element.classList.add("active");

    }

  });

};

window.addEventListener("scroll", revealOnScroll);

window.addEventListener("load", revealOnScroll);