var firebaseConfig = {
    apiKey: "AIzaSyCF8wTAZ2YY4HKIairuxqMcvdN7p0DDrR4",
    authDomain: "official-bus-renewal.firebaseapp.com",
    databaseURL: "https://official-bus-renewal.firebaseio.com",
    projectId: "official-bus-renewal",
    storageBucket: "official-bus-renewal.appspot.com",
    messagingSenderId: "198386788272",
    appId: "1:198386788272:web:431e02a7b2a154982d5875",
    measurementId: "G-PQ86QVC1F8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


  function post(){
      var r = confirm("Are u sure? You want to post it");
      if (r == true) {
        var subject= document.getElementById("subject").value;
        var post=document.getElementById("message").value;
      
        const rootRef=firebase.database().ref('News/');
        rootRef.push({
          Subject: subject,
          Post : post
        });
        window.alert("News posted");
      } else {
        window.alert("post is canceled");
      }
  }



  const newsRef= firebase.database().ref('News/');

  newsRef.on("value",
  
  (snapshot) => {
  //   const college = document.getElementById("news-");
  
  // college.textContent=" ";
  
  snapshot.forEach((child) => {
    issue = child.val ();
  console.log(issue);
  // var row = document.createElement("tr");
  // row.innerHTML="<td>"+ issue.bus_no+ "</td><td>"+issue.bus_route+"</td><td>"+issue.bus_no_plate+"</td><td>"+issue.bus_stop.stop_1+"</td><td>"+issue.bus_stop.stop_2+"</td><td>"+issue.bus_seats+"</td><td>"+issue.bus_available+"</td><td>"+issue.bus_fee+"</td>";
  // college.append(row);


//   var h = document.createElement("H3");
// h.setAttribute('class','mbr-section-title mbr-fonts-style mb-2 display-7');
//   var t = document.createTextNode(issue.Subject);
//   h.appendChild(t);
//   var ele=document.getElementById("news-division");
//   var p = document.createElement("p");
//   p.setAttribute('class','mbr-text mbr-fonts-style display-4');
//   var t2 = document.createTextNode(issue.Post);
//   var b = document.createElement("BR");
//   p.appendChild(t2);
//   ele.appendChild(h);
//   ele.appendChild(p);
//   ele.appendChild(b);
  


var h = document.createElement("H1");
h.setAttribute('class','mbr-section-title mbr-fonts-style mb-2 display-7');
var s=document.createElement("strong");
var t = document.createTextNode(issue.Subject+":");
h.appendChild(s);
s.appendChild(t);

var p = document.createElement("p");
p.setAttribute('class','mbr-text mbr-fonts-style display-4');
var t2 = document.createTextNode(issue.Post);
p.appendChild(t2);

var b = document.createElement("BR");



var d1 = document.createElement("div");
var d2 = document.createElement("div");
var d3 = document.createElement("div");
var bq = document.createElement("blockquote");


d1.setAttribute('class','container');
d3.setAttribute('id','id1');
d2.setAttribute('class','row justify-content-center');
d3.setAttribute('id','id2');
d3.setAttribute('class','col-12 col-md-10');
d3.setAttribute('id','news-division');


bq.appendChild(h);
bq.appendChild(p);
bq.appendChild(b);
d3.appendChild(bq);
d2.appendChild(d3);
d1.appendChild(d2);


var ele=document.getElementById("news-division-1");

ele.appendChild(d1);
  });
  },
  
  (error)=>{
      console.log("Error:"+error.code);
  }
  );

////////////////////////////////////////////////admin news edit

  newsRef.on("value",
  
  (snapshot) => {

  
  snapshot.forEach((child) => {
    issue1 = child.val ();
  console.log(issue1);

  


var h1 = document.createElement("H1");
h1.setAttribute('class','mbr-section-title mbr-fonts-style mb-2 display-7');
var s1=document.createElement("strong");
var t1 = document.createTextNode(issue1.Subject+":");
h1.appendChild(s1);
s1.appendChild(t1);

var p1 = document.createElement("p");
p1.setAttribute('class','mbr-text mbr-fonts-style display-4');
var t21 = document.createTextNode(issue1.Post);
p1.appendChild(t21);

var b1 = document.createElement("BR");



var d11 = document.createElement("div");
var d21 = document.createElement("div");
var d31 = document.createElement("div");
var bq1 = document.createElement("blockquote");
var del=document.createElement("BUTTON");
var tn=document.createTextNode("Delete the above news");

d11.setAttribute('class','container');
d31.setAttribute('id','id1');
d21.setAttribute('class','row justify-content-center');
d31.setAttribute('id','id2');
d31.setAttribute('class','col-12 col-md-10');
d31.setAttribute('id','news-division');
del.setAttribute('id','del-button');
del.setAttribute('style','background-color:cornflowerblue;color:white;border:none;border-radius:16px;padding:16px');
del.appendChild(tn);
del.onclick=function(){deleteNews(child.key)};


bq1.appendChild(h1);
bq1.appendChild(p1);
bq1.appendChild(b1);
d31.appendChild(bq1);
d21.appendChild(d31);
d11.appendChild(d21);



var ele1=document.getElementById("admin-news-division-1");

ele1.appendChild(d11);
ele1.appendChild(del);

  });
  },
  
  (error)=>{
      console.log("Error:"+error.code);
  }
  );


  //admin-delete-news funtion
  function deleteNews(deletekey){
    const delref=firebase.database().ref('News/'+deletekey);
    if(confirm("Are you sure?")){
      
    delref.remove()
    
  .catch(function(error){
  alert("delete failed."+error.message);
  });
  window.alert("Deleted the post");
    }
    else{
      alert("Canceled");
    }

  }


