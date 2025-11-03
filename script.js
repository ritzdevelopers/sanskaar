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

// Initialize Lenis with advanced smoothness settings
let lenis;
if (typeof Lenis !== "undefined") {
  lenis = new Lenis({
    duration: 1.6, // Higher = slower & smoother (try 1.8 or 2 for even softer feel)
    easing: (t) => 1 - Math.pow(1 - t, 3), // cubic ease-out for natural deceleration
    direction: "vertical",
    gestureDirection: "vertical",
    smoothWheel: true,
    smoothTouch: true, // enable smooth on touch devices too
    touchMultiplier: 1.8, // more glide on touch scrolls
    infinite: false, // disable looping scroll
    lerp: 0.08, // linear interpolation factor (lower = smoother, slower)
  });

  // Continuous smooth update loop
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

// Optional: Sync with ScrollTrigger (if using GSAP)
// gsap.ticker.add((time) => lenis.raf(time * 1000));
// gsap.ticker.lagSmoothing(0);

// Smooth scroll for anchor links
function initSmoothScroll() {
  // Get all anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      
      // Skip if it's just "#" or if it's a modal button
      if (href === "#" || link.classList.contains("open-modal-btn")) {
        return;
      }
      
      // Get target element
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        // Close mobile menu if open
        const mobileMenu = document.getElementById("mobileMenu");
        if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
          const menuBtn = document.getElementById("menuBtn");
          const openIcon = document.getElementById("openIcon");
          const closeIcon = document.getElementById("closeIcon");
          if (menuBtn) {
            gsap.to(mobileMenu, {
              y: "-100%",
              duration: 0.6,
              ease: "power4.in",
              onComplete: () => mobileMenu.classList.add("hidden"),
            });
            if (closeIcon) closeIcon.classList.add("hidden");
            if (openIcon) openIcon.classList.remove("hidden");
          }
        }
        
        // Use Lenis smooth scroll if available
        if (lenis) {
          const navbarHeight = 80; // Adjust based on your navbar height
          lenis.scrollTo(targetElement, {
            offset: -navbarHeight,
            duration: 1.5,
            easing: (t) => 1 - Math.pow(1 - t, 3),
          });
        } else {
          // Fallback smooth scroll if Lenis not available
          const navbarHeight = 80;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });
}

// Initialize smooth scroll after DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSmoothScroll);
} else {
  initSmoothScroll();
}

// Second Slider Logic

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

// Modal Functionality - Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", () => {
  const contactModal = document.getElementById("contactModal");
  const closeModalBtn = document.getElementById("closeModal");
  const contactForm = document.getElementById("contactForm");
  const openModalButtons = document.querySelectorAll(".open-modal-btn");

  console.log("Modal elements found:", {
    modal: contactModal,
    closeBtn: closeModalBtn,
    form: contactForm,
    buttons: openModalButtons.length,
  });

  // Function to open modal
  function openModal() {
    if (!contactModal) {
      console.error("Modal not found!");
      return;
    }
    console.log("Opening modal...");
    contactModal.classList.remove("hidden");
    document.body.style.overflow = "hidden"; // Prevent background scrolling
    // Force display to be visible for GSAP
    contactModal.style.display = "flex";

    gsap.fromTo(
      contactModal,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    );
    gsap.fromTo(
      contactModal.querySelector(".modal-container"),
      { scale: 0.9, y: 20 },
      { scale: 1, y: 0, duration: 0.3, ease: "power2.out" }
    );
  }

  // Function to close modal
  function closeModalFunc() {
    if (!contactModal) return;
    console.log("Closing modal...");
    gsap.to(contactModal, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        contactModal.classList.add("hidden");
        contactModal.style.display = "none";
        document.body.style.overflow = ""; // Restore scrolling
      },
    });
    gsap.to(contactModal.querySelector(".modal-container"), {
      scale: 0.9,
      y: 20,
      duration: 0.3,
      ease: "power2.in",
    });
  }

  // Add event listeners to all buttons with open-modal-btn class
  if (openModalButtons.length > 0) {
    console.log(
      "Adding click listeners to",
      openModalButtons.length,
      "buttons"
    );
    openModalButtons.forEach((button, index) => {
      console.log(`Button ${index + 1}:`, button);
      button.addEventListener("click", (e) => {
        console.log("Button clicked!", e);
        e.preventDefault();
        e.stopPropagation();
        openModal();
      });
    });
  } else {
    console.warn("No buttons with .open-modal-btn class found!");
  }

  // Close modal when clicking close button
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModalFunc);
  }

  // Close modal when clicking outside the modal
  if (contactModal) {
    contactModal.addEventListener("click", (e) => {
      if (e.target === contactModal) {
        closeModalFunc();
      }
    });
  }

  // Close modal on ESC key
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      contactModal &&
      !contactModal.classList.contains("hidden")
    ) {
      closeModalFunc();
    }
  });

  // Handle form submission
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // Here you can add your form submission logic
      // For example, sending data to a server or showing a success message
      alert("Thank you for your interest! We'll get back to you soon.");
      contactForm.reset();
      closeModalFunc();
    });
  }
});

