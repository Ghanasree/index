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


//admin auth change


firebase.auth().onAuthStateChanged(function(user){
  if (user) {
      
      var user = firebase.auth().currentUser;
      
      if(user.email=="adminlogin@vasavi.com"){
 
          var email_id = user.email;
          document.getElementById("user-div").style.display = "block";
          document.getElementById("login-div").style.display = "none"; 

        
          //document.getElementById("msg").innerHTML="Congrats"+user.email+", you are logged in. Your email id is : "+user.email+".<br>";
  
          document.getElementById("user_para").innerHTML="Welcome User : " + email_id;
         window.location="adminpage.html";
       }
       else {
         document.getElementById("user-div").style.display = "none";
        document.getElementById("login-div").style.display = "block";
        window.alert("You are not an admin");
        //window.location="login.html";
    
    }

    // User is signed in.
  } 
  else {
    document.getElementById("user-div").style.display = "none";
    document.getElementById("login-div").style.display = "block";
  
    //window.location="login.html";

}
  });






  function Alogin(){
    var userEmail = document.getElementById("email_field").value;
    var userPassword = document.getElementById("password_field").value;
    if(userEmail=="adminlogin@vasavi.com"){
    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("error : " +errorMessage);
        // ...
      });
    }else{
      window.alert("you are not an admin");
    }
  }




  function Alogout(){
    firebase.auth().signOut().then(function(){
      window.location="Alogin.html";
    });
  
  }

  
 

//add bus in bustable.html

  function addbus(){
    var r = confirm("Are u sure? You want to add it");
    if (r == true) {
    var busno=document.getElementById("bus_no").value;
    var bus_route=document.getElementById("bus_route").value;
    var addbusnoplate=document.getElementById("bus_no_plate").value;
    var addbustype=document.getElementById("bustype-dropdown").value;
   
    var addstop1=document.getElementById("Stop_1").value;
    var addstop2 = document.getElementById("Stop_2").value;
    var addtotalseats = document.getElementById("Total_Seats").value;
    var addavailableseats = document.getElementById("Available").value;
    var addfee = document.getElementById("Fee").value;


    if(addbustype=="College"){
    
        
        const busRef2=firebase.database().ref('bus_info/College/'+busno+'/bus_stop/');
        const busRef=firebase.database().ref('bus_info/College/'+busno+'/');
    
        busRef.set({
          bus_available:addavailableseats,
          bus_no:busno,
          bus_fee:addfee,
          bus_no_plate:addbusnoplate, 
          bus_seats:addtotalseats,
          bus_route:bus_route
           });
    
        busRef2.set({
          stop_1:addstop1,
          stop_2:addstop2
       });
     
       
        
            
            
             
            
    }
    else{
        const bus2Ref=firebase.database().ref('bus_info/RTC/'+busno);
        const bus2Ref2=firebase.database().ref('bus_info/RTC/'+busno+'/bus_stop/');
        bus2Ref.set({
            bus_available:addavailableseats,
            bus_no:busno,
            bus_fee:addfee,
            bus_no_plate:addbusnoplate,
            bus_seats:addtotalseats,
            bus_route:bus_route
             });
             bus2Ref2.set({
                stop_1:addstop1,
                stop_2:addstop2
             });
    }
      window.alert("Bus Added");
    } else {
      window.alert("Canceled");
    }
      }



//admin tables in bustable


const rootRefx= firebase.database().ref('bus_info/College/');

rootRefx.on("value",

(snapshot) => {
  const college = document.getElementById("college");


snapshot.forEach((child) => {
  issue = child.val ();
console.log(issue);
var row = document.createElement("tr");
row.innerHTML="<td>"+ issue.bus_no+ "</td><td>"+issue.bus_route+"</td><td>"+issue.bus_no_plate+"</td><td>"+issue.bus_stop.stop_1+"</td><td>"+issue.bus_stop.stop_2+"</td><td>"+issue.bus_seats+"</td><td>"+issue.bus_available+"</td><td>"+issue.bus_fee+"</td><td><input type='button' style='background-color:cornflowerblue;color:white;' value='X' onclick='deleteBus(\"bus_info/College/"+child.key+"\")'/></td>";
college.append(row);

});
},

(error)=>{
    console.log("Error:"+error.code);
}
);


const rootRef= firebase.database().ref('bus_info/RTC/');

rootRef.on("value",

(snapshot) => {
  const rtc = document.getElementById("RTC");



snapshot.forEach((child) => {
  issue = child.val ();
console.log(issue);
var row = document.createElement("tr");
row.innerHTML="<td>"+ issue.bus_no+ "</td><td>"+issue.bus_route+"</td><td>"+issue.bus_no_plate+"</td><td>"+issue.bus_stop.stop_1+"</td><td>"+issue.bus_stop.stop_2+"</td><td>"+issue.bus_seats+"</td><td>"+issue.bus_available+"</td><td>"+issue.bus_fee+"</td><td><input type='button' style='background-color:cornflowerblue;color:white;' value='X' onclick='deleteBus(\"bus_info/RTC/"+child.key+"\")'/></td>";
rtc.append(row);

});
},

(error)=>{
    console.log("Error:"+error.code);
}
);


