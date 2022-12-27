import { pubsub } from './Controller';
// projects object creation module 
let ProjectsObjectsCreation = (function () {
    // stored list of project objects 
    const projectsList = [];
    const tasks = [];
    pubsub.publish("projectsList", projectsList);
    // projects object factory function
    const project = function (name, color, favorite) {
        this.name = name;
        this.color = color;
        this.favorite = favorite;
        this.tasks = tasks;
        // exposed properties inside the module 
        return { name, color, favorite, tasks };
    }
    // subscription to the Controller module's pubsub to get the  user input values from the view modules 
    pubsub.subscribe("projectsInput", GetProject);
    pubsub.subscribe("ProjectIndex", removeProject);
    pubsub.subscribe("taskInput", GetTask);
    // new object creation  function 
    function GetProject({ name, color, favorite }) {
        let projectObject = new project(name, color, favorite);
        projectsList.push(projectObject);
        pubsub.publish("projectsList", projectsList);
        pubsub.publish("projectsOutput", projectObject);
    }
    //remove project object from list
    function removeProject(index) {
        projectsList.splice(index, 1);
    }
    // to do tasks projects object factory function
    function toDo(name, description, dueDate) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        // exposed properties inside the module 
        return { name, description, dueDate };
    }
    function GetTask({ name, Description, duedate, project }) {
        project.tasks.push(new toDo(name, Description, duedate));
        pubsub.publish("TaskOutput", project);
        // add a new task to the specified project objects tasks array
    }
    // initial projects
    GetProject({ name: "Personal", color: "#696969", favorite: 'on' });
    GetProject({ name: "Work", color: "#2a9d8f", favorite: 'on' });
    GetProject({ name: "Education", color: "#e76f51", favorite: 'on' });
    for(let i=0;i<projectsList.length;i++){
        let project = projectsList[i];
        if(project.name=="Personal"){
            
            GetTask({ name: "Personal task", Description: "First personal task display test", duedate: "2023-02-21", project });
        }
        if(project.name=="Work"){
            
            GetTask({ name: "Work tasks", Description: "First Work task display test", duedate: "2024-06-02", project });
        }
        if(project.name=="Education"){
            
            GetTask({ name: "Education tasks", Description: "First Work task display test", duedate: "2023-11-09", project });
        }
    }
})();

export { ProjectsObjectsCreation }