// Slideshow Functionality
document.addEventListener("DOMContentLoaded", () => {
  let slideIndex = 0;
  let slideshowTimeout;

  function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");

    // Check if slides exist
    if (slides.length === 0) {
      return; // Exit if no slides found
    }

    // Hide all slides
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }

    // Remove active class from all dots
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }

    // Show current slide and activate corresponding dot
    if (slides[slideIndex - 1]) {
      slides[slideIndex - 1].style.display = "block";
    }
    if (dots[slideIndex - 1]) {
      dots[slideIndex - 1].className += " active";
    }

    // Clear previous timeout
    if (slideshowTimeout) {
      clearTimeout(slideshowTimeout);
    }

    // Set timeout for next slide
    slideshowTimeout = setTimeout(showSlides, 2000); // Change image every 2 seconds
  }

  // Initialize slideshow if elements exist
  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("dot");

  if (slides.length > 0) {
    // Show first slide immediately
    if (slides[0]) {
      slides[0].style.display = "block";
    }
    if (dots[0]) {
      dots[0].className += " active";
    }
    // Start slideshow from slide 1 (next will be slide 2)
    slideIndex = 1;
    setTimeout(showSlides, 2000);

    // Add click handlers to dots for manual navigation
    for (let i = 0; i < dots.length; i++) {
      dots[i].addEventListener("click", () => {
        // Clear timeout
        if (slideshowTimeout) {
          clearTimeout(slideshowTimeout);
        }

        // Set slide index
        slideIndex = i;

        // Show selected slide
        let j;
        let allSlides = document.getElementsByClassName("mySlides");
        let allDots = document.getElementsByClassName("dot");

        for (j = 0; j < allSlides.length; j++) {
          allSlides[j].style.display = "none";
        }
        for (j = 0; j < allDots.length; j++) {
          allDots[j].className = allDots[j].className.replace(" active", "");
        }

        allSlides[slideIndex].style.display = "block";
        allDots[slideIndex].className += " active";

        // Resume slideshow
        slideIndex++;
        if (slideIndex >= slides.length) {
          slideIndex = 0;
        }
        slideshowTimeout = setTimeout(showSlides, 2000);
      });
    }
  }
});

