document.addEventListener("DOMContentLoaded", () => {
  const knapp = document.getElementById("chat-knapp");
  const skjema = document.getElementById("chat-skjema");

  knapp.addEventListener("click", () => {
    skjema.style.display = skjema.style.display === "none" ? "block" : "none";
  });
});