/**
 * NAME : PD_Utils.js
 * DESC : 공통함수 모음
 * VER  : 1.0
 * Copyright 2015 덕준님 Group All rights reserved
 * ============================================================================================
 *                변   경   사   항
 * ============================================================================================
 * VERSION    DATE    AUTHOR    DESCRIPTION
 * ============================================================================================
 * 1.0    2015.03.16    kang d.j  최초작성
 */

PD_Utils = function() {
};

/**
 * Event apply
 */
PD_Utils.fnEventApply = function(id, fn_callback) {

  var target = id ? '#' + id + ' ' : 'form ';

  // PD_Utils.fnEventUISetting(target);
  // PD_Utils.fnEventUIApply(target);

  if (fn_callback != null && fn_callback != 'null' && typeof fn_callback != "undefined" && fn_callback != '') {
    eval(fn_callback + '();');
  }
};

/**
 * 메세지를 읽어서 리턴한다. 예)MsgBox("저장하시겠습니까?", "C", "N");
 */
PD_Utils.MsgBox = function(msg, type, _options) {

  if (!type)
    type = "I";

  try {
  } catch (e) {
  }

  var id = PD_Utils.fnGetStringToUnicode(type + '_MSG_FRAME');

  switch (type) {
  case "C":
    var title = "확인해주세요.";
    var dialog_style = "";

    if (_options) {
      if (_options.title)
        title = _options.title;

      if (_options.dialog_style)
        dialog_style = _options.dialog_style;

      var div_sb = new StringBuilder();
      div_sb
          .append(" <div class='modal_none_scroll fade' id='" + id + "' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true' style='margin-top:13%; z-index: 10001; -ms-overflow-y: hidden;'>  ");
      div_sb.append("     <div class='modal-dialog' style='" + dialog_style + "'> ");
      div_sb.append("         <div class='modal-content'> ");
      div_sb.append("             <div class='modal-header' id='" + id + "_MSG_HEADER'> ");
      div_sb.append("                 <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>×</button>  ");
      div_sb.append("                 <h4 class='modal-title text-primary h4'><strong><i class='fa fa-exclamation-triangle'></i> <span id='" + id + "-header-title'>" + title + "</span></strong></h4>  ");
      div_sb.append("             </div>  ");
      div_sb.append("             <div class='modal-body confirm' id='" + id + "_body'> ");
      div_sb.append("                 <div id='sel_mall_send_main' class='doc-buttons' style='position: absolute; z-index: 1; left: 80; overflow: auto; height: 264px;'>  ");
      div_sb.append("                 </div>  ");
      div_sb.append("             </div>  ");
      div_sb.append("             <div class='modal-footer' style='margin-top:0px;padding:13px;'> ");
      div_sb.append("                 <button type='button' class='btn btn-primary btn-sm' id='" + id + "-ok-btn'>진행하기</button> ");
      div_sb.append("                 <button type='button' class='btn btn-default btn-sm' id='" + id + "-close-btn'>취소</button>  ");
      div_sb.append("             </div>  ");
      div_sb.append("         </div>  ");
      div_sb.append("     </div>  ");
      div_sb.append(" </div>  ");

      PD_Utils.fnRemoveLayer(id);
      jQuery(div_sb.toString()).appendTo("body");

      jQuery('#' + id + '_body').html(msg);

      jQuery('#' + id + '-close-btn').unbind();
      jQuery('#' + id + '-ok-btn').unbind();

      jQuery('#' + id + '-close-btn').click(function() {
        jQuery('#' + id).modal('hide');
        _options.callback.apply(null, [ 'CANCEL' ]);
        jQuery('#' + id).remove();
      });
      jQuery('#' + id + '-ok-btn').click(function() {
        jQuery('#' + id).modal('hide');
        _options.callback.apply(null, [ 'OK' ]);
        jQuery('#' + id).remove();
      });
    } else {
      return confirm(msg);
    }

    break;
  case "I":
    var title = "Information.";
    var dialog_style = "";

    if (_options.title)
      title = _options.title;

    if (_options.dialog_style)
      dialog_style = _options.dialog_style;

    var div_sb = new StringBuilder();
    div_sb.append(" <div class='modal_none_scroll fade' id='" + id + "' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true' style='margin-top:13%; z-index: 10001; -ms-overflow-y: hidden;'>  ");
    div_sb.append("     <div class='modal-dialog' style='" + dialog_style + "'> ");
    div_sb.append("         <div class='modal-content'> ");
    div_sb.append("             <div class='modal-header' id='" + id + "_MSG_HEADER'> ");
    div_sb.append("                 <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>×</button>  ");
    div_sb.append("                 <h4 class='modal-title text-primary h4'><strong><i class='fa fa-exclamation-triangle'></i> <span id='" + id + "-header-title'>" + title + "</span></strong></h4>  ");
    div_sb.append("             </div>  ");
    div_sb.append("             <div class='modal-body confirm' id='" + id + "_body'> ");
    div_sb.append("                 <div id='sel_mall_send_main' class='doc-buttons' style='position: absolute; z-index: 1; left: 80; overflow: auto; height: 264px;'>  ");
    div_sb.append("                 </div>  ");
    div_sb.append("             </div>  ");
    div_sb.append("             <div class='modal-footer' style='margin-top:0px;padding:13px;'> ");
    div_sb.append("                 <button type='button' class='btn btn-default btn-sm' id='" + id + "-close-btn'>확인</button>  ");
    div_sb.append("             </div>  ");
    div_sb.append("         </div>  ");
    div_sb.append("     </div>  ");
    div_sb.append(" </div>  ");

    PD_Utils.fnRemoveLayer(id);
    jQuery(div_sb.toString()).appendTo("body");

    jQuery('#' + id + '_body').html(msg);
    jQuery('#' + id + '-close-btn').unbind();
    jQuery('#' + id + '-close-btn').click(function() {
      if (_options) {
        jQuery('#' + id).modal('hide');
        _options.callback.apply(null, [ 'OK' ]);
        jQuery('#' + id).remove();
      } else {
        jQuery('#' + id).modal('hide');
        jQuery('#' + id).remove();
      }
    });

    break;
  case "E":
    var title = "ERROR.";
    var dialog_style = "";

    if (_options.title)
      title = _options.title;

    if (_options.dialog_style)
      dialog_style = _options.dialog_style;

    var div_sb = new StringBuilder();
    div_sb.append(" <div class='modal_none_scroll fade' id='" + id + "' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true' style='margin-top:13%; z-index: 10001; -ms-overflow-y: hidden;'>  ");
    div_sb.append("     <div class='modal-dialog' style='" + dialog_style + "'> ");
    div_sb.append("         <div class='modal-content'> ");
    div_sb.append("             <div class='modal-header' id='" + id + "_MSG_HEADER'> ");
    div_sb.append("                 <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>×</button>  ");
    div_sb.append("                 <h4 class='modal-title text-primary h4'><strong><i class='fa fa-exclamation-triangle'></i> <span id='" + id + "-header-title' style='color:red;'>" + title + "</span></strong></h4> ");
    div_sb.append("             </div>  ");
    div_sb.append("             <div class='modal-body confirm' id='" + id + "_body'> ");
    div_sb.append("                 <div id='sel_mall_send_main' class='doc-buttons' style='position: absolute; z-index: 1; left: 80; overflow: auto; height: 264px;'>  ");
    div_sb.append("                 </div>  ");
    div_sb.append("             </div>  ");
    div_sb.append("             <div class='modal-footer' style='margin-top:0px;padding:13px;'> ");
    div_sb.append("                 <button type='button' class='btn btn-default btn-sm' id='" + id + "-close-btn'>확인</button>  ");
    div_sb.append("             </div>  ");
    div_sb.append("         </div>  ");
    div_sb.append("     </div>  ");
    div_sb.append(" </div>  ");

    PD_Utils.fnRemoveLayer(id);
    jQuery(div_sb.toString()).appendTo("body");

    jQuery('#' + id + '_body').html(msg);

    jQuery('#' + id + '-close-btn').unbind();
    jQuery('#' + id + '-close-btn').click(function() {
      if (_options) {
        jQuery('#' + id).modal('hide');
        _options.callback.apply(null, [ 'OK' ]);
        jQuery('#' + id).remove();
      } else {
        jQuery('#' + id).modal('hide');
        jQuery('#' + id).remove();
      }
    });

    break;
  }

  jQuery('#' + id).draggable({
    cursor : "move",
    handle : '#' + id + '_MSG_HEADER'
  });
  jQuery('#' + id).modal({
    keyboard : false,
    backdrop : true
  });
};

/**
 * 레이어팝업 닫기
 */
PD_Utils.fnRemoveLayer = function(id, closeRemove) {

  closeRemove = typeof closeRemove != "undefined" && (closeRemove == false || closeRemove == 'false') ? false : true;

  if (closeRemove) {
    jQuery('#' + id + '_FRAME').remove();
    jQuery('#' + id + '_FRAME_BACKDROP').remove();
  } else {
    jQuery('#' + id + '_FRAME').hide();
    jQuery('#' + id + '_FRAME_BACKDROP').hide();
  }
};

/**
 * 레이어팝업 보이기
 */
PD_Utils.fnShowLayer = function(id) {
  jQuery('#' + id + '_FRAME').show();
  jQuery('#' + id + '_FRAME').show();
  jQuery('#' + id + '_FRAME_BACKDROP').show();
};

/**
 * 문자열 --> 유니코드 문자열
 */
PD_Utils.fnGetStringToUnicode = function(str) {
  str = str || '';
  var ret = [];
  var strs = str.split('');

  for (var i = 0, length = strs.length; i < length; i++) {
    ret.push(escape(strs[i]).replace('%', 'UC'));
  }

  return ret.join('');
}