const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", !isOpen ? "Close navigation" : "Open navigation");
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      navigation.classList.remove("is-open");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navigation.classList.contains("is-open")) {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      navigation.classList.remove("is-open");
      menuButton.focus();
    }
  });
}

document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    const serviceSelect = document.querySelector("#service");
    if (serviceSelect) serviceSelect.value = link.dataset.service;
  });
});

const contactForm = document.querySelector("#contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const values = new FormData(contactForm);
    const subject = `Project enquiry: ${values.get("service")}`;
    const body = [
      `Name: ${values.get("name")}`,
      `Business / Organisation: ${values.get("organisation") || "Not provided"}`,
      `Email: ${values.get("email")}`,
      `Service required: ${values.get("service")}`,
      "",
      "Project details:",
      values.get("message"),
    ].join("\n");

    window.location.href = `mailto:emma@probitynetwork.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
