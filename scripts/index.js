/*=========================================
        NAVBAR SHRINK ON SCROLL
=========================================*/

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

  if (window.scrollY > 60) {

    navbar.classList.add("scrolled");

  } else {

    navbar.classList.remove("scrolled");

  }

});

/*==========================================
        HAMBURGER ANIMATION
==========================================*/

const toggler = document.querySelector(".custom-toggler");

const offcanvas = document.getElementById("mobileMenu");

offcanvas.addEventListener("shown.bs.offcanvas", () => {

  toggler.classList.add("active");

});

offcanvas.addEventListener("hidden.bs.offcanvas", () => {

  toggler.classList.remove("active");

});