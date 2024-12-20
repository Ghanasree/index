// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

  firebase.initializeApp(firebaseConfig);
firebase.analytics();


const rootRef100= firebase.database().ref('bus_info/College/');

rootRef100.on("value",

(snapshot) => {
//   const college = document.getElementById("college");
//
// college.textContent=" ";

snapshot.forEach((child) => {
  issue = child.val ();
console.log(issue);
var d=document.createElement("div");
var x = document.createElement("INPUT");
  x.setAttribute("type", "radio");
  x.setAttribute("id",issue.bus_no);
  x.setAttribute("name", "bus_type");
  x.setAttribute("value", issue.bus_route);

  var z=document.createElement("BR");
var y = document.createElement("LABEL");
  var t = document.createTextNode(issue.bus_route);
y.setAttribute("for", issue.bus_no);
  y.appendChild(t);
  d.appendChild(x);
  d.appendChild(y);
    d.appendChild(z);


  //document.getElementById("A").appendChild(x);
  document.getElementById("A").appendChild(d);
  // document.getElementById("A").insertBefore(d,document.getElementById(issue.bus_no));

  // document.write("<br>");
// document.getElementById("A").appendChild(y);



});
},

(error)=>{
    console.log("Error:"+error.code);
}
);


const rootRef1= firebase.database().ref('bus_info/RTC/');

rootRef1.on("value",

(snapshot) => {
//   const rtc = document.getElementById("RTC");

snapshot.forEach((child) => {
  issue = child.val ();
console.log(issue);
var d=document.createElement("div");
var x = document.createElement("INPUT");
  x.setAttribute("type", "radio");
  x.setAttribute("id",issue.bus_no);
  x.setAttribute("name", "bus_type");
  x.setAttribute("value", issue.bus_route);
  var z=document.createElement("BR");
  var y = document.createElement("LABEL");
    var t = document.createTextNode(issue.bus_route);
  y.setAttribute("for", issue.bus_no);
    y.appendChild(t);
    d.appendChild(x);
    d.appendChild(y);
    d.appendChild(z);

  //document.getElementById("B").appendChild(x);
  document.getElementById("B").appendChild(d);
  // document.getElementById("B").insertBefore(d,document.getElementById(issue.bus_route));



});
},

(error)=>{
    console.log("Error:"+error.code);
}
);

//To allocate seats
function seat(){
          var busroute;
          
          var checking;
          var checked_type = document.querySelector('input[name = "q1"]:checked');

          var checked_bus = document.querySelector('input[name = "bus_type"]:checked');
          busroute= checked_bus.value;
          var id=checked_bus.id;
         
          if(checked_type.id=="bcollege"){
     
            const rootRef2= firebase.database().ref('bus_info/College/'+checked_bus.id);
            rootRef2.on("value",
            (snapshot) =>{
              
             checking = snapshot.val().bus_available;
             window.alert("checking");
            }
            );


          }
          else if(checked_type.id=="brtc"){
            const rootRef1= firebase.database().ref('bus_info/RTC/'+checked_bus.id);
            rootRef1.on("value",
            (snapshot) =>{
              
             checking = snapshot.val().bus_available;
            }
            );


          }
    if(checked_bus != null){  //Test if something was checked
        window.alert(checked_bus.value); //Alert the value of the checked.
    } else {
        window.alert('Nothing checked'); //Alert, nothing was checked.
    }
if(checking<=0){
  window.alert("no seats available in the bus"+busroute);
}else {
  window.alert("Seats Available");
  updateStatus(busroute, checked_type.value, id,checking);
}
}
//update payment status

function updateStatus( busroute , bustype , busid, seat ){
  var id=firebase.auth().currentUser.uid;
  var ref=firebase.database().ref("users/"+id);
  var bus;
  var seat1;
  if(bustype=="B"){
    bus= "RTC";
  }else{
    bus="College";
  }
  if(seat>0){
  ref.update({
    Renewal_status:"done",
    Bus_type:bus,
    Bus_route:busroute
   
  });
  window.alert("Bus Allocated.");
  
  seat1 = seat-1;
 

var ref2= firebase.database().ref("bus_info/"+bus+"/"+busid);

ref2.update({
  bus_available: seat1
});

  }
  else{

    
    window.alert("no seats available please select another route");
    window.location="busselect.html";
  }
  }
//*********************************************************************************************************************************************************************************
 //*//
//////
//////
//////admin page user table

const rootRef11= firebase.database().ref('users/');
rootRef11.on("value",

(snapshot) => {
  const college12 = document.getElementById("usertable");

college12.textContent=" ";

snapshot.forEach((child) => {
  user_table = child.val ();
console.log(user_table);
var row = document.createElement("tr");
row.innerHTML="<td>"+ user_table.First_name+" "+user_table.Middle_name+" "+user_table.Lastname+ "</td><td>"+user_table.Rollnumber+"</td><td>"+user_table.Bus_route+"</td><td>"+user_table.Bus_type+"</td><td>"+

"<select onchange = 'Update(\""+child.key+"\",this.value)'>"+
"<option value='Not-done'"+ (user_table.Renewal_status == "Not-done" ? " selected" : " ")+">Not-done </option>"+
"<option value='done'"+ (user_table.Renewal_status == "done" ? " selected" : " ")+">done </option>"+"</select>"


+"</td>";
college12.append(row);

});
},

(error)=>{
    console.log("Error:"+error.code);
}
);


//update function for the admin page
function Update(issuekey, newresolvedvalue){
  window.alert(changing);
var changeRef=firebase.database().ref('users/'+issuekey);

changeRef.update({
  "Renewal_status" : newresolvedvalue
});
}