// Slideshow Functionality - First Slider
document.addEventListener("DOMContentLoaded", () => {
  // First Slider
  let slideIndex = 0;
  let slideshowTimeout;

  function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");

    // Check if slides exist
    if (slides.length === 0) {
      return; // Exit if no slides found
    }

    // Hide all slides
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }

    // Remove active class from all dots
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }

    // Show current slide and activate corresponding dot
    if (slides[slideIndex - 1]) {
      slides[slideIndex - 1].style.display = "block";
    }
    if (dots[slideIndex - 1]) {
      dots[slideIndex - 1].className += " active";
    }

    // Clear previous timeout
    if (slideshowTimeout) {
      clearTimeout(slideshowTimeout);
    }

    // Set timeout for next slide
    slideshowTimeout = setTimeout(showSlides, 2000); // Change image every 2 seconds
  }

  // Initialize first slideshow if elements exist
  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("dot");

  if (slides.length > 0) {
    // Show first slide immediately
    if (slides[0]) {
      slides[0].style.display = "block";
    }
    if (dots[0]) {
      dots[0].className += " active";
    }
    // Start slideshow from slide 1 (next will be slide 2)
    slideIndex = 1;
    setTimeout(showSlides, 2000);

    // Add click handlers to dots for manual navigation
    for (let i = 0; i < dots.length; i++) {
      dots[i].addEventListener("click", () => {
        // Clear timeout
        if (slideshowTimeout) {
          clearTimeout(slideshowTimeout);
        }

        // Set slide index
        slideIndex = i;

        // Show selected slide
        let j;
        let allSlides = document.getElementsByClassName("mySlides");
        let allDots = document.getElementsByClassName("dot");

        for (j = 0; j < allSlides.length; j++) {
          allSlides[j].style.display = "none";
        }
        for (j = 0; j < allDots.length; j++) {
          allDots[j].className = allDots[j].className.replace(" active", "");
        }

        allSlides[slideIndex].style.display = "block";
        allDots[slideIndex].className += " active";

        // Resume slideshow
        slideIndex++;
        if (slideIndex >= slides.length) {
          slideIndex = 0;
        }
        slideshowTimeout = setTimeout(showSlides, 2000);
      });
    }
  }

  // Second Slider
  let slideIndex2 = 0;
  let slideshowTimeout2;

  function showSlides2() {
    let i;
    let slides = document.getElementsByClassName("mySlides2");
    let dots = document.getElementsByClassName("dot2");

    // Check if slides exist
    if (slides.length === 0) {
      return; // Exit if no slides found
    }

    // Hide all slides
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    slideIndex2++;
    if (slideIndex2 > slides.length) {
      slideIndex2 = 1;
    }

    // Remove active class from all dots
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }

    // Show current slide and activate corresponding dot
    if (slides[slideIndex2 - 1]) {
      slides[slideIndex2 - 1].style.display = "block";
    }
    if (dots[slideIndex2 - 1]) {
      dots[slideIndex2 - 1].className += " active";
    }

    // Clear previous timeout
    if (slideshowTimeout2) {
      clearTimeout(slideshowTimeout2);
    }

    // Set timeout for next slide
    slideshowTimeout2 = setTimeout(showSlides2, 2000); // Change image every 2 seconds
  }

  // Initialize second slideshow if elements exist
  const slides2 = document.getElementsByClassName("mySlides2");
  const dots2 = document.getElementsByClassName("dot2");

  if (slides2.length > 0) {
    // Show first slide immediately
    if (slides2[0]) {
      slides2[0].style.display = "block";
    }
    if (dots2[0]) {
      dots2[0].className += " active";
    }
    // Start slideshow from slide 1 (next will be slide 2)
    slideIndex2 = 1;
    setTimeout(showSlides2, 2000);

    // Add click handlers to dots for manual navigation
    for (let i = 0; i < dots2.length; i++) {
      dots2[i].addEventListener("click", () => {
        // Clear timeout
        if (slideshowTimeout2) {
          clearTimeout(slideshowTimeout2);
        }

        // Set slide index
        slideIndex2 = i;

        // Show selected slide
        let j;
        let allSlides = document.getElementsByClassName("mySlides2");
        let allDots = document.getElementsByClassName("dot2");

        for (j = 0; j < allSlides.length; j++) {
          allSlides[j].style.display = "none";
        }
        for (j = 0; j < allDots.length; j++) {
          allDots[j].className = allDots[j].className.replace(" active", "");
        }

        allSlides[slideIndex2].style.display = "block";
        allDots[slideIndex2].className += " active";

        // Resume slideshow
        slideIndex2++;
        if (slideIndex2 >= slides2.length) {
          slideIndex2 = 0;
        }
        slideshowTimeout2 = setTimeout(showSlides2, 2000);
      });
    }
  }
});

const tabHandler = (name) => {
  const btns = document.querySelectorAll(".prjSec");
  if (name === "Highlife") { 

  } else if (name === "Eternia") { 

  }
}

let link = "";
const tabNavigationHandler = (name) => {
  let img = document.querySelector(".navigateImgs");
  let highlifeBtn = document.getElementById("highlifeBtn");
  let eterniaBtn = document.getElementById("eterniaBtn");
  if (name === "Highlife") {
    img.src = "./images/highlife.png";
    highlifeBtn.classList.add("bg-black");
    highlifeBtn.classList.remove("bg-white");
    highlifeBtn.classList.add("text-white");
    highlifeBtn.classList.remove("text-black");
    eterniaBtn.classList.add("bg-white");
    eterniaBtn.classList.remove("bg-black");
    eterniaBtn.classList.add("text-black");
    eterniaBtn.classList.remove("text-white");
    link = "https://highlife.greatvaluerealty.com";
  //  window.open("https://highlife.greatvaluerealty.com", "_blank");  
  } else if (name === "Eternia") {
     img.src = "./images/eternia-img.webp"
    highlifeBtn.classList.add("bg-white");
    highlifeBtn.classList.remove("bg-black");
    highlifeBtn.classList.add("text-black");
    highlifeBtn.classList.remove("text-white");
    eterniaBtn.classList.add("bg-black");
    eterniaBtn.classList.remove("bg-white");
    eterniaBtn.classList.add("text-white");
    eterniaBtn.classList.remove("text-black");
    link = "https://eternia.greatvaluerealty.com";
    // window.open("https://eternia.greatvaluerealty.com", "_blank");
  }
};


function exploreMoreHandler() { 
  window.open(link, "_blank");
}