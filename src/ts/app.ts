import Stats from "./Stats";
import Tasks from "./Tasks";
import Store from "./Store";

/* eslint-disable */
console.log('it works!');
const container = document.getElementById('dashboard-container');
const store = new Store();
new Stats(container, store);
new Tasks(container, store)

// store.state$.subscribe((state) => new Tasks(container, state.projects, store));
// store.init();


