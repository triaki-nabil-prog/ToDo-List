
// pubsub module
let pubsub = {

    subscriptions: {
        projectsInput: [],
        projectsOutput:[],
        ProjectIndex:[],
        projectsList:[],

        taskInput:[],
        TaskOutput:[],
        taskIndex:[],
        taskprojectIndex:[],
    },

    subscribe: function (subscriptionName, fn) {
        this.subscriptions[subscriptionName] = this.subscriptions[subscriptionName] || [];
        this.subscriptions[subscriptionName].push(fn);
    },

    unsubscribe: function (subscriptionName, fn) {
        if (this.subscriptions[subscriptionName]) {
            const index = this.subscriptions.indexOf(fn);
            if (index !== -1) this.subscriptions[subscriptionName].splice(index, 1);
        }
    },

    publish: function (subscriptionName, data) {
        if (this.subscriptions[subscriptionName]) {
            this.subscriptions[subscriptionName].forEach(fn => { fn(data); });
        }
    }
};


export { pubsub }