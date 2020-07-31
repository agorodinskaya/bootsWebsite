

//////////DECLARATIONS://///////////////////////////////////////////////////////////////////////
 let taskList = [];
 taskId = 0;  
const openForm = document.querySelector("#openForm");

// container and modal:
const taskContainer = document.querySelector('#tasks');
const modal = document.querySelector('#newTaskInput');
const taskModalSaveBtn = document.querySelector('#task-modal-save');

// //form fields:

const taskName = document.querySelector('#taskName');
const taskDescription = document.querySelector('#taskDescription');
const taskDate = document.querySelector('#taskDate');
const taskAssignee = document.querySelector('#taskAssignee');
      
// priorities creating an array of options: 
const high = document.querySelector('#highPriority');
const medium = document.querySelector('#mediumPriority');
const low = document.querySelector('#lowPriority');
const noPriority = document.querySelector('#noPriority');
// values stored : high = 4; medium = 3; low = 2; noPriority = 1;
let priorities = [high, medium, low, noPriority];
// let arrayColor = ['text-dark', 'text-info', 'text-warning','text-danger']
let arrayColorSVG = ['#292b2c', '#5bc0de', '#f0ad4e','#d9534f']

//progress :
const done = document.querySelector('#statusDone');
const review = document.querySelector('#statusReview');
const inprogress = document.querySelector('#statusInProgress');
const todo = document.querySelector('#statusToDo');
let progress = [done, review, inprogress, todo];
// let arrProgress = ['text-dark', 'text-info', 'text-warning', 'text-danger'] //['#5cb85c', '#5bc0de', '#f0ad4e', '#d9534f']

//////////EVENT LISTENERS://///////////////////////////////////////////////////////////////////////
openForm.addEventListener("click", function () {
    seToDefault();
});
taskModalSaveBtn.addEventListener('click', saveBtn);
taskName.addEventListener('input', function(){
    displayAlert(eventLength(8))
})
taskDescription.addEventListener('input', function(event){
    displayAlert(eventLength(15))
})
taskAssignee.addEventListener('input', function(event){
    displayAlert(eventExists(event))
})
taskDate.addEventListener('submit', function(event){
    displayAlert(eventExists(event))
})

//////////FUNCTIONS://///////////////////////////////////////////////////////////////////////

//set to default when open the modal:
function seToDefault() {
    taskName.value = null;
    taskDescription.value = null;
    taskAssignee.value = null;
    taskDate.value = null;
    for (let i = 0; i < priorities.length; i++) {
        priorities[i].checked = false
    }
    for (let i = 0; i < progress.length; i++) {
        progress[i].checked = false
    }
    taskName.classList.remove("is-invalid", "is-valid");
    taskDescription.classList.remove("is-invalid", "is-valid");
    taskAssignee.classList.remove("is-invalid", "is-valid");
    taskDate.classList.remove("is-invalid", "is-valid");
}

//fill out modal's fields and hit save:
function saveBtn(e){
    e.preventDefault()
    let name = taskName.value;
    let description = taskDescription.value;
    let dueDate = taskDate.value;
    let assignee = taskAssignee.value;
    // console.log({ name, description, dueDate, assignee});
    // console.log(priorities)
    
    let checkedPriority;
    for (let i = 0; i < priorities.length; i++) {
        if (priorities[i].checked) { 
            checkedPriority = Number(priorities[i].value); 
            // console.log(typeof checkedPriority, checkedPriority);
            //returns values 1, 2,3 or 4 (see line 25 for more info)
    }   
    }
    
    let checkedProgress;
    for (let i = 0; i < progress.length; i++) {
        if (progress[i].checked) {
            checkedProgress = progress[i].value;
            // console.log(typeof checkedProgress, checkedProgress);
            //returns values done, toDo, inProgress or review;
        }
    }
    
    if (checkItems(name, dueDate, assignee, description, checkedPriority, checkedProgress)) {
        storeTask(name, dueDate, assignee, description, checkedPriority, checkedProgress);
        $("#newTaskInput").modal("hide"); // set data-modal ...
    } else {
        alert("Please complete the form");
        // $("#newTaskInput").modal("show");
        // let items = [name, dueDate, assignee, description, checkedPriority, checkedProgress]
        // displayAlert(eventExists(event))
    }   
}

