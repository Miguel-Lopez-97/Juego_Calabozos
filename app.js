let canvas;
let ctx;

//FPS
const FPS = 60;

//Size of F
let widthF = 50;
let heightF = 50;

//Kind of F
let grass   =   "green";
let water   =   "blue";
let ground  =   "brown";
let problem =   "red";
let key     =   "white";

//Scenary Array
let scenary    =   [
            [1,4,2,1,0,2,1,0,0,1,2,0,2,0,1],
            [1,0,2,0,0,2,0,0,2,2,2,3,2,0,1],
            [1,0,2,2,2,2,2,2,2,0,2,0,2,0,1],
            [1,2,2,0,0,0,2,0,0,0,0,0,2,0,1],
            [0,2,0,2,0,1,1,0,2,2,2,2,2,0,0],
            [1,2,0,2,0,1,2,2,2,0,0,0,0,0,1],
            [0,2,2,2,2,0,2,0,0,4,2,2,2,0,1],
            [1,2,0,2,0,0,2,0,0,0,2,0,2,2,1],
            [1,2,0,0,0,0,2,2,2,2,2,0,0,2,0],
            [0,2,2,2,2,0,0,0,0,0,0,2,0,2,1],
            [1,0,2,0,2,0,0,2,2,2,2,2,3,2,1],
            [1,0,0,0,2,0,0,0,0,0,2,0,0,0,1]
               ]

//Build Scenary
function drawScenary(){
    let color;

    for(    y=0;    y<scenary.length;   y++){
        for(    x=0;    x<scenary[y].length;    x++){
                if( scenary[y][x] ==    0){color    =   grass}
                if( scenary[y][x] ==    1){color    =   water}
                if( scenary[y][x] ==    2){color    =   ground}
                if( scenary[y][x] ==    3){color    =   problem}
                if( scenary[y][x] ==    4){color    =   key}
                ctx.fillStyle   =   color
                ctx.fillRect(   x*widthF,  y*heightF,  widthF, heightF)
        }
    }
}

let jugador = function(){
    
    this.x = 4;
    this.y = 11;
    this.color = "orange"

    this.draw = function(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x*widthF, this.y*heightF, widthF, heightF)
    }

    this.margins = function(y,x){
        let colision = true
        if (scenary[y][x] == 2 ||   scenary[y][x] == 4)
            {colision   = false}
        return colision
        }

    this.up = function(){       
        if(this.y-1>=0 && this.margins(this.y-1,this.x) == false){this.y--}
        else{this.y}}
        
    this.down = function(){     
        if(this.y+1<scenary.length && this.margins(this.y+1,this.x) == false){this.y++}
        else{this.y}}

    this.left = function(){     
        if(this.x-1>=0 && this.margins(this.y,this.x-1) == false){this.x--}
        else{this.x}}

    this.right = function(){     
        if(this.x+1<scenary[this.y].length && this.margins(this.y,this.x+1) == false){this.x++}
        else{this.x}}
}

let player;

//player

function init(){
    canvas=document.getElementById("canva")
    ctx=canvas.getContext("2d")

    player = new jugador()

    document.addEventListener("keydown", function(key){
        if(key.key  ==  "ArrowUp"   || key.key  ==  "w"){player.up()}
        if(key.key  ==  "ArrowDown" || key.key  ==  "s"){player.down()}
        if(key.key  ==  "ArrowLeft" || key.key  ==  "a"){player.left()}
        if(key.key  ==  "ArrowRight"|| key.key  ==  "d"){player.right()}
    })
    
    setInterval(
        function(){principal()},
        1000/FPS) 
}

function principal(){
    drawScenary()
    player.draw()
}