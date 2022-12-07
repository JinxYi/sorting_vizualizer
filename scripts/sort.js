
let helloWorld = "Hello World";

document.querySelector("#update").addEventListener("click", ()=> {
    document.querySelector("node-list").setNodes();
});

// sorting buttons
document.querySelector("#bubbleSort").addEventListener("click", ()=> {
    document.querySelector("node-list").bubbleSort(true);
});