const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/predict", (req, res) => {
  const { currentCrop, soilType } = req.body;

  // Dummy logic – replace this with ML prediction later
  let recommendation = `Based on ${currentCrop} in ${soilType} soil, we recommend planting legumes next to restore nitrogen.`;

  res.json({ recommendation });
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
