var SS = SpreadsheetApp.openById("you sheet id");

function onSubmit(){
  doGet();
}

function doGet(){
  var sheet = SS.getSheets()[2];
  var dataTitle = sheet.getRange("sheet-name!A1").getValue();
  var range = sheet.getRange("sheet-name!B:C");
  var name = dataTitle;

  SpreadsheetApp.getActiveSpreadsheet().insertSheet(name);
  var chartSheet = SS.getSheets()[1];

  var chartBuilder = chartSheet.newChart();
  chartBuilder.addRange(range)
      .setChartType(Charts.ChartType.PIE)
      .setPosition(1,1,0,0)
      .setOption('title', dataTitle)
      .setOption('width',1000).setOption('height',800)
      .setOption('pieSliceText', 'value')
  chartSheet.insertChart(chartBuilder.build());

  emailChart(SS, dataTitle);

}

function emailChart(SS, dataTitle) {
  var chartSheet = SS.getSheets()[1];
  var sheet = SS.getSheets()[3];
  var chart = chartSheet.getCharts()[0];
 

  //var blob = DriveApp.getFileById(chart.getId()).getAs("application/pdf");
  //blob.setName(ss.getName() + ".pdf"); 

  var emailAddress = sheet.getRange("sheet-name!E1").getValue();
  var chartImg = chart.getBlob().getAs('image/png').setName(dataTitle);


  MailApp.sendEmail({
      to: emailAddress,
      subject: "Here is your PieChart:" + dataTitle,
      attachments: chartImg
});

  clearResponse(SS); 

}

function clearResponse() {  
  var deleteFormResponse = SS.getSheets()[0];
  var submissionRange = deleteFormResponse.getRange("form-name!A2:F100")
  submissionRange.clearContent()

  clearChartData();
}

function clearChartData() {
  var deleteData = SS.getSheets()[3];
  var range = deleteData.getRange("A1:F100")
  var formulas = range.getFormulas()
  range.clearContent()
  range.setFormulas(formulas)

  deleteChart();
}

function deleteChart() {
  var chart_sheet = SS.getSheets();
  SS.deleteSheet(chart_sheet[1])
 
}
