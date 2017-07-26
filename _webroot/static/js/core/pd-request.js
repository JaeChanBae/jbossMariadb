/**
 * NAME : PD_Request.js
 * DESC : Request 함수 모음
 * VER  : 1.0
 * Copyright 2015 덕준님 Group All rights reserved
 * ============================================================================================
 *                변   경   사   항
 * ============================================================================================
 * VERSION    DATE    AUTHOR    DESCRIPTION
 * ============================================================================================
 * 1.0    2015.03.16    kang d.j  최초작성
 */

var PD_Request = function() {
  this.copyright = '여신님~ 포동아~~ 사랑해~!!!';
  this.domain = 'http://127.0.0.1/';
  this.actionURL = '';
  this.options = null;
  this.success = null;
  this.error = null;
  this.method = 'POST';
  this.formId = '';
  this.enctype = '';
  this.progress = true;
  this.progressArea = ''; // MAIN_CONTENTS
  this.progressText = '로딩중입니다...';
  this.async = true; // sync:false, async:true
  this.mimeType = "text/json"; // text/json, text/xml
};

/**
 * HttpRequest Object Return
 */
PD_Request.getHttpRequest = function() {
  // if(window.ActiveXObject) {
  if (window.ActiveXObject || "ActiveXObject" in window) {
    try {
      httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e1) {
      try {
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e2) {
      }
    }

  } else {
    httpRequest = new XMLHttpRequest();
    /*
     * httpRequest.overrideMimeType('text/json');
     * httpRequest.overrideMimeType('text/xml');
     */
  }

  return httpRequest;
}

/**
 * 화면컨트롤 그리기
 */
PD_Request.prototype.methods = function() {
  if (typeof arguments[0] === 'string') {
    return eval("this." + arguments[0] + ".apply(this, [arguments[1]])");
  } else {
    // return this.fnProcessCall.apply(this, arguments);
  }
};

/**
 * form data submit
 */
