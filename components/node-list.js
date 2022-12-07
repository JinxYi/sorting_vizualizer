const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="./styles/node-list.css">
<ul class="node-list-wrapper">

</ul>
`;

class NodeList extends HTMLElement {
    // called when an instance of the element is created or upgraded
    constructor() {
        super(); // Always call super first in constructor

        // Create a shadow root (makes everthing confined to this scope)
        this.attachShadow({ mode: "open" }); // sets and returns 'this.shadowRoot'
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.setNodes();

    }
    connectedCallback() { //called everytime the element is inserted into the DOM
        console.log(`Element added`);
    }
    disconnectedCallback() { //called everytime the element is removed from the DOM
        console.log(`Element Removed`);
    }
    attributeChangedCallback(attributeName, oldValue, newValue) { // called when attr is removed, updated, added or replaced
        console.log(`Attribute ${attributeName} changed`);
    }

    setNodes() {
        this.nodeData = [];
        let min = document.querySelector("#minVal").value || 1;
        let max = document.querySelector("#maxVal").value || 1000;
        let size = document.querySelector("#sampleSize").value || 10;
        if(min>max) {
            window.alert("Minimum value must be smaller that maximum value");
            return;
        }
        for(let i=0;i<size;i++) this.nodeData.push({

            value: Math.floor((Math.random() * (max - min + 1)) + min)
        });
        
        this.updateRender();
    }
    updateRender() {
        // window.alert("updated");
        this.shadowRoot.querySelector(".node-list-wrapper").innerHTML  = "";
        this.nodeData.map((element, index) => {
            this.shadowRoot.querySelector(".node-list-wrapper").innerHTML += `
            <s-node class="s-node" value="${element.value}" sorted="${element.sorted? element.sorted : "false"}"></s-node>`;
        });
    }
    
    bubbleSort(isAsc, delay=150) {
        let temp;
        // this.nodeData.map((element, index) => {

        // });
        for(let j=0;j<this.nodeData.length-1;j++) {
            for(let i=0;i<this.nodeData.length-1;i++) {
                setTimeout(() => {
                    if(isAsc) {
                        if(this.nodeData[i].value > this.nodeData[i+1].value) {
                            temp = this.nodeData[i].value;
                            this.nodeData[i].value = this.nodeData[i+1].value;
                            this.nodeData[i+1].value = temp;
                        }
                    }
                    this.nodeData[i].sorted = "true";
                    this.updateRender();
                }, delay);
                    // this.nodeData[i].setAttribute("sorted", "true");
            }
            
        }
    }
}

customElements.define("node-list", NodeList);