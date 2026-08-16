const fs = require("fs");
const path = require("path");

const QUOTES_PATH = path.join(__dirname, "data", "quotes.txt");
const README_PATH = path.join(__dirname, "README.md");

const getQuote = () => {
  try {
    const lines = fs
      .readFileSync(QUOTES_PATH, "utf8")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    if (lines.length === 0) {
      console.error("No quotes found in data/quotes.txt");
      return {};
    }

    const now = new Date();
    const yearStart = Date.UTC(now.getUTCFullYear(), 0, 1);
    const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    const dayOfYear = Math.round((today - yearStart) / 86400000);
    const line = lines[dayOfYear % lines.length];
    const separator = line.lastIndexOf("~");

    const quote = separator === -1 ? line : line.slice(0, separator).trim();
    const author =
      separator === -1
        ? "Anonymous"
        : line.slice(separator + 1).trim() || "Anonymous";

    if (!quote) return {};

    console.log("new quote", `"${quote}"`);

    return { quote, author };
  } catch (err) {
    console.error(err.message);
    return {};
  }
};

const generate = () => {
  const { quote, author } = getQuote();

  if (!quote) return;

  fs.writeFileSync(README_PATH, `_**${quote}**_\n\n${author}`);
};

generate();
