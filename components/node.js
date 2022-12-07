const nodeTemplate = document.createElement("template");
nodeTemplate.innerHTML = `
<link rel="stylesheet" href="./styles/node.css">
<div class="node-wrapper">
    <span class="value"></span>
    <div class="node-bar"></div>
</div>
`;

class Node extends HTMLElement {
    // called when an instance of the element is created or upgraded
    constructor() {
        // Always call super first in constructor
        super();

        // Create a shadow root
        this.attachShadow({ mode: "open" }); // sets and returns 'this.shadowRoot'
        this.shadowRoot.appendChild(nodeTemplate.content.cloneNode(true));
        this.shadowRoot.querySelector(".value").innerText = this.getAttribute("value");
        this.shadowRoot.querySelector(".node-bar").style.width = this.getAttribute("value") /
                (document.querySelector("#maxVal").value || 1000) * 100 +"%";
    }
    connectedCallback() { //called evertime the element is insrerted into the DOM

    }
    disconnectedCallback() { //called evertime the element is removed from the DOM

    }
    attributeChangedCallback(attrinuteName, oldValue, newValue) { // called when attr is removed, updated, added or replaced
        
    }
}

customElements.define("s-node", Node);