PD_Request.prototype.ajax = function(_options) {

  this.options = _options;
  this.options.callBackSessionOut = function() {

  };

  this.options.callError = function(jsonData, result, mimeType) {
    // PD_Common.MsgBox(JSON.stringify(jsonData), "E"); // (C:Confirm-확인/취소버튼,
    // I:Information-확인, E:Error-확인버튼)
//    alert(jsonData['message']);
//    PD_Common.closeProgress(progressArea);
    
    PD_Common.MsgBox(jsonData['message'], 'E', {
      title : jsonData['title'],
      callback : function(_result) {
        PD_Common.closeProgress(progressArea);
      }
    });
  };

  var method = typeof this.options.method != "undefined" ? this.options.method : this.method;
  var formId = typeof this.options.formId != "undefined" ? this.options.formId : this.formId;
  var enctype = typeof this.options.enctype != "undefined" ? this.options.enctype : this.enctype;
  var progress = typeof this.options.progress != "undefined" ? this.options.progress : this.progress;
  var progressArea = typeof this.options.progressArea != "undefined" ? this.options.progressArea : this.progressArea;
  var progressText = typeof this.options.progressText != "undefined" ? this.options.progressText : this.progressText;
  var async = typeof this.options.async != "undefined" ? this.options.async : this.async;
  var mimeType = typeof this.options.mimeType != "undefined" ? this.options.mimeType : this.mimeType;
  var url = this.options.url;
  
  // Progress Bar Show
  if (progress) {
    PD_Common.openProgress(progressArea, progressText);
  }

  // CSRF 방어
  /*
   * var G_CSRF_TOKEN = PD_Storage.get('G_CSRF_TOKEN', 'CSRF'); G_CSRF_TOKEN =
   * typeof G_CSRF_TOKEN != "undefined" ? G_CSRF_TOKEN : '';
   */
  var G_CSRF_TOKEN = jQuery("meta[name='_csrf']").attr("content");
  var G_CSRF_HEADER = jQuery("meta[name='_csrf_header']").attr("content");
  var G_CSRF_PARAMETER = jQuery("meta[name='_csrf_parameter']").attr("content");

  // alert("G_CSRF_TOKEN : " + G_CSRF_TOKEN + "\r\nG_CSRF_HEADER : " +
  // G_CSRF_HEADER + "\r\nG_CSRF_PARAMETER : " + G_CSRF_PARAMETER);
  
  
//  alert("url : " + url + "\r\ndata : " + this.options.data);
  
  if (enctype == 'multipart/form-data') {
    // Spring Security 에서 의미 없는듯 (beforeSend 에서 처리)
    // this.options.data = {G_AJAX_REQUEST:'TRUE',
    // G_CSRF_PARAMETER:G_CSRF_TOKEN};

    /*
     * if(!this.fn_Filter(jQuery("#"+formId).serialize(), mimeType)) {
     * PD_Common.closeProgress(progressArea); // Progress Bar Hide
     * 
     * var jsonData = new Array(); jsonData['title'] = "SQL INJECTION 발생";
     * jsonData['message'] = "전송할 수 없는 문자열이 포함되어있습니다.\r\n#';/*--";
     * _options.callError.apply(null, [jsonData, 'fail', mimeType]);
     * 
     * return; }
     */
  } else {
    // jQuery형식 파라메터로 변환
    if (this.options.data && typeof this.options.data !== "string") {
      this.options.data = jQuery.param(this.options.data);
    }

    // 세션 처리를 위해서
    this.options.data += "&G_AJAX_REQUEST=TRUE&" + G_CSRF_PARAMETER + "=" + G_CSRF_TOKEN;
    /*
     * if(!this.fn_Filter(this.options.data, mimeType)) {
     * PD_Common.closeProgress(progressArea); // Progress Bar Hide
     * 
     * var jsonData = new Array(); jsonData['title'] = "SQL INJECTION 발생";
     * jsonData['message'] = "전송할 수 없는 문자열이 포함되어있습니다.\r\n#';/*--";
     * _options.callError.apply(null, [jsonData, 'fail', mimeType]);
     * 
     * return; }
     */
  }
  
//  alert("method : " + method + "\r\nmimeType : " + mimeType);

  switch (method) {
    case "GET" :
      
      if(this.options.data) {
//        alert(">>>\r\nurl : " + url + "\r\ndata : " + this.options.data);
        
        
        url = url + "?" + this.options.data;
        this.options.data = "";
      }
      
      
      
      
      
      
      break;
    case "POST" :
      
      break;
    default:
      
      break;
  }
  
  if (enctype == 'multipart/form-data') {
    /*
     * alert(JSON.stringify(this.options.data));
     */

    jQuery("#" + formId).ajaxSubmit({
      type : method,
      url : url,
      data : this.options.data,
      dataType : mimeType, // ( default : xml,json,script,text,html )
      beforeSend : function(xhr) {
        // CSRF TOKEN 처리
        // xhr.setRequestHeader(header, token);
        xhr.setRequestHeader(G_CSRF_HEADER, G_CSRF_TOKEN);
      },
      success : function(rtnData, status) {
        if (progress) {
          // Progress Bar Hide
          PD_Common.closeProgress(progressArea);
        }

        if (!PD_Common.fnSessionCheck(rtnData)) {
          _options.callBackSessionOut.apply(null, [ '', 'fail', mimeType ]);
        } else {
          _options.success.apply(null, [ rtnData, 'success', mimeType ]);
        }
      },
      error : function(request, status, error) {
        try {
          request = jQuery.parseJSON(request.responseText);
        } catch (e) {
        }
        request['title'] = "FAIL";
        _options.callError.apply(null, [ request, 'fail', mimeType ]);
      }
    });

    return;
  }

  // var httpRequest = PD_Request.getHttpRequest('text/json');
  var httpRequest = PD_Request.getHttpRequest();
  if (method == "POST") {
    httpRequest.open(method, url, async);
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;	charset=UTF-8');

    // AJAX 세션처리를 위해서
    // httpRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    httpRequest.setRequestHeader('AJAX', true);

    // $(window).scrollTop(0);
    // httpRequest.setRequestHeader('Content-Type', 'text/xml; charset=UTF-8');
  } else {
    // 요청을 초기화
    httpRequest.open(method, url, async);
  }

  // 상태가 변할 시 걸리게 된다!
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState == 4) {
      // console.log(httpRequest.status);
//      console.log(httpRequest.status);

      switch (httpRequest.status) {
        case 400:
          //alert(jQuery.parseJSON(httpRequest.responseText));
          try {
            rtnData = jQuery.parseJSON(httpRequest.responseText);
          } catch (e) {
            rtnData = httpRequest.responseText;
          }
          
          rtnData['title'] = rtnData.error;
          rtnData['message'] = rtnData.errors[0].defaultMessage;
          _options.callError.apply(null, [ rtnData, 'fail', mimeType ]);
          
          break;
        case 401:
          // alert('401');
          // http://tip.daum.net/question/2805400
          /*
           * try { rtnData = jQuery.parseJSON(httpRequest.responseText); }
           * catch(e) { rtnData = httpRequest.responseText; } rtnData['title'] =
           * "Unauthorized, 클라이언트의 인증 실패"; // _options.callError.apply(null,
           * [rtnData, 'fail', mimeType]);
           */
  
          PD_Common.fnLoginPage();
          _options.callBackSessionOut.apply(null, [ '', 'fail', mimeType ]);
          break;
        case 403:
          // alert('403');
          /*
           * try { rtnData = jQuery.parseJSON(httpRequest.responseText); }
           * catch(e) { rtnData = httpRequest.responseText; } rtnData['title'] =
           * "Forbidden, 접근이 거부된 문서를 요청함"; _options.callError.apply(null,
           * [rtnData, 'fail', mimeType]);
           */
  
          PD_Common.fnLoginPage();
          _options.callBackSessionOut.apply(null, [ '', 'fail', mimeType ]);
          break;
        case 404:
          try {
            rtnData = jQuery.parseJSON(httpRequest.responseText);
          } catch (e) {
            rtnData = httpRequest.responseText;
          }
          rtnData['title'] = "Not found, 문서를 찾을 수 없음";
          _options.callError.apply(null, [ rtnData, 'fail', mimeType ]);
          break;
        case 406:
          try {
            rtnData = jQuery.parseJSON(httpRequest.responseText);
          } catch (e) {
            rtnData = httpRequest.responseText;
          }
          rtnData['title'] = "불가"; // 사용자 정의함수로 사용 - 원래 : Not acceptable, 허용할 수
                                    // 없음
          _options.callError.apply(null, [ rtnData, 'fail', mimeType ]);
          break;
        case 500:
          try {
            rtnData = jQuery.parseJSON(httpRequest.responseText);
          } catch (e) {
            rtnData = httpRequest.responseText;
          }
          rtnData['title'] = "Internal server error, 내부서버 오류";
          _options.callError.apply(null, [ rtnData, 'fail', mimeType ]);
          break;
        case 200: // 성공
//          console.log("mimeType : " + mimeType);
  
          var rtnData = null;
          if (mimeType == 'text/xml') {
            rtnData = httpRequest.responseXML;
          } else if (mimeType == 'text/html') {
            rtnData = httpRequest.responseText;
          } else {
            try {
              // alert("httpRequest.responseText : " + httpRequest.responseText);
              rtnData = jQuery.parseJSON(httpRequest.responseText);
            } catch (e) {
              alert("DE_Request Exception INININ");
  
              rtnData = httpRequest.responseText;
              rtnData['title'] = "FAIL";
              _options.callError.apply(null, [ rtnData, 'fail', mimeType ]);
            }
          }
  
          if (method == "POST") {
            // rs_HRequestResult(sSvcID, sRecvForm, sUserRsltFunc,
            // httpRequest.responseXML, sMsg, sMsgSvcID);
            // _options.success.apply(null, arguments);
          } else {
            // _options.success.apply(null, arguments);
          }
  
          // alert('rtnData : ' + rtnData);
          if (!PD_Common.fnSessionCheck(rtnData)) {
            _options.callBackSessionOut.apply(null, [ '', 'fail', mimeType ]);
          } else {
            _options.success.apply(null, [ rtnData, 'success', mimeType ]);
          }
  
          if (progress) {
            // Progress Bar Hide
            PD_Common.closeProgress(progressArea);
          }
  
          break;
        default:
          break;
      }
    }
  };

  // 실질적으로 요청을 서버로 보낸다
  // content 에 값을 넘기려면 open() 메소드는 반드시 POST 로 설정해야 하며, GET 방식으로 요청하려면 null 을
  // 설정하면 된다
  httpRequest.send(this.options.data);
};

