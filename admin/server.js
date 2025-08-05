const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3002;

// Tillat forespørsler fra Netlify og andre domener
app.use(cors());

// Forstå JSON i POST-body
app.use(express.json());

// Hent sti til bestillinger.json
const dataPath = path.join(__dirname, "data", "bestillinger.json");

// Endepunkt for å hente alle bestillinger
app.get("/bestillinger", (req, res) => {
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Kunne ikke hente bestillinger" });
    }

    const bestillinger = JSON.parse(data || "[]");
    res.json(bestillinger);
  });
});

// Endepunkt for å lagre en ny bestilling
app.post("/ny-bestilling", (req, res) => {
  const nyBestilling = {
    id: Date.now(),
    ...req.body,
    status: "aktive", // For admin-visning
    tidspunkt: new Date().toISOString()
  };

  fs.readFile(dataPath, "utf8", (err, data) => {
    const bestillinger = JSON.parse(data || "[]");
    bestillinger.push(nyBestilling);

    fs.writeFile(dataPath, JSON.stringify(bestillinger, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: "Kunne ikke lagre bestilling" });
      }

      res.status(200).json({ suksess: true });
    });
  });
});

// Start serveren
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server kjører på port ${PORT}`);
});