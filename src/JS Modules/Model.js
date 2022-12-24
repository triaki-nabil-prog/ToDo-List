import { pubsub } from './Controller';

let ProjectsObjectsCreation = (function () {

    const projectsList = [];

    // projects object factory function
    function project(name, color, favorite) {

        this.name = name;
        this.color = color;
        this.favorite = favorite;

        function newToDo(array) {
            this.todo = toDo(array);
        }

        return { name, color, favorite, newToDo };
    }

    // new object creation  function 
    function GetProject({name, color, favorite}) {
        let projectObject = new project(name, color, favorite);
        projectsList.push(projectObject);
        console.log(projectsList);
    }

    // subscription to the Controller module's pubsub to get the  user input values from the view modules 
    pubsub.subscribe("projects", GetProject);



    
    // to do tasks projects object factory function
    function toDo(name, description) {
        this.name = name;
        this.description = description;


        return { name, description };
    }

})();

export { ProjectsObjectsCreation }



