const ExcelJs = require('exceljs');
const { test, expect, only} = require('@playwright/test');

async function writeToExcel(searchText,ReplacedText,change,filePath) {
    const workBook = new ExcelJs.Workbook();
    await workBook.xlsx.readFile(filePath);
    const worksheet = workBook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet,searchText);
    const cell = worksheet.getCell(output.rowNo+change.changeRow,output.column+change.changeCol);
    cell.value = ReplacedText;
    await workBook.xlsx.writeFile(filePath);

}

async function readExcel(worksheet,searchText){
 let output = {rowNo:-1,column:0};
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
        if(cell.value === searchText){
       output.rowNo = rowNumber;
       output.column = colNumber;

        }

        })


    })
    return output;
}
//writeToExcel("Mango",350,{changeRow:0,changeCol:2},"download.xlsx")

test('Upload Download Test', async({page})=>{

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadEvent = page.waitForEvent('download');
    await page.getByRole('button',{name:'Download'}).click();
    const download = await downloadEvent;
    await download.saveAs('/Users/admin/Downloads/download.xlsx');
    writeToExcel("Mango",350,{changeRow:0,changeCol:2},"/Users/admin/Downloads/download.xlsx");
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("/Users/admin/Downloads/download.xlsx");
    const desiredRow = await page.getByRole('row').filter({hasText:'Mango'});
    await expect (desiredRow.locator("#cell-4-undefined")).toHaveText('350');



})
