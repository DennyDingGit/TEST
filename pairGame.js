var buttonW = 180;
var buttonH = 50;

var parking = [];     //答案的停車區，前一半是左邊，後一半是右邊
var arrayAns = [];    //作案用的卡片
var arrayAnstext = [];    //作案用的卡片上的文字

var scope = 0;

function animation(scene,item,x,y){
    // 创建 Tween 动画对象
    scene.tweens.add({
        targets: item, // 动画对象
        x: x, // 目标 x 坐标
        y: y, // 目标 y 坐标
        // scaleX: 0.3, // 目标 x 缩放
        // scaleY: 0.5, // 目标 y 缩放
        duration: 500, // 动画持续时间（毫秒）
        ease: 'Linear', // 缓动函数（可选）
        repeat: null, // 重复次数（可选）
        yoyo: null, // 往返动画（可选）
    });
}



class ansButton{
    //建構器
    constructor(scene, x, y, butKey, text) {
        this.scene = scene; //：設定場景，之後能夠輸入場景，使角色套入該場景
        this.buttonStartX = 0;
        this.buttonStartY = 0;
        this.pointerOffsetX = 0;
        this.pointerOffsetY = 0;
        this.btOn = false;

        this.bt = scene.add.image(0, 0, butKey);
        
        this.bt.displayWidth = buttonW;
        this.bt.displayHeight = buttonH;
        // 创建一个新的Phaser容器
        var container = scene.add.container(x + buttonW / 2, y + buttonH/2);
        // 创建一个形状对象
        var shape = scene.add.rectangle(0, 0, buttonW, buttonH, 0xffff00,0.1);
        // 将形状添加到容器中
        container.add(shape);
        // 设置容器的大小
        container.setSize(buttonW, buttonH);
        // container.setOrigin(0);
        // 使容器可交互
        container.setInteractive();
        container.add(this.bt);
        // this.container1.add(this.shape); // 將形狀物件添加到容器內
        this.text = scene.add.text(-(buttonW/3), -10, text, { fontFamily: 'Arial', fontSize: '24px', fill: '#f303030' });
        // this.text.setOrigin(0);
        container.add(this.text);
        // 设置按钮为可交互
        container.setInteractive();

        arrayAns.push(container);
        //按下
        container.on('pointerdown', pointer => {
            // 记录按下时的按钮位置
            this.btOn = true;
            this.buttonStartX = container.x ;
            this.buttonStartY = container.y ;
            this.pointerOffsetX = pointer.x - container.x;// - buttonW / 2;
            this.pointerOffsetY = pointer.y - container.y;// - buttonH / 2;
            console.log('按下了(x=' + container.x + ' y=' + container.y + ')');
            // console.log('pointer x=' + pointer.x + ' y=' + pointer.y);
            scene.children.bringToTop(container);
            // for(var k=0;k<container.length;k++){
            //     console.log('container['+k+']=' + container.list[k]);
            // }
            // utterance.text = '';
            // window.speechSynthesis.speak(utterance);
            utterance.text = container.list[2].text;
            window.speechSynthesis.speak(utterance);
        });

        //移動
        container.on('pointermove', pointer => {
            // 记录按下时的按钮位置
            // 计算按钮的新位置
            if (this.btOn == true) {
                const newX = pointer.x - this.pointerOffsetX;
                const newY = pointer.y - this.pointerOffsetY;
                // 更新按钮位置

                container.setPosition(newX, newY);
                // this.children.bringToTop(this.text2);
                // this.text2.setPosition(newTextX, newTextY);
                // this.text2.setDepth(0);
            }
        });

        //放開
        container.on('pointerup', pointer => {
            this.btOn = false;
            this.foundParking = false;
            //先看看放開的地方是不是停車區
            for (var i = 0; i < parking.length; i++) {
                // console.log('[' + i + ']=(' + parking[i][0] + ',' + parking[i][1] + ')');
                //找出放開時的parking 位置
                if (
                    (parking[i][0] <= pointer.x) &
                    (parking[i][1] <= pointer.y) &
                    (parking[i][0] + buttonW >= pointer.x) &
                    (parking[i][1] + buttonH >= pointer.y)
                ) {
                    // console.log('在停車區！！');
                    const newX = parking[i][0];
                    const newY = parking[i][1];

                    //是停車區
                    this.foundParking = true;
                    // console.log('arrayAns.length=' + arrayAns.length);
                    //查查看這個停車區有沒有其他的答案
                    for (var j = 0; j < arrayAns.length; j++) {
                        // console.log('(x=' + arrayAns[j].x + 'y=' + arrayAns[j].y+')');

                        if ((parking[i][0] == (arrayAns[j].x - buttonW / 2)) & (parking[i][1] == (arrayAns[j].y - buttonH/2))) {
                            //這個停車區有其他答案了
                            console.log('這個停車區有其他答案了');
                            // 更新按钮位置
                            animation(scene, arrayAns[j], this.buttonStartX , this.buttonStartY );
                            // animation(scene, arrayAnstext[j], newTextX, newTextY);
                        }
                    }
                    // 更新按钮位置
                    container.setPosition(newX + buttonW / 2, newY + buttonH / 2);
                    break;
                }
            }
            //沒有在停車區
            if (!this.foundParking) {
                const newX = this.buttonStartX;
                const newY = this.buttonStartY;
                // 更新按钮位置
                animation(scene, container, this.buttonStartX, this.buttonStartY);
                // animation(scene, this.bt, newX, newY);
                // animation(scene, this.text2, newTextX, newTextY);
                this.foundParking = false;
            }
        });
    }
}

