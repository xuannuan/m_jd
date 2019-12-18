window.onload=function(){
    choose();
    delect();
};
// 自定义全选，选中效果
var choose=function() {
    // var boxs=document.getElementsByClassName('checkbox')
    var boxs = document.querySelectorAll('.checkbox');
    // console.log(boxs);NodeList(7) 
    var sumElem = boxs[boxs.length - 1];
    var count = 0;


    // 监听变化
    for (var i = 0; i < boxs.length-1; i++) {//在这里不点击全选元素，因为会矛盾

        // 计算没改变前的选中个数
        if (boxs[i].hasAttribute('checked')) {
            count++;
        }
        console.log('没改变前的选中个数'+count);

        // 单个的选中效果,且计算变化中的选中个数
        boxs[i].addEventListener('click', function () {
            var hasAttrbute = this.getAttribute('checked');
            if (hasAttrbute !== null) {
                this.removeAttribute('checked');
                count--;
            } else {
                this.setAttribute("checked", ' ');
                count++;
            }
            // 以上点击获取count
            console.log(count);

            // 下面判断是否对全选按钮进行全选，这一段只能放在事件函数里面，因为需要变化的count值
            if (count < boxs.length - 1) {
                sumElem.removeAttribute('checked');
            } else {
                sumElem.setAttribute('checked', '');
            }
        });
    }


    // 血的教训：
    // console.log('不在事件里面不能获取变化得值，但是，不同事件函数里面的可以传递'+count);
// count=100;设置在外面没有用


    // 单独操作全选元素，下面判断根据全选按钮进行单选
    sumElem.addEventListener('click', function () {
        // console.log('可以获取到上面一个点击事件的count'+count);

        if (this.hasAttribute('checked')) {
            this.removeAttribute('checked');
            count=0;        //当取消全选按钮时，则count=0
            console.log('清空'+count);//可以传递到上面的单选点击事件中
            // 取消所有的单选
            for (var j = 0; j < boxs.length; j++) {
                boxs[j].removeAttribute("checked");
            }

        } else {
            this.setAttribute('checked', '');
            count=6;
            console.log('满额'+count);
            for (var j = 0; j < boxs.length; j++) {
                boxs[j].setAttribute("checked", '');
            }
        }
    });
};


// 删除按钮
var delect=function(){
    //获取弹出框和背景框
    var bBox=document.querySelector('.bg_box');
    var sBox=bBox.children[0];
    //获取按钮
    var cancel=bBox.children[1];
    var sure=sBox.children[2];

    // 获取垃圾桶的盒子
    var del=document.querySelectorAll(".delete");

    // 获取要删除的元素
    var goodsCon=document.querySelectorAll(".goods_con");

    for(var i=0;i<del.length;i++) {
        del[i].index=i;
        del[i].addEventListener('click', function () {
            var delTop=this.children[0];//获取垃圾盖元素
            //过渡效果
            delTop.style.transition='all 0.5s ease-in';
            delTop.style.webkitTransition='all 0.5s ease-in';
            // 动画
            delTop.style.transform = 'translateX(5px) rotate(30deg)';
            delTop.style.webkitTransform = 'translateX(5px) rotate(30deg)';

            bBox.style.display = "block";
            var that=this;
            sure.addEventListener('click', function (e) {
                e.preventDefault();
                var delTop=that.children[0];//获取垃圾盖元素
                delTop.style.transition='all 0.5s ease-in';
                delTop.style.webkitTransition='all 0.5s ease-in';
                delTop.style.transform = 'translateX(0px) rotate(0deg)';
                delTop.style.webkitTransform = 'translateX(0px) rotate(0deg)';
                bBox.style.display = "none";
                console.log(that.index);
                console.log(goodsCon[that.index]);
                goodsCon[that.index].parentNode.removeChild(goodsCon[that.index]);
            });
        });
    }


};
