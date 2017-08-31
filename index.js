var express = require('express');
var bodyparser = require ('body-parser');
var morgan = require('morgan');
var todos_db = require("./seed.js");
var app = express();

app.use(morgan('combined'));

app.use("/",express.static(__dirname+"/public"));
app.use("/",bodyparser.urlencoded({extended:false}));
app.get("/api/todos",function(req,res){
    res.json(todos_db.todos);
})
app.delete("/api/todos/:id",function(req,res){
    var del_id = req.params.id;
    var todo = todos_db.todos[del_id];
    if(!todo)
    {
        res.status(400).json({error:"Todo doesn't exist"});
    }
    else
    {
        todo.status = todos_db.StatusENUMS.DELETED;
        res.json(todos_db.todos);
    }
});
app.post("/api/todos",function(req,res){
    var todo = req.body.title;
    if(!todo || todo == "" || todo.trim()== "")
    {
        res.status(400).json({error:"Todo Title Can't be empty"});
    }
    else
    {
        var  new_todo_object = {
            title : req.body.title,
            status : todos_db.StatusENUMS.ACTIVE
        }
        todos_db.todos[todos_db.next_todo_id] = new_todo_object;
        todos_db.next_todo_id = todos_db.next_todo_id +1;
        res.json(todos_db.todos);
    }
});
app.put("/api/todos/:id",function(req,res){
    var mod_id = req.params.id;
    var todo = todos_db.todos[mod_id];
    if(!todo)
    {
        res.status(400).json({error:"Can't modify a tod that doesnt exist"});
    }
    else
    {
        var  todo_title = req.body.title;
        if(todo_title && todo_title!="" && todo_title.trim()!=""){
            todo.title = todo_title;
        }
        var todo_status = req.body.status;
        if(todo_status && (todo_status==todos_db.StatusENUMS.ACTIVE || todo_status==todos_db.StatusENUMS.COMPLETED))
        {
            todo.status = todo_status;
        }
        res.json(todos_db.todos);
    }
})
app.get("/api/todos/active" ,function(req,res){
    var todo = todos_db.todos;
    var activetodo={};
    for(var  item in todo)
    {
        if(todos_db.todos[item].status==todos_db.StatusENUMS.ACTIVE)
        {
            activetodo[item] = todos_db.todos[item];
        }
    }
    res.json(activetodo);
});
app.get("/api/todos/complete" ,function(req,res){
    var todo = todos_db.todos;
    var completetodo={};
    for(var  item in todo)
    {
        if(todos_db.todos[item].status==todos_db.StatusENUMS.COMPLETED)
        {
            completetodo[item] = todos_db.todos[item];
        }
    }
    res.json(completetodo);
});
app.get("/api/todos/delete" ,function(req,res){
    var todo = todos_db.todos;
    var deletetodo={};
    for(var  item in todo)
    {
        if(todos_db.todos[item].status==todos_db.StatusENUMS.DELETED)
        {
            deletetodo[item] = todos_db.todos[item];
        }
    }
    res.json(deletetodo);
})
app.put("/api/todos/active/:id",function(req,res){
    var id = req.params.id;
    var todo = todos_db.todos[id];
    if(!todo)
    {
        res.status(400).json({error:"Can't active a todo that doesnt exist"});
    }
    else
    {
        todo.status = todos_db.StatusENUMS.ACTIVE;
    }
    res.json(todos_db.todos)
});
app.put("/api/todos/complete/:id",function(req,res){
    var id = req.params.id;
    var todo = todos_db.todos[id];
    if(!todo)
    {
        res.status(400).json({error:"Can't active a todo that doesnt exist"});
    }
    else
    {
        todo.status = todos_db.StatusENUMS.COMPLETED;
    }
    res.json(todos_db.todos)
});
app.listen(8080);