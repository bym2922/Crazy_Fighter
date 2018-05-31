/*
 继承实现
 */
var mainScreen = document.getElementById("mainScreen")

//让背景动起来
var jsBg1 = document.getElementById("bg1")
var jsBg2 = document.getElementById("bg2")

var timerBg = setInterval(function(){
	jsBg1.style.top = jsBg1.offsetTop + 3 +"px"
	jsBg2.style.top = jsBg2.offsetTop + 3 +"px"

	if (jsBg1.offsetTop >=768) {
		jsBg1.style.top = "-768px"
	}
	if (jsBg2.offsetTop >= 768) {
		jsBg2.style.top = "-768px"
	}
},10)

//飞机动起来
//拖拽效果
var airplane = document.getElementById("airplane")
//给飞机添加鼠标按下事件
airplane.onmousedown = function (e) {
    // pageX 鼠标点击位置距离浏览器可视区域的左边框的距离 （包括滚动条距离）
    // pageY 鼠标点击位置距离浏览器可视区域的上边框的距离 （包括滚动条距离）
    var ev = e || window.event
    basex = ev.pageX
	basey = ev.pageY
	movex = 0
	movey = 0

    //给主屏幕添加鼠标移动事件
    mainScreen.onmousemove = function(e){
        var en = e || window.event
		movex = en.pageX - basex
		basex = en.pageX
		movey = en.pageY - basey
		basey = en.pageY
        // console.log(en.pageX,en.pageY)
		airplane.style.left = airplane.offsetLeft + movex + "px"
		airplane.style.top = airplane.offsetTop + movey + "px"
    }
    // 去除鼠标按下移动事件
    mainScreen.onmouseup = function () {
        mainScreen.onmousemove = null;
    }
}

var airplane1 = document.getElementById("airplane1")
// console.log("+++++++++++++++++")
if(airplane1!=undefined) {
//给飞机添加鼠标按下事件
    document.onkeydown = function (event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 87) { // 按 w 要做的事情
            //  airplane1.style.top
            // console.log("______________上_____________")
            airplane1.style.top = airplane1.offsetTop - 50 + "px"
            if (airplane1.offsetTop <= -50) {
                // console.log("================")
                airplane1.style.top = 0 + "px"
            }
        }
        if (e && e.keyCode == 65) { // 按 a 要做的事情
            // console.log("______________左_____________")
            airplane1.style.left = airplane1.offsetLeft - 50 + "px"
            if (airplane1.offsetLeft <= -50) {
                airplane1.style.left = -50 + "px"
            }
        }
        if (e && e.keyCode == 83) { // s 键要做的事情
            // console.log("______________下______________")
            airplane1.style.top = airplane1.offsetTop + 50 + "px"
            if (airplane1.offsetTop >= 650) {
                airplane1.style.top = 650 + "px"
            }
        }
        if (e && e.keyCode == 68) { // d 键要做的事情
            // console.log("______________右______________")
            airplane1.style.left = airplane1.offsetLeft + 50 + "px"
            if (airplane1.offsetLeft >= 360) {
                airplane1.style.left = 360 + "px"
            }
        }
    }
    air_bull(airplane1,"bullent2")
}
air_bull(airplane,"bullent1")

//敌人下落
var timertank = setInterval(function(){
	tank()
},1000)


var timerenemy = setInterval(function(){
	enemy()
},6000)

//我机子弹与小坦克碰撞检测
var timerPZJCtank = setInterval(function(){
    PZJCtank("bullent1","grade1")
    PZJCtank("bullent2","grade2")
}, 30)

//我机子弹与小敌机碰撞检测
var count = 0
var timerPZJCenemy = setInterval(function() {
    PZJCenemy("bullent1","grade1")
    PZJCenemy("bullent2","grade2")
},30)

//死亡检测
var timerDie = setInterval(function(){
    check_die(airplane,"airplane1")
    check_die(airplane1,"airplane")
}, 30)

