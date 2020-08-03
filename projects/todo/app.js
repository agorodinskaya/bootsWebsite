

//////////DECLARATIONS://///////////////////////////////////////////////////////////////////////
let taskList = [];
let editFlag = false;

taskId = 0;
const openForm = document.querySelector("#openForm");

// container and modal:
const taskContainer = document.querySelector('#tasks');
const modal = document.querySelector('#newTaskInput');
const taskModalSaveBtn = document.querySelector('#task-modal-save');
const clearAllBtn = document.querySelector('#clearAll');
const alert = document.querySelector(".alert")
const alertModal = document.querySelector(".alertModal");
const closeModalBtn = document.querySelector("#btnModalClose")
const crossModalBtn = document.querySelector('#X')
// const 
// //form fields:

const taskName = document.querySelector('#taskName');
const taskDescription = document.querySelector('#taskDescription');
const taskDate = document.querySelector('#taskDate');
const taskAssignee = document.querySelector('#taskAssignee');

// priorities creating an array of options: 
const high = document.querySelector('#highPriority');
const medium = document.querySelector('#mediumPriority');
const low = document.querySelector('#lowPriority');
const nopriority = document.querySelector('#noPriority');
let priorities = [high, medium, low, nopriority];

//progress :
const done = document.querySelector('#statusDone');
const review = document.querySelector('#statusReview');
const inprogress = document.querySelector('#statusInProgress');
const todo = document.querySelector('#statusToDo');
let progress = [done, review, inprogress, todo];

// tags :
const personal = document.querySelector('#tagPersonal');
const work = document.querySelector('#tagWork');
const family = document.querySelector('#tagFamily');
const study = document.querySelector('#tagStudy');
let tags = [personal, work, family, study];

// let arrProgress = ['text-dark', 'text-info', 'text-warning', 'text-danger'] //['#5cb85c', '#5bc0de', '#f0ad4e', '#d9534f']



//////////EVENT LISTENERS://///////////////////////////////////////////////////////////////////////
openForm.addEventListener("click", function () {
    setBackToDefault();
});
taskModalSaveBtn.addEventListener('click', saveBtn);
taskName.addEventListener('input', function () {
    displayAlert(eventLength(8))
})
taskDescription.addEventListener('input', function (event) {
    displayAlert(eventLength(15))
})
taskAssignee.addEventListener('input', function (event) {
    displayAlert(eventExists(event))
})
taskDate.addEventListener('submit', function (event) {
    displayAlert(eventExists(event))
})
clearAllBtn.addEventListener('click', function () {
    clearAll();
    taskList = [];
    taskId =0;
    alertSetup("Successfully removed items from the list", "alert-success");
});
closeModalBtn.addEventListener('click', setBackToDefault)
crossModalBtn.addEventListener('click', setBackToDefault)

//////////FUNCTIONS://///////////////////////////////////////////////////////////////////////

