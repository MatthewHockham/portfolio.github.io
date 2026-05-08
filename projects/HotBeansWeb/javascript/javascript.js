
/*  */

/* Activates navbar stack menu */

function toggleNavbar() {
    const nav = document.getElementById("navbar");
    nav.classList.toggle("responsive");
}

document.querySelectorAll('#navbar .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const nav = document.getElementById("navbar");
        nav.classList.remove('responsive');
    });
});

function toggleForm() {
    const overlay = document.getElementById('formPopup');
    overlay.classList.toggle('show');
}

(()=> {

    /* Giving 'active' class to link when on page */

    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    function setActiveClass(link) {
        navLinks.forEach(nav => nav.classList.remove('active'));
        link.classList.add('active');
    }

    // Highlight active on click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            setActiveClass(link);
        });
    });

    // Highlight active on scroll (using halfway point)
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const triggerPoint = window.innerHeight / 2;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= triggerPoint && rect.bottom >= triggerPoint) {
                currentSectionId = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
    
    /* Carousel for Team Members */

    const track = document.getElementById("carousel-track");
    const container = document.querySelector(".carousel-container");
    let cards = Array.from(document.querySelectorAll(".profile-card"));

    // Cloning for infinite loop
    const firstClone = cards[0].cloneNode(true);
    const lastClone = cards[cards.length - 1].cloneNode(true);
    track.insertBefore(lastClone, cards[0]);
    track.appendChild(firstClone);

    // Update cards list for looping
    cards = Array.from(document.querySelectorAll(".profile-card"));

    let current = 1;

    function getVisibleCount() {
        const width = window.innerWidth;
        if (width >= 900) return 2;
        if (width >= 600) return 1;
        return 1;
    }

    function updateCarousel() {
        const containerWidth = container.offsetWidth;
        const cardWidth = containerWidth / getVisibleCount();
        track.style.transition = "transform 0.4s ease-in-out";
        track.style.transform = `translateX(-${cardWidth * current}px)`;
    }

    function moveCarousel(direction) {
        const visible = getVisibleCount();
        const containerWidth = container.offsetWidth;
        const cardWidth = containerWidth / visible;

        current += direction;
        track.style.transition = "transform 0.4s ease-in-out";
        track.style.transform = `translateX(-${cardWidth * current}px)`;

        track.addEventListener("transitionend", () => {
            if (current === 0) {
                current = cards.length - 2;
                track.style.transition = "none";
                track.style.transform = `translateX(-${cardWidth * current}px)`;
            } else if (current === cards.length - 1) {
                current = 1;
                track.style.transition = "none";
                track.style.transform = `translateX(-${cardWidth * current}px)`;
            }
            prevTranslate = -cardWidth * current;
        }, { once: true });
    }

    window.moveCarousel = moveCarousel
    
    window.addEventListener("resize", () => {
        setTimeout(() => updateCarousel(), 100);
    });

    window.addEventListener("load", () => {
        setTimeout(() => updateCarousel(), 100);
    });



    /* Carousel for Courses Section */

    const coursesTrack = document.getElementById("carousel-courses-track");
    const courseContainer = document.querySelector(".carousel-courses-container");
    let courseCards = Array.from(document.querySelectorAll(".courses-card"));

    const firstCourseClone = courseCards[0].cloneNode(true);
    const lastCourseClone = courseCards[courseCards.length - 1].cloneNode(true);
    coursesTrack.insertBefore(lastCourseClone, courseCards[0]);
    coursesTrack.appendChild(firstCourseClone);
    courseCards = Array.from(document.querySelectorAll(".courses-cards"));

    let coursesCurrent = 1;

    function getVisibleCoursesCount() {
        const width = window.innerWidth;
        if (width >= 900) return 2;
        if (width >= 600) return 1;
        return 1;
    }

    function updateCoursesCarousel() {
        const coursesContainerWidth = courseContainer.offsetWidth;
        const courseCardWidth = coursesContainerWidth / getVisibleCoursesCount();
        coursesTrack.style.transition = "transform 0.4s ease-in-out";
        coursesTrack.style.transform = `translateX(-${courseCardWidth * coursesCurrent}px)`;
    }

    function moveCoursesCarousel(courseDirection) {
        const coursesVisible = getVisibleCoursesCount();
        const coursesContainerWidth = courseContainer.offsetWidth;
        const courseCardWidth = coursesContainerWidth / coursesVisible;

        coursesCurrent += courseDirection;
        coursesTrack.style.transition = "transform 0.4s ease-in-out";
        coursesTrack.style.transform = `translateX(-${courseCardWidth * coursesCurrent}px)`;

        coursesTrack.addEventListener("transitionend", () => {
            if (coursesCurrent === 0) {
                coursesCurrent = courseCards.length - 2;
                coursesTrack.style.transition = "none";
                coursesTrack.style.transform = `translateX(-${courseCardWidth * coursesCurrent}px)`;
            } else if (coursesCurrent === courseCards.length - 1) {
                coursesCurrent = 1;
                coursesTrack.style.transition = "none";
                coursesTrack.style.transform = `translateX(-${courseCardWidth * coursesCurrent}px)`;
            }
            prevCourseTranslate = -courseCardWidth * coursesCurrent;
        }, { once: true});
    }

    window.moveCoursesCarousel = moveCoursesCarousel

    window.addEventListener("resize", () => {
        setTimeout(() => updateCoursesCarousel(), 100)
    })

    window.addEventListener("load", () => {
        setTimeout(() => updateCoursesCarousel(), 100)
    })

})();