class QuestionButton{
    //建構器
    constructor(scene, x, y, butKey, text) {
        //preload 時有載入 player 動畫
        this.scene = scene; //：設定場景，之後能夠輸入場景，使角色套入該場景。
        this.bt = scene.add.image(0, 0, butKey);
        this.bt.displayWidth = buttonW;
        this.bt.displayHeight = buttonH;
        // 创建一个新的Phaser容器
        var container = scene.add.container(x + buttonW / 2, y + buttonH/2);
        // 创建一个形状对象
        var shape = scene.add.rectangle(0, 0, buttonW, buttonH, 0xffff00,0.1);
        // 将形状添加到容器中
        container.add(shape);
        // 设置容器的大小
        container.setSize(buttonW, buttonH);
        // container.setOrigin(0);
        // 使容器可交互
        container.setInteractive();
        container.add(this.bt);
        this.text = scene.add.text(-(buttonW/3), -10, text, { fontFamily: 'Arial', fontSize: '24px', fill: '#f303030' });
        container.add(this.text);
        container.setInteractive();
        //按下
        container.on('pointerdown', pointer => {
            utterance.text = container.list[2].text;
            window.speechSynthesis.speak(utterance);
        });
    }
}


class SendOutButton{
    //建構器
    constructor(scene, x, y, w, h, butKey, text ,func) {
        //preload 時有載入 player 動畫
        this.scene = scene; //：設定場景，之後能夠輸入場景，使角色套入該場景。
        this.bt = scene.add.image(0, 0, butKey);
        this.bt.displayWidth = w;
        this.bt.displayHeight = h;
        // 创建一个新的Phaser容器
        var container = scene.add.container(x + w / 2, y + h/2);
        // 创建一个形状对象
        var shape = scene.add.rectangle(0, 0, w, h, 0xffff00,0.1);
        // 将形状添加到容器中
        container.add(shape);
        // 设置容器的大小
        container.setSize(w, h);
        // container.setOrigin(0);
        // 使容器可交互
        container.setInteractive();
        container.add(this.bt);
        this.text = scene.add.text(-(w/3), -10, text, { fontFamily: 'Arial', fontSize: '24px', fill: '#f303030' });
        container.add(this.text);
        container.setInteractive();
        //按下
        container.on('pointerdown', pointer => {
            // utterance.text = container.list[2].text;
            // window.speechSynthesis.speak(utterance);
            func();
        });
    }
}

// var bt1 = null;
var scene = null;

class pairGame extends Phaser.Scene {
    //建構器
    constructor() {
        super({ key: 'pairGame' });
        this.background = null;
        this.allQustions = null;
        this.oneTimeQustions = null;
        this.bt = null;
        this.newPaperData = [];
        // this.parking = [];
        // this.s = this;
    }

