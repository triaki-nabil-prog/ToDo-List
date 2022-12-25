import { pubsub } from './Controller';
// projects object creation module 
let ProjectsObjectsCreation = (function () {
    // stored list of project objects 
    const projectsList = [];


    // projects object factory function
    function project(name, color, favorite) {
        this.name = name;
        this.color = color;
        this.favorite = favorite;
        // method available to a project to creates a new task 
        function newToDo(array) {
            this.todo = toDo(array);
        }
        // exposed properties inside the module 
        return { name, color, favorite, newToDo };
    }
    // subscription to the Controller module's pubsub to get the  user input values from the view modules 
    pubsub.subscribe("projectsInput", GetProject);
    pubsub.subscribe("ProjectIndex",removeProject);
    // new object creation  function 
    function GetProject({ name, color, favorite }) {
        let projectObject = new project(name, color, favorite);
        projectsList.push(projectObject);
        pubsub.publish("projectsOutput", projectObject);
    }
    //remove project object from list
    function removeProject(index){
        projectsList.splice(index,1);
        console.log(projectsList);
    }
    // to do tasks projects object factory function
    function toDo(name, description) {
        this.name = name;
        this.description = description;
        // exposed properties inside the module 
        return { name, description };
    }
})();

export { ProjectsObjectsCreation }



