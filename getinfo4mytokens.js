function getinfo4mytokens () {
  
  // assume you have a sheet with :
  // - line 1 : you put you coinmarket API key in cell B1
  // - line 2 : function will update cell B2 with last run date
  // - line 3 : titles like : name, symbol, price, usd total,...that you have choosen
  // - line 4 : that's where the function starts to search your crypto tokens, and get price for it
  
  var mysheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var API_KEY = mysheet.getRange('B1').getDisplayValue().trim();
  const TOKENSCOL = 2, PRICECOL = 4, ROWSTART = 4 // your token list start is in col 2, starting row 4 + you want to update price in col 4
  const LASTROW = mysheet.getLastRow()

  // fetch token list from the current sheet
  var MYTOKENS = mysheet.getRange(ROWSTART,TOKENSCOL,LASTROW-(ROWSTART-1),1).getDisplayValues() // !! cmc awaits for alphanumeric symbol only

  // prepare url
  let baseURL = "https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?"
  let options = {headers:{'X-CMC_PRO_API_KEY': String(API_KEY),'Content-Type': 'application/json'},};
  var URL = baseURL + "symbol=" + MYTOKENS // + "&skip_invalid=true"
  Logger.log ('url----' + URL)
  
  // fetch data from coinmarketcap json-api & parse response
  var RESPONSE = UrlFetchApp.fetch(URL,options) 
  var MYLIST = JSON.parse(RESPONSE).data

// Iterate through each cryptocurrency in your list, get details from already fetched response
  for (var x=ROWSTART; x<LASTROW+1; x++){
      var TOKEN = mysheet.getRange(x,TOKENSCOL).getDisplayValue()
      try { 
          var crypto = MYLIST[TOKEN][0];
          Logger.log(TOKEN + " : " + crypto.quote.USD.price); 
          mysheet.getRange(x, PRICECOL).clearFormat();
          mysheet.getRange(x, PRICECOL).setValue(crypto.quote.USD.price);
          mysheet.getRange(x, PRICECOL).setNumberFormat('#,##0.00')
      } catch (err) { // ignore symbols with no data
          Logger.log(TOKEN + '    Failed with error %s', err.message);
          mysheet.getRange(x, PRICECOL).setValue(0);
          mysheet.getRange(x, PRICECOL).setBackground('#ff9900');
      }
  }
  mysheet.getRange('B2').setValue(Utilities.formatDate(new Date(), "GMT+1", "dd/MM/yyyy"));  
}
