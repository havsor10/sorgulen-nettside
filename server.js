const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const dataPath = path.join(__dirname, "admin", "data", "bestillinger.json");

app.get("/bestillinger", (req, res) => {
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Kunne ikke hente bestillinger" });
    }
    res.json(JSON.parse(data));
  });
});

app.post("/bestill", (req, res) => {
  const nyBestilling = req.body;

  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Kunne ikke lese lagret data" });

    let bestillinger = [];
    try {
      bestillinger = JSON.parse(data);
    } catch (e) {
      // tom eller ødelagt fil
    }

    bestillinger.push(nyBestilling);

    fs.writeFile(dataPath, JSON.stringify(bestillinger, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Kunne ikke lagre bestilling" });
      res.status(200).json({ melding: "Bestilling lagret" });
    });
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server kjører på http://0.0.0.0:${PORT}`);
});
