/**
 * Global Variable Setting
 */

/**
 * onLoad Event
 */
jQuery(document).ready(function() {
  
  // PD_Common.fnOpenContent('/system/user/userMangForm1.action',
  // "G_CONTENTS_EDGE_RIGHT"); // FORM PAGE
  jQuery('#FRAME_HORIZONTAL_TWO_DIVISION_BAR').fnDragBarMoveEvent({
    type : 'FRAME_HORIZONTAL_TWO_DIVISION_BAR',
    left : 'id_frame_left',
    right : 'id_frame_right'
  });
  
  PD_Common.fnOpenContent('/admin/survey/survey-list', "G_CONTENTS_EDGE_LEFT"); // LIST
});

/**
 * Resize Event
 */
jQuery(window).resize(function() {

  PD_GridJson.fnFrameResize({
    type : 'FRAME_HORIZONTAL_TWO_DIVISION'
  });
});

/**
 * TAB Click Event
 * 
 * @param arrParams
 */
function fnTabClick_SurveyMang(arrParams) {
  var type = arrParams['type'];
  var params = arrParams['params'];
  //alert(params);
//  var args = {};
  
  switch (type) {
    case "survey-list":
      // 사용자 리스트
      PD_Common.fnOpenContent("/admin/survey/survey-list", "G_CONTENTS_EDGE_LEFT", params);
      break;
    case "survey-form1":
    case "survey-form2":
      var user_id = "";
      
      // 사용자정보
      // var product_cd = PD_CtrlFunc.getListCellValue(listId, rowIndex,
      // "product_cd");
  
      // var arrIndex = PD_Common.fnGetListCheckedIndex("SYSTEM_USER_LIST",
      // "chk");
      
      /*
      var arrIndex = PD_Common.fnGetListCheckedIndex({
        type : 'radio',
        listId : 'SYSTEM_USER_LIST',
        colId : 'chk'
      });
      if (arrIndex.length > 0) {
        // for(var i in arrIndex) {
        // product_cd += NE_CtrlFunc.getListCellValue("SYSTEM_USER_LIST",
        // arrIndex[i], 'product_cd') + ",";
        // }
  
        user_id = DJ_CtrlFunc.getListCellValue("SYSTEM_USER_LIST", arrIndex[0] + 1, 'user_id');
      }
    
      var args = {
        "user_id" : user_id, // KEY
      };
      */
      // 사용자 상세/권한
      PD_Common.fnOpenContent("/admin/survey/" + type, "G_CONTENTS_EDGE_RIGHT", params);
      break;
    default:
      break;
  }
}