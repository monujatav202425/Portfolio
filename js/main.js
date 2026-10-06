const views = ["home", "about", "skills", "projects", "contact"];
const typedPhrases = [
  "Welcome to my portfolio",
  "Building for the web",
  "Always learning, always shipping"
];

const navList = document.querySelector(".nav-list");
const themeBtn = document.querySelector(".theme-btn");
const typedEl = document.querySelector("#typed");

function showView(id) {
  const page = views.includes(id) ? id : "home";
  if (!views.includes(id)) {
    history.replaceState(null, "", "#home");
  }

  document.querySelectorAll(".view").forEach((section) => {
    section.classList.toggle("is-active", section.id === page);
  });

  document.querySelectorAll(".nav-list a").forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${page}`);
  });

  navList.classList.remove("open");
  window.scrollTo({ top: 0, behavior: "instant" });
}

function currentHash() {
  return window.location.hash.replace("#", "") || "home";
}

document.querySelector(".nav-toggle").addEventListener("click", () => {
  navList.classList.toggle("open");
});

window.addEventListener("hashchange", () => showView(currentHash()));

if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
  themeBtn.textContent = "🌛";
}

themeBtn.addEventListener("click", () => {
  const light = document.body.classList.toggle("light");
  localStorage.setItem("theme", light ? "light" : "dark");
  themeBtn.textContent = light ? "🌛" : "🌞";
});

function typeLoop() {
  let phrase = 0;
  let index = 0;
  let deleting = false;

  const tick = () => {
    const text = typedPhrases[phrase];
    typedEl.textContent = text.slice(0, index);

    if (!deleting && index < text.length) {
      index += 1;
      setTimeout(tick, 70);
      return;
    }

    if (!deleting && index === text.length) {
      deleting = true;
      setTimeout(tick, 1800);
      return;
    }

    if (deleting && index > 0) {
      index -= 1;
      setTimeout(tick, 36);
      return;
    }

    deleting = false;
    phrase = (phrase + 1) % typedPhrases.length;
    setTimeout(tick, 280);
  };

  tick();
}

window.addEventListener("DOMContentLoaded", () => {
  if (!window.location.hash) {
    history.replaceState(null, "", "#home");
  }
  showView(currentHash());
  setTimeout(typeLoop, 900);
  setTimeout(() => document.getElementById("splash")?.remove(), 2800);
});
