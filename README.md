First google apps scripts to get CoinMarketCap API data into Google Sheets.
They are very simple and straightforward scripts to start with.

Use case are following :
- coinmarketcap_latest.js will fetch the full (5000) coinmarketcap cryptocurrencies list with details (price,...)
- getinfo4mytokens.js will get you price only for the cryptocurrencies you want

To get it working :
1. get a coinmarketcap api key and put it in the B1 cell of your sheet.
2. create a new google sheet, select Extensions > Apps Script. Delete existing code & replace with this ones.
3. File -> Save.
4. You'll need to authorize the script to access your google account ( a pop up should appear ).

If you are looking for more powerful scripts with more options, please see nice work https://github.com/ken2190/CoinMarketCap-to-GoogleSheets
