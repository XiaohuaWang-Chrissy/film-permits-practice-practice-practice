import fs from "fs";
import path from "node:path";

const url = "https://data.cityofnewyork.us/resource/hjae-yuav.json?$order=name ASC&$limit=200";
const response = await fetch(url);
const toilets = await response.json();

console.log(`Fetched ${toilets.length} records.`);

const dataDir = path.join("src", "lib", "data");
fs.mkdirSync(dataDir, { recursive: true });

const outputPath = path.join(dataDir, "toilets.json");
fs.writeFileSync(outputPath, JSON.stringify(toilets, null, 2));
console.log(`Saved to ${outputPath}`);