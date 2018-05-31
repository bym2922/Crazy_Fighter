//随机数
function randomNum(min, max) {
	return parseInt(Math.random() * (max - min) + min);
}
//随机颜色
function randomColor() {
	var r = parseInt(Math.random() * 256);
	var g = parseInt(Math.random() * 256);
	var b = parseInt(Math.random() * 256);

	var colorString = "rgb(" + r + "," + g + "," + b + ")";
	return colorString;
}
//获取内部外部样式表中的样式属性的属性值
// obj--- 元素节点
// name----属性名
function getStyle(obj, name){
	if (obj.currentStyle) {
		return obj.currentStyle[name];
	}else{
		return window.getComputedStyle(obj,null)[name];
	}
}

//设置元素样式属性
//obj--元素节点
//name--样式属性名
//value--样式属性值
function setStyle(obj, name, value) {
	obj.style[name] = value;
}


//获取宽度
function $w() {
	return document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
}

//获取高度
function $h() {
	return document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;
}

//碰撞检测
function pzjcFunc(obj1, obj2){
			// offsetLeft 返回当前元素左上角相对于父节点（mainScreen）的左边界偏移的像素值
			// offsetTop 返回当前元素相对于其 父节点（mainScreen）元素的顶部的距离。
			// offsetWidth 返回一个元素的布局宽度
			// offsetHeight 返回该元素的像素高度，高度包含该元素的垂直内边距和边框，且是一个整数
			var obj1Left = obj1.offsetLeft;
			var obj1Width = obj1Left + obj1.offsetWidth;
			var obj1Top = obj1.offsetTop;
			var obj1Height = obj1Top + obj1.offsetHeight;

			var obj2Left = obj2.offsetLeft;
			var obj2Width = obj2Left + obj2.offsetWidth;
			var obj2Top = obj2.offsetTop;
			var obj2Height = obj2Top + obj2.offsetHeight;

			if ( !(obj1Left > obj2Width || obj1Width < obj2Left || obj1Top > obj2Height || obj1Height < obj2Top) ) {
				return true;
			} else {
				return false;
			}
		}

//我机发射子弹
function air_bull(a,bull) {
    var timerBullent = setInterval(function () {
        //创建子弹
        var bullent = document.createElement("div")
        mainScreen.appendChild(bullent)
        bullent.className = bull
        bullent.style.left = a.offsetLeft + 78 + "px"
        bullent.style.top = a.offsetTop - 10 + "px"

        //让子弹飞
        var timerBullentFly = setInterval(function () {
            bullent.style.top = bullent.offsetTop - 30 + "px"
            if (bullent.offsetTop <= 0) {
                clearInterval(timerBullentFly)
                mainScreen.removeChild(bullent)
            }
        }, 50)

        bullent.timer = timerBullentFly

    }, 100)
}
// 坦克模块
function tank() {
    //创建小坦克
	var tank = document.createElement("div")
	mainScreen.appendChild(tank)
	tank.className = "tank"
	tank.style.left = randomNum(0, 472) + "px"
	tank.style.top = "0px"

	//让子坦克飞
	var timerTankFly = setInterval(function(){
	    var grade = document.getElementById("grade1")
        var grades = parseInt(grade.textContent)
        var n = 20
        if(grades>7000){
	        n=30
        }
		tank.style.top = tank.offsetTop + n + "px"
		if (tank.offsetTop >= 768) {
			clearInterval(timerTankFly)
			mainScreen.removeChild(tank)
		}
	}, 50)
	tank.timer = timerTankFly
}
//敌机模块
function enemy() {
    var enemy = document.createElement("div")
	mainScreen.appendChild(enemy)
	enemy.className = "enemy"
	enemy.style.left = randomNum(30, 440) + "px"
	enemy.style.top = "-20px"

	//让敌机飞
	var timerEnemyFly = setInterval(function(){
	    var grade = document.getElementById("grade1")
        var grades = parseInt(grade.textContent)
	    var n = 4
        if(grades>12000){
	        n=8
        }else if(grades>20000){
	        n=15
        }
		enemy.style.top = enemy.offsetTop + n + "px"
		if (enemy.offsetTop >= 768) {
			clearInterval(timerEnemyFly)
			clearInterval(enemy.timer1)
			mainScreen.removeChild(enemy)
		}
	}, 150)
	enemy.timer= timerEnemyFly

	//敌机发射子弹
	var timerEnemyBullent = setInterval(function(){
			//创建子弹
		var enemybullent = document.createElement("div")
		mainScreen.appendChild(enemybullent)
		enemybullent.className = "enemybullent"
		enemybullent.style.left = enemy.offsetLeft + 35 + "px"
		enemybullent.style.top = enemy.offsetTop + 80 + "px"
		console.log(enemybullent)
		//让子弹飞
		var timerEnemyBullentFly = setInterval(function(){
		    var grade = document.getElementById("grade1")
            var grades = parseInt(grade.textContent)
            var n = 10
            if(grades>25000){
                n=15
            }
			enemybullent.style.top = enemybullent.offsetTop + n + "px"
			if (enemybullent.offsetTop >= 768) {
				clearInterval(timerEnemyBullentFly)
				mainScreen.removeChild(enemybullent)
			}
		}, 30)
		enemybullent.timer = timerEnemyBullentFly
	},3500)
	enemy.timer1= timerEnemyBullent
}

