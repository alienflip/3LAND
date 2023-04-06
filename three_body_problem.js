window.onload = reset;
var width = window.innerWidth / 13;
var height = window.innerHeight / 13;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry_torus = new THREE.TorusKnotGeometry( 1, .2, 100, 13, 4, 6 );
const material_torus = new THREE.MeshBasicMaterial( { color: 0x0827F5} );
const torusKnot = new THREE.Mesh( geometry_torus, material_torus );

const geometry_ico = new THREE.IcosahedronGeometry();
const material_ico = new THREE.MeshBasicMaterial( {color: 0xff0000} );
const ico = new THREE.Mesh( geometry_ico, material_ico );

const geometry_tet = new THREE.TetrahedronGeometry();
const material_tet= new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const tet = new THREE.Mesh( geometry_tet, material_tet );

scene.add( torusKnot );
scene.add( ico );
scene.add( tet );
camera.position.z = 60;
renderer.render( scene, camera );

const torus_mass = 0.13;
const ico_mass = 0.15;
const tet_mass = 0.17;

var elements = {
    torus:[],
    ico:[],
    tet:[],
    vel_tor:[],
    vel_ico:[],
    vel_tet:[]
}
elements.torus.z = torus_mass;
elements.ico.z = ico_mass;
elements.tet.z = tet_mass;

const G = -1;

var t = 0;
var step = 0;

class universe_geometry{
    constructor(){}
    
    squared(x){
        return x * x;
    }
    
    cubed(x){
        return x * x * x;
    }
    
    distance(x_1, x_2, y_1, y_2){
        var x = this.squared(x_1 - x_2);
        var y = this.squared(y_1 - y_2);
        return Math.sqrt(x + y);
    }
    
    boundary_conditions(object, element){
        if(element.x < -width){
            object.position.x = width;
            element.x = width;
        }
        if(element.x > width){
            object.position.x = 0;
            element.x = 0;
        }
        if(element.y < -height){
            object.position.x = height;
            element.y = height;
        }
        if(element.y > height){
            object.position.x = 0;
            element.y = 0;
        }
    }
}

class equations_of_motion{
    constructor (type, x_a, x_b, x_c, y_a, y_b, y_c, m_a, m_b, dist_a, dist_b, ug){
        this.type = type;
        this.ug = ug
    }

    get _motion_x(){
        this.check();
        return this.motion_x();
    }

    get _motion_y(){
        this.check();
        return this.motion_y();
    }

    check(){
        if(this.type === "torus"){
            this.x_a = elements.torus.x;
            this.x_b = elements.ico.x;
            this.x_c = elements.tet.x;
            this.y_a = elements.torus.y;
            this.y_b = elements.ico.y;
            this.y_c = elements.tet.y;

            this.m_a = elements.ico.z;
            this.m_b = elements.tet.z;
        }
        else if(this.type === "ico"){
            this.x_a = elements.ico.x;
            this.x_b = elements.tet.x;
            this.x_c = elements.torus.x;
            this.y_a = elements.ico.y;
            this.y_b = elements.tet.y;
            this.y_c = elements.torus.y;

            this.m_a = elements.tet.z;
            this.m_b = elements.torus.z;
        }
        else if(this.type === "tet"){
            this.x_a = elements.tet.x;
            this.x_b = elements.torus.x;
            this.x_c = elements.ico.x;
            this.y_a = elements.tet.y;
            this.y_b = elements.torus.y;
            this.y_c = elements.ico.y;

            this.m_a = elements.torus.z;
            this.m_b = elements.ico.z;
        }
        else{
            return null;
        }
        this.dist_a = ug.cubed(ug.distance(this.x_a, this.x_b, this.y_a, this.y_b));
        this.dist_b = ug.cubed(ug.distance(this.x_a, this.x_c, this.y_a, this.y_c));
        
        if(this.dist_a < 0.5){
            this.dist_a += 0.1;
        }
        if(this.dist_b < 0.5){
            this.dist_b += 0.1;
        }
    }

    motion_x(){
        var num_a = this.x_a - this.x_b;
        var num_b = this.x_a - this.x_c;
        var accel_x = (G * this.m_a * (num_a)/(this.dist_a)) + (G * this.m_b * (num_b)/(this.dist_b));
        return accel_x;
    }
    
