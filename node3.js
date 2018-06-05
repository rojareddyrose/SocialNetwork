var express = require("express");

var app = express();

app.use(express.static('web'));


var mongojs = require('mongojs')

app.set('view engine','ejs');
                                                                                                                                        
app.get('/',function(req,res){

    res.render("index")
})

var db = mongojs('mongodb://hello:hello123@ds147030.mlab.com:47030/hello', ['user'])
 
app.get('/homepage',function(req,res){

    res.sendFile(__dirname+'/web/homepage.html');

});

app.get('/login',function(req,res){

    res.sendFile(__dirname+'/web/login.html')

})

app.get('/loginsubmit',function(req,res){

    var uname=req.query.uname;
    
    var password=req.query.password;
     

    

var docs={

name:uname,
    
    password:password
    
}


 db.user.find(docs,function(err,data){
      if(data.length>0){
          db.user.find({},function(err,docs){
              res.render('index',{result:docs})
          })
          console.log(docs)
          res.sendFile((__dirname+'/web/dashboard.html'))
      }
      else{
          
          res.send("sorry !....invalid username and password");
      }
  

})
});


app.get('/signup',function(req,res){

    res.sendFile(__dirname+'/web/sign.html')

})
app.get('/profile/:name',function(req,res){

var name = req.params.name;
    
   db.user.find({name:name},function(err,data){
    if(data.length>0){
          db.user.find({},function(err,data){
              res.render('index1',{result:data})
          
    
          })
      }
    
});
})

app.get('/submit',function(req,res){

    var a= req.query.name;
    
    var b=req.query.password;
    
    var c=req.query.phonenumber;
    
    var d=req.query.gender;
    
   // res.send(a+b+c+d);
    
    
    var docs={
        
        name:a,
        password:b,
        phonenumber:c,
        gender:d
    }
    db.user.insert(docs,function(err,data){
        console.log(err);
       res.sendFile(__dirname+"/web/login.html");
    })
   }); 
    

app.listen(3000,function(){
console.log("helloo");
});

