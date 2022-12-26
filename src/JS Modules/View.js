import _ from 'lodash';
import { pubsub } from './Controller';
// projects user input getter from dom and publisher to the Modal 
let projects = (function () {
    //cache DOM
    const Name = document.querySelector(".project-name");
    const Color = document.querySelector(".project-color");
    const Favorite = document.querySelector("#checkbox");
    const ULprojectsList = document.querySelector(".project-list");
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
    //create the projects list html DOM template  and render it
    function rendering(project) {
        if (Name.value != "" ||project.name != "") {
            // generating the html elements
            const newLi = document.createElement("li");
            const name = document.createElement("div");
            const Button = document.createElement("button");
            const color = document.createElement("div");
            //assigning classes 
            newLi.classList.add("project-item");
            name.classList.add("project-name");
            Button.classList.add("project-delete");
            color.classList.add("item-color");
            //assigning values
            name.textContent = project.name;
            color.style.backgroundColor = project.color;
            //adding  created elements  to the DOM
            ULprojectsList.appendChild(newLi);
            newLi.appendChild(color);
            newLi.appendChild(name);
            newLi.appendChild(Button);
        }
        Name.value = "";
    }
    // get the value from user input and send it to modal 
    function add() {
        pubsub.publish("projectsInput", { name: Name.value, color: Color.value, favorite: Favorite.value });
    }
    //remove a project from the list
    function removeProject(e) {
        // remove from the DOM
        e.target.parentElement.style.opacity = 0;
        setTimeout(() => { e.target.parentElement.remove() }, 500);
        // publish removed element index's
        let Li = e.target.parentElement;
        const index = [...ULprojectsList.children].indexOf(Li);
        pubsub.publish("ProjectIndex", index);
    }
    
})();








let tasks = (function () {

    function rendering() {
        //update the task module view
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

    var modal = document.getElementById("myModal");
    var modalbtn = document.getElementById("myBtn");
    var span = document.getElementsByClassName("cancel-new")[0];
    var spanAdd = document.getElementsByClassName("add-new")[0];

    modalbtn.onclick = function () {
        modal.style.display = "block";
    }

    span.onclick = function () {
        modal.style.display = "none";
    }

    spanAdd.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
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
        console.log('tracking started');
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

            console.log('tracking stopped');
        }
    });

})();


export { displayControl, resizeHandler };