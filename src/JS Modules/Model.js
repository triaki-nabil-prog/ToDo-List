import { pubsub } from './Controller';
// projects object creation module 
let ProjectsObjectsCreation = (function () {
    // stored list of project objects 
    const projectsList = [];

    // projects object factory function
    const project = function (name, color, favorite) {
        this.name = name;
        this.color = color;
        this.favorite = favorite;
        let tasks = [];
        // exposed properties inside the module 
        return { name, color, favorite, tasks };
    }
    // subscription to the Controller module's pubsub to get the  user input values from the view modules 
    pubsub.subscribe("projectsInput", GetProject);
    pubsub.subscribe("ProjectIndex", removeProject);
    // new object creation  function 
    function GetProject({ name, color, favorite }) {
        let projectObject = new project(name, color, favorite);
        projectObject.tasks.push(new toDo("test","test"));
        projectObject.tasks.push(new toDo("test2","test2")) ;
        projectsList.push(projectObject);
        pubsub.publish("projectsOutput", projectObject);
    }
    //remove project object from list
    function removeProject(index) {
        projectsList.splice(index, 1);

    }
    // to do tasks projects object factory function
    function toDo(name, description) {
        this.name = name;
        this.description = description;
        // exposed properties inside the module 
        return { name, description };
    }
    function addTask(){
        // add a new task to the specified project objects tasks array
    }
    // initial projects
    GetProject({name:"Personal", color:"#696969",favorite:'on'});
    GetProject({name:"Work", color:"#2a9d8f",favorite:'on'});
    GetProject({name:"Education", color:"#e76f51",favorite:'on'});
})();

export { ProjectsObjectsCreation }



