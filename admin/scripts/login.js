document.querySelector("form").addEventListener("submit", function(event) {
  event.preventDefault();

  const brukernavn = document.querySelector("#username").value;
  const passord = document.querySelector("#password").value;

  if (brukernavn === "havsor10" && passord === "Lussi100898") {
    window.location.href = "admin-dashboard.html";
  } else {
    alert("Feil brukernavn eller passord");
  }
});