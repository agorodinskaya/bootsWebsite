console.clear()

// const createButton = document.getElementById('addButton');

// const modal = document.querySelector(".modal-overlay");
// const closeBtn = document.querySelector(".close-btn");

//declarations: 
// container and modal:
const taskContainer = document.querySelector('#tasks');
const modal = document.querySelector('#newTaskInput');
const taskModalSaveBtn = document.querySelector('#task-modal-save');

// priorities creating an array of options: 
const high = document.querySelector('#highPriority');
const medium = document.querySelector('#mediumPriority');
const low = document.querySelector('#lowPriority');

let priorities = [high, medium, low];
let arrayColor = ['text-dark', 'text-info', 'text-warning','text-danger']
let arrayColorSVG = ['#292b2c', '#5bc0de', '#f0ad4e','#d9534f']
//prgress :
const done = document.querySelector('#statusDone');
const review = document.querySelector('#statusReview');
const inprogress = document.querySelector('#statusInProgress');
const todo = document.querySelector('#statusToDo');
let progress = [done, review, inprogress, todo];
// let arrProgress = ['text-dark', 'text-info', 'text-warning', 'text-danger'] //['#5cb85c', '#5bc0de', '#f0ad4e', '#d9534f']
let id = 0;


//event listeners:
taskModalSaveBtn.addEventListener('click', saveBtn)

//functions:
function saveBtn(){
    const name = document.querySelector('#taskName').value;
    const description = document.querySelector('#taskDescription').value;
    const dueDate = document.querySelector('#taskDate').value;
    const assignee = document.querySelector('#taskAssignee').value;
    // console.log({ name, description, dueDate, assignee});
    // console.log(priorities)
    let checkedPriority;
    for (let i = 0; i < priorities.length; i++) {
        if (priorities[i].checked) { 
            checkedPriority = Number(priorities[i].value); 
            console.log(typeof checkedPriority, checkedPriority);
    }   
    }
    
    let checkedProgress;
    for (let i = 0; i < progress.length; i++) {
        if (progress[i].checked) {
            checkedProgress = progress[i].value;
            console.log(typeof checkedProgress, checkedProgress);
        }
    }
    console.log({ name, dueDate, assignee, description, checkedPriority, checkedProgress });
    addTask(name, dueDate, assignee, description, checkedPriority, checkedProgress );
    
    
}

function addTask(name, dueDate, assignee, description, checkedPriority, checkedProgress){
    const html = `<div class="row task" id="task1">
                                <div class="col-lg-4 col-12 taskName order-2 order-lg-1">
                                    <a href="#task1Description" class="text-secondary icon ml-0 pl-0 small"
                                    data-toggle="collapse" data-target="#task1Description">
                                        <h6 class="text-left">${name}</h6>
                                    </a>



                                </div>
                                <div class="col-lg-2 col-6 order-3 order-lg-2">
                                    ${dueDate}
                                </div>
                                <div class="col-lg-2 col-6 order-4 order-lg-3">
                                    ${assignee}
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
                                            <svg width="15" height="15">
                                                <circle cx="7" cy="7" r="7" fill=${arrayColorSVG[checkedPriority - 1]} />
                                            </svg>
                                            
                                        </li>
                                        <li class="col">
                                            <button class="btn btn-link ${checkedProgress}" data-toggle="modal"
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

