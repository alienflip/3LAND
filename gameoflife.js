///
// Rules
///
// 1) Any live cell with fewer than 2 neibours dies, as if by underpopulation
// 2) Any live cell with two or three live neighbours lives on to the next generation
// 3) Any live cell with more than three live neighbours dies, as if by overpopulation.
// 4) Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction
///

window.onload = init_game;

var canvas = document.getElementById('grid');

var graph = {
    context: undefined,
    size: {
        width: canvas.width,
        height: canvas.height
    },
    state_0 : [],
    state_1 : []
}

function init_game(){
    graph.context = grid.getContext('2d');
    document.addEventListener('keydown', (e) => {
        if(e.code === 'Backspace'){
            window.location.href = "index.html";
        }
        if(e.code === 'Tab'){
            window.location.href = "https://github.com/stackedflows/Home-Page/blob/main/game_of_life.js";
        }
    });

    // initalise array
    for(var i = 0; i < graph.size.width; i++){
        graph.state_0[i] = [];
        graph.state_1[i] = [];
    }    
    for(var x = 0; x < graph.size.width; x++){
        for(var y = 0; y < graph.size.height; y++){
            graph.state_0[x][y] = 0;
            graph.state_1[x][y] = 0;
        }
    }

    // some example patterns
    // small oscillator
    cells_0(40, 70);
    cells_0(40, 71);
    cells_0(40, 72);

    // big glider
    cells_0(130, 10);
    cells_0(130, 11);
    cells_0(130, 12);
    cells_0(131, 10);
    cells_0(131, 13);
    cells_0(132, 10);
    cells_0(133, 10);
    cells_0(134, 11);
    cells_0(134, 13);

    // small glider
    cells_0(90, 20);
    cells_0(90, 21);
    cells_0(90, 22);
    cells_0(89, 22);
    cells_0(88, 21);
    
    // big oscillator
    cells_0(110, 40);
    cells_0(110, 41);
    cells_0(110, 42);
    cells_0(110, 34);
    cells_0(110, 35);
    cells_0(110, 36);
    cells_0(112, 40);
    cells_0(112, 41);
    cells_0(112, 42);
    cells_0(112, 34);
    cells_0(112, 35);
    cells_0(112, 36);
    cells_0(113, 37);
    cells_0(114, 37);
    cells_0(115, 37);
    cells_0(107, 37);
    cells_0(108, 37);
    cells_0(109, 37);
    cells_0(113, 39);
    cells_0(114, 39);
    cells_0(115, 39);
    cells_0(107, 39);
    cells_0(108, 39);
    cells_0(109, 39);
    cells_0(105, 40);
    cells_0(105, 41);
    cells_0(105, 42);
    cells_0(105, 34);
    cells_0(105, 35);
    cells_0(105, 36);
    cells_0(117, 40);
    cells_0(117, 41);
    cells_0(117, 42);
    cells_0(117, 34);
    cells_0(117, 35);
    cells_0(117, 36);
    cells_0(115, 32);
    cells_0(114, 32);
    cells_0(113, 32);
    cells_0(115, 44);
    cells_0(114, 44);
    cells_0(113, 44);
    cells_0(109, 32);
    cells_0(108, 32);
    cells_0(107, 32);
    cells_0(109, 44);
    cells_0(108, 44);
    cells_0(107, 44);

    // small glider
    cells_0(20, 50);
    cells_0(20, 51);
    cells_0(20, 52);
    cells_0(19, 52);
    cells_0(18, 51);

    // glider gun
    cells_0(20, 30);
    cells_0(19, 30);
    cells_0(20, 31);
    cells_0(19, 31);
    cells_0(29, 30);
    cells_0(29, 31);
    cells_0(29, 32);
    cells_0(30, 29);
    cells_0(30, 33);
    cells_0(31, 28);
    cells_0(31, 34);
    cells_0(32, 28);
    cells_0(32, 34);
    cells_0(33, 31);
    cells_0(34, 29);
    cells_0(34, 33);
    cells_0(35, 30);
    cells_0(35, 31);
    cells_0(35, 32);
    cells_0(36, 31);
    cells_0(39, 30);
    cells_0(39, 29);
    cells_0(39, 28);
    cells_0(40, 30);
    cells_0(40, 29);
    cells_0(40, 28);
    cells_0(41, 27);
    cells_0(41, 31);
    cells_0(43, 27);
    cells_0(43, 26);
    cells_0(43, 31);
    cells_0(43, 32);
    cells_0(53, 29);
    cells_0(53, 28);
    cells_0(54, 29);
    cells_0(54, 28);

    // run program
    timer();
}

