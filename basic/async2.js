function aFunc() {
    setTimeout(function () {
        console.log('a');
        bFunc();
    },1700)
}

function bFunc() {
    setTimeout(function () {
        console.log('b');
        cFunc();
    },1000)
}

function cFunc() {
    setTimeout(function () {
        console.log('c');
    },500)
}

aFunc();