//delete bus

function deleteBus(bkey){
  if(confirm("Are you sure?")){
    var resentRef=firebase.database().ref(bkey);
resentRef.remove()
.catch(function(error){
alert("delete failed."+error.message);
});
  }
  else{
    alert("Canceled");
  }
}

//admin profile

var name,emailid,c,pn;
const aref=firebase.database().ref("admin/");
var at=document.getElementById("atable");
aref.once('value').then(function(snapshot){
   name=snapshot.val().name;
   emailid=snapshot.val().email;
   c=snapshot.val().College;
   pn=snapshot.val().phone_no;
   var t = document.getElementById("atable");
  var row = t.insertRow(0);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  cell1.innerHTML = "Name";
  cell2.innerHTML = name;

  row=t.insertRow(1);
  cell1=row.insertCell(0);
  cell2=row.insertCell(1);
  cell1.innerHTML="Phone No";
  cell2.innerHTML=pn;

  row=t.insertRow(2);
  cell1=row.insertCell(0);
  cell2=row.insertCell(1);
  cell1.innerHTML="Email id";
  cell2.innerHTML=emailid;

  row=t.insertRow(3);
  cell1=row.insertCell(0);
  cell2=row.insertCell(1);
  cell1.innerHTML="College";
  cell2.innerHTML=c;
});

// var r1 = document.createElement("tr");
// r1.innerHTML="<td>Name</td><td>"+name+"</td>";
// at.append(r1);

// var r2 = document.createElement("tr");
// r2.innerHTML="<td>Email</td><td>"+email+"</td>";
// at.append(r2);

// var r3;
// r3 = document.createElement("tr");
// r3.innerHTML="<td>My College</td><td>"+College+"</td>";
// at.append(r3);

// var r4;
// r4 = document.createElement("tr");
// r4.innerHTML="<td>Phone</td><td>"+phone_no+"</td>";
// at.append(r4);





///status change button in adminpage.html
// function statuschange(){

//    window.alert("updated");
//   const statusRef=firebase.database().ref('users/');
//   statusRef.on("value",
//   (snapshot) => {
   
//     snapshot.forEach((child) => {
//       window.alert("changes");
//       issue = child.val ();
//       console.log(issue);
//       var k=child.key;
//       firebase.database().ref('users/'+k+'/').update({
//         "Renewal_status" : "Not-done"
//       });
// window.alert("changed");

// });
// },

// (error)=>{
//     console.log("Error:"+error.code);
// }
// );
  
  // var keyArray = [];
  // statusRef.once('value', data => {
  //     data.forEach(item => {
  //         if (item.val().qty === 0) {
  //             keyArray.push(item.key);
  //         }
  //     });
  // });
  // window.alert(keyArray);
  // keyArray.forEach(keyOfItem => {
  //   firebase.database().ref('users/'+keyOfItem).update({
  //               Renewal_status : "Not-done"
  //           });
  //         });
  //         window.alert("not-done");

// }


//user bus tables

//const rootRefx= firebase.database().ref('bus_info/College/');

rootRefx.on("value",

(snapshot) => {
  const college = document.getElementById("college-user");


snapshot.forEach((child) => {
  issue = child.val ();
console.log(issue);
var row = document.createElement("tr");
row.innerHTML="<td>"+ issue.bus_no+ "</td><td>"+issue.bus_route+"</td><td>"+issue.bus_no_plate+"</td><td>"+issue.bus_stop.stop_1+"</td><td>"+issue.bus_stop.stop_2+"</td><td>"+issue.bus_seats+"</td><td>"+issue.bus_available+"</td><td>"+issue.bus_fee+"</td>";
college.append(row);

});
},

(error)=>{
    console.log("Error:"+error.code);
}
);


//const rootRef= firebase.database().ref('bus_info/RTC/');

rootRef.on("value",

(snapshot) => {
  const rtc = document.getElementById("RTC-user");



snapshot.forEach((child) => {
  issue = child.val ();
console.log(issue);
var row = document.createElement("tr");
row.innerHTML="<td>"+ issue.bus_no+ "</td><td>"+issue.bus_route+"</td><td>"+issue.bus_no_plate+"</td><td>"+issue.bus_stop.stop_1+"</td><td>"+issue.bus_stop.stop_2+"</td><td>"+issue.bus_seats+"</td><td>"+issue.bus_available+"</td><td>"+issue.bus_fee+"</td>";
rtc.append(row);

});
},

(error)=>{
    console.log("Error:"+error.code);
}
);





