/**
 * Global Variable Setting
 */
var S_LIST_ID = "SURVEY_LIST";

/**
 * onLoad Event
 */
jQuery(document).ready(function() {
  // 여러 기능 설정
  // PD_Utils.fnEventApply();
  
  PD_Grid.makeScreen("/js/admin/survey-list-layout.json", -1);
  
  fnSearch();
});

/**
 * Resize Event
 */
jQuery(window).resize(function() {
  // 화면 컨텐츠 고정
   PD_GridUtils.fnFiexdGridResize(S_LIST_ID);
});

/**
 * Search Button Click
 */
function fnSearch() {
  var args = jQuery("#fmSrch").serialize();
  var request = new PD_Request();
  request.methods('ajax', {
    url : '/admin/surveys',
    method : 'GET',
    data : args,
    success : function(jsonData, result, mimeType) {
      PD_GridData.setListData(S_LIST_ID, jsonData, 'LIST', mimeType);
      
      // 첫번째 ROW 선택
      if(parseInt(jsonData["totalCount"], 10) > 0) {
        //PD_Common.fnFirstTdClickEvent(S_LIST_ID, 1);
        fnList_onClick(S_LIST_ID, "remark", 1, 2);
      }
      else {
        var params = {};
        //var movieslistSrl = PD_GridUtils.getListCellValue(listId, rowIndex, 'movieslistSrl');
        fnTabClick_SurveyMang({type:'survey-form1', params:params});
      }
    },
    error : function(request, status, error) {
      // PD_Utils.MsgBox(JSON.stringify(request), "E"); // (C:Confirm-확인/취소버튼,
      // I:Information-확인, E:Error-확인버튼)
    }
  });
}

// ######################################################## LIST EVENT STARTE
/**
 * Event Controller Function
 */
function fnCtrlFunction(mode, listId, objVal) {
  var obj = eval(objVal)[0];

  switch (listId) {
    case S_LIST_ID:
      if (mode == 'PAGING') {
        // 페이징
        jQuery('#fmSrch #pageNumber').val(obj.pageNumber);
        fnSearch();
      } else if (mode == 'PAGING_LIMIT') {
        // 한페이지 레코드 수
        jQuery('#fmSrch #pageNumber').val('1');
        jQuery('#fmSrch #pageLimit').val(obj.pageLimit);
        fnSearch();
      } else if (mode == 'SORTING') {
        // 정렬
        jQuery('#fmSrch #orderBy').val(obj.colId + " " + obj.orderType);
        
        fnSearch();
      } else if (mode == 'LIST_CLICK') {
        // LIST 클릭
        fnList_onClick(obj.listId, obj.colId, obj.rowIndex, obj.colIndex);
      } else if (mode == 'LIST_DBCLICK') {
        // LIST 더블클릭
        fnList_onDbClick(obj.listId, obj.colId, obj.rowIndex, obj.colIndex);
      }
  
      break;
    default:
      break;
  }
}

/**
 * LIST Click Event
 */
function fnList_onClick(listId, colId, rowIndex, colIndex) {
  switch (listId) {
    case S_LIST_ID:
//      alert(rowIndex + "\r\n" + colIndex);
      /*
      // 체크박스 체크!
      if (PD_GridUtils.fnIsTrActive(listId, rowIndex)) {
        jQuery('#fmSrch #chk' + rowIndex).attr('checked', true);
      } else {
        jQuery('#fmSrch #chk' + rowIndex).attr('checked', false);
      }
      
      var product_cd = PD_GridUtils.getListCellValue(listId, rowIndex, 'product_cd');
      
      if (colId == 'product_name') { // 수정
        fnModify(product_cd);
      }
      */
//      jQuery("#ctrl_"+S_LIST_ID+" #chk"+rowIndex).attr("checked", true);
      
      PD_GridUtils.fnTrActiveOne(listId, rowIndex);
      
      var movieslistSrl = PD_GridUtils.getListCellValue(listId, rowIndex, 'movieslistSrl');
//      alert("movieslistSrl : " + movieslistSrl);
      
      
      
//      if(PD_GridUtils.fnIsTrActive(listId, rowIndex)) {
//        jQuery('#chk'+rowIndex).attr('checked', true);
//      }
//      else {
//        jQuery('#chk'+rowIndex).attr('checked', false);
//      }

      var params = {movieslistSrl:movieslistSrl};
      fnTabClick_SurveyMang({type:'survey-form1', params:params});
      
      
      break;
    default:
      break;
  }
}

/**
 * LIST Double Click Event
 */
function fnList_onDbClick(listId, colId, rowIndex, colIndex) {

  switch (listId) {
  case S_LIST_ID:

    break;
  default:
    break;
  }
}