    //預載入
    preload() {
        //資源的載入，但是還沒有使用！！
        // 載入音效圖片
        this.load.audio('lose', 'music/lose.mp3');
        this.load.audio('pick', 'music/pick.mp3');
        this.load.image('backgroud','PNG/OIG_2.jpeg');
        this.load.image('button', 'PNG/simple/7_bg.png');
        this.load.image('parking', 'PNG/simple/6_bg.png');
        this.load.image('ans', 'PNG/simple/11_bg.png');
        this.load.image('ok','PNG/ok.png');
        this.load.image('ng','PNG/ng.png');
    }
    //phaser3,Scene 的setup
    create() {
        scope = 0;
        scene = this;
        // 背景
        // 在场景中创建精灵对象
        // const sprite = this.add.sprite(0, 0, 'backgroud');
        const sprite = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'backgroud');
        // 将精灵对象的透明度设置为半透明（0.5）
        sprite.alpha = 0.3;
        sprite.setScale(2);

        //顯示右邊的題目
        for (var i=0;i< oneTimeQustions;i++){
            this.bt = new QuestionButton(this, 700, 80 * i +10, 'button', paperData[i][1]);
            console.log('題＝'+paperData[i][0]+' 答＝'+paperData[i][1]);
        }

        console.log('paperData.length='+paperData.length);

        // 洗牌
        this.newPaperData = paperData.slice(); // 创建原始数组的副本
        this.newPaperData = shuffleArray(this.newPaperData);

        

        for (var i = 0; i < oneTimeQustions; i++) {
            this.x = 200;
            this.y = 80 * i + 10
            this.bt = this.add.image(this.x, this.y, 'parking');
            this.bt.setOrigin(0, 0);
            this.bt.displayWidth = buttonW;
            this.bt.displayHeight = buttonH;
            this.l = [this.x, this.y];
            parking.push(this.l);
        }

        for (var i = 0; i < oneTimeQustions; i++) {
          this.x = 500;
          this.y = 80 * i + 10
          this.bt = this.add.image(this.x, this.y, 'parking');
          this.bt.setOrigin(0, 0);
          this.bt.displayWidth = buttonW;
          this.bt.displayHeight = buttonH;
          this.l = [this.x, this.y];
          parking.push(this.l);
        }

        //作答卡片
        for (var i = 0; i < oneTimeQustions; i++) {
          this.x = 200;
          this.y = 80 * i + 10;
          //顯示左邊的答案（洗亂過）
          this.bt = new ansButton(this, this.x, this.y, 'ans', this.newPaperData[i][0]);
        }

        // bt1 = this.add.image(0, 0, 'ok');
        // bt1.setVisible(false);


        this.bt = new SendOutButton(this,SendOutBtX,SendOutBtY,SendOutBtW,SendOutBtH,'parking' ,'交卷', function(){
            // utterance.text = '交卷了！！';
            // window.speechSynthesis.speak(utterance);
            for (var i=0;i< oneTimeQustions;i++){
                //答案
                var text = paperData[i][0];
                // console.log('['+i+']='+text+paperData[i][1]);
                //掃出Parting 區上的答案
                var get = false;
                for(var j=0;j< arrayAns.length;j++){
                    // console.log('x= '+ parking[i+10][0]);
                    if ((parking[i+ 10][0] == (arrayAns[j].x - buttonW / 2)) & (parking[i+10][1] == (arrayAns[j].y - buttonH/2))) {
                    // if ((parking[oneTimeQustions + i][0] == (arrayAns[j].x - buttonW / 2)) & (parking[oneTimeQustions+i][1] == (arrayAns[j].y - buttonH/2))) {
                        if (arrayAns[j].list[2].text == text){
                            scope = scope + 1;
                            scene.add.image(parking[i+ 10][0]+ buttonW, parking[i+ 10][1]+ 20,'ok');
                            get = true;
                        // }else{
                            // scene.add.image(parking[i+ 10][0]+ buttonW, parking[i+ 10][1] + 20,'ng');
                        }
                    }
                }
                if(!get){
                    scene.add.image(parking[i+ 10][0]+ buttonW, parking[i+ 10][1] + 20,'ng');
                }
                //得分
            }
            console.log('得分＝'+ scope);
        });
    }

    update(){

    }
}
