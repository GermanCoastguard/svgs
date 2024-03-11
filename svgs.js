const svgs = [
    {
        name: "bar",
        template: `
                    <svg width="48px" height="16px">
        <rect x="0" y="0" width="100%" height="100%" />
        </svg>`,
    },
    {
        name: "circle",
        template: `
        `,
    },
    {
        name: "star",
        template: `
        
        <div class="item">
        <svg viewBox="0 0 12.5 12.5" >
            <polygon points="5,1 6.5,4 9.5,4 7,6 8,9 5,7.5 2,9 3,6 5,4 3.5,4" 
                    style="fill:yellow;stroke:orange;stroke-width:1" />
        </svg>
    </div>
    <div class="item"> 
                <svg width="32" height="32">
        <polygon points="16,0 19,10 32,12 25,18 28,32 16,26 4,32 7,18 0,12 13,10"
                 style="fill:yellow;stroke:black;stroke-width:0.5" />
      </svg>
    </div>
    <div class="item">
                 <svg width="32" height="32">
        <polygon points="16,0 19,10 32,6 25,18 32,32 16,24 0,32 7,18 0,8 13,10"
                 style="fill:yellow;stroke:black;stroke-width:0.5" />
      </svg>
    </div>
    <div class="item">
        <svg width="32" height="32">
        <polygon points="16,0 19,10 32,6 25,18 32,32 16,24 0,32 7,18 0,12 13,10"
                 style="fill:yellow;stroke:black;stroke-width:0.5" />
        </svg>
        </div>
    <div class="item">
        <svg width="32" height="32">
            <polygon points="16,0 19,10 32,12 25,18 32,32 16,24 0,32 7,18 0,12 13,10"
                     style="fill:yellow;stroke:black;stroke-width:0.5" />
          </svg>
        `,
    },

];

class SVG {
    constructor(name, path) {
        this.name = name;
        this.path = path;
    }



};

const style = `
:root {
    --_fill: #ffffff00;
    --_stroke: black;
}

svg {
    fill: var(--fill, var(--_fill));
    stroke: var(--stroke, var(--_stroke));
    width: 90%;
}

`;