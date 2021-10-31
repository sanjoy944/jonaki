function validEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function uploadWait(time) {
  await sleep(time);
  main.uploadText = "Upload MP3";
}


function randomID(){
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}



var db = firebase.firestore()


var main = new Vue({
  el: '#main',
  components: {},
  data: function() {
    return {
      uploadText: "Upload MP3",
      id: " ",
      showInvalidEmail: false,
      user: null,
      userData: {},
      userDataSub: null,
      showFAQ: false,
      showFeedback: false,
      sendButton: "send",
      amount: 0,
      amountButton: 20,
      alertM: "",
      supportLoading: false,
      showSupport: false,
      mode: 4,
      uploadCounter: 1,
      credit: 88888,
      page: "core",
      authError: "",
      authLoading: false,
      quality: 'hq',
      showQualityTip: true,

      anonUpgrade: false,
      anonUploads: [],
      anonCredit: null,
      paymentMethod: "paypal",

      showSuccess: false,
      successAmount: 10,
      showReset: false,
      resetText: "Send password reset link",
      resetError: "",

      loaded: false,
      showCredits: true,

    }
  },

  methods: {

    setQuality: function(q){
      this.quality = q;
    },

    routy: function(page){
      this.authLoading = false;
      this.authError = "";
      var pages = ["core", "support", "create", "login", "faq", "reset"];
      this.page = page;
      pages.forEach(p => document.getElementById(p).style.display = "none");
      document.getElementById(this.page).style.display = "block";
      document.getElementById(this.page).style.display = "block";
    },

    resetPassword: function(){
      var email = document.getElementById("reset-email-input").value;
      var auth = firebase.auth();
      this.resetText = "Sending Email";

      auth.sendPasswordResetEmail(email).then(function() {
        main.routy("core");
      }).catch(function(error) {
        main.resetError = "Error: No account with email exists";
      });
    },

    selectMode: function(mode){
      this.mode = mode;
    },

    toggleFAQ: function(){
      if(!this.showFAQ){
        document.getElementById("FAQ").style.display = "block";
        this.showFAQ = true;
        window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
      }
      else{
        document.getElementById("FAQ").style.display = "none";
        this.showFAQ = false;
      }
    },

    getUserData: async function(){
      var userData = null
      var reqCount = 0
      while(userData == null)
      {
        db.collection("users").doc(main.user.uid).get().then((res) => {
          userData = res
        })
        if(userData == null) await sleep(200)
        reqCount += 1
        // timeout exception
        if(reqCount > 150) break;
      }

      var d = userData.data();
      if(d == null){
        // this.showCredits = false
        return
      }

      else {

        if(main.anonUpgrade){
          var uploads = d.uploads;

          // Union uploads of uploaded account and sign in if possible
          for(var i = 0; i < main.anonUploads.length; i++){
            if(d.uploads.filter(o => o.id == main.anonUploads[i].id).length == 0){
              uploads.push(main.anonUploads[i]);
            }
          }
          var credit = d.credit;
          if(d.credit != null && main.anonCredit != null){
              credit = Math.max(d.credit, main.anonCredit);
          }
          db.collection("users").doc(main.user.uid).update({
            uploads: uploads,
            credit: credit,
          });
        }
      }

      main.userData = d;
      main.checkSuccess();
      main.userDataSub = db.collection("users").doc(main.user.uid)
      .onSnapshot(function(doc) {
        db.collection("users").doc(main.user.uid).get()
        .then((doc)=> {
          var d = doc.data();
          main.userData = d;
          main.credit = main.getCredit();
          main.checkSuccess();
          document.getElementById("email-input").value = d.email;
        })
      });

    },

    // alert user that payment is successful
    checkSuccess: function(){
      if(this.userData.newCredits){
        main.showSuccess = true;
        main.successAmount = main.userData.newCreditsAmount;

        db.collection("users").doc(main.user.uid).update({
          newCredits: false,
        });
      }
    },

    hideSuccess: function(){
      this.showSuccess = false;
    },


    uploadClick: function() {
      if(this.uploadText == "Upload MP3"){
        if(this.credit <= 0){
          this.routy("support");
          return;
        }

        if(!this.user && storageGet("hasAccount")){
          this.routy("login")
          return;
        }

        var email = document.getElementById("email-input").value;
        if(!validEmail(email)){
          this.showInvalidEmail = true;
          return;
        }
        else{
          this.showInvalidEmail = false;
        }

        document.getElementById("mp3-upload-" + +this.uploadCounter.toString()).click();
        this.uploadCounter += 1;
      }

      if(this.uploadText == "Download Stems"){
        window.open("https://storage.googleapis.com/melody-ml.appspot.com/output/" + this.id + ".zip");
      }
    },


    removeItem: function(id){
      for(var i = 0; i < this.userData.uploads.length; i++){
        if(this.userData.uploads[i].id == id){
          this.userData.uploads[i].removed = true;
          break;
        }
      }
      db.collection("users").doc(this.user.uid).update({
          uploads: this.userData.uploads,
      });
    },


    download: function(id){
      window.open("https://storage.googleapis.com/melody-ml.appspot.com/output/" + id + ".zip");
    },


    up: function(event){
      var id = randomID();
      var ups = null;
      ups = this.userData.uploads;
      if(!ups){ ups = []; }

      ups.push({
        id: id,
        status: "Queued",
        name: event.target.files[0].name,
      });

      db.collection("users").doc(this.user.uid).update({
          email: document.getElementById("email-input").value,
          uploads: ups
      })
      .then(() =>{
        var storageRef = firebase.storage().ref();
        this.id = id;
        var path = 'mp3s/' + id + "_" + event.target.files[0].name;
        var file_name = id + "_" + event.target.files[0].name;
        var uploadTask = storageRef.child(path).put(event.target.files[0]);

        uploadTask.on('state_changed', function(snapshot) {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          main.uploadText = "Uploading " + progress.toFixed(1) + " %";

          if(progress == 100){
            main.uploadText = "Uploaded";
            var startTask = firebase.functions().httpsCallable('startTask');
            startTask({
              path: file_name,
              quality: main.quality,
              name: event.target.files[0].name,
              id: id,
              uid: main.user.uid,
              mode: main.mode,
              email: document.getElementById("email-input").value
            })
            .then((r) => {
              // Delay showing new text on upload button
              if(main.credit <= 99999){ uploadWait(20000); }
              else{ uploadWait(5000); }

            })
          }

        }, function(error) {
          console.log(error);
        });
      });
    },


    startUpload: function(event) {
      // Edge case (user credit reset)
      if(!this.loaded){ return; }


      this.uploadText = "Starting Upload...";
      if(!this.user){
        firebase.auth().signInAnonymously()
        .then((res) =>{
          db.collection("users").doc(res.user.uid).set({
              uid: res.user.uid,
              email: document.getElementById("email-input").value,
              uploads: [],
              credit: 88888,
          })
          .then(() =>{
            main.up(event);
          });
        });
      }
      else{ this.up(event); }
    },

    selectPaymentMethod: function(paymentMethod){
      this.paymentMethod = paymentMethod
    },


    checkout: function(amount){
      if(this.user == null) {
        this.routy("create")
        return
      }
      if(this.user.isAnonymous){
        this.routy("create")
        return
      }
      if(this.paymentMethod == "stripe"){ this.stripeCheckout(amount); }
      if(this.paymentMethod == "paypal"){ this.paypalCheckout(amount); }
    },


    paypalCheckout: function(amount){
      // Prevent any buttons being double clicked
      if(this.amount != 0){ return; }
      this.amount = amount;

      var credit = 10;
      if(amount == 10){ credit = 20; }
      if(amount == 20){ credit = 50; }
      document.getElementById("paypalAmount").value = amount;
      document.getElementById("item_number").value = this.user.uid + "_" + credit;
      document.getElementById("item_number1").value = this.user.uid + "_" + credit;
      document.getElementById("pp").click();
    },


    stripeCheckout: function(amount){
      // Prevent any buttons being double clicked
      if(this.amount != 0){ return; }
      this.amount = amount;

      var a = this.amount;
      a*=100;

      var initPayment = firebase.functions().httpsCallable('stripeStart')
      initPayment({
        uid: this.user.uid,
        amount: a,
      })
      .then((x) => {
        var stripe = Stripe('pk_live_nBCF7lQ68I9zbMIetbmkOQ0700LlnSSLQn');

        stripe.redirectToCheckout({
            sessionId: x.data.id
          }).then(function (result) {
        });
      });
    },


    getCredit: function(){
      var nUploads = this.userData.uploads.filter(u => u.status == 'Complete').length;
      return this.userData.credit - nUploads;
    },


    paymentAmount: function(amount){
      if(this.amount != 0){ return; }
      this.amount = amount;
      this.checkout();
    },


    loginClick: function(){
      var email = document.getElementById("email-login-input").value;
      var password = document.getElementById("password-login-input").value;
      this.authError = "";
      this.authLoading = true;
      this.checkAnon()
       firebase.auth()
       .signInWithEmailAndPassword(email, password)
       .then((res) => {
         main.routy("core");
       })
       .catch(function(error) {
         main.authError = error;
         main.authLoading = false;
       });
   },


    createClick: function() {
      this.authError = "";
      this.authLoading = true;
      var email = document.getElementById("email-signup-input").value;
      var password = document.getElementById("password-signup-input1").value;

      var currentUploads = []
      if(this.anonUpgrade && this.userData.uploads != null) {
        currentUploads = this.userData.uploads
      }

      // Upgrade Anonymous account method
      if(this.user && this.user.isAnonymous){
        var credential = firebase.auth.EmailAuthProvider.credential(email, password);
        firebase.auth().currentUser.linkAndRetrieveDataWithCredential(credential)
        .then(function(res) {
          console.log(res);
          main.routy("core");
        }, function(error) {
          main.authError = error;
          console.log(error);
          main.authLoading = false;
        });
      }
      // Normal Method
      else{
        firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          var credit = main.credit;

          let email = document.getElementById("email-input").value
          db.collection("users").doc(res.user.uid).set({
              uid: res.user.uid,
              email: (email == null) ? "" : email,
              uploads: currentUploads,
              credit: 99999
          })
          .then(() => {
            main.routy("core");
          });

        })
        .catch(function(error) {
          main.authError = error;
          main.authLoading = false;
          console.log(error);
        });
      }
    },


    logout: function(){
      // Stop listening on socket
      var uploads = this.userData.uploads;
      if(this.userData.credit != null){ credit = this.userData.credit; }
      this.userDataSub();
      console.log(this.userData.credit)
      if(this.userData.credit != null){
        storageSet("hasAccount", true, 365)
        firebase.auth().signOut()
        return
      }

      firebase.auth().signOut()
      // Cache uploads to anonymous account
      .then(() =>{
        let email = document.getElementById("email-input").value
        firebase.auth().signInAnonymously()
        .then((res) =>{
          db.collection("users").doc(res.user.uid).set({
              uid: res.user.uid,
              email: (email == null) ? "" : email,
              uploads: uploads,
              credit: credit
          })
        });
      })
      this.uploadText = "Upload MP3";
    },


    checkAnon: function(){
      // This is for saving user uploads if they have an anon account when
      // upgrading via Twitter or Google
      if(this.user && this.user.isAnonymous && this.userData && this.userData.uploads){
        this.anonUpgrade = true;
        this.anonUploads = this.userData.uploads;
        if(this.userData.credit != null){
          this.anonCredit = this.userData.credit;
        }
      }
    },


    googleSignin: function(){
      this.checkAnon();
      var currentUploads = []
      if(this.anonUpgrade && this.userData.uploads != null) {
        currentUploads = this.userData.uploads
      }
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
      .then(function(res) {
        console.log("new user: ", res.additionalUserInfo.isNewUser)
        if(res.additionalUserInfo.isNewUser) {
          let email = document.getElementById("email-input").value
          db.collection("users").doc(res.user.uid).set({
            uid: res.user.uid,
            email: (email == null) ? "" : email,
            uploads: currentUploads,
            credit: 9999
          })
          .then(() => {
            main.routy("core");
          })
        }
        else { main.routy("core"); }
      }).catch(function(error) {
        main.authError = error;
        main.authLoading = false;
        console.log(error);
      });
    },


    twitterSignin: function(){
    this.checkAnon();
    var currentUploads = []
    if(this.anonUpgrade && this.userData.uploads != null) {
      currentUploads = this.userData.uploads
    }
     var provider = new firebase.auth.TwitterAuthProvider();
     firebase.auth().signInWithPopup(provider).then(function(res) {
       if(res.additionalUserInfo.isNewUser) {
         let email = document.getElementById("email-input").value
         db.collection("users").doc(res.user.uid).set({
           uid: res.user.uid,
           email: (email == null) ? "" : email,
           uploads: currentUploads,
           credit: 9999
         })
         .then(() => {
           main.routy("core");
         })
       }
       else { main.routy("core"); }
     }).catch(function(error) {
       main.authError = error;
       main.authLoading = false;
       console.log(error);
     });
   },

  },


  created() {
    document.getElementById("main").style.display = "block";
    console.log(storageGet("hasAccount"))
    firebase.auth()
    .onAuthStateChanged(function(user) {
      if(main.userDataSub != null){ main.userDataSub(); }
      main.user = user;
      main.loaded = true;
      console.log(user);
      if(user == null){main.showCredits = false;}
      else{main.showCredits = true;}
      if(user){ main.getUserData(); }
    });
  }

})

function storageSet(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function storageGet(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function storageErase(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
