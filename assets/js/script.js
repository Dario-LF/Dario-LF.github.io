// Inicializa EmailJS
(function() {
  emailjs.init("K-gCwF6D_ajAUaCpB");
})();

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form"); // ✅ ahora definido
  const toggleBtn = document.getElementById("dark-mode-toggle");
  const header = document.querySelector("header");

  /* === 🌙 Persistencia de modo oscuro === */
  if (localStorage.getItem("dark-mode") === "true") {
    document.body.classList.add("dark-mode");
    toggleBtn.textContent = "☀️";
  } else {
    toggleBtn.textContent = "🌙";
  }

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    toggleBtn.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("dark-mode", isDark);
  });

  /* === ✨ Efecto scroll en el header === */
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  /* === 📩 Envío de formulario con notificación === */
  if (form) { // ✅ evitamos error si no existe el form
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      emailjs.sendForm("service_cc05gki", "template_b4hcr1q", form)
        .then(() => {
          showToast("✅ ¡Mensaje enviado con éxito!", "success");
          form.reset();
        }, (error) => {
          console.error("Error:", error);
          showToast("⚠️ Hubo un problema al enviar el mensaje.", "error");
        });
    });
  }
});

/* 🔔 Función para crear el cartel (toast) con icono dinámico */
function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  // Insertar icono según tipo
  let icon = "ℹ️";
  if (type === "success") icon = "✅";
  if (type === "error") icon = "⚠️";

  toast.innerHTML = `<span class="icon">${icon}</span> ${message}`;

  document.body.appendChild(toast);

  // Mostrar con animación
  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  // Desaparecer después de 2 segundos
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 500);
  }, 2000);
}
