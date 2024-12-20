import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
const burgerIcon = document.querySelector(".burger-icon");
const nav = document.querySelector("header nav");
const rope = document.querySelector(".rope");
const features = document.querySelectorAll(".features .feature ");
const featureCursor = document.querySelector(".features .cursor");
const socialMedias = document.querySelectorAll(".social_medias .social_media");
const cursorMedia = document.querySelector(".social_medias .cursor img");
const experience_h3 = document.querySelector(".experience h3");
const experienceTitle = document.querySelectorAll(
  ".experience .container div h4"
);
const cursorDefault = {
  padding: 0,
  width: 0,
  height: 0,
};
gsap.registerPlugin(ScrollTrigger);


// animation section

function headerAnimation() {
  const tl = gsap.timeline();

  tl.from("header .container", {
    yPercent: 100,
  })
    .from("h2 span", {
      yPercent: 100,
      stagger: 0.1,
    })
    .from(".landing  p span", {
      yPercent: 100,
      opacity: 0,
      stagger: 0.1,
    });
}
headerAnimation();
function navAnimation() {
  // links Animation
  const linksTl = gsap.timeline();
  linksTl
    .to(nav, {
      left: 0,
      ease: "circ.in",
    })
    .from("nav ul li a", {
      yPercent: 100,
      stagger: 0.1,
      ease: "circ.out",
    });
  linksTl.pause();

  // burger Animation
  const burgerIconTl = gsap.timeline({ paused: true, reversed: true });
  burgerIconTl
    .to(".burger-icon span", {
      top: "50%",
      yPercent: -50,
    })
    .to(".burger-icon span", {
      rotate: (index) => (index * 2 + 1) * -45,
    });
  burgerIconTl.pause();

  burgerIcon.onclick = function () {
    const activeNav = document.querySelector("nav.active");
    if (activeNav) {
      // reverse
      linksTl.reverse();
      burgerIconTl.reverse();
    } else {
      //play
      linksTl.play();
      burgerIconTl.play();
    }
    nav.classList.toggle("active");
  };
}
navAnimation();
function videoSectionAnimation() {
  gsap.to(".video-preview video", {
    scale: 1,
    scrollTrigger: {
      trigger: ".video-preview video",
      scrub: true,
      end: "top 200px",
    },
  });
}
videoSectionAnimation();
function quotaSectionAnimation() {
  gsap.from(".quota .text p > span:not(.small-text)", {
    yPercent: -100,
    stagger: 0.1,
    ease: "circ.out",
    scrollTrigger: {
      trigger: ".quota p",
    },
  });

  gsap.from(".small-text span", {
    opacity: 0,
    yPercent: 100,
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".quota p",
      start: "top 30%",
    },
  });
}
quotaSectionAnimation();

function featuresAnimation() {
  features.forEach((feature) => {
    const content = `<div class='text'><p>${feature.dataset.text}</p><p>${feature.dataset.text}</p></div>`;
    feature.onmousemove = function (e) {
      cursorAnimation(
        {
          left: e.pageX,
          top: e.pageY,
          scale: 1,
          height: 23,
          width: "fit-content",
        },
        content
      );
    };

    feature.onmouseleave = function () {
      cursorAnimation({
        scale: 0,
      });
    };
  });
}
featuresAnimation();

function experienceAnimation() {
  const move = 10;
  const scrollLeft = -experience_h3.scrollWidth + experience_h3.clientWidth;
  gsap.to(".experience h3 .text", {
    x: scrollLeft,
    scrollTrigger: {
      trigger: ".experience h3",
      pin: true,
      scrub: 1,
    },
  });
  experienceTitle.forEach((heading) => {
    heading.onmousemove = (e) => {
      gsap.to(heading, {
        x: (e.offsetX / heading.clientWidth) * (move * 2) - move,
        y: (e.offsetY / heading.clientHeight) * (move * 2) - move,
      });
      cursorAnimation({
        top: e.pageY,
        left: e.pageX,
        scale: 3,
        width: 30,
        height: 30,
        zIndex: 9,
        borderRadius: 15,
      });
    };
    heading.onmouseleave = (e) => {
      gsap.to(heading, {
        x: 0,
        y: 0,
      });
      cursorAnimation({
        scale: 0,
        width: 0,
        height: 0,
      });
    };
  });
}
experienceAnimation();

function logosAnimation() {
  const defaultAnimation = {
    stagger: 0.5,
    duration: 0.5,
    scrollTrigger: {
      trigger: ".logos",
      start: "top 20%",
    },
  };
  gsap.from(".logos .left img", {
    xPercent: 120,
    ...defaultAnimation,
  });
  gsap.from(".logos .right img", {
    xPercent: -120,
    ...defaultAnimation,
  });
  gsap.from(".logos .top img", {
    yPercent: -120,
    ...defaultAnimation,
  });
  gsap.from(".logos .bottom img", {
    yPercent: 120,
    ...defaultAnimation,
  });
}
logosAnimation();
function bannerAnimation() {
  gsap.to(".contact .banner .wrapper", {
    xPercent: -100,
    repeat: -1,
    duration: 50,
    yoyo: true,
  });

  gsap.to(".contact .banner .wrapper img", {
    rotate: 360,
    repeat: -1,
    duration: 7,
    ease: "none",
  });
}
bannerAnimation();

function socialMediaAnimation() {
  socialMedias.forEach((social) => {
    const content = `<img src='${social.dataset.image}'/>`;
    social.onmousemove = function (e) {
      cursorAnimation(
        {
          scale: 1,
          left: e.pageX - 10,
          top: e.pageY - 10,
          width: 100,
          height: 100,
          borderRadius: 50,
          padding: 20,
        },
        content
      );
    };
    social.onmouseleave = function () {
      cursorAnimation(cursorDefault);
    };
  });
}
socialMediaAnimation();

function cursorAnimation(animation, content = "") {
  const cursor = document.querySelector(".cursor");
  cursor.innerHTML = content;
  gsap.to(cursor, {
    ...animation,
  });
}

function vercelAnimation() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".vercel .container .svg_2",
    },
  });
  tl.to(".svg_2 text ", {
    attr: { x: "100%" },
    stagger: 0.3,
    duration: 3,
  });
}
vercelAnimation();
