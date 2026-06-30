/* World dimensions */
const WIDTH = 40;
const HEIGHT = 20;
/* Setup world */
const world = [];
/* Generate empty world */
for(let y=0; y<HEIGHT; y++){

    world[y] = [];

    for(let x=0; x<WIDTH; x++){

        world[y][x] = ".";

    }
}
/* This makes
..........
..........
..........
..........
Stored internally */
/* Render function */
const worldDiv = document.getElementById("world");

function render(){

    let output = "";

    for(let y=0; y<HEIGHT; y++){

        for(let x=0; x<WIDTH; x++){

            output += world[y][x];

        }

        output += "\n";
    }

    worldDiv.textContent = output;
}
/* Display the world */
render();
/* Place blocks */
let currentBlock = "#";
/* Mouse position */
worldDiv.addEventListener("click", (event)=>{

    const rect = worldDiv.getBoundingClientRect();

    const cellWidth = rect.width / WIDTH;
    const cellHeight = rect.height / HEIGHT;

    const x = Math.floor(
        (event.clientX - rect.left) / cellWidth
    );

    const y = Math.floor(
        (event.clientY - rect.top) / cellHeight
    );

    if(x >= 0 && x < WIDTH &&
       y >= 0 && y < HEIGHT){

        world[y][x] = currentBlock;

        render();
    }

});
/* ^ What this does:
Suppose you click:

..................
..................
.....X............
..................

The code calculates:

x = 5
y = 2

Then:

world[2][5] = "#";

Now the world becomes:

..................
..................
.....#............
..................

and render updates it. */

/* Tool switcher */
document
.querySelectorAll("#toolbar button")
.forEach(button=>{

    button.addEventListener("click", ()=>{

        currentBlock =
            button.dataset.char;

    });

});
/* Physics */
function update(){

    for(let y = HEIGHT - 2; y >= 0; y--){

        for(let x = 0; x < WIDTH; x++){

            if(world[y][x] === "S"){

                if(world[y + 1][x] === "."){

                    world[y + 1][x] = "S";
                    world[y][x] = ".";

                }

            }

        }

    }
    

}

setInterval(() => {
    update();
    render();
}, 100);

/* Sliding */
if(world[y + 1][x] === "."){

    world[y + 1][x] = "S";
    world[y][x] = ".";

}
else if(
    x > 0 &&
    world[y + 1][x - 1] === "."
){

    world[y + 1][x - 1] = "S";
    world[y][x] = ".";

}
else if(
    x < WIDTH - 1 &&
    world[y + 1][x + 1] === "."
){

    world[y + 1][x + 1] = "S";
    world[y][x] = ".";

}