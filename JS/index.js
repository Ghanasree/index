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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const auth=firebase.auth();


firebase.auth().onAuthStateChanged(function(user) {
if (user) {
    document.getElementById("user-div").style.display = "block";
    document.getElementById("login-div").style.display = "none";
    var user = firebase.auth().currentUser;
    if(user){
        var email_id = user.email;
        var verified = user.emailVerified;
        //window.location="loggedin.html";
        //document.getElementById("msg").innerHTML="Congrats"+user.email+", you are logged in. Your email id is : "+user.email+".<br>";

        document.getElementById("user_para").innerHTML="Welcome User : " + email_id+"<br>Email verified : "+verified;
      //  window.location="index.html";
     }
  // User is signed in.
} else {
    document.getElementById("user-div").style.display = "none";
    document.getElementById("login-div").style.display = "block";
    //window.location="login.html";

}
});

function signUp(){
var userEmail = document.getElementById("user_email").value;
var userPassword = document.getElementById("user_password").value;
firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then(function(){
      sendVerificationEmail();
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
  window.alert("error : "+errorMessage);
});
//window.alert("Account is created with the email id : "+userEmail);
//sendVerificationEmail();
createUserData();
}
function logIn(){
  var userEmail = document.getElementById("email_field").value;
  var userPassword = document.getElementById("password_field").value;
  firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert("error : " +errorMessage);
      // ...
    });

}
function logOut(){
  firebase.auth().signOut().then(function(){
    window.location="bindex.html";
  });

}

function createUserData(){
  var userFName=" ";
   userFName=document.getElementById("fname").value;
var userLName=" ";
 userLName=document.getElementById("lname").value;
var userMName=" ";
userMName=document.getElementById("mname").value;
var userRollNo=document.getElementById("rollno").value;
var userEmail = document.getElementById("user_email").value;

const rootRef=firebase.database().ref("users/"+firebase.auth().currentUser.uid);
rootRef.set({
  First_name: userFName,
  Middle_name: userMName,
  Last_name: userLName,
  Rollnumber: userRollNo,
  email: userEmail,
  Bus_route: "Null",
  Bus_payment: "11000.00",
  Renewal_status:"Not-done"
  });
  window.alert("Data created");
}



function sendVerificationEmail(){
var user = firebase.auth().currentUser;

user.sendEmailVerification().then(function() {
// Email sent.
  window.alert("Verification mail sent to : "+ user.email);
}).catch(function(error) {
// An error happened.
  window.alert("error : "+errorMessage);
});
}

function check() {
if(document.getElementById('user_password').value ===
        document.getElementById('confirm_password').value) {
    document.getElementById('message').innerHTML = "match";
} else {
    document.getElementById('message').innerHTML = "no match";
}
}

function resetPassword(){
var authen = firebase.auth();
var resetEmail = document.getElementById("reset_email").value;
if(resetEmail != ""){
authen.sendPasswordResetEmail(resetEmail)
.then(function(){
  window.alert("Password reset mail sent to the email id : "+resetEmail);
})
.catch(function(error){
  window.alert("error : "+errorMessage);
});
}
else{
  window.alert("Please enter the email id.");
}
}

function retrieveData(data){
var id=firebase.auth().currentUser.uid;
var ref=firebase.database().ref('users/'+id);
var dataret=data.val();
var keys=Object.keys(users);
console.log(keys);
ref.once('value').then(function(snapshot){
  var fname=snapshot.val().First_name;
  var mname=snapshot.val().Middle_name;
  var lname=snapshot.val().Last_name;
  var rno=snapshot.val().Rollnumber;
  var emailid=snapshot.val().email;
  var btype=snapshot.val().Bus_type;
  var broute=snapshot.val().Bus_route;
  var status=snapshot.val().Renewal_status;
  var pay=snapshot.val().Bus_payment;
});

}
// //update payment status