/**
 * 전송전 금지 값 필터링
 */
PD_Request.prototype.fn_Filter = function(param, mimeType) {
  if (mimeType == 'text/xml') {
    return true;
  }

  // console.log(param);
  // 패스워드 항목은 제외
  /*
   * param = param.replace(/(user_passwd=([^&]+)&)/ig, ""); param =
   * param.replace(/(&user_passwd=([^&]+)?)/ig, ""); param =
   * param.replace(/(mall_passwd[]=([^&]+)&)/ig, ""); param =
   * param.replace(/(&mall_passwd[]=([^&]+)?)/ig, ""); param =
   * param.replace(/(editor_desc([^&]+)&)/ig, ""); param =
   * param.replace(/(&editor_desc([^&]+)?)/ig, "");
   */
  param = param.replace("/(user_passwd=([^&]+)&)/ig", "");
  param = param.replace("/(&user_passwd=([^&]+)?)/ig", "");
  param = param.replace("/(mall_passwd[]=([^&]+)&)/ig", "");
  param = param.replace("/(&mall_passwd[]=([^&]+)?)/ig", "");
  param = param.replace("/(editor_desc([^&]+)&)/ig", "");
  param = param.replace("/(&editor_desc([^&]+)?)/ig", "");
  // console.log(param);

  var rtnBool = true;

  var arr_idx = 0;
  var arr_filter = new Array();
  arr_filter[arr_idx++] = "#";
  arr_filter[arr_idx++] = "'";
  arr_filter[arr_idx++] = ";";
  arr_filter[arr_idx++] = "/*";
  arr_filter[arr_idx++] = "--";

  jQuery.each(arr_filter, function(idx, val) {
    if (param.indexOf(val) > -1) {
      rtnBool = false;
      return false;
    }
  });

  arr_idx = 0;
  var arr_filter_escape = new Array();
  arr_filter_escape[arr_idx++] = escape("#");
  arr_filter_escape[arr_idx++] = escape("'");
  arr_filter_escape[arr_idx++] = escape(";");
  arr_filter_escape[arr_idx++] = "%2F" + escape("*");
  arr_filter_escape[arr_idx++] = escape("--");

  jQuery.each(arr_filter_escape, function(idx, val) {
    //console.log(val);
    if (param.indexOf(val) > -1) {
      rtnBool = false;
      return false;
    }
  });

  return rtnBool;
};
