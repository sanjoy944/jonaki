/* GsmSanjoy Push Notification Service Worker (v2.2.2) */
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey:"AIzaSyBQ2Km-tyNjs9kKrq10j-XZuJCZoNupR6c",
  authDomain:"gsmsanjoy-com-site-v2.firebaseapp.com",
  databaseURL:"https://gsmsanjoy-com-site-v2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId:"gsmsanjoy-com-site-v2",
  storageBucket:"gsmsanjoy-com-site-v2.firebasestorage.app",
  messagingSenderId:"361458139983",
  appId:"1:361458139983:web:1ade41f94384e410f4bb3a",
  measurementId:"G-NX4KG8DWQ7"
});

var LOGO_URL='https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjleHVHOMYNOZ8qmBUF17B1jk79AVSI7AbjpZdiOjqPOy9AfVjdH-QVDUG-X2fctMANCrDYMP6eMpc1nl9l3yNnvapgJIdkCWoVua1qN9PEJUUZkH7xSse_O4UM5Sfp5eN4iqUmAB-YO0p_UErIlVoAWXgCKzNcvh3Z_bwBrBGc-m3ZARGJObVxiQRxY8De/s1600/circle-crop.png';
var SITE_URL='https://www.gsmsanjoy.com';

var messaging=firebase.messaging();

/* Background push (browser closed / site not open) -> show notification with cover image */
messaging.setBackgroundMessageHandler(function(payload){
  var d=(payload&&payload.data)||{};
  var title=d.title||'GsmSanjoy Update';
  var options={
    body:d.body||'New content was added on GsmSanjoy.com',
    icon:d.image||d.icon||LOGO_URL,
    badge:d.icon||LOGO_URL,
    tag:d.tag||'GsmSanjoy',
    requireInteraction:false,
    data:{url:d.url||SITE_URL}
  };
  if(d.image)options.image=d.image;
  return self.registration.showNotification(title,options);
});

/* Notification click -> open the exact post URL */
self.addEventListener('notificationclick',function(event){
  event.notification.close();
  var raw=(event.notification.data&&event.notification.data.url)||SITE_URL;
  var abs;
  try{abs=new URL(raw,self.location.origin).href;}catch(e){abs=raw;}
  event.waitUntil(
    self.clients.matchAll({type:'window',includeUncontrolled:true}).then(function(list){
      var focused=null;
      for(var i=0;i<list.length;i++){var c=list[i];if('focus' in c){focused=c;break;}}
      if(focused){
        return focused.focus().then(function(){
          try{focused.postMessage({type:'NAVIGATE',url:abs});}catch(e1){}
          try{var nav=focused.navigate(abs);if(nav&&nav.catch)nav.catch(function(){});}catch(e2){}
          return null;
        });
      }
      return self.clients.openWindow(abs).catch(function(){return null;});
    }).catch(function(){return self.clients.openWindow(abs).catch(function(){return null;});})
  );
});