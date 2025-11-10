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
          const targetPosition =
            targetElement.getBoundingClientRect().top +
            window.pageYOffset -
            navbarHeight;

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

// GSAP powered carousel helper
function initGsapCarousel({ slideSelector, dotSelector, interval = 5000 }) {
  const slides = gsap.utils.toArray(slideSelector);
  if (!slides.length) return;

  const dots = dotSelector ? gsap.utils.toArray(dotSelector) : [];
  let activeIndex = 0;
  let timer = null;
  let isAnimating = false;

  gsap.set(slides, {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  });

  slides.forEach((slide, index) => {
    gsap.set(slide, {
      xPercent: index === 0 ? 0 : 100,
      autoAlpha: index === 0 ? 1 : 0,
      zIndex: slides.length - index,
    });
  });

  function updateDots(index) {
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === index);
    });
  }
  updateDots(activeIndex);

  function goTo(index, direction = 1) {
    if (index === activeIndex || isAnimating) return;

    const currentSlide = slides[activeIndex];
    const nextSlide = slides[index];
    isAnimating = true;

    gsap
      .timeline({
        defaults: { duration: 0.85, ease: "power2.inOut" },
        onComplete: () => {
          isAnimating = false;
          restartAuto();
        },
      })
      .set(nextSlide, {
        xPercent: 100 * direction,
        autoAlpha: 1,
        zIndex: slides.length,
      })
      .to(currentSlide, { xPercent: -100 * direction }, 0)
      .to(nextSlide, { xPercent: 0 }, 0)
      .set(currentSlide, {
        autoAlpha: 0,
        xPercent: 100,
        zIndex: slides.length - 1,
      });

    activeIndex = index;
    updateDots(activeIndex);
  }

  function next() {
    const nextIndex = (activeIndex + 1) % slides.length;
    goTo(nextIndex, 1);
  }

  function prev() {
    const prevIndex = (activeIndex - 1 + slides.length) % slides.length;
    goTo(prevIndex, -1);
  }

  function restartAuto() {
    if (timer) clearTimeout(timer);
    timer = setTimeout(next, interval);
  }
  restartAuto();

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => {
      goTo(dotIndex, dotIndex > activeIndex ? 1 : -1);
    });
  });

  slides.forEach((slide) => {
    slide.addEventListener("mouseenter", () => {
      if (timer) clearTimeout(timer);
    });
    slide.addEventListener("mouseleave", restartAuto);
  });

  return { next, prev, restartAuto };
}

document.addEventListener("DOMContentLoaded", () => {
  initGsapCarousel({
    slideSelector: ".mySlides",
    dotSelector: ".dot",
    interval: 5000,
  });

  initGsapCarousel({
    slideSelector: ".mySlides2",
    dotSelector: ".dot2",
    interval: 5000,
  });
});

const tabHandler = (name) => {
  const btns = document.querySelectorAll(".prjSec");
  if (name === "Highlife") {
  } else if (name === "Eternia") {
  }
};

let link = "";
let listItemsHighlife = document.getElementById("listItemsHighlife");
let para1 = document.getElementById("para1");
let para2 = document.getElementById("para2");
let para3 = document.getElementById("para3");
let tabPara = document.getElementById("tabPara");
const tabNavigationHandler = (name) => {
  const imgEl = document.querySelector(".navigateImgs");
  const highlifeBtn = document.getElementById("highlifeBtn");
  const eterniaBtn = document.getElementById("eterniaBtn");

  if (
    !imgEl ||
    !highlifeBtn ||
    !eterniaBtn ||
    !tabPara ||
    !para1 ||
    !para2 ||
    !para3 ||
    !listItemsHighlife
  ) {
    console.warn("tabNavigationHandler: Missing DOM references");
    return;
  }

  const clearDynamicHighlights = () => {
    listItemsHighlife
      .querySelectorAll(".eterniaLi")
      .forEach((li) => li.remove());
  };

  if (name === "Highlife") {
    clearDynamicHighlights();
    imgEl.src = "./images/highlife.png";
    highlifeBtn.classList.add("bg-black");
    highlifeBtn.classList.remove("bg-white");
    highlifeBtn.classList.add("text-white");
    highlifeBtn.classList.remove("text-black");
    eterniaBtn.classList.add("bg-white");
    eterniaBtn.classList.remove("bg-black");
    eterniaBtn.classList.add("text-black");
    eterniaBtn.classList.remove("text-white");
    link = "https://highlife.greatvaluerealty.com";
    tabPara.innerHTML =
      "Designed with depth, purpose in every layer.  High Life offers 1 & 2 BHK studio apartments in Greater Noida (West)'s most sought-after location. Situated along a 130-meter-wide main road and overlooking a fully developed 100-meter green belt, High Life seamlessly blends city connectivity with serene open vistas. ";
    para1.innerHTML =
      "Modern architecture and robust construction A perfect harmony of style and structural strength";
    para2.innerHTML =
      "Prime location with excellent road connectivity An address that keeps you well-linked to life";
    para3.innerHTML =
      "Gated community with round-the-clock security Where Luxury Lives Behind Trust";
    //  window.open("https://highlife.greatvaluerealty.com", "_blank");
  } else if (name === "Eternia") {
    clearDynamicHighlights();
    imgEl.src = "./images/eternia-img.webp";
    highlifeBtn.classList.add("bg-white");
    highlifeBtn.classList.remove("bg-black");
    highlifeBtn.classList.add("text-black");
    highlifeBtn.classList.remove("text-white");
    eterniaBtn.classList.add("bg-black");
    eterniaBtn.classList.remove("bg-white");
    eterniaBtn.classList.add("text-white");
    eterniaBtn.classList.remove("text-black");
    link = "https://eternia.greatvaluerealty.com";
    tabPara.innerHTML =
      "Eternal life reflected in a home that stands with timeless grace. Inspired by the Anthurium flower, a timeless emblem of resilience and eternal life . Eternia offers 3 & 4 BHK spacious residences crafted for those who aspire to live grand. With thoughtfully designed layouts,premium finishes, and expansive interiors, Eternia is more than a home; it’s where elegance meets endurance, and where purposeful design shapes a legacy of modern luxury.";
    para1.innerHTML = "Wellness Thoughtfully built for your well-being ";
    para2.innerHTML = "Comfort Feel at home in every corner ";
    para3.innerHTML = "Community Built for bonds that last";

    const li = document.createElement("li");
    li.classList.add("eterniaLi");

    const div = document.createElement("div");
    div.classList.add("flex", "items-center", "gap-2", "md:gap-4");

    const arrowImg = document.createElement("img");
    arrowImg.src = "./images/s3/ajeebArrow.png";
    arrowImg.classList.add("w-[24px]", "sm:w-[28px]", "md:w-[40px]");
    arrowImg.alt = "arrow";

    const para4 = document.createElement("p");
    para4.classList.add(
      "text-[14px]",
      "sm:text-[18px]",
      "md:text-[18px]",
      "xl:text-[24px]",
      "font-[400]",
      "leading-relaxed",
      "text-[#15151599]"
    );
    para4.innerHTML = "Grand Living The Space Where Grandeur Takes Shape";

    div.appendChild(arrowImg);
    div.appendChild(para4);
    li.appendChild(div);
    listItemsHighlife.appendChild(li);

    // window.open("https://eternia.greatvaluerealty.com", "_blank");
  }
};

function exploreMoreHandler() {
  window.open(link || "https://highlife.greatvaluerealty.com", "_blank");
}
