importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');
firebase.initializeApp({apiKey:'AIzaSyBQ2Km-tyNjs9kKrq10j-XZuJCZoNupR6c',authDomain:'gsmsanjoy-com-site-v2.firebaseapp.com',databaseURL:'https://gsmsanjoy-com-site-v2-default-rtdb.asia-southeast1.firebasedatabase.app',projectId:'gsmsanjoy-com-site-v2',storageBucket:'gsmsanjoy-com-site-v2.firebasestorage.app',messagingSenderId:'361458139983',appId:'1:361458139983:web:1ade41f94384e410f4bb3a'});
var LOGO='https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjleHVHOMYNOZ8qmBUF17B1jk79AVSI7AbjpZdiOjqPOy9AfVjdH-QVDUG-X2fctMANCrDYMP6eMpc1nl9l3yNnvapgJIdkCWoVua1qN9PEJUUZkH7xSse_O4UM5Sfp5eN4iqUmAB-YO0p_UErIlVoAWXgCKzNcvh3Z_bwBrBGc-m3ZARGJObVxiQRxY8De/s1600/circle-crop.png';
var messaging=firebase.messaging();
messaging.onBackgroundMessage(function(payload){
  try{
    var d=(payload&&payload.data)||{},n=(payload&&payload.notification)||{};
    self.clients.matchAll({type:'window',includeUncontrolled:true}).then(function(list){
      if(list&&list.length){for(var i=0;i<list.length;i++){try{list[i].postMessage({GSM_PUSH_MSG:payload});}catch(e){}}return;}
      var title=d.title||n.title||'New Update - GsmSanjoy';
      var opts={body:d.body||n.body||'',icon:LOGO,badge:LOGO,tag:(d.type+':'+d.id+':'+d.action)||('GsmSanjoy-'+Date.now()),data:{url:d.url||'/'}};
      if(d.image)opts.image=d.image;
      return self.registration.showNotification(title,opts);
    }).catch(function(){
      var title=d.title||n.title||'New Update - GsmSanjoy';
      var opts={body:d.body||n.body||'',icon:LOGO,badge:LOGO,data:{url:d.url||'/'}};
      if(d.image)opts.image=d.image;
      self.registration.showNotification(title,opts);
    });
  }catch(e){}
});
self.addEventListener('notificationclick',function(event){
  event.notification.close();
  var data=event.notification.data||{};
  var url=data.url||'/';
  try{url=new URL(url,self.location.origin).href;}catch(e){}
  event.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(function(list){
    for(var i=0;i<list.length;i++){if(list[i].url===url)return list[i].focus();}
    return self.clients.openWindow(url);
  }));
});
self.addEventListener('install',function(){self.skipWaiting();});
self.addEventListener('activate',function(event){event.waitUntil(self.clients.claim());});
