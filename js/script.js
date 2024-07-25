document.addEventListener("DOMContentLoaded", function () {
  window.onload = function () {
    if (window.innerWidth >= window.innerHeight) {
      document.getElementById("reminder").style.display = "block";
    }
  };

  // Typing Effects
  const typedTextSpan = document.querySelector(".typed-text");
  const cursorSpan = document.querySelector(".cursor");
  var textArray = ["Hey there! I'm a coder from Vietnam", "My old nickname was DevGecko", "And that's all about me :)"];

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

  // Project
  const projects = [
    {
      name: "Image2ASCII",
      url: "https://github.com/duckteamz/image2ascii",
      demoUrl: "https://duckteamz.github.io/image2ascii",
      visibility: "Public",
    },
    {
      name: "DuckTV",
      url: "https://github.com/DuckTeamz/DuckTV",
      demoUrl: "https://github.com/duckteamz/DuckTV/releases/tag/v1.0",
      visibility: "Public",
    },
    {
      name: "Rank Score THPT2024",
      url: "https://github.com/DuckTeamz/rank-thpt2024",
      demoUrl: "https://github.com/DuckTeamz/rank-thpt2024/blob/main/main.py",
      visibility: "Public",
    },
    {
      name: "Pydroid3 Premium",
      url: "https://github.com/DuckTeamz/pydroid3",
      demoUrl: "https://github.com/duckteamz/pydroid3/releases/tag/v1.0",
      visibility: "Public",
    },
    {
      name: "Event Tet",
      url: "https://github.com/duckteamz/eventTet",
      demoUrl: "https://duckteamz.github.io/eventTet",
      visibility: "Private",
    },
  ];

  const projectsContainer = document.getElementById("projects-container");

  projects.forEach((project) => {
    const projectElement = document.createElement("div");
    projectElement.classList.add("projects");
    const displayUrl = project.demoUrl.replace(/^https?:\/\//, "");

    projectElement.innerHTML = `
        <div class="project-head">
          <a href="${project.url}">${project.name}</a>
          <span tooltip="${project.visibility === "Public" ? "Open source" : "Hidden"}">${project.visibility}</span>
        </div>
        <div class="project-body">
          <i class="fa fa-link"></i>
          <a target="_blank" href="${project.demoUrl}">${displayUrl}</a>
        </div>
      `;
    projectsContainer.appendChild(projectElement);
  });
});