/* Search bar */

document.getElementById('search-form').onsubmit = function() {
    var query = document.getElementById('text').value;
    window.location.href = 'search.php?q=' + encodeURIComponent(query);
    return false;
}

/* Form Application */



// document.addEventListener("DOMContentLoaded", () => {
//     document.querySelectorAll('.btn-apply').forEach(button => {
//     button.addEventListener('click', openForm);
//     });
// });



// function openForm() {
//     const overlay = document.getElementById('formPopup');
//     overlay.classList.toggle('show');
//     if (overlay.classList.contains('show')) {
//         currentTab = 0;
//         showTab(currentTab);
//     } else {
//         console.error("formPopup not found")
//     }
// }

// function openForm() {
//     const overlay = document.getElementById('formPopup');
//     if (!overlay) {
//         console.error("formPopup not found");
//         return;
//     }

//     overlay.classList.add('show');
//     currentTab = 0;
//     showTab(currentTab);
// }

// function showTab(n) {
//     var x = document.getElementsByClassName("inputs");
//     for(let i = 0; i < x.length; i++) {
//         x[i].style.display = "none";
//     }
//     x[n].style.display = "block";

//     document.getElementById("prevBtn").style.display = (n === 0) ? "none" : "inline";

//     if (n === (x.length - 1)) {
//         document.getElementById("nextBtn").innerHTML = "Submit";
//     } else {
//         document.getElementById("nextBtn").innerHTML = "Next";
//     }

    // if (n === 0) {
    //     document.getElementById("prevBtn").style.display = "none";
    // } else {
    //     document.getElementById("prevBtn").style.display = "inline";
    // }
// }

// function formButton(n) {
//     var x = document.getElementsByClassName("inputs");

//     if (!x[currentTab]) {
//         console.error("Invalid currentTab index:", currentTab);
//         return false;
//     }

//     if (n == 1 && !validateForm()) return false;

//     x[currentTab].style.display = "none";

//     currentTab += n;

//     if (currentTab < 0) currentTab = 0;
//     if (currentTab >= x.length) {
//         document.getElementById("form").submit();
//         return false;
//     }

//     showTab(currentTab);
// }

// function validateForm() {
//     var x, y, i, valid = true;
//     x = document.getElementsByClassName("inputs");
//     y = x[currentTab].getElementsByTagName("input");
//     for (i = 0; i < y.length; i++) {
//         if (y[i].value == "") {
//             y[i].className += " invalid";
//             valid = false;
//         }
//     }
//     if (valid) {
//         x[currentTab].className += " finish";
//     }
//     return valid;
// }

// function validateForm() {
//     var x = document.getElementsByClassName("inputs");

//     if (!x[currentTab]) {
//         console.error("Invalid currentTab index in validateForm:", currentTab);
//         return false;
//     }

//     var y = x[currentTab].getElementsByTagName("input");
//     var valid = true;

//     for (var i = 0; i < y.length; i++) {
//         if (y[1].value == "") {
//             y[i].className += " invalid";
//             valid = false;
//         }
//     }
//     if (valid) {
//         x[currentTab].className += " finish";
//     }
//     return valid;
// }

// function fixStepIndicator(n) {
//     var i, x = document.getElementsByClassName("step");
//     for(i = 0; i < x.length; i++) {
//         x[i].className = x[i].className.replace(" active", "");
//     }
//     x[n].className += " active";
// }

// const form = document.getElementById('form');
// form.addEventListener("submit", function(e) {
//     e.preventDefault(); // prevent actual submission (testing the form)
//     console.log("Submit handler fired");

//     // Closing the form
//     const overlay = document.getElementById('formPopup');
//     overlay.classList.remove('show');

//     // Show message
//     const formSubmitted = document.getElementById('formSubmitted');
//     if (formSubmitted) {
//         formSubmitted.style.display = "block";
//         console.log("Showing formSubmitted message");
//     } else {
//         console.error("formSubmitted element not found")
//     }

//     // Hide message after 3 seconds
//     setTimeout(() => {
//         formSubmitted.style.display = "none";
//         form.reset();
//     }, 3000);
// });

// var currentTab = 0;
// showTab(currentTab);

// function showTab(n) {
//     var x = document.getElementsByClassName("inputs");
//     x[n].style.display = "block";
//     if (n == 0) {
//         document.getElementById("prevBtn").style.display = "none";
//     } else {
//         document.getElementById("prevBtn").style.display = "inline";
//     }
//     if (n == (x.length - 1)) {
//         document.getElementById("nextBtn").innerHTML = "Submit";
//     } else {
//         document.getElementById("nextBtn").innerHTML = "Next";
//     }
//     fixStepIndicator(n)
// }

// function formButton(n) {
//     var x = document.getElementsByClassName("inputs");
//     if (n == 1 && !validateForm()) return false;
//     x[currentTab].style.display = "none";
//     currentTab += n;
//     if (currentTab >= x.length) {
//         document.getElementById("form").submit();
//         return false;
//     }
//     showTab(currentTab);
// }

    // let current = 0;
    // const cardWidth = 300 + 24;
    // const cards = document.getElementById("profile-cards");

    // function updateCarousel() {
    //     cards.style.transform = `translateX(-${current * cardWidth})px`;
    // }

    // function nxtBtn() {
    //     const maxWidth = cards.children.length - 1;
    //     if (current < maxWidth) {
    //         current++;
    //         updateCarousel();
    //     }
    // }

    // function prvBtn() {
    //     if (current > 0) {
    //         current--;
    //         updateCarousel();
    //     }
    // }