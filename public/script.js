console.log("Is server running");
const RESPONSE_DONE = 4;
const STATUS_OK = 200;
const TODOS_LIST_ID = "todos_list_div";


function add_todo_elements(id, todos_data_json){

    var todos = JSON.parse(todos_data_json);
    var parent = document.getElementById(id);
    if(parent)
    {
        Object.keys(todos).forEach(function(key){
            var  todo_element=createTodoElement(key,todos[key]);
            parent.appendChild(todo_element);
        })
    }
    //parent.innerText = todos_data_json;
}

// Repo URL - https://github.com/malikankit/todo-august-28
function createTodoElement(id,todo_object){
    var todo_element = document.createElement("div");
    todo_element.innerText = todo_object.title;
    todo_element.setAttribute("data-id",id);
    return todo_element;
}

function getTodosAJAX()
{
    var xhr = new XMLHttpRequest();
    xhr.open("GET","/api/todos", true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == RESPONSE_DONE)
        {
            if(xhr.status==STATUS_OK)
            {
                console.log(xhr.responseText);
                add_todo_elements(TODOS_LIST_ID , xhr.responseText);
            }
        }
    }
    xhr.send(data=null);
}