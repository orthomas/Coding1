//This part is from w3chool https://www.w3schools.com/howto/howto_js_topnav_responsive.asp
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}
// reference: https://www.w3schools.com/w3css/w3css_tabulators.asp
function showTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.tabName += " active";
}


function getBookList() {
  var xhr = new XMLHttpRequest();
  var uri = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/booklist";
  xhr.open("GET", uri, true);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onload = function () {
    var myBo = JSON.parse(xhr.responseText);
    showDestinations(myBo);
  }
  xhr.send(null);
}

//FUNCTION FOR SHOWING THE BOOKS TABLE
function showDestinations(dest) {
  var tableContent1 = "<tr><td>Book Cover</td><td>Title</td><td></td></tr>\n";
  for (var i = 0; i < dest.length; ++i) {
    var record = dest[i];
    var button = buyButtonStyle('Book', record.Id);
    var image = myimage(record.Id);
    tableContent1 += "<tr><td>"+ image + "</td><td>" + record.Title + "</td><td>" + button + "</td></tr>\n";
  }
  document.getElementById("showResult").innerHTML =tableContent1;

}

function myimage(record) {
    var url = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/bookimg?id=" + record;
    var img = "<img src='" + url +"'>";
    return img;

}


function getBrList() {
  var xhr = new XMLHttpRequest();
  var uri = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/brlist";
  xhr.open("GET", uri, true);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onload = function () {
    var myBr = JSON.parse(xhr.responseText);
    //alert(xhr.responseText);
    showDestinations2(myBr);
  }
  xhr.send(null);
}
// FUNCTION TO SHOW THE BLURAYS TABLE
function showDestinations2(dest) {
  var tableContent1 = "<tr><td>Bluray Cover</td><td>Title</td><td></td></tr>\n";
  for (var i = 0; i < dest.length; ++i) {
    var record = dest[i];
    var button = buyButtonStyle('Br', record.Id);
    var image = myimage2(record.Id);
    tableContent1 += "<tr><td>"+ image + "</td><td>" + record.Title + "</td><td>" + button + "</td></tr>\n";
  }
  document.getElementById("showBlurays").innerHTML =tableContent1;

}

function myimage2(record) {
    var url = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/brimg?id=" + record;
    var img = "<img src='" + url +"'>";
    return img;

}

function buyButtonStyle(type, id){
  var button = "<button class='buttonstyle' onclick=\"buyItem('" + type + "','" + id + "')\"> Buy Now </button>";
  return button;
}

// reference for the searhch function https://www.w3schools.com/howto/howto_js_filter_table.asp
function searchFunction(type) {
  var input, filter, table, tr, td, i;
  if (type=="a") {
    table = document.getElementById("showResult");
    input = document.getElementById("myInput");
  } else {
    table = document.getElementById("showBlurays");
    input = document.getElementById("myInput1");
  }
  filter = input.value.toUpperCase();
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function getComments() {
  var xhr = new XMLHttpRequest();
  var uri = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/htmlcomments";
  xhr.open("GET", uri, true);
  xhr.onload = function () {
    var version_d = document.getElementById("Gcomments");
    version_d.innerHTML = xhr.responseText;
  }
  xhr.send(null);
}

function postComment() {
  var xhr = new XMLHttpRequest();
  var name = document.getElementById("writeName");
  var uri = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/comment?name=" + name.value;
  xhr.open("POST", uri, true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  var comment = document.getElementById("writeComment");
  var objectToPost = comment.value;

  xhr.send(JSON.stringify(objectToPost));
  //getComments();
}

function register() {
  var xhr = new XMLHttpRequest();
  var uri = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/register";
  xhr.open("POST", uri, true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  var username = document.getElementById("username").value;
  var add = document.getElementById("address").value;
  var pass = document.getElementById("password").value;
  if (username == ""  || add == "" || pass == "") {
    alert("Please enter all details for registration.");
  }
  else {
    var data = { "Address":add, "Name":username, "Password":pass };
    xhr.send(JSON.stringify(data));
    xhr.onload = function() {
      var regVar = JSON.parse(xhr.responseText);
      alert(regVar);
    }
  }
}



function loginFunction() {
  var url = "http://redsox.uoa.auckland.ac.nz/BC/Closed/Service.svc/user";
  window.open(url);
}

function buyItem(type, id) {
  if (type =='Book'){
    var url = " http://redsox.uoa.auckland.ac.nz/BC/Closed/Service.svc/bookbuy?id=" + id;
    window.open(url);
  } else {
    var url = "http://redsox.uoa.auckland.ac.nz/BC/Closed/Service.svc/brbuy?id=" + id;
    window.open(url);
  }
}

function getVersion() {
  var xhr = new XMLHttpRequest();
  var uri = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/version";
  xhr.open("GET", uri, true);
  xhr.onload = function () {
    var version_d = document.getElementById("versionNum");
    version_d.innerHTML = "Version: " + xhr.responseText + ", Copyright limited ";
  }
  xhr.send(null);
}
