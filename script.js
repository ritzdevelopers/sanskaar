gsap.registerPlugin(ScrollTrigger);

const menuBtn = document.getElementById("menuBtn");
const openIcon = document.getElementById("openIcon");
const closeIcon = document.getElementById("closeIcon");
const mobileMenu = document.getElementById("mobileMenu");

let isOpen = false;

menuBtn.addEventListener("click", () => {
  if (!isOpen) {
    mobileMenu.classList.remove("hidden");
    gsap.fromTo(
      mobileMenu,
      { y: "-100%" },
      { y: "0%", duration: 0.6, ease: "power4.out" }
    );
    openIcon.classList.add("hidden");
    closeIcon.classList.remove("hidden");
    isOpen = true;
  } else {
    gsap.to(mobileMenu, {
      y: "-100%",
      duration: 0.6,
      ease: "power4.in",
      onComplete: () => mobileMenu.classList.add("hidden"),
    });
    closeIcon.classList.add("hidden");
    openIcon.classList.remove("hidden");
    isOpen = false;
  }
});

// Scroll hide/show navbar
let lastScroll = 0;
const navbar = document.querySelector("nav");

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;
  const triggerPoint = window.innerHeight * 0.8;

  if (currentScroll > triggerPoint && currentScroll > lastScroll) {
    // Scroll Down
    gsap.to(navbar, { top: "-100%", duration: 0.2, ease: "power2.inOut" });
  } else if (currentScroll < lastScroll) {
    // Scroll Up
    gsap.to(navbar, { top: "0", duration: 0.2, ease: "power2.inOut" });
  }

  lastScroll = currentScroll;
});

//   Section 1 Animations Is Starting From Here
window.addEventListener("load", () => {
  // Circle animation
  gsap.to(".circleAnim", {
    opacity: 1,
    scale: 1,
    duration: 1.2,
    ease: "elastic.out(1, 0.5)",
    delay: 0.2,
  });

  // Heading animation
  gsap.fromTo(
    ".headingAnim",
    { y: 80, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.6 }
  );

  // Sub Heading animation
  gsap.fromTo(
    ".subHeadingAnim",
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 1 }
  );

  // Arrow animation
  gsap.to(".arrowAnim", {
    opacity: 1,
    y: -10,
    repeat: -1,
    yoyo: true,
    duration: 1.2,
    ease: "sine.inOut",
    delay: 1.5,
  });
});

// The Section 2 Scroll Trigger And Other Animations Is Starting From Here

// Animate Left Side Text
gsap.from(".s2LeftSideDiv", {
  scrollTrigger: {
    trigger: ".s2LeftSideDiv",
    start: "top 80%", // when top of element hits 80% of viewport
    toggleActions: "play none none none",
  },

  y: 50, // fade in from below
  duration: 1,
  ease: "power2.out",
});

// Animate Right Side Cards
gsap.utils.toArray(".s2CardDiv").forEach((card) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
      toggleActions: "play none none none",
    },

    y: 50,
    duration: 1,
    ease: "power2.out",
    stagger: 0.2,
  });
});

// Animate Second Row Cards
gsap.utils.toArray(".s2Card2").forEach((card) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
      toggleActions: "play none none none",
    },

    scale: 0.8, // fade-in with slight scale-up
    duration: 0.8,
    ease: "back.out(1.2)",
    stagger: 0.2,
  });
});

// Animate Ellipse Image (optional subtle fade)
gsap.from(".s2Elips", {
  scrollTrigger: {
    trigger: ".s2",
    start: "top bottom",
  },

  duration: 1.5,
  ease: "power1.out",
});

// Section 3 Animations Is Starting From Here

// Initialize Lenis
const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Slider Logic
console.clear();

const sliders = gsap.utils.toArray(".slider");
const slidesArray = sliders.map((slider) =>
  gsap.utils.toArray(".slide", slider)
);
const next = document.getElementById("next");
const prev = document.getElementById("prev");
let currentIndex = 0;
let isTweening = false;

slidesArray.forEach((slides) => {
  slides.forEach((slide, i) => {
    gsap.set(slide, {
      xPercent: i > 0 && 100,
    });
  });
});

const gotoSlide = (value) => {
  if (isTweening) return;
  isTweening = true;
  const first = slidesArray[0];
  const currentSlides = [];
  const nextSlides = [];
  slidesArray.forEach((slides) => currentSlides.push(slides[currentIndex]));
  if (first[currentIndex + value]) {
    currentIndex += value;
  } else {
    currentIndex = value > 0 ? 0 : first.length - 1;
  }
  slidesArray.forEach((slides) => nextSlides.push(slides[currentIndex]));
  if (value > 0) {
    gsap.set(nextSlides, { xPercent: 100 });
    gsap.to(currentSlides, {
      xPercent: -100,
      onComplete: () => (isTweening = false),
    });
  } else {
    gsap.set(nextSlides, { xPercent: -100 });
    gsap.to(currentSlides, {
      xPercent: 100,
      onComplete: () => (isTweening = false),
    });
  }
  gsap.to(nextSlides, { xPercent: 0 });
};

next.addEventListener("click", () => gotoSlide(1));
prev.addEventListener("click", () => gotoSlide(-1));

// Second Slider Logic

const sliders2 = gsap.utils.toArray(".slider2");
const slidesArray2 = sliders2.map((slider) =>
  gsap.utils.toArray(".slide2", slider)
);
const next2 = document.getElementById("next2");
const prev2 = document.getElementById("prev2");
let currentIndex2 = 0;
let isTweening2 = false;

slidesArray2.forEach((slides) => {
  slides.forEach((slide, i) => {
    gsap.set(slide, {
      xPercent: i > 0 && 100,
    });
  });
});

const gotoSlide2 = (value) => {
  if (isTweening2) return;
  isTweening2 = true;
  const first = slidesArray2[0];
  const currentSlides = [];
  const nextSlides = [];
  slidesArray2.forEach((slides) => currentSlides.push(slides[currentIndex2]));
  if (first[currentIndex2 + value]) {
    currentIndex2 += value;
  } else {
    currentIndex2 = value > 0 ? 0 : first.length - 1;
  }
  slidesArray2.forEach((slides) => nextSlides.push(slides[currentIndex2]));
  if (value > 0) {
    gsap.set(nextSlides, { xPercent: 100 });
    gsap.to(currentSlides, {
      xPercent: -100,
      onComplete: () => (isTweening2 = false),
    });
  } else {
    gsap.set(nextSlides, { xPercent: -100 });
    gsap.to(currentSlides, {
      xPercent: 100,
      onComplete: () => (isTweening2 = false),
    });
  }
  gsap.to(nextSlides, { xPercent: 0 });
};
next2.addEventListener("click", () => gotoSlide2(1));
prev2.addEventListener("click", () => gotoSlide2(-1));

// Bottom Carousel Logic Is Written Here
$(".owl-carousel").owlCarousel({
  stagePadding: 200,
  loop: true,
  margin: 10,
  nav: false,
  items: 1,
  lazyLoad: true,
  nav: true,
  responsive: {
    0: {
      items: 1,
      stagePadding: 60,
    },
    600: {
      items: 1,
      stagePadding: 100,
    },
    1000: {
      items: 1,
      stagePadding: 200,
    },
    1200: {
      items: 1,
      stagePadding: 250,
    },
    1400: {
      items: 1,
      stagePadding: 300,
    },
    1600: {
      items: 1,
      stagePadding: 350,
    },
    1800: {
      items: 1,
      stagePadding: 400,
    },
  },
});
