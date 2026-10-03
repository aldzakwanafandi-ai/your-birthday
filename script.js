/* =========================================
   ELEMENT
========================================= */

const pinScreen = document.getElementById("pinScreen");
const pinInput = document.getElementById("pinInput");
const openButton = document.getElementById("openButton");
const errorMessage = document.getElementById("errorMessage");

const mainContent = document.getElementById("mainContent");
const birthdayMusic = document.getElementById("birthdayMusic");

const slideshowSection = document.getElementById("slideshowSection");
const slides = document.querySelectorAll(".photo-slide");

const currentPhoto = document.getElementById("currentPhoto");
const progressBar = document.getElementById("progressBar");

const cakeSection = document.getElementById("cakeSection");
const finalSection = document.getElementById("finalSection");

const confettiContainer = document.getElementById("confettiContainer");


/* =========================================
   PIN
========================================= */

const correctPIN = "04102005";

openButton.addEventListener("click", openBirthday);

pinInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        openBirthday();
    }

});


function openBirthday() {

    const enteredPIN = pinInput.value.trim();

    if (enteredPIN === correctPIN) {

        errorMessage.textContent = "";

        // Musik dimulai setelah user menekan tombol
        birthdayMusic.volume = 0.45;

        birthdayMusic.play().catch(() => {
            console.log("Musik membutuhkan interaksi browser.");
        });

        pinScreen.classList.add("hide");

        setTimeout(() => {

            pinScreen.style.display = "none";

            mainContent.classList.remove("hidden");

            startBirthdayStory();

        }, 1200);

    } else {

        errorMessage.textContent =
            "PIN-nya belum benar, Sayang 😆❤️";

        pinInput.value = "";

        pinInput.focus();

        pinInput.animate(
            [
                { transform: "translateX(0)" },
                { transform: "translateX(-10px)" },
                { transform: "translateX(10px)" },
                { transform: "translateX(-10px)" },
                { transform: "translateX(0)" }
            ],
            {
                duration: 400
            }
        );
    }
}


/* =========================================
   STORY FLOW
========================================= */

function startBirthdayStory() {

    // Scroll ke intro
    scrollToSection(
        document.querySelector(".intro-section"),
        1000
    );

    // Mulai perjalanan otomatis
    setTimeout(() => {

        scrollToSection(
            document.querySelector(".opening-section"),
            1200
        );

    }, 7000);


    setTimeout(() => {

        scrollToSection(
            document.querySelector(".letter-section"),
            1500
        );

    }, 13000);


    // Slideshow
    setTimeout(() => {

        startSlideshow();

    }, 27000);

}


/* =========================================
   AUTO SCROLL
========================================= */

function scrollToSection(section, duration = 1000) {

    if (!section) return;

    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =========================================
   CINEMATIC SLIDESHOW
========================================= */

let currentSlide = 0;

let slideshowInterval = null;

const slideDuration = 5500;


function startSlideshow() {

    scrollToSection(
        slideshowSection,
        1500
    );

    currentSlide = 0;

    showSlide(currentSlide);

    startProgress();

    slideshowInterval = setInterval(() => {

        currentSlide++;

        if (currentSlide >= slides.length) {

            clearInterval(slideshowInterval);

            progressBar.style.width = "100%";

            setTimeout(() => {

                goToCake();

            }, 1200);

            return;
        }

        showSlide(currentSlide);

        startProgress();

    }, slideDuration);

}


/* =========================================
   SHOW PHOTO
========================================= */

function showSlide(index) {

    slides.forEach((slide, i) => {

        slide.classList.toggle(
            "active",
            i === index
        );

    });

    currentPhoto.textContent =
        String(index + 1).padStart(2, "0");

}


/* =========================================
   PHOTO PROGRESS
========================================= */

function startProgress() {

    progressBar.style.transition = "none";
    progressBar.style.width = "0%";

    // Force browser repaint
    progressBar.offsetWidth;

    progressBar.style.transition =
        `width ${slideDuration}ms linear`;

    progressBar.style.width = "100%";
}


/* =========================================
   CAKE
========================================= */

function goToCake() {

    scrollToSection(
        cakeSection,
        1500
    );

    setTimeout(() => {

        createConfetti();

    }, 1800);


    setTimeout(() => {

        scrollToSection(
            finalSection,
            1500
        );

    }, 8000);


    setTimeout(() => {

        createConfetti();

    }, 9000);

}


/* =========================================
   CONFETTI
========================================= */

function createConfetti() {

    const symbols = [
        "💗",
        "💕",
        "💖",
        "💞",
        "✨",
        "🌸",
        "🎀"
    ];

    for (let i = 0; i < 100; i++) {

        const confetti =
            document.createElement("div");

        confetti.classList.add("confetti");

        confetti.textContent =
            symbols[
                Math.floor(
                    Math.random() * symbols.length
                )
            ];

        confetti.style.left =
            Math.random() * 100 + "vw";

        confetti.style.fontSize =
            (10 + Math.random() * 18) + "px";

        confetti.style.animationDuration =
            (3 + Math.random() * 4) + "s";

        confetti.style.animationDelay =
            Math.random() * 1.5 + "s";

        confettiContainer.appendChild(confetti);


        setTimeout(() => {

            confetti.remove();

        }, 8000);

    }

}


/* =========================================
   EXTRA FLOATING HEARTS
========================================= */

function createFloatingHeart() {

    const heart =
        document.createElement("div");

    heart.textContent = "❤";

    heart.style.position = "fixed";

    heart.style.left =
        Math.random() * 100 + "vw";

    heart.style.bottom = "-40px";

    heart.style.fontSize =
        (15 + Math.random() * 25) + "px";

    heart.style.color = "#e94b86";

    heart.style.pointerEvents = "none";

    heart.style.zIndex = "100";

    heart.style.opacity = ".7";

    heart.style.transition =
        "transform 6s linear, opacity 6s linear";

    document.body.appendChild(heart);

    setTimeout(() => {

        heart.style.transform =
            `translateY(-110vh) rotate(${Math.random() * 360}deg)`;

        heart.style.opacity = "0";

    }, 100);

    setTimeout(() => {

        heart.remove();

    }, 6500);

}


/* =========================================
   CONTINUOUS HEARTS
========================================= */

setInterval(() => {

    if (!mainContent.classList.contains("hidden")) {

        createFloatingHeart();

    }

}, 900);


/* =========================================
   ENTER KEY
========================================= */

pinInput.focus();


/* =========================================
   PRELOAD PHOTOS
========================================= */

const photoSources = [
    "images/foto1.jpg",
    "images/foto2.jpg",
    "images/foto3.jpg",
    "images/foto4.jpg",
    "images/foto5.jpg",
    "images/foto6.jpg",
    "images/foto7.jpg",
    "images/foto8.jpg"
];

photoSources.forEach(src => {

    const img = new Image();

    img.src = src;

});
