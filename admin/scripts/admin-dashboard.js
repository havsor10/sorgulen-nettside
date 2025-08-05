document.addEventListener("DOMContentLoaded", () => {
  const aktiveTab = document.querySelector("[data-target='aktive']");
  const fullfortTab = document.querySelector("[data-target='fullforte']");
  const kansellerteTab = document.querySelector("[data-target='kansellerte']");
  const søkInput = document.getElementById("search");

  const aktiveSection = document.getElementById("aktive");
  const fullfortSection = document.getElementById("fullforte");
  const kansellertSection = document.getElementById("kansellerte");

  let bestillinger = [];

  // Hent bestillinger fra Render-backend
  fetch("https://sorgulen-admin-backend.onrender.com/bestillinger")
    .then((res) => res.json())
    .then((data) => {
      bestillinger = data;
      visBestillinger("aktive");
    })
    .catch((err) => {
      console.error("Feil ved henting av bestillinger:", err);
      aktiveSection.innerHTML = "<p style='color: red;'>Kunne ikke hente bestillinger. Sjekk backend.</p>";
    });

  // Vis filtrerte bestillinger basert på status
  function visBestillinger(status) {
    const filtrert = bestillinger.filter((b) => {
      if (status === "aktive") return b.status === "venter på godkjenning" || b.status === "utføres";
      if (status === "fullforte") return b.status === "fullført";
      if (status === "kansellerte") return b.status === "kansellert";
      return false;
    });

    const html = filtrert
      .map((b, i) => {
        return `
          <div class="ordre-kort">
            <div class="prioritet">Pr ${i + 1}</div>
            <h3>${b.tjeneste} – ${b.navn}</h3>
            <p><strong>Adresse:</strong> ${b.adresse}</p>
            <p><strong>Tlf:</strong> ${b.telefon}</p>
            <p><strong>E-post:</strong> ${b.epost}</p>
            <p><strong>Dato:</strong> ${b.dato}</p>
            <p><strong>Status:</strong> ${b.status}</p>
          </div>
        `;
      })
      .join("");

    aktiveSection.innerHTML = status === "aktive" ? html : "";
    fullfortSection.innerHTML = status === "fullforte" ? html : "";
    kansellertSection.innerHTML = status === "kansellerte" ? html : "";
  }

  // Bytt faner
  aktiveTab.addEventListener("click", () => visBestillinger("aktive"));
  fullfortTab.addEventListener("click", () => visBestillinger("fullforte"));
  kansellerteTab.addEventListener("click", () => visBestillinger("kansellerte"));

  // Søkefunksjon
  søkInput.addEventListener("input", () => {
    const søkeord = søkInput.value.toLowerCase();
    const filtrert = bestillinger.filter((b) =>
      Object.values(b).some((val) => val.toLowerCase().includes(søkeord))
    );
    bestillinger = filtrert;
    visBestillinger("aktive");
  });
});
