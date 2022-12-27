import _ from 'lodash';
import { pubsub } from './Controller';
// projects user input getter from dom and publisher to the Modal 
let projects = (function () {
    //Project Data
    let ProjectListData = [];
    //cache DOM
    const Name = document.querySelector(".project-name");
    const Color = document.querySelector(".project-color");
    const Favorite = document.querySelector("#checkbox");
    const ULprojectsList = document.querySelector(".project-list");
    const mainContent = document.querySelector(".main-content");
    //Bind events
    AddGlobalEventListener("click", ".add-new", add);
    AddGlobalEventListener("click", ".project-delete", removeProject);//have to create a delete button
    //event listeners binder function
    function AddGlobalEventListener(type, selector, callback) {
        document.addEventListener(type, (e) => {
            if (e.target.matches(selector)) {
                callback(e);
            }
        });
    }
    //event subscriptions
    pubsub.subscribe('projectsOutput', rendering);
    pubsub.subscribe('projectsList', getProjectList);
    //create the projects list html DOM template  and render it
    function rendering(project) {
        if (Name.value != "" || project.name != "") {
            // generating the html elements
            const newLi = document.createElement("li");
            const name = document.createElement("div");
            const Button = document.createElement("button");
            const color = document.createElement("div");
            const navigation = document.createElement("a")
            //assigning classes 
            newLi.classList.add("project-item");
            name.classList.add("project-name");
            Button.classList.add("project-delete");
            color.classList.add("item-color");
            //assigning values
            name.textContent = project.name;
            color.style.backgroundColor = project.color;
            navigation.setAttribute("href", `#${project.name}`);
            //adding  created elements  to the DOM
            ULprojectsList.appendChild(newLi);
            newLi.appendChild(navigation);
            navigation.appendChild(color);
            navigation.appendChild(name);
            navigation.appendChild(Button);
            // creating project task display 
            // generating the html elements
            const projectTasks = document.createElement("div");
            const TasksList = document.createElement("div");
            const sectiontitle = document.createElement("h1");
            //assigning classes 
            projectTasks.setAttribute('id', project.name);
            TasksList.classList.add("taskList");
            TasksList.style.backgroundColor = project.color;
            sectiontitle.textContent = project.name;
            //adding  created elements  to the DOM
            mainContent.appendChild(projectTasks);
            projectTasks.appendChild(sectiontitle);
            projectTasks.appendChild(TasksList);
        }
        Name.value = "";
    }
    // get the value from user input and send it to modal 
    function add() {
        // testing if the project input by user already exist 
        let test = false;
        for (let i = 1; i < ProjectListData.length; i++) {
            if (ProjectListData[i].name == Name.value) {
                alert("Project Already exist");
                test = false;
                break;
            }
            else {test = true;}
        }
        if (test) {pubsub.publish("projectsInput", { name: Name.value, color: Color.value, favorite: Favorite.value });}}
    //remove a project from the list
    function removeProject(e) {
        // remove from the DOM
        let id = e.target.previousSibling.textContent;
        let parent = e.target.parentElement;
        parent.parentElement.style.opacity = 0;
        setTimeout(() => {
            parent.parentElement.remove();
        }, 500);
        const projectDomSection = document.querySelector(`#${id}`);
        projectDomSection.remove();
        // publish removed element index's
        let Li = parent.parentElement;
        const index = [...ULprojectsList.children].indexOf(Li);
        pubsub.publish("ProjectIndex", index);
    }
    // testing if project already exist and alert user if yes
    function getProjectList(projectList) {
        ProjectListData = projectList;
    }
})();








let tasks = (function () {
    //cache DOM

    //event subscriptions
    pubsub.subscribe('projectsOutput', rendering);
    //update the task module view
    function rendering(project) {
        // getting the currently created project task display area
        const projectTask = document.querySelector(`#${project.name} .taskList`);
        // generating the html elements
        const TaskModal = document.createElement('div');
        const TaskName = document.createElement('input');
        const TaskDescription = document.createElement('input');
        const TaskDueDate = document.createElement('input');
        const addButton = document.createElement('button');
        const buttons = document.createElement('div');
        const cancelButton = document.createElement('button');
        const ModalButton = document.createElement('button');
        //assigning classes 
        TaskModal.classList.add("Task-modal");
        TaskName.classList.add("task-name");
        TaskDescription.classList.add("task-description");
        TaskDueDate.classList.add("task-due-date");
        buttons.classList.add("task-modal-buttons");
        addButton.classList.add("add-task");
        cancelButton.classList.add("cancel-task");
        ModalButton.classList.add("open-modal");
        //adding values 
        ModalButton.textContent = "+ Add task";
        addButton.textContent = "Add";
        cancelButton.textContent = "Cancel";
        TaskName.setAttribute("type", "text");
        TaskName.placeholder = "Task name";
        TaskDescription.placeholder = "Description";
        TaskDueDate.setAttribute("type", "Date");

        //adding  created elements  to the DOM
        projectTask.appendChild(ModalButton);
        ModalButton.appendChild(TaskModal);
        TaskModal.appendChild(TaskName);
        TaskModal.appendChild(TaskDescription);
        TaskModal.appendChild(TaskDueDate);
        TaskModal.appendChild(buttons);
        buttons.appendChild(cancelButton);
        buttons.appendChild(addButton);
        //task modal event controls
        //open task modal
        ModalButton.addEventListener('click', (e) => {
            if (e.target.matches(".open-modal")) {
                console.log(e.target);
                TaskModal.style.display = "block";
            }
            e.stopPropagation()
        });
        //close task modal
        cancelButton.addEventListener('click', (e) => {
            console.log(e.target);
            TaskModal.style.display = "none";
        });
    }

    function add() {
        //add a new task
    }

    function remove() {
        //remove a task
    }
})();


