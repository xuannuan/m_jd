window.onload=function () {
    header();
    secondkill();
    wrap();
}

// 搜索栏的背景颜色透明度渐变
var header=function(){
    // 获取目标元素和渐变分水岭的容器元素
    // 判断滚动高度是否超过容器高度，超过就设置原先透明度(要加滚动监听事件)
    // 否则根据滚动在盒子的比例设置渐变透明
    var header_box=document.querySelector(".jd-header");
    var banner=document.querySelector(".banner");
    var height=banner.offsetHeight;
// 由于不是怪异模式，所以document.body.scrollTop不能兼容
    window.onscroll=function(){
        var top=document.documentElement.scrollTop;
        if(top>height){
            header_box.style.background='rgba(201,21,35,0.85)';

        }else{
            op=top/ height * 0.85;
            header_box.style.background='rgba(201,21,35,'+op+')';
        }
    }
}

// 秒杀时间
var secondkill=function(){
    // 获取6个span盒子
    // 获取当前时分秒，进行定时器，且判断是否为两位数
    // 获取的时间进行拼接成字符串，写入盒子中
    var spans=document.getElementsByClassName("num");

    // var spans=document.querySelector('div>.num');
    console.log(spans.length);

    setInterval(function(){
        var date=new Date();

        var  hour = date.getHours()<10? ''+0+date.getHours():date.getHours();
       var  min = date.getMinutes()<10? ''+0+date.getMinutes():date.getMinutes();
        var  sec = date.getSeconds()<10? ''+0+date.getSeconds():date.getSeconds();

        var sumStr=''+hour+min+sec;
        // console.log(sumStr);//193256
        for(var i=0;i<spans.length;i++){
            spans[i].innerText=sumStr[i];
        }
    },1000);
}

// 移动端的轮播图
var wrap=function(){
    // 获取元素，以及图片的宽度
    // 目标一：定时器自动轮播，给轮播图片的盒子加上动画、过渡效果
    // 目标二：当轮播玩图片，就会回到第一张继续轮播，在过渡完成后进行判断是第几张图片在轮播
    //且获取点点的元素，进行自动跳转相应的点点（加过渡结束事件）
    // 目标三：当手指在屏幕上滑动进行下一张上一张（touch事件）
    var banner=document.querySelector('.banner');
    var width=banner.offsetWidth;
    var uls=document.querySelectorAll('.banner ul');
    var picul=uls[0];
    var pointul=uls[1];
    var pointlis=pointul.children;

    // 设置滚动距离动画
    function setTransform(t){
        picul.style.transform='translateX('+t+'px)';
        picul.style.webkitTransform='translateX('+t+'px)';
    }

    // 设置过渡
    var setTransition=function(){
        picul.style.transition="all .3s ease 0s";
        picul.style.webkitTransition="all .3s ease 0s";
    }
// 清除过渡
    var  removeTransition=function(){
        picul.style.transition='none';
        picul.style.webkitTransition='none';
    }

    // 自动轮播
   var  index=1;//初始化图片序号
    var timer=null;
    timer=setInterval(setTime,3000);
        function setTime(){
        index++;
        setTransform(-index*width);
        setTransition();
    }

    // 为什么一开始放在定时器外面不行
    // 设置轮播循环条件()
    // 要是工作，请记得再加一个webkitTransition事件兼容
    picul.addEventListener("transitionend",function(){
        console.log("过渡完");
        if(index>=9){
            index=1;
        }else if(index<=0){
            index=8;
        }
        removeTransition();
        setTransform(-index*width);
        for(var i=0;i<pointlis.length;i++) {
            pointlis[i].className = '';
        }
        // 因为index[1~8],但li的下标是【0-7】
        pointlis[index-1].classList.add('current');

    });


    // touch事件，判断左右滑向，在定时器外面
    var startX=0;
    var endX=0;
    var moveX=0;
    var curX=0;

    picul.addEventListener('touchstart',function(e){
        clearInterval(timer);//清除定时器

        startX=e.touches[0].clientX;
    });
    picul.addEventListener('touchmove',function(e){
        console.log('moveX');

        e.preventDefault();
        endX=e.touches[0].clientX;
        moveX=startX-endX;
        removeTransition();
        setTransform(-index*width-moveX);
        // 给他加一个效果，跟着滑动到滑动的距离

    });

    picul.addEventListener('touchend',function(e){
        console.log('end');

        // 因为moveX不是一整图片的宽，所以要判断设置
        if(Math.abs(moveX)>(1/3*width)&& endX!=0){
            // 向左滑，moveX是正数，但-index*width-moveX是负数，所以图片向左滑,反之
            // 向左
            if(moveX>0){
                index++;
            }
            //向右
            else{
                index--;
            }
            // 改变位置，滑动到下一张
            console.log('改变位置，滑动到下一张'+index);
            setTransition();//这样才能调用到transtionend事件
            setTransform(-index*width);
        }

        // 初始化，重新加定时器循环播放
        startX=0;
        endX=0;
        timer=setInterval(setTime,3000);
        // console.log('timer'+timer);
        // timer=setInterval(function(){
        //     index++;
        //     setTransition();
        //     setTransform(-index*width);
        // },3000);
    });

    picul.addEventListener('click',function(){
        console.log('click');
    });
}
