/* ==========================================
   YASHGIRI GAUSWAMI PORTFOLIO
   JAVASCRIPT
========================================== */


/* ==========================================
   ELEMENTS
========================================== */

const body = document.body;

const header =
    document.querySelector(".site-header");

const navToggle =
    document.getElementById("navToggle");

const navMenu =
    document.getElementById("navMenu");

const navLinks =
    document.querySelectorAll(".nav-link");

const themeToggle =
    document.getElementById("themeToggle");

const themeIcon =
    document.getElementById("themeIcon");

const year =
    document.getElementById("year");

const projectCards =
    document.querySelectorAll(".project-card");

const filterButtons =
    document.querySelectorAll(".filter-btn");

const contactForm =
    document.getElementById("contactForm");

const formStatus =
    document.getElementById("formStatus");



/* ==========================================
   FOOTER YEAR
========================================== */

year.textContent =
    new Date().getFullYear();



/* ==========================================
   MOBILE NAVIGATION
========================================== */

function closeMenu() {

    navMenu.classList.remove("open");

    navToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    navToggle.setAttribute(
        "aria-label",
        "Open navigation"
    );
}


navToggle.addEventListener(
    "click",
    function () {

        const isOpen =
            navMenu.classList.toggle("open");


        navToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );


        navToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation"
                : "Open navigation"
        );

    }
);



/* Close menu after clicking link */

navLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            closeMenu
        );

    }
);



/* Close menu outside */

document.addEventListener(
    "click",
    function (event) {

        if (
            !navMenu.contains(event.target) &&
            !navToggle.contains(event.target)
        ) {

            closeMenu();

        }

    }
);



/* ==========================================
   HEADER SCROLL EFFECT
========================================== */

function updateHeader() {

    if (window.scrollY > 15) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}


updateHeader();


window.addEventListener(
    "scroll",
    updateHeader,
    {
        passive: true
    }
);



/* ==========================================
   ACTIVE NAVIGATION
========================================== */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


const sectionObserver =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(
                function (entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        navLinks.forEach(
                            function (link) {

                                link.classList.toggle(

                                    "active",

                                    link.getAttribute(
                                        "href"
                                    ) ===
                                    `#${entry.target.id}`

                                );

                            }
                        );

                    }

                }
            );

        },

        {
            rootMargin:
                "-30% 0px -55% 0px",

            threshold: 0
        }

    );


sections.forEach(
    function (section) {

        sectionObserver.observe(
            section
        );

    }
);



/* ==========================================
   DARK / LIGHT MODE
========================================== */

const savedTheme =
    localStorage.getItem(
        "portfolio-theme"
    );


if (savedTheme === "dark") {

    body.dataset.theme =
        "dark";

}



function updateThemeButton() {

    const isDark =
        body.dataset.theme === "dark";


    themeIcon.textContent =
        isDark
            ? "☀"
            : "☾";


    themeToggle.setAttribute(

        "aria-label",

        isDark
            ? "Switch to light mode"
            : "Switch to dark mode"

    );

}


updateThemeButton();



themeToggle.addEventListener(
    "click",
    function () {

        const isDark =
            body.dataset.theme === "dark";


        if (isDark) {

            delete body.dataset.theme;

            localStorage.setItem(
                "portfolio-theme",
                "light"
            );

        } else {

            body.dataset.theme =
                "dark";

            localStorage.setItem(
                "portfolio-theme",
                "dark"
            );

        }


        updateThemeButton();

    }
);



/* ==========================================
   PROJECT FILTERING
========================================== */

filterButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                /* Remove active */

                filterButtons.forEach(
                    function (btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                /* Add active */

                button.classList.add(
                    "active"
                );


                const filter =
                    button.dataset.filter;


                /* Filter projects */

                projectCards.forEach(
                    function (card) {

                        const category =
                            card.dataset.category;


                        const shouldShow =
                            filter === "all" ||
                            category === filter;


                        if (shouldShow) {

                            card.classList.remove(
                                "hidden"
                            );

                        } else {

                            card.classList.add(
                                "hidden"
                            );

                        }

                    }
                );

            }
        );

    }
);



/* ==========================================
   SCROLL REVEAL
========================================== */

const revealItems =
    document.querySelectorAll(
        ".reveal"
    );


const revealObserver =
    new IntersectionObserver(

        function (entries, observer) {

            entries.forEach(
                function (entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },

        {
            threshold: 0.10
        }

    );


revealItems.forEach(
    function (item) {

        revealObserver.observe(
            item
        );

    }
);



/* ==========================================
   CONTACT FORM
========================================== */

/*
    This is a static website.

    Therefore, the contact form uses mailto:
    instead of requiring a backend/server.

    When the user submits the form,
    their default email application opens.
*/


contactForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            document
                .getElementById("name")
                .value
                .trim();


        const email =
            document
                .getElementById("email")
                .value
                .trim();


        const subject =
            document
                .getElementById("subject")
                .value
                .trim();


        const message =
            document
                .getElementById("message")
                .value
                .trim();



        /* Validation */

        if (
            !name ||
            !email ||
            !subject ||
            !message
        ) {

            formStatus.textContent =
                "Please fill in all fields.";

            return;

        }



        /* Email subject */

        const mailSubject =
            encodeURIComponent(
                subject
            );



        /* Email body */

        const mailBody =
            encodeURIComponent(

                `Name: ${name}
Email: ${email}

${message}`

            );



        formStatus.textContent =
            "Opening your email application...";



        /* Open email */

        window.location.href =

            `mailto:yashgoswami3251@gmail.com` +

            `?subject=${mailSubject}` +

            `&body=${mailBody}`;

    }
);