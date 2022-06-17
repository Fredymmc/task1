
import {saveTask,
     getTasks, 
     onGetTasks,
     deleteTask,
     getTask,
     updateTask
    } from"./firabase.js";

const taskForm = document.getElementById("task-form");
const taskContainer = document.getElementById("task-container");

let editStatus = false;
let id = '';

window.addEventListener("DOMContentLoaded", async () =>  {

    onGetTasks((querySnapshot) => {
    let html = '';

    querySnapshot.forEach((doc) => {
    const task = doc.data();
    html += `
     <div class="card card-body mt-2 border-primary d-flex flex-row align-items-center  ">
     <h3  class="h4 m-1 fw-bold"> ${task.title}</h3>
     <p  class="m-1"> ${task.description}</p>     
     <button class="btn btn-primary btn-delete m-1" data-id="${doc.id}" >delete</button>
     <button class="btn btn-success btn-edit m-1" data-id="${doc.id}" >edit</button>     
     </div>
     `;

    });
 
    
    taskContainer.innerHTML = html;

    const btnDelete = taskContainer.querySelectorAll('.btn-delete');
    btnDelete.forEach(btn => {
        btn.addEventListener('click', (event)  => {           
            deleteTask(event.target.dataset.id);            
        });
    });

    const btnEdit = taskContainer.querySelectorAll('.btn-edit');
    btnEdit.forEach((btn) => {        
        btn.addEventListener('click',async (e)  => {
            const doc = await getTask(e.target.dataset.id);  
            const task = doc.data(); 
            
            taskForm['task-title'].value = task.title ;
            taskForm['task-description'].value = task.description ;

            editStatus = true;
            id = doc.id;

            taskForm['btn-task-save'].innerText = 'editar';

        });
    });

  });    

});

taskForm.addEventListener('submit', (e) => {
e.preventDefault();

const  title = taskForm["task-title"];
const  description = taskForm["task-description"];

if (!editStatus){
    saveTask(title.value, description.value);
}else {
    updateTask(id, {
    title: title.value,
    description: description.value,
   
   
});
taskForm['btn-task-save'].innerText = 'guardar';
editStatus = false;
}
    
   taskForm.reset();
})



