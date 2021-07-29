$(document).ready(() => {
  var iframeHead = $('#my-iframe').contents().find('head')
  iframeHead.append('<style>.loader,.loader:after{border-radius:50%;width:50px;height:50px}.loader{font-size:10px;position:relative;border-top:1.1em solid rgba(0,0,0,.2);border-right:1.1em solid rgba(0,0,0,.2);border-bottom:1.1em solid rgba(0,0,0,.2);border-left:1.1em solid #000;-webkit-transform:translateZ(0);-ms-transform:translateZ(0);transform:translateZ(0);-webkit-animation:spin 1.1s infinite linear;animation:spin 1.1s infinite linear}@-webkit-keyframes spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}</style>')
  
  var iframeBody = $('#my-iframe').contents().find('body')
  
  // inject loading spinner
  iframeBody.append('<div class="loader"></div>')
  
  //center loading spinner
	iframeBody.css('display', 'flex')
	iframeBody.css('align-items', 'center')
	iframeBody.css('justify-content', 'center')
})

$(window).scroll(() => {
	var A = $(window).scrollTop(),
	    B = A + $(window).height()
	var C = $('#my-iframe').position().top,
	    D = C + $('#my-iframe').height()

	var frameIsWithinViewport = (A <= D && B >= C)

	if(frameIsWithinViewport && $('#my-iframe').attr('data-loaded') == 'false') {
    $('#my-iframe').attr('src', $('#my-iframe').attr('data-src'))
    $('#my-iframe').attr('data-loaded', 'true')
  }
})