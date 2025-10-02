# Furigana API for Japanese Light Novels

This project is an **Express.js API** designed to help me learning and reading **Japanese kanji**, especially when reading Japanese light novels (LN). The API converts Japanese text into text with **furigana** and optionally supports other modes and output styles.

Special thanks to [Kuroshiro](https://www.npmjs.com/package/kuroshiro) for their amazing library, which forms the core of this API.

---

## Features

- Add **furigana** to Japanese text (Kanji → Kana).
- Supports **batch processing** of multiple paragraphs.
- Provides different modes for text conversion:
  - `normal`
  - `spaced`
  - `okurigana`
  - `furigana`
- Supports optional output formats:
  - `hiragana`
  - `katakana`
  - `romaji`
- Easy to integrate with browser extensions (e.g., Tampermonkey) or other frontends.

---

## Technology

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Kuroshiro](https://www.npmjs.com/package/kuroshiro)
- [kuroshiro-analyzer-kuromoji](https://www.npmjs.com/package/kuroshiro-analyzer-kuromoji)

---

## Installation


```
git clone https://github.com/username/furigana-express-api.git
cd furigana-express-api
npm install
npm start
```
The server will run on `http://localhost:3000` by default.

## API Endpoint

#### `POST` /convert
Convert Japanese paragraphs into furigana-enhanced text.
##### Request Body
```
{
  "paragraphs": [
    "彼女は剣を振ることが好きだった。",
    "努力も怠らなかった。"
  ],
  "mode": "furigana", // optional: normal | spaced | okurigana | furigana
  "to": "hiragana"    // optional: hiragana | katakana | romaji
}
```
- `paragraphs` (required): an array of Japanese text paragraphs.
- `mode` (optional): defines how the text is converted. Defaults to normal.
- `to` (optional): defines the script for furigana output. Defaults to hiragana.

##### Response
```
{
  "results": [
    "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>は<ruby>剣<rp>(</rp><rt>けん</rt><rp>)</rp></ruby>を<ruby>振<rp>(</rp><rt>ふ</rt><rp>)</rp></ruby>ることが好きだった。",
    "努力も怠らなかった。"
  ]
}
```
- `results`: an array with the same length as paragraphs, where each item contains furigana-enhanced HTML.

## Notes

- This API is primarily intended to be used in combination with **Tampermonkey** scripts, which handle extracting Japanese text from light novel webpages and displaying the furigana and translations in the browser. Tampermonkey scripts are maintained in a separate repository.  
- Batch processing is recommended to prevent sending too many requests for long texts.  
- Ensure the environment has all required `node_modules` including `kuroshiro` and `kuroshiro-analyzer-kuromoji`.

## Acknowledgements

Thank you to Kuroshiro for their excellent library that makes this project possible.
