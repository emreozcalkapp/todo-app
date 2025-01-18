const todoForm = document.querySelector(".todo-form");
const todoList = document.querySelector(".todo-list");
const todoCompletedList = document.querySelector(".todo-completed-list");
const todoInput = document.querySelector(".todo-input");

let todo = [];

let savedTodo = JSON.parse(localStorage.getItem("todo"));
if(savedTodo){
    todo = savedTodo;
}
render();
renderCompleted();
todoForm.addEventListener("submit", function(event){
    event.preventDefault();
    if(todoInput.value == ""){
        return alert("Geçersiz değer girdiniz.");
    }else{
        const todoData = new FormData(todoForm);
        const todoObject = Object.fromEntries(todoData);
        let todoID = 1;
        if(todo[todo.length - 1]){
            todoID = todo[todo.length - 1].id + 1;
        }
        todo.push({
            id: todoID,
            userTodo: todoObject.todo,
            completed: false
        });
        todoInput.value = "";
        render();
    }

});

function render(){
    const todoUncompleted = todo.filter(t => t.completed == false);
    todoList.innerHTML = "";
    if (todoUncompleted.length === 0) {
        todoList.innerHTML = 
        `
            <h3 class="uncompleted-title">Yapılacaklar</h3>
            <p>Yapılacaklar listenizde öğe bulunamadı.</p>
        `;
    }
    else{
        for (const tUncompleted of todoUncompleted) {
            todoList.innerHTML += 
            `
                <div class="todo-list-article">
                    <span class="uncompleted-todo">${tUncompleted.userTodo}</span>
                    <div class="buttons">
                        <button class="button-completed" data-id="${tUncompleted.id}">Tamamlandı</button>
                        <button class="button-edit" data-id="${tUncompleted.id}">Düzenle</button>
                        <button class="button-delete" data-id="${tUncompleted.id}">Sil</button>
                    </div>
                </div>
            `;
    }
}
    localStorage.setItem("todo", JSON.stringify(todo));
    otherButtons();
}

function otherButtons(){
    const buttonsCompleted = document.querySelectorAll(".button-completed");
    for (const buttonCompleted of buttonsCompleted) {
        buttonCompleted.addEventListener("click", btnCompleted);
    }
    const buttonsEdit = document.querySelectorAll(".button-edit");
    for (const buttonEdit of buttonsEdit) {
        buttonEdit.addEventListener("click", btnEdit);
    }
    const buttonsDelete = document.querySelectorAll(".button-delete");
    for (const buttonDelete of buttonsDelete) {
        buttonDelete.addEventListener("click", btnDelete);
    }
    const buttonsCompletedDelete = document.querySelectorAll(".button-completed-delete");
    for (const buttonCompletedDelete of buttonsCompletedDelete) {
        buttonCompletedDelete.addEventListener("click", btnCompletedDelete);
    }
}

function btnCompleted(event){
    event.preventDefault();
    const tCompleted = todo.find(t => t.id == event.target.dataset.id);
        tCompleted.completed = true;
        render();
        renderCompleted();
}

function btnEdit(event){
    event.preventDefault();
    const tEdit = todo.find(t => t.id == event.target.dataset.id);
    if(tEdit){
        let newTodo = prompt("Yeni görevinizi giriniz");
        if(newTodo == ""){
            return alert("Geçersiz değer girdiniz.");
        }
        else{
            tEdit.userTodo = newTodo;
            render();
        }
    }
}

function btnDelete(event){
    event.preventDefault();
    const tDelete = todo.find(t => t.id == event.target.dataset.id);
    todo.splice(todo.indexOf(tDelete), 1);
    render();
}

function btnCompletedDelete(event){
    event.preventDefault();
    const tCompletedDelete = todo.find(t => t.id == event.target.dataset.id);
    todo.splice(todo.indexOf(tCompletedDelete), 1);
    renderCompleted();
}

function renderCompleted(){
    const todoCompleted = todo.filter(t => t.completed == true);
    todoCompletedList.innerHTML = "";
    if (todoCompleted.length === 0) {
        todoCompletedList.innerHTML = 
        `
            <h3 class="completed-title">Yapılanlar</h3>
            <p>Yapılanlar listenizde öğe bulunamadı.</p>
        `;
}
    else{
    for (const tCompleted of todoCompleted) {
        todoCompletedList.innerHTML += 
        `
            <div class="todo-completed-article">
                <span class="completed-todo"><del>${tCompleted.userTodo}</del></span>
                <button class="button-completed-delete" data-id="${tCompleted.id}">Sil</button>
            </div>
        `;
    }
}
    localStorage.setItem("todo", JSON.stringify(todo));
    render();
    otherButtons();
}