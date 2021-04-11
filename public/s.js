var s=document.getElementById("signin");
var l=document.getElementById("login");
var check=document.getElementById("exampleCheck1");
s.addEventListener("click",function(event){
  
    event.preventDefault();
    //
    var username=document.getElementById('exampleInputEmail1').value;
    var password=document.getElementById('exampleInputPassword1').value;
    
   if(!username|| !password){return alert("both fields required")}
   else if(password.length <=5){
       alert("minimum 6 chars required for password")
   }
   else{
    window.location.href="/video";
    window.localStorage.setItem("USERNAME",username)
    window.localStorage.setItem("password",password)

   }
})
l.addEventListener("click",function(event){
  
    event.preventDefault();
    //window.location.href="http://localhost:3030/video";
    var username=document.getElementById('exampleInputEmail1').value;
    var password=document.getElementById('exampleInputPassword1').value;
    var u= window.localStorage.getItem("username")
  var p=  window.localStorage.getItem("password")
      
   if(!username|| !password){return alert("both fields required")}
   else{
   
   
    if(u==username && p==password){
        alert("logged in Successfully ")
        window.location.href="/video";
    }
    else{
        alert("check your credentials!!! or signin")

    }

   }

})
 