//set to default when open the modal:
function setBackToDefault() {
    editFlag = false;
    taskModalSaveBtn.textContent = "Save";
    taskModalSaveBtn.classList.remove('btn-danger');
    taskModalSaveBtn.classList.add('btn-primary');
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
function saveBtn(e) {
    e.preventDefault()
    //declare varialbles for functions below :
    let name = taskName.value;
    let description = taskDescription.value;
    let dueDate = taskDate.value;
    let assignee = taskAssignee.value;

    let checkedPriority;
    for (let i = 0; i < priorities.length; i++) {
        if (priorities[i].checked) {
            checkedPriority = priorities[i].value;
            console.log(typeof checkedPriority, checkedPriority);
            
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
    let checkedTag;
    for (let i = 0; i < tags.length; i++) {
        if (tags[i].checked) {
            checkedTag = tags[i].value;
            console.log(checkedTag);
            //returns values done, toDo, inProgress or review;
        }
    }
    if (checkItems(name, dueDate, assignee, description, checkedPriority, checkedProgress, checkedTag) && !editFlag) {

        storeTask(name, dueDate, assignee, description, checkedPriority, checkedProgress, checkedTag);
        alertModalSetup("Successfully updated", "alert-success");
        setTimeout(function () {
            $("#newTaskInput").modal("hide"); // set data-modal ...
        }, 1000);
        
    } else if (checkItems(name, dueDate, assignee, description, checkedPriority, checkedProgress, checkedTag, taskId) && editFlag){
        storeTask(name, dueDate, assignee, description, checkedPriority, checkedProgress, checkedTag, (taskId));
        taskContainer.replaceChild(taskContainer.lastElementChild, taskContainer.children[Number(taskContainer.lastElementChild.id) - 1]);
        
        
        
        alertModalSetup("Item successfully updated", "alert-success");

        // // handle array :
        // console.log(taskList)
        // let index = taskList.findIndex(item => item.id === (taskId + 1));
        // console.log(index);

        // let lastIndex = taskList.length - 1;
        // console.log(lastIndex)

        // function move(input, from, to) {
        //     let numberOfDeletedElm = 1;

        //     const elm = input.splice(from, numberOfDeletedElm)[0];

        //     numberOfDeletedElm = 0;

        //     input.splice(to, numberOfDeletedElm, elm);
        // }
        // let taskListUpdate = move(taskList, lastIndex, index);
        // console.log(taskListUpdate)
        setTimeout(function () {
            $("#newTaskInput").modal("hide"); // set data-modal ...
        }, 1000);
        setBackToDefault();
        taskContainer.removeChild(taskContainer.children[Number(taskContainer.lastElementChild.id - 1)])
    } else {
        alertModalSetup("Please complete the form", "alert-danger");
        console.log(alertModal)
        smallText = document.querySelectorAll('.smallText');
        smallText.forEach(small => small.classList.add('text-danger'));
        setTimeout(function () {
            smallText.forEach(small => small.classList.remove('text-danger'));
        }, 1500);
    }
}

function storeTask(name, dueDate, assignee, description, checkedPriority, checkedProgress, checkedTag,id) {
    taskId++;
    const task = { name, dueDate, assignee, description, checkedPriority, checkedProgress, checkedTag, id: taskId };
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



function addTask(task) {
    const taskToAdd = `<div class="row task" id="${task.id}">
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
                                            <a href="#newTaskInput" role=button id="editItem"
                                                class="d-inline btn btn-link col-2 ml-0 pl-0 mb-0 pb-0 text-dark editItem"
                                                data-toggle="modal" data-target="#newTaskInput">
                                                <i class="fas fa-edit"></i></a>
                                        </li>
                                        <li class="col">
                                            <button class="btn btn-link ${task.checkedPriority}" data-toggle="modal"
                                                data-target="#"><i class=" fas fa-circle "></i></button>
                                        </li>
                                        <li class="col">
                                            <button class="btn btn-link ${task.checkedProgress}" data-toggle="modal"
                                                data-target="#"><i class=" fas fa-tasks "></i></button>
                                        </li>
                                        <li class="col">
                                            <button class="btn btn-link ${task.checkedTag}" data-toggle="modal"
                                                data-target="#"><i class=" fas fa-tag "></i></button>
                                        </li>
                                        <li class="col">
                                            <button id="deleteItem" type="button" class="ml-0 pl-0 btn btn-link text-dark  deleteItem"><i
                                                    class="icon far fa-trash-alt"></i></button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
`

    const taskFragment = document.createRange().createContextualFragment(taskToAdd);

    // console.log(taskFragment)
    // console.log(taskFragment.querySelector('div.row.task'))
    const deleteBtn = taskFragment.querySelector('button.deleteItem');
    const editBtn = taskFragment.querySelector('a.editItem');  
    
    deleteBtn.addEventListener('click', deleteItem);
    
    editBtn.addEventListener('click', editItem);
    setBackToDefault;
    taskContainer.appendChild(taskFragment);
}


function deleteItem(e) {

    const element = e.currentTarget.parentElement.parentElement.parentElement.parentElement;
    // console.log(element)
    const elId = Number(element.id)
    // console.log(elId)
    taskContainer.removeChild(element);
    // handle array :
    let index = taskList.findIndex(item => item.id === elId);
    // console.log(index)
    taskList.splice(index, 1);
    console.log(taskList);
    alertSetup("Item removed successfully from the list", "alert-success");
}
function editItem(e) {
    e.preventDefault()
    const element = e.currentTarget.parentElement.parentElement.parentElement.parentElement;
    const elId = Number(element.id) - 1
    console.log(element.children)
    console.log(elId)
    editFlag = true;
    // get elements from html:
    let nameToEdit = element.children[0].children[0].children[0].innerText;
    let assinedToEdit = element.children[2].innerText;

    //priorities: 
    let prioritiesString = element.children[3].children[0].children[1].innerHTML
    // JQUERY to rewrite in JS:
    let prioritiesObject = $(prioritiesString);
    let prioritiesToEdit = prioritiesObject[0].classList.value.split(' ')[2];
    // console.log(prioritiesToEdit)
    
    //status:
    let statusString = element.children[3].children[0].children[2].innerHTML;
    // JQUERY to rewrite in JS:
    let statusObject = $(statusString);
    let progressToEdit = statusObject[0].classList.value.split(' ')[2];
    
    //tags:
    let tagString = element.children[3].children[0].children[3].innerHTML;
    // JQUERY to rewrite in JS:
    let tagObject = $(tagString);
    let tagToEdit = tagObject[0].classList.value.split(' ')[2];

    // console.log(tagToEdit)


    // show editable items in modal:  
    taskId = elId;
    console.log(elId)
    taskName.value = nameToEdit;
    taskAssignee.value = assinedToEdit;
    // taskDate.value = dateToEdit; 
    //check priority :
    for (let i = 0; i < priorities.length; i++) {
        if (priorities[i].value === prioritiesToEdit ) {
            priorities[i].checked = true
        }
    }
    
    // check status:
    for (let i = 0; i < progress.length; i++) {
        if (progress[i].value === progressToEdit) {
            progress[i].checked = true
        }
    }
    for (let i = 0; i < tags.length; i++) {
        if (tags[i].value === tagToEdit) {
            tags[i].checked = true
        }
    }
    
    taskModalSaveBtn.textContent = "Edit";
    taskModalSaveBtn.classList.add('btn-danger');
    
    
}


//// Alerts and check for validation://////////////////////////////

function alertModalSetup(text, action) {
    alertModal.textContent = text;
    alertModal.classList.add(`${action}`);
    // remove alertModal
    setTimeout(function () {
        alertModal.textContent = "";
        alertModal.classList.remove(`${action}`);
    }, 1500);
}
function alertSetup(text, action) {
    alert.textContent = text;
    alert.classList.add(`${action}`);
    // remove alert
    setTimeout(function () {
        alert.textContent = "";
        alert.classList.remove(`${action}`);
    }, 1500);
}

function displayAlert(bool) {
    if (bool) {
        event.target.classList.remove('is-invalid')
        event.target.classList.add('is-valid')
    } else {
        event.target.classList.remove('is-valid')
        event.target.classList.add('is-invalid')
    }
}
function checkItems(name, dueDate, assignee, description, checkedPriority, checkedProgress, checkedTag) {
    if (name && name.length > 8 && description && description.length > 15 && assignee && dueDate && checkedPriority && checkedProgress && checkedTag) {
        return true;
    } else { return false }
}

function eventExists(event) {
    return event.target.value;

}
function eventLength(number) {
    return event.target.value && event.target.value.length > number;
}


// DUMMY TASKS://///////////////////////////////////////////////////////////////////////////////////////////////
storeTask("Wesbos JS",
    "01/08/2020", "AG",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quisquam consequatur commodi non vitae harum autem quibusdam quam ratione deserunt!",
    "high",
    "done",
    "personal",
    1);

storeTask("Validation form",
    "01/08/2020",
    "AG",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quisquam consequatur commodi non vitae harum autem quibusdam quam ratione deserunt!",
    "medium",
    "inProgress",
    "family",
    2);

storeTask("Canvas",
    "01/08/2020",
    "AG",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quisquam consequatur commodi non vitae harum autem quibusdam quam ratione deserunt!",
    "high",
    "review",
    "study",
    4);

storeTask("Debrief on next steps with Yumi and Zoe",
    "01/08/2020",
    "AG",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quisquam consequatur commodi non vitae harum autem quibusdam quam ratione deserunt!",
    "low",
    "review",
    "study",
    4);

storeTask("Todo - keep working on my version ",
    "01/08/2020",
    "AG",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quisquam consequatur commodi non vitae harum autem quibusdam quam ratione deserunt!",
    "medium",
    "inProgress",
    "work",
    5);

storeTask("Keep working on my side projects",
    "01/08/2020",
    "AG",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quisquam consequatur commodi non vitae harum autem quibusdam quam ratione deserunt!",
    "nopriority",
    "inProgress",
    "work",
    6)

