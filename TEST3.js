

const emptyref = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]];


function shallow_copy_2d(targetarr, inputarr){
    for (var i = 0; i < inputarr.length; i++)
        targetarr[i] = inputarr[i].slice();
}
class controlgrid{
    constructor(e){
        this.arrayS = e;
        this.rotation = 0;
    }
    rotateCW(){
        this.rotation--
        var tmp = [
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]];
        for (var y = 0; y < this.arrayS.length; y++) {
            for (var x = 0; x < this.arrayS[0].length; x++) {
                tmp[x][this.arrayS.length-y-1] = this.arrayS[y][x];
            }
        }
        this.arrayS = tmp;
    }
    rotateCCW(){
        this.rotation++;
        var tmp = [
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]];
        for (var y = 0; y < this.arrayS.length; y++) {
            for (var x = 0; x < this.arrayS[0].length; x++) {
                tmp[this.arrayS[0].length-x-1][y] = this.arrayS[y][x];
            }
        }
        this.arrayS = tmp;
    }
    rotatebylvl(absR){
        while(absR != this.rotation) { //pos = CCW, neg = CW
            if (absR > this.rotation) this.rotateCCW();
            else this.rotateCW();
        }
    }

    gravity(){ //basically sketchy insertion sort but we only swap zeros
        for (var y = 0; y < this.arrayS.length; y++) {
            for (var x = 0; x < this.arrayS[0].length; x++) {
                if (this.arrayS[y][x] != 0){
                    for (var z = x; z > 0; z--){
                        var SW = this.arrayS[y][z-1];
                        if (SW == 0){
                            this.arrayS[y][z-1] = this.arrayS[y][z];
                            this.arrayS[y][z] = SW;
                        } //could break but not sure which for loop it hits next
                    }
                }
            }
        }
    }

    append(){
        for (var y = 0; y < this.arrayS.length; y++) {
            for (var x = 0; x < this.arrayS[0].length-1; x++) {
                if (this.arrayS[y][x] == this.arrayS[y][x+1]){
                    this.arrayS[y][x]*=2;
                    this.arrayS[y][x+1] = 0;
                }
            }
        }
    }

    process_movDIR(dir){
        this.rotatebylvl(dir+1);
        this.gravity();
        this.append();
        this.gravity();
        this.rotatebylvl(0);
    }
}

GRIDV = new controlgrid([]);
shallow_copy_2d(GRIDV.arrayS,emptyref)

function draw(Sarr){
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var context = canvas.getContext('2d');
        context.font = "50px Arial";
        context.textAlign = "center";
        context.fillStyle = "black";
        context.fillRect(0,0,430,430);
        context.clearRect(10,10,410,410);
        //   while(true) {
            for (var y = 0; y < Sarr.length; y++) {
                for (var x = 0; x < Sarr [0].length; x++) {
                    if (Sarr[y][x] != 0) {
                        context.fillStyle = "black";
                        context.fillRect(100 * x + 20, 100 * y + 20, 90, 90);
                        context.fillStyle = "white";
                        context.fillText(String(Sarr[y][x]), 100 * x + 65, 100 * y + 80, 1000);
                    }
                }
            }
        }
 //   }
}
/*
    document.onkeydown = function(event) {
        switch (event.key) {
            case 37:
                GRIDV.process_movDIR(-1);  GRIDV.arrayS = Randomappend(GRIDV.arrayS); draw(GRIDV.arrayS);
                break;
            case 38:
                GRIDV.process_movDIR(0); GRIDV.arrayS = Randomappend(GRIDV.arrayS); draw(GRIDV.arrayS);
                break;
            case 39:
                GRIDV.process_movDIR(1);  GRIDV.arrayS = Randomappend(GRIDV.arrayS); draw(GRIDV.arrayS);
                break;
            case 40:
                GRIDV.process_movDIR(2);  GRIDV.arrayS = Randomappend(GRIDV.arrayS); draw(GRIDV.arrayS);
                break;
        }
    }*/

document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            GRIDV.process_movDIR(-1);  GRIDV.arrayS = Randomappend(GRIDV.arrayS); draw(GRIDV.arrayS);
            break;
        case 38:
            GRIDV.process_movDIR(0); GRIDV.arrayS = Randomappend(GRIDV.arrayS); draw(GRIDV.arrayS);
            break;
        case 39:
            GRIDV.process_movDIR(1);  GRIDV.arrayS = Randomappend(GRIDV.arrayS); draw(GRIDV.arrayS);
            break;
        case 40:
            GRIDV.process_movDIR(2);  GRIDV.arrayS = Randomappend(GRIDV.arrayS); draw(GRIDV.arrayS);
            break;
    }
};
class position{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

function IDEMPTY(Sarr){
    var Tarr = [];
    for (var y = 0; y < Sarr.length; y++) {
        for (var x = 0; x < Sarr [0].length; x++) {
            if (Sarr[y][x] == 0)  Tarr.push(new position(x,y))
        }
    }
    return Tarr;
}

function Randomappend(Sarr){
    var Tarr = IDEMPTY(Sarr);
    if (Tarr.length == 0) {
        alert("GG YOU LOSE");
    }
    var Cpt = Tarr[Math.round(Math.random()*Tarr.length)];
    Sarr[Cpt.y][Cpt.x] = 2;
    return Sarr
}