// function updateStatus(){
// var id=firebase.auth().currentUser.uid;
// var ref=firebase.database().ref("users/"+id);
// ref.update({
//   Renewal_status:"done"
// });
// window.alert("Renewal Status updated.");
// }
///
function Fork(){
  var id=firebase.auth().currentUser.uid;
  var ref=firebase.database().ref('users/'+id);
  
  
   ref.once('value').then(function(snapshot){
    var fname=snapshot.val().First_name;
    var mname=snapshot.val().Middle_name;
    var lname=snapshot.val().Last_name;
    var rno=snapshot.val().Rollnumber;
    var emailid=snapshot.val().email;
    var btype=snapshot.val().Bus_type;
    var broute=snapshot.val().Bus_route;
    var status=snapshot.val().Renewal_status;
    var pay=snapshot.val().Bus_payment;
    
    var table = document.getElementById("renwal-table");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = "Roll Number"
    cell2.innerHTML = rno;
  
    row=table.insertRow(1);
    cell1=row.insertCell(0);
    cell2=row.insertCell(1);
    cell1.innerHTML="Name";
    cell2.innerHTML=fname+" "+mname+" "+lname;
  
    row=table.insertRow(2);
    cell1=row.insertCell(0);
    cell2=row.insertCell(1);
    cell1.innerHTML="email id";
    cell2.innerHTML=emailid;
  
    row=table.insertRow(3);
    cell1=row.insertCell(0);
    cell2=row.insertCell(1);
    cell1.innerHTML="Bus type";
    cell2.innerHTML=btype;
  
    row=table.insertRow(4);
    cell1=row.insertCell(0);
    cell2=row.insertCell(1);
    cell1.innerHTML="Bus route";
    cell2.innerHTML=broute;
  
    row=table.insertRow(5);
    cell1=row.insertCell(0);
    cell2=row.insertCell(1);
    cell1.innerHTML="Bus fee";
    cell2.innerHTML=pay;
  
    row=table.insertRow(6);
    cell1=row.insertCell(0);
    cell2=row.insertCell(1);
    cell1.innerHTML="Status";
    cell2.innerHTML=status;
  
    row=table.insertRow(7);
    cell1=row.insertCell(0);
    cell2=row.insertCell(1);
    cell1.innerHTML=" ";
    cell2.innerHTML=" ";
  
    if(broute){
      ref.update({
        Renewal_status:"done"
      });
    window.alert("Renewal Status updated.");
    }else{
      window.alert("  No bus route is available");
    }
    //document.getElementById("rno").innerHTML=rno;
    //document.getElementById("name").innerHTML=fname+" "+mname+" "+lname;
    //document.getElementById("eid").innerHTML=emailid;
    //document.getElementById("btype").innerHTML=btype;
    //document.getElementById("broute").innerHTML=broute;
    //document.getElementById("bfee").innerHTML=pay;
    //document.getElementById("status").innerHTML=status;
    //window.alert("done");
  });
  
 
    
}

//display profie

function displayProfile(){

var id=firebase.auth().currentUser.uid;
var ref=firebase.database().ref('users/'+id);
ref.once('value').then(function(snapshot){
  var fname=snapshot.val().First_name;
  var mname=snapshot.val().Middle_name;
  var lname=snapshot.val().Last_name;
  var rno=snapshot.val().Rollnumber;
  var emailid=snapshot.val().email;
  var btype=snapshot.val().Bus_type;
  var broute=snapshot.val().Bus_route;
  var status=snapshot.val().Renewal_status;
  var pay=snapshot.val().Bus_payment;

  var table = document.getElementById("profile");
  var row = table.insertRow(0);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  cell1.innerHTML = "Roll Number"
  cell2.innerHTML = rno;

  row=table.insertRow(1);
  cell1=row.insertCell(0);
  cell2=row.insertCell(1);
  cell1.innerHTML="Name";
  cell2.innerHTML=fname+" "+mname+" "+lname;

  row=table.insertRow(2);
  cell1=row.insertCell(0);
  cell2=row.insertCell(1);
  cell1.innerHTML="email id";
  cell2.innerHTML=emailid;

  row=table.insertRow(3);
  cell1=row.insertCell(0);
  cell2=row.insertCell(1);
  cell1.innerHTML="Bus type";
  cell2.innerHTML=btype;

  row=table.insertRow(4);
  cell1=row.insertCell(0);
  cell2=row.insertCell(1);
  cell1.innerHTML="Bus route";
  cell2.innerHTML=broute;

  row=table.insertRow(5);
  cell1=row.insertCell(0);
  cell2=row.insertCell(1);
  cell1.innerHTML="Bus fee";
  cell2.innerHTML=pay;

  row=table.insertRow(6);
  cell1=row.insertCell(0);
  cell2=row.insertCell(1);
  cell1.innerHTML="Status";
  cell2.innerHTML=status;

  row=table.insertRow(7);
  cell1=row.insertCell(0);
  cell2=row.insertCell(1);
  cell1.innerHTML=" ";
  cell2.innerHTML=" ";


  //document.getElementById("rno").innerHTML=rno;
  //document.getElementById("name").innerHTML=fname+" "+mname+" "+lname;
  //document.getElementById("eid").innerHTML=emailid;
  //document.getElementById("btype").innerHTML=btype;
  //document.getElementById("broute").innerHTML=broute;
  //document.getElementById("bfee").innerHTML=pay;
  //document.getElementById("status").innerHTML=status;
  window.alert("done");
});


}


