var container = document.getElementById('container');

const cursor = {
    x: 50,
    y: 50,
    xvel: 0,
    yvel: 0,
    e: document.getElementById('cursor')
}

container.requestPointerLock = container.requestPointerLock || container.mozRequestPointerLock;

document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;

container.onclick = function() {
    container.requestPointerLock();
};
document.addEventListener('pointerlockchange', lockChangeAlert, false);
document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

function lockChangeAlert() {
    if (document.pointerLockElement === container || document.mozPointerLockElement === container) {
        document.addEventListener("mousemove", updatePosition, false);
    } else {
        document.removeEventListener("mousemove", updatePosition, false);
    }
}

function updatePosition() {
    cursor.xvel += event.movementX / 5;
    cursor.yvel += event.movementY / 5;
}

function physics() {
    cursor.yvel += 0.1
    cursor.y += cursor.yvel;
    cursor.x += cursor.xvel;
    if (cursor.y > window.innerHeight - 21) {
        cursor.y = window.innerHeight - 21;
        cursor.yvel = 0;
    } else if (cursor.y < 0) {
        cursor.y = 0;
        cursor.yvel = 0;
    }
    if (cursor.x > window.innerWidth - 12) {
        cursor.x = window.innerWidth - 12;
        cursor.xvel = 0;
    } else if (cursor.x < 0) {
        cursor.x = 0;
        cursor.xvel = 0;
    }
    cursor.xvel /= 1.02;
    cursor.yvel /= 1.02;
    cursor.e.style.top = cursor.y + "px";
    cursor.e.style.left= cursor.x + "px";
    window.requestAnimationFrame(physics)
}
window.requestAnimationFrame(physics)