const express=require('express');
const app=express();
const path=require('path');
const fs=require('fs');
const trainModel=require('./modules/user');

app.set("view engine","ejs");
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));

app.get('/',function(req,res){
    res.render("index");
})

app.post('/create',async function(req,res){
    let temp=await trainModel.create({
        source:req.body.source,
        dest:req.body.destination,
        deptime:req.body.uptime,
        retime:req.body.dntime
    })
    // console.log(temp);
    res.redirect("/");
})

app.get('/read',async function(req,res){
    let details=await trainModel.find();
    res.render("read",{trains:details});
})

app.get('/delete/:details',async function(req,res){
    let user=await trainModel.deleteOne({_id:req.params.details});
    res.redirect('/read');
})

app.get('/edit/:details',async function(req,res){
    let user=await trainModel.find({_id:req.params.details});
    res.render('edit',{trains:user});
})

app.post('/update/:details',async function(req,res){
    let user=await trainModel.findOneAndUpdate({_id:req.params.details},{source:req.body.source,
        dest:req.body.destination,
        deptime:req.body.uptime,
        retime:req.body.dntime},{new:true});
    res.redirect("/read");
})

app.get('/search',function(req,res){
    res.render("search");
})

app.post('/searchAndRead',async function(req,res){
    let details=await trainModel.find({"$and":[{source:req.body.sstation},{dest:req.body.dstation}
    ]});
    // console.log(details);
    res.render("read",{trains:details});
})

app.get('/test',function(req,res){
    res.render("create");
})

app.listen(3000);