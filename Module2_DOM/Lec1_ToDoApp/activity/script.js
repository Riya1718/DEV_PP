let todoInput = document.querySelector(".todo-input");
let addTodoBtn = document.querySelector(".add-todo");
let todosList = document.querySelector(".todos-list");

function addTodo(){
    let todo = todoInput.value;

    if(todo){                                           //todo input text box is not empty
        let listItem = document.createElement("li");
        listItem.classList.add("todo-item")

        let pTag = document.createElement("p");
        pTag.classList.add("todo");
        pTag.innerHTML=todo;

        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-task");
        deleteBtn.innerHTML = "DELETE";

        deleteBtn.addEventListener("click" , function(e){
            e.target.parentNode.remove();           //bcoz hme li ko htana h jo delete btn ka parent Node h
        })

        listItem.append(pTag);
        listItem.append(deleteBtn);
        
        todosList.append(listItem);

        todoInput.value="";
    }
    else{
        alert("You haven't entered anything");
    }
}

addTodoBtn.addEventListener("click" , function(e){
    addTodo();
});

todoInput.addEventListener("keypress" , function(e){
    if(e.key == "Enter"){
        addTodo();
    }
});