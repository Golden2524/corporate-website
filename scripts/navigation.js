/*==========================================
        RDS STICKY NAVBAR
==========================================*/

const navbar = document.querySelector(".rds-navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.classList.add("rds-navbar-scrolled");

    } else {

        navbar.classList.remove("rds-navbar-scrolled");

    }

});

/*==========================================
        HAMBURGER
==========================================*/

const toggler = document.querySelector(".rds-navbar-toggler");

toggler.addEventListener("click", () => {

    toggler.classList.toggle("active");

});

document
    .getElementById("mobileMenu")
    .addEventListener("hidden.bs.offcanvas", () => {

        toggler.classList.remove("active");

    });


















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