const XLSX = require('xlsx');

const filename = './stats.xlsx';

const wb = XLSX.readFile(filename);
/* Get first worksheet */
const wsname = wb.SheetNames[0];
const ws = wb.Sheets[wsname];
/* Convert array of arrays */
const stats = XLSX.utils.sheet_to_json(ws);
/* Update state */
console.log(stats[0])

export default stats