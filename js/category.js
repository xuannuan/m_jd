window.onload=function(){
    swip();
}
// 给左边的菜单栏加上触摸进行滚动
//加上限制条件，如果超过顶部和尾部150px,就不能再往下（在触摸移动事件）
// 对多下拉的空白弹回原点，吸附作用（在触摸结束事件里面）
// 点击效果（有个时间的控制）
var swip=function(){
    var header=document.querySelector(".header");
    var headerH=header.offsetHeight;//头拦高度

    var category_box=document.querySelector('.category');
    var cateH=category_box.offsetHeight;//整个分类盒子高度即满屏高度


    var left=category_box.children[0];
    var right=category_box.children[1];
    var leftChild=left.children[0];//div
    var lis=leftChild.children[0].children;

    var childH=leftChild.offsetHeight;//左边菜单盒子高度(比全屏还要多)
    var parentH=cateH-headerH;//满屏-头栏高度
    // console.log(cateH);823
    // console.log(parentH); 778
    // console.log(childH);1200
    // console.log(childH-parentH);
    var startY=0;
    var endY=0;
    var moveY=0;
    var currY=0;
    // 初始化时间
var time=0,startTime=0,endTime=0;


    // 晃动的范围
    var upDownY=150;

    var addTransition=function(){
        left.style.transition="all .3s ease-in 0s";
        left.style.webkitTransition="all .3s ease-in 0s";
    }
    var removeTransition=function(){
        left.style.transition="none";
        left.style.webkitTransition="none";
    }
    var setTransform=function(t){
        left.style.transform='translateY('+t+'px)';
        left.style.webkitTransform='translateY('+t+'px)';

    }

    left.addEventListener('touchstart',function(e){
        console.time('tap');//开始点击时间
        startTime=new Date().getTime();//获取毫秒数

        startY=e.touches[0].clientY;
    },false);//false是冒泡，true是捕获

    left.addEventListener('touchmove',function(e){
        e.preventDefault();//组织页面滚动
        endY= e.touches[0].clientY;
        moveY=startY-endY;

        if((currY-moveY<upDownY)&&(currY-moveY)>-(childH-parentH)-upDownY){
            removeTransition();
            setTransform(currY-moveY);
        }

    },false);


    left.addEventListener('touchend',function(e){
        console.timeEnd('tap');
        endTime=new Date().getTime();//获取毫秒数
        console.log(endTime-startTime);

        // 进行吸附作用（处理好临界值）
        if((currY-moveY)>=0){
            addTransition();
            setTransform(0);
            currY=0;
        }else if((currY-moveY)<=-(childH-parentH)){
            addTransition();
            setTransform(-(childH-parentH));
            currY=-(childH-parentH);
        }else{
            currY=currY-moveY;//正常情况下
        }

        // 执行时间<150ms,视为tap事件.没有移动的时候，即点击
        if(endTime-startTime<150 && moveY==0){
            // 给当前的li加类
            for(var i=0;i<lis.length;i++){
                lis[i].className=" ";
                lis[i].index=i;
            }
            var li=e.target.parentNode;
            //console.log(li);//<li class="now"><a href="javascript:;">图书</a></li>
            li.classList.add('now');

            // 移动的距离
            // console.log(li.index);//就是第几个index
            // console.log(li.offsetHeight);50
            var translateY=li.index*li.offsetHeight;

            // 在满屏幕当前可见的底部li为分水岭，
            // 当在满屏幕下面没有显示的li，不需要上滑到屏幕顶部。否则要不断上滑到顶部
            if(translateY<childH-parentH){
                addTransition();
                setTransform(-translateY);
                currY=-translateY;
                // console.log(currY);
            }
            // 下面的li不做滑动，否则会滑出去
            else{
                addTransition();
                setTransform(-(childH-parentH));
                currY=-(childH-parentH);
                // console.log(currY);
            }
        }

    },false);
};