let displayControl = (function () {
    var btn = document.querySelector(".btn");
    var sidebar = document.querySelector('.sidebar');
    var projectListbutton = document.querySelector('.project-list-menu');
    var projectList = document.querySelector('.project-list');
    var menusvg = document.querySelector('.menu-svg');
    var shade = document.querySelector('.shade');

    projectListbutton.addEventListener("click", function (event) {
        projectList.classList.toggle('list-closed');
        menusvg.classList.toggle('list-closed');
        menusvg.classList.toggle('list-open');

    });

    btn.addEventListener("click", function (event) {
        btn.classList.toggle('active');
        btn.classList.toggle('not-active');
        sidebar.classList.toggle('is-closed');
        sidebar.classList.toggle('is-open');
        shade.classList.toggle('is-closed');
    });


    shade.addEventListener("click", function (event) {
        btn.classList.toggle('active');
        btn.classList.toggle('not-active');
        sidebar.classList.toggle('is-closed');
        sidebar.classList.toggle('is-open');
        shade.classList.toggle('is-closed');
    });

    //modals closing and opening
    //projects modal
    var projectModal = document.getElementById("myModal");
    var projectModalbtn = document.getElementById("myBtn");
    var span = document.getElementsByClassName("cancel-new")[0];
    var spanAdd = document.getElementsByClassName("add-new")[0];

    projectModalbtn.onclick = function () {
        projectModal.style.display = "block";
    }

    span.onclick = function () {
        projectModal.style.display = "none";
    }

    spanAdd.onclick = function () {
        projectModal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == projectModal) {
            projectModal.style.display = "none";
        }
    }



})();

let resizeHandler = (function () {

    const selectTarget = (fromElement, selector) => {
        if (!(fromElement instanceof HTMLElement)) {
            return null;
        }

        return fromElement.querySelector(selector);
    };

    const resizeData = {
        tracking: false,
        startWidth: null,
        startCursorScreenX: null,
        handleWidth: 10,
        resizeTarget: null,
        parentElement: null,
        maxWidth: null,
    };

    $(document.body).on('mousedown', '.resize-handle--x', null, (event) => {
        if (event.button !== 0) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        const handleElement = event.currentTarget;

        if (!handleElement.parentElement) {
            console.error(new Error("Parent element not found."));
            return;
        }

        // Use the target selector on the handle to get the resize target.
        const targetSelector = handleElement.getAttribute('data-target');
        const targetElement = selectTarget(handleElement.parentElement, targetSelector);

        if (!targetElement) {
            console.error(new Error("Resize target element not found."));
            return;
        }

        resizeData.startWidth = $(targetElement).outerWidth();
        resizeData.startCursorScreenX = event.screenX;
        resizeData.resizeTarget = targetElement;
        resizeData.parentElement = handleElement.parentElement;
        resizeData.maxWidth = $(handleElement.parentElement).innerWidth() - resizeData.handleWidth;
        resizeData.tracking = true;

        setInterval(function () {
            const search = document.querySelector("input");
            const aside = document.querySelector("aside");

            let width = aside.offsetWidth - 100;
            let text = width.toString();

            search.style.width = text + "px";
        }, 100);
    });

    $(window).on('mousemove', null, null, _.debounce((event) => {
        if (resizeData.tracking) {
            const cursorScreenXDelta = event.screenX - resizeData.startCursorScreenX;
            const newWidth = Math.min(resizeData.startWidth + cursorScreenXDelta, resizeData.maxWidth);

            $(resizeData.resizeTarget).outerWidth(newWidth);

        }
    }, 1));



    $(window).on('mouseup', null, null, (event) => {
        if (resizeData.tracking) {
            resizeData.tracking = false;
        }
    });

})();

let loadScreenview = (function () {

    window.addEventListener("load", function () {
        this.setTimeout(() => {
            console.log("loaded");
            document.getElementById("load-container").style.display = "none";
        }, 2500);
    });

})();



export { displayControl, resizeHandler, loadScreenview };