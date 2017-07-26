/**
 * Global Variable Setting
 */

/**
 * onLoad Event
 */
jQuery(document).ready(function() {
//  fnSearchDetail();
});

/**
 * Resize Event
 */
jQuery(window).resize(function() {

});


function fnSearchDetail() {
  var movieslistSrl = jQuery("#fmSurveyForm1 #movieslistSrl").val();
  var request = new PD_Request();
  request.methods('ajax', {
    url : '/admin/surveys/'+movieslistSrl,
    method : 'GET',
    data : args,
    success : function(jsonData, result, mimeType) {
      
      alert(JSON.stringify(jsonData));
      
    },
    error : function(request, status, error) {
      // PD_Utils.MsgBox(JSON.stringify(request), "E"); // (C:Confirm-확인/취소버튼,
      // I:Information-확인, E:Error-확인버튼)
    }
  });
}