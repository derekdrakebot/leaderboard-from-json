import fs from "fs"
import path from "path"

// Read the full JSON from the user provided file
const jsonData = fs.readFileSync(
  path.join(process.cwd(), "user_read_only_context/text_attachments/gsoc2025final-leSwU.json"),
  "utf-8",
)

// Parse the JSON
const contributors = JSON.parse(jsonData)

// Write to the data folder
const outputPath = path.join(process.cwd(), "data", "contributors.json")
fs.mkdirSync(path.dirname(outputPath), { recursive: true })
fs.writeFileSync(outputPath, JSON.stringify(contributors, null, 2))

console.log(`[v0] Converted ${Object.keys(contributors).length} contributors to data/contributors.json`)