function storeTask(name, dueDate, assignee, description, checkedPriority, checkedProgress) {
    taskId++;
    const task = { name, dueDate, assignee, description, checkedPriority, checkedProgress, id: taskId };
    taskList.push(task);
    refreshPage()
}
function refreshPage() {
    clearAll();
    taskList.forEach(task => addTask(task));
   
}
function clearAll() {
    taskContainer.innerHTML = "";
}

function addTask(task){
    const html = `<div class="row task" id="${task.taskId}">
                                <div class="col-lg-4 col-12 taskName order-2 order-lg-1">
                                    <a href="#task1Description" class="text-secondary icon ml-0 pl-0 small"
                                    data-toggle="collapse" data-target="#task1Description">
                                        <h6 class="text-left">${task.name}</h6>
                                    </a>



                                </div>
                                <div class="col-lg-2 col-6 order-3 order-lg-2">
                                    ${task.dueDate}
                                </div>
                                <div class="col-lg-2 col-6 order-4 order-lg-3">
                                    ${task.assignee}
                                </div>
                                <div class="col-lg-4 order-1 order-lg-4">
                                    <ul class="row taskSummary justify-content-around">
                                        <li class="col">

                                            <i class="far fa-check-circle">
                                                0/3</i>

                                        </li>
                                        <li class="col">
                                            <a href="#newTaskInput" role=button
                                                class="d-inline btn btn-link col-2 ml-0 pl-0 mb-0 pb-0 text-dark"
                                                data-toggle="modal" data-target="#newTaskInput">
                                                <i class="fas fa-edit"></i></a>
                                        </li>
                                        <li class="col">
                                            <button class="d-inline btn btn-link data-toggle="modal"
                                                data-target="#"><svg width="15" height="15">
                                                <circle cx="7" cy="7" r="7" fill=${arrayColorSVG[task.checkedPriority - 1]} />
                                            </svg>
                                            </button>
                                        </li>
                                        <li class="col">
                                            <button class="btn btn-link ${task.checkedProgress}" data-toggle="modal"
                                                data-target="#"><i class=" fas fa-tag "></i></button>
                                        </li>
                                        <li class="col">
                                            <button type="button" class="ml-0 pl-0 btn btn-link text-dark"><i
                                                    class="icon far fa-trash-alt"></i></button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
`
const taskElement = document.createRange().createContextualFragment(html);
    
taskContainer.append(taskElement)
    
}


//// alerts and check for validation:
function displayAlert(bool){
    if(bool){
        event.target.classList.remove('is-invalid')
        event.target.classList.add('is-valid')
    } else {
        event.target.classList.remove('is-valid')
        event.target.classList.add('is-invalid')
    }
}
function checkItems(name, dueDate, assignee, description, checkedPriority, checkedProgress) {
    if (name && name.length > 8 && description && description.length > 15 && assignee && dueDate && checkedPriority && checkedProgress) {
    return true;
    } else{return false}
}

function eventExists(event){
    return event.target.value;

}
function eventLength(number){
    return event.target.value&&event.target.value.length > number;
}


// dummy tasks:
storeTask("Wesbos JS", 
          "01/08/2020","AG",
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quisquam consequatur commodi non vitae harum autem quibusdam quam ratione deserunt!",
          "3",
          "done",
          1);

storeTask("Validation form", 
          "01/08/2020",
          "AG", 
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quisquam consequatur commodi non vitae harum autem quibusdam quam ratione deserunt!",
          "4",
          "inProgress",
          2)

storeTask("Canvas", 
          "01/08/2020", 
          "AG", 
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quisquam consequatur commodi non vitae harum autem quibusdam quam ratione deserunt!", 
          "2", 
          "review", 
          4)

storeTask("Debrief on next steps with Yumi and Zoe", 
          "01/08/2020",
          "AG",
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quisquam consequatur commodi non vitae harum autem quibusdam quam ratione deserunt!",
          "2",
          "review",
          4)

storeTask("Todo - keep working on my version ",
          "01/08/2020",
          "AG",
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quisquam consequatur commodi non vitae harum autem quibusdam quam ratione deserunt!",
          "4",
          "inProgress",
           5)

storeTask( "Keep working on my side projects",
           "01/08/2020",
           "AG",
           "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quisquam consequatur commodi non vitae harum autem quibusdam quam ratione deserunt!",
           "1",
           "inProgress",
            6)

