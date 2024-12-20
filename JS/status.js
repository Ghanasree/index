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


  function statuschange(){

    window.alert("updated");
    const rootRef2= firebase.database().ref('users/');
    rootRef2.on("value",
    (snapshot) =>{
    
     snapshot.forEach((child) => {
       window.alert("changes");
       issue = child.val ();
       console.log(issue);
       var k=child.key;
       window.alert(k);
       firebase.database().ref('users/'+k+'/').update({
         "Renewal_status" : "Not-done"
       });
 window.alert("changed");
 
 });
 },
 
 (error)=>{
     console.log("Error:"+error.code);
 }
 );
}