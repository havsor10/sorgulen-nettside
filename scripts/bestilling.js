document.getElementById("bestillingsForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const data = {
    tjeneste: document.getElementById("tjeneste").value,
    navn: document.getElementById("navn").value,
    dato: document.getElementById("dato").value + " " + document.getElementById("tidspunkt").value,
    tilleggsinfo: document.getElementById("tilleggsinfo").value,
  };

  fetch("https://sorgulen-admin-backend.onrender.com/bestill", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {
        document.getElementById("bestillingsForm").reset();
        document.getElementById("bekreftelse").style.display = "block";
      } else {
        alert("Noe gikk galt. Prøv igjen senere.");
      }
    })
    .catch(error => {
      console.error("Feil:", error);
      alert("Uventet feil. Prøv igjen.");
    });
});