    motion_y(){
        var num_a = this.y_a - this.y_b;
        var num_b = this.y_a - this.y_c;
        var accel_y = (G * this.m_a * (num_a)/(this.dist_a)) + (G * this.m_b * (num_b)/(this.dist_b));
        return accel_y;
    }
}

function reset(p, q, r, a, b, c){

    cancelAnimationFrame( animate );

    if(t === 0){
        torusKnot.position.x = 11;
        torusKnot.position.y = 2;
        ico.position.x = -14;
        ico.position.y = 12;
        tet.position.x = 12;
        tet.position.y = -3;
    }else{
        torusKnot.position.x = 11 + p;
        torusKnot.position.y = 2 + a;
        ico.position.x = -14 + q;
        ico.position.y = 12 + b;
        tet.position.x = 12 + c;
        tet.position.y = -3 + r;
    }

    elements.torus.x = torusKnot.position.x;
    elements.torus.y = torusKnot.position.y;
    elements.ico.x = ico.position.x;
    elements.ico.y = ico.position.y;
    elements.tet.x = tet.position.x;
    elements.tet.y = tet.position.y;
    elements.vel_tor.x = 0;
    elements.vel_tor.y = 0;
    elements.vel_ico.x = 0;
    elements.vel_ico.y = 0;
    elements.vel_tet.x = 0;
    elements.vel_tet.y = 0;

    step = 0;
    t = 0;
    animate();
}

const universe = new universe_geometry();
var equations_ico = new equations_of_motion(type = "ico", ug = universe);
var equations_torus = new equations_of_motion(type = "torus", ug = universe);
var equations_tet = new equations_of_motion(type = "tet", ug = universe);

var animate = function () {
    requestAnimationFrame( animate );

    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.01;
    ico.rotation.x += 0.01;
    ico.rotation.y += 0.01;
    tet.rotation.x += 0.01;
    tet.rotation.y += 0.01;

    var dx_t = elements.vel_tor.x * step + 0.5 * equations_torus._motion_x * universe.squared(step);
    var dy_t = elements.vel_tor.y * step + 0.5 * equations_torus._motion_y * universe.squared(step);
    torusKnot.position.x = elements.torus.x + dx_t;
    torusKnot.position.y = elements.torus.y + dy_t;
    elements.torus.x = torusKnot.position.x;
    elements.torus.y = torusKnot.position.y;
    universe.boundary_conditions(torusKnot, elements.torus);
    elements.vel_tor.x = elements.vel_tor.x + equations_torus._motion_x * step;
    elements.vel_tor.y = elements.vel_tor.y + equations_torus._motion_y * step;

    var dx_i = elements.vel_ico.x * step + 0.5 * equations_ico._motion_x * universe.squared(step);
    var dy_i = elements.vel_ico.y * step + 0.5 * equations_ico._motion_y * universe.squared(step);
    ico.position.x = elements.ico.x + dx_i;
    ico.position.y = elements.ico.y + dy_i;
    elements.ico.x = ico.position.x;
    elements.ico.y = ico.position.y;
    universe.boundary_conditions(ico, elements.ico);
    elements.vel_ico.x = elements.vel_ico.x + equations_ico._motion_x * step;
    elements.vel_ico.y = elements.vel_ico.y + equations_ico._motion_y * step;

    var dx_te = elements.vel_tet.x * step + 0.5 * equations_tet._motion_x * universe.squared(step);
    var dy_te = elements.vel_tet.y * step + 0.5 * equations_torus._motion_y * universe.squared(step);
    tet.position.x = elements.tet.x + dx_te;
    tet.position.y = elements.tet.y + dy_te;
    elements.tet.x = tet.position.x;
    elements.tet.y = tet.position.y;
    universe.boundary_conditions(tet, elements.tet);
    elements.vel_tet.x = elements.vel_tet.x + equations_tet._motion_x * step;
    elements.vel_tet.y = elements.vel_tet.y + equations_tet._motion_y * step;

    step += 0.0001;

    renderer.render( scene, camera );
};