function init(){

    graph.context.clearRect(0, 0, graph.size.width, graph.size.height);
    pass();
}

function cells_0(x, y){
    graph.state_0[x][y] = 1;
    graph.context.fillRect(x * 2 + 0.5, y * 2 + 0.5, .9, .9);
}

// performs a single life propogation time-step
function pass(){
    for(var x = 0; x < graph.size.width; x++){
        for(var y = 0; y < graph.size.height; y++){
            var type_0 = new rule_choice(x, y, 0);
            if(type_0.rule === 1){
                graph.state_1[x][y] = 1;
            }
            if(type_0.rule === 0){
                graph.state_1[x][y] = 0;
            }
        }
    }
    for(var x = 0; x < graph.size.width; x++){
        for(var y = 0; y < graph.size.height; y++){
            var type_1 = new rule_choice(x, y, 1);
            if(type_1.rule === 1){
                graph.context.fillRect(x * 2 + 0.5, y * 2  + 0.5, 0.95, 0.95);
            }
            graph.state_0[x][y] = graph.state_1[x][y];
        }
    }
}

// 2 second time repeater
var timestep = 100;
function timer(){
    var step_interval = window.setInterval(()=>{
        init();
    },timestep);
}

// applies rules based on state_0 or state_1
class rule_choice{
    constructor(x, y, type){
        this.x = x;
        this.y = y;
        this.type = type;
    }
    get rule(){
        return this.calculate();
    }
    calculate(){
        var arr_type;

        if(this.type === 1){
            arr_type = graph.state_1;
        }
        else if(this.type === 0){
            arr_type = graph.state_0;
        }

        var _state_ = arr_type[this.x][this.y];
        var _n0 = 0, _n1 = 0, _n2 = 0, _n3 = 0, _n4 = 0, _n5 = 0, _n6 = 0, _n7 = 0;
    
        if(this.x > 0){
            _n0 = arr_type[this.x - 1][this.y];
        }
    
        if(this.x < graph.size.width - 1){
            _n1 = arr_type[this.x + 1][this.y];
        }
    
        if(this.y > 0){
            _n2 = arr_type[this.x][this.y - 1];
        }
    
        if(this.y < graph.size.height - 1){
            _n3 = arr_type[this.x][this.y + 1];
        }

        if(this.x > 0 && this.y > 0){
            _n4 = arr_type[this.x - 1][this.y - 1];
        }

        if(this.x < graph.size.width - 1 && this.y < graph.size.height - 1){
            _n5 = arr_type[this.x + 1][this.y + 1];
        }

        if(this.x > 0 && this.y < graph.size.height - 1){
            _n6 = arr_type[this.x - 1][this.y + 1];
        }

        if(this.x < graph.size.width - 1 && this.y > 0){
            _n7 = arr_type[this.x + 1][this.y - 1];
        }
    
        var _sum = _n0 + _n1 + _n2 + _n3 + _n4 + _n5 + _n6 + _n7;
    
        // current cell is dead
        if(!_state_){
            if(_sum === 3){
                // cell alive code
                return 1;
            }
            else{
                // error code
                return -1;
            }
        }

        else{
            if(_sum < 2){
                // cell dead code
                return 0;
            }
            else if(_sum === 2 || _sum === 3){
                return 1;
            }
            else if(_sum > 3){
                return 0;
            }
            else{
                return -1;
            }
        }
    }
}