//我机子弹与小坦克碰撞检测
function PZJCtank(bullent,grad) {
    var allTanks = document.getElementsByClassName("tank")
	var allBullents = document.getElementsByClassName(bullent)
	for (var i = 0; i < allBullents.length; i++){
		for (var j = 0; j < allTanks.length; j++) {
			var b = allBullents[i]
			var t = allTanks[j]
			var grade = document.getElementById(grad)
			if (pzjcFunc(b, t)){
				var aud = document.createElement("audio")
				aud.src = '/src/music/enemy3_down.mp3'
				aud.autoplay="autoplay"
				mainScreen.appendChild(aud)
				var grades = parseInt(grade.textContent)+500
				grade.innerHTML = grades
				t.className="boom"
				function test(t){
					setTimeout(function(){
						clearInterval(t.timer)
						mainScreen.removeChild(t)
					}, 300)
				}
				function test1(t){
					setTimeout(function(){
						mainScreen.removeChild(aud)
					}, 1500)
				}
				test1(t)
				test(t)
				clearInterval(b.timer)
				mainScreen.removeChild(b)
				break
			}
		}
	}
}

//我机子弹与小敌机碰撞检测
function PZJCenemy(bullent,grad) {
	// var count = 0
    var allEnemys = document.getElementsByClassName("enemy")
    var allBullents = document.getElementsByClassName(bullent)
    for (var j = 0; j < allEnemys.length; j++) {
        for (var i = 0; i < allBullents.length; i++) {
            var b = allBullents[i]
            var e = allEnemys[j]
            var grade = document.getElementById(grad)
            if (pzjcFunc(b, e)){
                count = count +1
                if (count == 80){
                    count = 0
                    var aud = document.createElement("audio")
                    aud.src = '/src/music/enemy3_down.mp3'
                    aud.autoplay="autoplay"
                    mainScreen.appendChild(aud)
                    var grades = parseInt(grade.textContent)+1000
                    grade.innerHTML = grades
                    e.className="enemyboom"
                    clearInterval(e.timer1)
                    function test(e){
                        setTimeout(function(){
                            clearInterval(e.timer)
                            mainScreen.removeChild(e)
                        }, 300)
                    }
                    function test1(e){
                        setTimeout(function(){
                            mainScreen.removeChild(aud)
                        }, 1500)
                    }
                    test(e)
                    test1(e)
                    clearInterval(b.timer)
                    mainScreen.removeChild(b)
                    break
                }
            }
        }
    }
}


