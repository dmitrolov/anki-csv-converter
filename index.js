const fs = require("fs");
const Papa = require("papaparse");
const { join } = require("path");
const readline = require("readline-sync");

const inputFilePath = join(__dirname, "public", "csvInput.txt");
const outputFilePath = join(__dirname, "public", "csvOutput.txt");

if (!fs.existsSync(inputFilePath)) {
  console.log(inputFilePath)
  console.log("Файл не найден!");
  process.exit(1);
}

// Читаем CSV
const csvData = fs.readFileSync(inputFilePath, "utf8");

// Парсим CSV в массив объектов
const result = Papa.parse(csvData, { header: true }).data;
console.log('result', result)

// Пример преобразования: добавим новый столбец "Processed"
const transformedData = result.map((row, index) => ({
  ...row,
  Processed: `Row ${index + 1}`,
}));

// Записываем в новый текстовый файл

fs.writeFileSync(outputFilePath, JSON.stringify(transformedData, null, 2), "utf8");

console.log(`Файл успешно обработан. Результат сохранен в ${outputFilePath}`);
