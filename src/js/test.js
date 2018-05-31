var mainScreen = document.getElementById("mainScreen")

var airplane1 = document.getElementById("airplane1")
mainScreen.removeChild(airplane1)

var score = document.getElementById("score")
var final_score2 = document.getElementById("final_socre2")
score.removeChild(final_score2)

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
        console.log(en.pageX,en.pageY)
		airplane.style.left = airplane.offsetLeft + movex + "px"
		airplane.style.top = airplane.offsetTop + movey + "px"
    }
    // 去除鼠标按下移动事件
    mainScreen.onmouseup = function () {
        mainScreen.onmousemove = null;
    }
}

//我机发射子弹
air_bull(airplane,"bullent1")

//敌人下落
var timertank = setInterval(function(){
    tank()
},700)

// 敌机模块
var timerenemy = setInterval(function(){
    enemy()
},5000)

//我机子弹与小坦克碰撞检测
var timerPZJCtank = setInterval(function(){
    PZJCtank("bullent1","grade1")
}, 30)

//我机子弹与小敌机碰撞检测
var count = 0
var timerPZJCenemy = setInterval(function() {
    PZJCenemy("bullent1","grade1")
},30)

//死亡检测
var timerDie = setInterval(function(){
    check_die(airplane,"airplane1")
}, 30)
