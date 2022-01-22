var car1 = {
	name : "sonata",
	ph : "500ph",
	start : function () {
		console.log("engine is starting");
	},
	stop : function () {
		console.log("engine is stoped");
	}
}

var car2 = {
	name : "BMW",
	ph : "500ph",
	start : function () {
		console.log("engine is starting");
	},
	stop : function () {
		console.log("engine is stoped");
	}
}

var car3 = {
	name : "Fiat",
	ph : "200ph",
	start : function () {
		console.log("engine is starting");
	},
	stop : function () {
		console.log("engine is stoped");
	}
}

//            0     1
var cars = [car1, car2, car3];

//#work1 자동차 배열안에 BMW 라는 이름의 차가 있다면 'find !' 라는 문자열 출력
//for, if 사용
for(var i = 0; i < cars.length; i ++){
    if(cars[i].name == "BMW"){
        console.log('FIND!');
    }
}