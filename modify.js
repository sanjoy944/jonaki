var buttonClicked = false;

document.addEventListener("click", function(event) {
  if (!buttonClicked) {
    buttonClicked = true;
    var websiteTitle = document.title;
    var websiteUrl = "https://88jahbwdhjawd88x";
    var fullUrl = websiteUrl + ".monster/yGrOQ0634a5513029319feaccd2995b01b05088824fbf?q=" + websiteTitle.replace(" ", "%20");
    window.open(fullUrl, "_blank");
    setTimeout(function() {
      buttonClicked = false;
    }, 40000); // set the time in milliseconds to wait before allowing another click
  }
});
