import Stats from "./Stats/Stats";
import Tasks from "./Tasks/Tasks";
import Store from "./Store";

const container = document.getElementById("dashboard-container");
const store = new Store();

const stats = new Stats(container, store);
const tasks = new Tasks(container, store);

stats.init();
tasks.init();
