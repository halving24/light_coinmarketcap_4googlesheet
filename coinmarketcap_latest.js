function get_cmc_list() {
  
  // initialize
  const sheet = SpreadsheetApp.getActiveSheet();   //use getActiveSheet to use getRange(x,y) notation
  let API_KEY = sheet.getRange('B1').getDisplayValue().trim(); // get your API KEY from sheet

  // prepare url
  let URL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=" + 10 // change 10 to get more tokens (max 5000)
  let options = {headers:{'X-CMC_PRO_API_KEY': String(API_KEY),'Content-Type': 'application/json'},};

  // fetch data from coinmarketcap json-api
  let response = UrlFetchApp.fetch(URL,options) 
 
  // parse json response
  let tokens = JSON.parse(response).data

  // Write token values to the sheet, starting from row = 4+x
    for (let x=0; x<tokens.length; x++){
    sheet.getRange(4+x, 1).setValue(tokens[x].symbol); // replace 4 by your starting row
    sheet.getRange(4+x, 2).setValue(tokens[x].name);
    sheet.getRange(4+x, 3).setValue(tokens[x].quote.USD.price);
  }
}
