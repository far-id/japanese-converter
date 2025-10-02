// api/furigana.js
import express from "express";
import Kuroshiro from "kuroshiro";
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";
const port = 3000;
const app = express();
app.use(express.json({ limit: "1mb" })); // bisa diatur limit request body

let kuroshiro;
let initialized = false;

async function ensureInit() {
  if (!initialized) {
    kuroshiro = new Kuroshiro.default();
    await kuroshiro.init(new KuromojiAnalyzer());
    initialized = true;
  }
}

// POST /convert
// Body: { paragraphs: ["テキスト1", "テキスト2", ...] }
app.post("/convert", async (req, res) => {
  try {
    const { paragraphs, mode = "furigana", to = "hiragana" } = req.body;

    if (!Array.isArray(paragraphs)) {
      return res.status(400).json({ error: "paragraphs must be an array" });
    }

    await ensureInit();

    const results = [];
    for (const para of paragraphs) {
      const converted = await kuroshiro.convert(para, { mode, to });
      results.push(converted);
    }

    res.json({ results }); // array hasil konversi
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
