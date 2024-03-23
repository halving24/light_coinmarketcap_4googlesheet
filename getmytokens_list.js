function get_mytokens_list() {
  var mysheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  Logger.log("sheet " + mysheet.getSheetName())
  const rs = 8, cs = 2 // position of your token list starting cell in your sheet (rs=rowstart, cs=colstart)
  var rl = mysheet.getLastRow()-(rs-1)
  var myTL = mysheet.getRange(rs,cs,rl,1).getDisplayValues()
  Logger.log("token list " + myTL)
  return myTL
}
