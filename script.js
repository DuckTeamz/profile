document.addEventListener("DOMContentLoaded", function () {
  window.onload = function () {
    if (window.innerWidth >= window.innerHeight) {
      document.getElementById("reminder").style.display = "block";
    }
  };

  // Typing Effects
  const typedTextSpan = document.querySelector(".typed-text");
  const cursorSpan = document.querySelector(".cursor");
  var textArray = ["Hey there! I'm a coder from Vietnam", "You may also know me as DevGecko", "And that's all about me :)"];

  let typingDelay = 50;
  const erasingDelay = 25;
  var delayTime = 2500;
  const spanElement = document.querySelector(".cursor");
  let textArrayIndex = 0;
  let charIndex = 0;
  function type() {
    if (textArrayIndex > textArray.length - 1) {
      textArrayIndex = 0;
      delayTime = 2500;
    }
    if (textArrayIndex == textArray.length - 1) {
      delayTime = 5000;
    }

    if (charIndex < textArray[textArrayIndex].length) {
      spanElement.style.display = "inline-block";
      if (!cursorSpan.classList.contains("typing")) spanElement.style.width = "8px";
      cursorSpan.classList.add("typing");
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      cursorSpan.classList.remove("typing");
      spanElement.style.width = "3.5px";

      setTimeout(function () {
        erase();
      }, delayTime);
    }
  }

  // Erase Effects
  function erase() {
    if (charIndex > 0) {
      if (!cursorSpan.classList.contains("typing")) spanElement.style.width = "3.5px";
      cursorSpan.classList.add("typing");
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      cursorSpan.classList.remove("typing");
      setTimeout(function () {
        textArrayIndex++;
        type();
      }, 500);
    }
  }

  // Typing start
  setTimeout(function () {
    type();
  }, 500);

  // Social 
  const createSVG = (width, height, className, childType, childAttributes) => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    const child = document.createElementNS("http://www.w3.org/2000/svg", childType);

    for (const attr in childAttributes) {
      child.setAttribute(attr, childAttributes[attr]);
    }

    svg.appendChild(child);

    return { svg, child };
  };

  document.querySelectorAll(".generate-button").forEach((button) => {
    const width = button.offsetWidth;
    const height = button.offsetHeight;

    const style = getComputedStyle(button);

    const strokeGroup = document.createElement("div");
    strokeGroup.classList.add("stroke");

    const { svg: stroke } = createSVG(width, height, "stroke-line", "rect", {
      x: "0",
      y: "0",
      width: "100%",
      height: "100%",
      rx: parseInt(style.borderRadius, 10),
      ry: parseInt(style.borderRadius, 10),
      pathLength: "30",
    });

    strokeGroup.appendChild(stroke);
    button.appendChild(strokeGroup);

    const stars = gsap.to(button, {
      repeat: -1,
      repeatDelay: 0.5,
      paused: true,
      keyframes: [
        {
          "--generate-button-star-2-scale": ".5",
          "--generate-button-star-2-opacity": ".25",
          "--generate-button-star-3-scale": "1.25",
          "--generate-button-star-3-opacity": "1",
          duration: 0.3,
        },
        {
          "--generate-button-star-1-scale": "1.5",
          "--generate-button-star-1-opacity": ".5",
          "--generate-button-star-2-scale": ".5",
          "--generate-button-star-3-scale": "1",
          "--generate-button-star-3-opacity": ".5",
          duration: 0.3,
        },
        {
          "--generate-button-star-1-scale": "1",
          "--generate-button-star-1-opacity": ".25",
          "--generate-button-star-2-scale": "1.15",
          "--generate-button-star-2-opacity": "1",
          duration: 0.3,
        },
        {
          "--generate-button-star-2-scale": "1",
          duration: 0.35,
        },
      ],
    });

    button.addEventListener("pointerenter", () => {
      gsap.to(button, {
        "--generate-button-dots-opacity": "1",
        duration: 0.5,
        onStart: () => {
          setTimeout(() => stars.restart().play(), 500);
        },
      });
    });

    button.addEventListener("pointerleave", () => {
      gsap.to(button, {
        "--generate-button-dots-opacity": "0",
        "--generate-button-star-1-opacity": ".25",
        "--generate-button-star-1-scale": "1",
        "--generate-button-star-2-opacity": "1",
        "--generate-button-star-2-scale": "1",
        "--generate-button-star-3-opacity": ".5",
        "--generate-button-star-3-scale": "1",
        duration: 0.15,
        onComplete: () => {
          stars.pause();
        },
      });
    });
  });
});
