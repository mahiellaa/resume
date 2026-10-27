const projectDetails = [
  {
    kicker: "CONCEPT 01 / SOCIAL CAMPAIGN",
    title: "THE NIGHT, KEPT.",
    description: "A photo-booth social series built around imperfect flash, candid energy and the evidence that a good night happened. The visual direction mixes photo-strip layouts, punchy little captions and warm, slightly messy colour. Possible formats: carousel posts, short reels, guest-photo roundups and event recap stories."
  },
  {
    kicker: "CONCEPT 02 / ART DIRECTION",
    title: "MEMORIES, NOT CONTENT.",
    description: "A visual system that treats every photo strip like a tiny artefact: bold typography, warm colour, hand-drawn details and analogue-inspired textures. The idea is to make the brand feel collectible and personal, while keeping the design flexible enough for different events and audiences."
  },
  {
    kicker: "CONCEPT 03 / GRAPHIC DESIGN",
    title: "STOP-THE-SCROLL TYPE.",
    description: "Short, punchy campaign graphics with a recognisable voice: playful, a bit cheeky and never generic. This direction could work for event announcements, collaborations, seasonal campaigns, new booth drops or simple posts that make people want to book a session."
  }
];

const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalKicker = document.getElementById("modalKicker");
const modalDescription = document.getElementById("modalDescription");
const modalClose = document.getElementById("modalClose");

function openProject(index) {
  const project = projectDetails[index];
  if (!project) return;
  modalKicker.textContent = project.kicker;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  modalClose.focus();
}
function closeProject() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => openProject(Number(card.dataset.project)));
});
modalClose.addEventListener("click", closeProject);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeProject();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeProject();
});

const vinylButton = document.getElementById("vinylToggle");
const recordCaption = document.getElementById("recordCaption");
vinylButton.addEventListener("click", () => {
  const playing = vinylButton.classList.toggle("playing");
  vinylButton.setAttribute("aria-label", playing ? "Pause the spinning vinyl" : "Play or pause the spinning vinyl");
  recordCaption.textContent = playing ? "spinning into orbit ♫" : "now playing? click me ♫";
  showToast(playing ? "♫ side A: good ideas" : "✳ record stopped. vibe preserved.");
});

const toast = document.getElementById("toast");
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1900);
}

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll("nav a")];
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    });
  }, { rootMargin: "-25% 0px -65% 0px" });
  sections.forEach((section) => observer.observe(section));
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  });
});
