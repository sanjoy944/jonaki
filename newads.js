// Fix Link Result
function extractDomain(url) {
	var hostname;
	if (url.indexOf("://") > -1) {hostname = url.split('/')[2];}
	else {hostname = url.split('/')[0];}
	hostname = hostname.split(':')[0];
	hostname = hostname.split('?')[0];
	return hostname;
}
function exception(){
	var exception = new Array();	
	setting.pengecualian = setting.pengecualian;
	exception = setting.pengecualian.split(",");
	return exception;
}

function hanyauntuk(){var hanyauntuk=new Array();setting.hanyauntuk=setting.hanyauntuk;hanyauntuk=setting.hanyauntuk.split(",");return hanyauntuk;}

function convertstr(str) {
	return str.replace(/^\s+/, '').replace(/\s+$/, '');
}

var aesCrypto={};!function(t){"use strict";t.formatter={prefix:"",stringify:function(t){var r=this.prefix;return r+=t.salt.toString(),r+=t.ciphertext.toString()},parse:function(t){var r=CryptoJS.lib.CipherParams.create({}),e=this.prefix.length;return 0!==t.indexOf(this.prefix)?r:(r.ciphertext=CryptoJS.enc.Hex.parse(t.substring(16+e)),r.salt=CryptoJS.enc.Hex.parse(t.substring(e,16+e)),r)}},t.encrypt=function(r,e){try{return CryptoJS.AES.encrypt(r,e,{format:t.formatter}).toString()}catch(n){return""}},t.decrypt=function(r,e){try{var n=CryptoJS.AES.decrypt(r,e,{format:t.formatter});return n.toString(CryptoJS.enc.Utf8)}catch(i){return""}}}(aesCrypto);

// new
// old
if (!setting.pengecualian) {
	setting.pengecualian = window.location.href;
} else {
	setting.pengecualian += "," + window.location.href;
}
var exception = exception();
var hanyauntuk = hanyauntuk();
var links =new Array();		
function showurl(datajson){

	var exceptionlength = exception.length;
	var hanyauntuklength = hanyauntuk.length;
	var checklink = "";
	var checkexception = "";
	var linktag = document.getElementsByTagName("a");

	if (setting.pengecualianstatus == false && setting.hanyauntukstatus == false) {
		alert('Silahkan pilih salah satu status agar auto link aktif !')
	}

	var semuaartikel = datajson.feed.openSearch$totalResults.$t;
	for(var i = 0; i < semuaartikel; i++) {
		var urlartikel;
		var semualink = datajson.feed.entry[i].link.length;
		for (var s = 0; s < semualink; s++) {
			if(datajson.feed.entry[i].link[s].rel == 'alternate') {
				urlartikel = datajson.feed.entry[i].link[s].href;
				break;
			}
		}
		links[i] = urlartikel;
	}
	for (var i = 0; i < linktag.length; i++) {
		var randindex = Math.random() * links.length; 
		randindex = parseInt(randindex);
		checkpengecualian = true;
		checkhanyauntuk = false;
		no = 0;
		if (setting.pengecualianstatus) {
			checkpengecualian = false;
			while (checkpengecualian == false && no < exceptionlength) {
				checklink = extractDomain(linktag[i].href);
				checkexception = extractDomain(exception[no]);
				if (checklink.match(checkexception)) {
					checkpengecualian = true;
				}
				no++;
			}
		}
		if (setting.hanyauntukstatus) {
			checkhanyauntuk = false;
			while (checkhanyauntuk == false && no < hanyauntuklength) {
				checklink = extractDomain(linktag[i].href);
				checkexception = extractDomain(hanyauntuk[no]);
				if (checklink.match(checkexception)) {
					checkhanyauntuk = true;
				}
				no++;
			}
		}
		if (checkpengecualian == false || checkhanyauntuk == true) {
			linktag[i].href = links[randindex] + setting.path + aesCrypto.encrypt(convertstr(linktag[i].href), convertstr('root'));
			linktag[i].target = "_blank";
		}
	}
} 