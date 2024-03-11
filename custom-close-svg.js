

const template = document.createElement("template");
// Control the Width of the SVG with this const 
const svgWidth = 32;

// Control the Stroke Color :
const strokeColor = "hsla(271, 85%, 40%, 1)"
    // refers to [--_svg-stroke-clr]


        /* strokeColor if element is expanded / opened will be set to 
           strokeColor "hsla(271," + " 85, 20, 0.7)" which is set on Line 174 (const stroke2Clr)
           via manipulateHSLA function
        */
        


template.innerHTML = /* html */ `
<style>
:host {
    display: grid;
    place-content: center;
    --_svg-fill: none;
/* variable to change for  */
    --_svg-stroke-clr: ${strokeColor};

  
    --_svg-stroke-width: 10px;

    /* Animation timers */
    --_transition-base: 500ms;
    --_transition-slow: 500ms;
    --_transition-delay-base: 0;
    
    overflow: hidden;
}

:host([opened="true"]) .event-handler{
    --__svg-stroke-clr: var(--_svg-stroke-2-clr);
    --_svg-stroke-clr: var(--__svg-stroke-clr);

     --_stroke-dash-array-opened: 33 63 33;
}


.svg {
grid-area: svg;
display: grid;
place-content: center;
}
    .svg:hover {
        cursor: pointer;
    }

                    :host-context(tool-expander[opened="true"]),
                    .event-handler[opened="true"]    {
                        --_svg-stroke-clr: var(--_svg-stroke-2-clr);
                        --_stroke-dash-array-opened: 33 63 33;
                    }



:host-context([opened="true"]) .event-handler .first,
:host-context([opened="true"]) .event-handler .second,
.event-handler[opened="true"] .first,
.event-handler[opened="true"] .second {
  
    stroke-dasharray: 33 63 33;
    transition: all var(--_transition-base) ease-in-out;
}


:host-context([opened="false"]) .event-handler .first,
:host-context([opened="false"]) .event-handler .second,
.event-handler[opened="false"] .first,
.event-handler[opened="false"] .second {
    stroke-dasharray: 121 121 121;
    transition: all var(--_transition-base) ease-in-out;
}

:host > button{
    display: grid;
    place-content: center;
    background-color: transparent;
    border: none;
    grid-template: 1fr / 1fr;
    grid-template-areas: 
    "svg"
    ;
}

</style>

<!--
            <div class="event-handler" aria-controls="item-description" opened="false">
                <svg class="svg" stroke="var(--_svg-stroke-clr)" fill="none" class="svg" viewBox="0 0 100 100">
                    <path class="first"                                                                             
                    stroke-width="var(--_svg-stroke-width)"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M 5 50 a 25 25 180 0 1 45 0 a 25 25 180 0 0 45 0"
                    >
                        
                    </path>
                </svg>
                <svg class="svg" stroke="var(--_svg-stroke-clr)" fill="none" class="svg" viewBox="0 0 100 100">
                    <path class="second"
                    stroke-width="var(--_svg-stroke-width)"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M 95 50 a 25 25 180 0 0 -45 0 a 25 25 180 0 1 -45 0"
                    >
                        
                    </path>
                </svg>
            </div>
-->



            <button class="event-handler" aria-controls="item-description" opened="false">
                <svg class="svg" opened="false" stroke="var(--_svg-stroke-clr, black)" fill="var(--_svg-fill)" class="svg" viewBox="0 0 100 100">
                    <path class="first"                                                                             
                    stroke-width="var(--_svg-stroke-width)"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m 50 50 l 25 20 a 1 1 0 0 0 0 -40 l -25 20">
                    </path>
                </svg>

                <svg class="svg" opened="false" stroke="var(--_svg-stroke-clr, black)" fill="var(--_svg-fill)" class="svg" viewBox="0 0 100 100">
                    <path class="second"                                                                             
                    stroke-width="var(--_svg-stroke-width)"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m 50 50 l -25 20 a 1 1 0 0 1 0 -40 l 25 20">
                    </path>
                </svg>
            </button>




`;

class CustomCloseSvg extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow( { mode:"closed"});
        this.root.appendChild(template.content.cloneNode(true));

        Array.from(this.root.querySelectorAll("svg")).forEach(el => {
            el.setAttribute("width", svgWidth);
        });
    }


    static get observedAttributes() {
        return ["opened"];
    }

    get opened() {
        return this.getAttribute("opened");
    }
    set opened(value) {
        this.setAttribute("opened", value)
    }

    connectedCallback() {
        // update font-color
        this.updateCustomStrokeColor();
            // uncomment this part if element is not nested inside another element
                // const eventHandler = this.root.querySelector("div");
                // eventHandler.addEventListener("click", () => {
                //     this.toggleAttr("div", "opened");
                // })
    }
    toggleHostAttr(attr) {
        const currentValue = this.getAttribute(`${attr}`);
        const newValue = (currentValue === "true") ? "false" : "true";
        this.setAttribute(`${attr}`, newValue);
    }  
    updateCustomStrokeColor() {
        // get Computed Style of the Host element : 
        const hostStyle = getComputedStyle(this);
        const strokeClr = hostStyle.getPropertyValue("--_svg-stroke-clr");

        // Manipulate strokeClr
        const stroke2Clr = this.manipulateHSLA(strokeClr, 85, 50, 0.7);

        // Update the Value of --_svg-stroke-2-clr variable 
        this.style.setProperty("--_svg-stroke-2-clr", stroke2Clr);
        console.log
    }

    toggleAttr(el, attr) {
        const element = this.root.querySelector(`${el}`);
        const currentValue = element.getAttribute(`${attr}`);
        const newValue = (currentValue === "true") ? "false" : "true";
        element.setAttribute(`${attr}`, newValue);
      }
    toggleParentAttr(attr) {
        const parent = this.parentElement;
        const currentValue = parent.getAttribute(`${attr}`);
        const newValue = (currentValue === "true") ? "false" : "true";
        parent.setAttribute(`${attr}`, newValue);  
    }  

    manipulateHSLA(originalValue, newSaturation, newLightness, newAlpha) {
        let regex = /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/;
        let [, hue, saturation, lightness, alpha] = regex.exec(originalValue);
      
        let manipulatedValue = `hsla(${hue}, ${newSaturation}%, ${newLightness}%, ${newAlpha})`;
      
        return manipulatedValue;
      }
}



customElements.define("custom-close-svg" , CustomCloseSvg)