// 死亡检测
function check_die(air_1,air_2) {
	//小坦克碰撞我机
	var allTanks = document.getElementsByClassName("tank")
    var gameover = document.createElement("div")
	for (var i = 0; i < allTanks.length; i++){
		if (pzjcFunc(allTanks[i], air_1)) {
		    var tan = allTanks[i]
            var air2 = document.getElementById(air_2)
            if(air2== undefined) {
                for (var j = 0; j < 100; j++) {
                    clearInterval(j)
                }
                mainScreen.appendChild(gameover)
                gameover.className = 'gameover'
                break
            }
            else {
                var aud = document.createElement("audio")
				aud.src = '/src/music/enemy3_down.mp3'
				aud.autoplay="autoplay"
				mainScreen.appendChild(aud)
                air_1.id="airplaneboom"
                tan.className="boom"
				function test(t){
					setTimeout(function(){
						clearInterval(t.timer)
						mainScreen.removeChild(t)
					}, 300)
				}
				function test1(air_1){
					setTimeout(function(){
						mainScreen.removeChild(aud)
					}, 1500)
				}
				test1(air_1)
				test(air_1)
				clearInterval(tan.timer)
				mainScreen.removeChild(tan)
				break
            }
		}
	}

	//敌机碰撞我机
	var allEnemys = document.getElementsByClassName("enemy")
	for (var i = 0; i < allEnemys.length; i++){
		if (pzjcFunc(allEnemys[i], air_1)) {
		    var en = allEnemys[i]
            var air2 = document.getElementById(air_2)
            if(air2== undefined) {
                for (var j = 0; j < 100; j++) {
                    clearInterval(j)
                }
                mainScreen.appendChild(gameover)
                gameover.className = 'gameover'
                break
            }
            else {
                var aud = document.createElement("audio")
				aud.src = '/src/music/enemy3_down.mp3'
				aud.autoplay="autoplay"
				mainScreen.appendChild(aud)
                air_1.id="airplaneboom"
                en.className="enemyboom"
				function test(t){
					setTimeout(function(){
						clearInterval(t.timer)
						mainScreen.removeChild(t)
					}, 300)
				}
				function test1(air_1){
					setTimeout(function(){
						mainScreen.removeChild(aud)
					}, 1500)
				}
				test1(air_1)
				test(air_1)
				clearInterval(en.timer1)
				mainScreen.removeChild(en)
				break
            }
		}
	}
	//敌机子弹击中我机
	var allEnemyBullents = document.getElementsByClassName("enemybullent")
	for (var i = 0; i < allEnemyBullents.length; i++){
		var eb = allEnemyBullents[i]
		if (pzjcFunc(eb, air_1)) {
		    var air2 = document.getElementById(air_2)
            if(air2== undefined) {
                for (var j = 0; j < 100; j++) {
                    clearInterval(j)
                }
                mainScreen.appendChild(gameover)
                gameover.className = 'gameover'
                break
            }
            else {
                var aud = document.createElement("audio")
                aud.src = '/src/music/enemy3_down.mp3'
                aud.autoplay = "autoplay"
                mainScreen.appendChild(aud)
                air_1.id = "airplaneboom"
                function test(air_1) {
                    setTimeout(function () {
                        mainScreen.removeChild(air_1)
                    }, 300)
                }
                function test1(air_1){
					setTimeout(function(){
						mainScreen.removeChild(aud)
					}, 1500)
				}
				test1(air_1)
                test(air_1)
                break
            }
		}
	}
	if (gameover) {
        gameover.onclick = show
    }
}

function show(){
    var gameover = document.getElementsByClassName("gameover")[0]
    if (gameover) {
        mainScreen.removeChild(gameover)
    }
    var score = document.getElementById('score');
    score.style.marginLeft = '80px';
    score.style.marginTop = '200px';
    score.style.height = '250px';
    score.style.width = '360px';

    var grade1 = document.getElementById("grade1")
    var grade2 = document.getElementById("grade2")
    var final_score1 = document.getElementById('final_socre1');
    var final_score2 = document.getElementById('final_socre2');
    if(final_score2 != undefined){
        var i = 0;
        var j = 0;
        max1 = parseInt(grade1.textContent)
        max2 = parseInt(grade2.textContent)
        if(max1<max2) {
            var m;
            m = max1
            max1=max2
            max2=m
        }
        var timer1 = setInterval(function () {
            if (i == max1) {
                clearInterval(timer1);
            }
            final_score1.innerHTML = "第一名：" + i;
            i += 250;
        }, 50);
        var timer2 = setInterval(function () {
            if (j == max2) {
                clearInterval(timer2);
            }
            final_score2.innerHTML ="第二名："+ j;
            j += 250;
        }, 50);
    }else {
    	final_score1.id = "f1"
        var k = 0;
        max = parseInt(grade1.textContent)
        var timer = setInterval(function() {
            if(k == max) {
                clearInterval(timer)
            }
            final_score1.innerHTML = k;
            k+=250
        },50)
    }
}
function myClose(){
    var score = document.getElementById('score');
    score.style.height = '0%';
    // location = redirect(url(""))
    setTimeout(function(){
	    window.history.back(-1);
	    }, 800)

}