var buttonW = 180;
var buttonH = 50;

var parking = [];     //答案的停車區，前一半是左邊，後一半是右邊
var arrayAns = [];    //作案用的卡片
var arrayAnstext = [];    //作案用的卡片上的文字


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
        //preload 時有載入 player 動畫
        //將這程式碼輸入後之後就能直接套入此設定做使用，"player"為我們之前在場景匯入圖片時設定的角色圖片名稱，需輸入角色才會顯現。
        // super(this, this.x, this.y, 'button');
        // super(scene, x, y, butKey, text);
        this.scene = scene; //：設定場景，之後能夠輸入場景，使角色套入該場景。
        // scene.physics.world.enable(this); //：設定角色會受物理設定影響。
        // scene.add.existing(this);         //：將角色匯入至場景中。
        // this.setBounce(0.9);              //彈跳系數 1 是全反彈
        // this.setCollideWorldBounds(true); //設定碰撞邊界, 設定的是整個player 的邊界
        // // this.setCollideWorldBounds(false); //設定碰撞邊界

        this.buttonStartX = 0;
        this.buttonStartY = 0;
        this.pointerOffsetX = 0;
        this.pointerOffsetY = 0;
        this.btOn = false;

        this.bt = scene.add.image(0, 0, butKey);
        // this.bt.setOrigin(0, 0);
        this.bt.displayWidth = buttonW;
        this.bt.displayHeight = buttonH;
        // this.bt.setInteractive();
        // // this.add(this.bt); // 將圖示添加到容器中
        // const label = scene.add.text(x + 20, y + 18, text, {
        //     fontFamily: 'Arial',
        //     fontSize: '24px',
        //     color: '#303030',
        // });

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

        // this.shape = scene.add.rectangle(0, 0, buttonW, buttonH, 0xffff00, 1); // 創建一個矩形作為容器的形狀物件

        // this.container1.setInteractive(); // 設定容器為可互動元素
        // this.container1 = scene.add.container(x, y, this.bt);
        // this.container1 = scene.add.container(x, y, this.shape);
        container.add(this.bt);
        // this.container1.add(this.shape); // 將形狀物件添加到容器內
        this.text = scene.add.text(-20, 0, text, { fontFamily: 'Arial', fontSize: '24px', fill: '#f303030' });
        // this.text.setOrigin(0);
        container.add(this.text);

        // 创建文本
        // var text2 = scene.add.text(x + 20  , y + 20 , text, { fontFamily: 'Arial', fontSize: '24px', fill: '#f303030' });
        // text2.setOrigin(0);
        // 设置按钮和文本为可交互
        // this.text2.setInteractive();
        // this.bt.add(text2);
        // 设置按钮为可交互
        container.setInteractive();

        arrayAns.push(container);
        // console.log('arrayAns.length=' + arrayAns.length);
        // arrayAnstext.push ( this.text2);

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
    }
    //phaser3,Scene 的setup
    create() {
        // 背景
        // this.background = this.add.image(0, 0, 'backgroud');
        // background.setOrigin(-width/2, -height/2);
        // this.background.setOrigin(0, 0);
        // this.background.displayWidth = this.game.config.width ;
        // this.background.displayHeight = this.game.config.height;

        // console.log('game.config.width= ' + this.game.config.width);
        // console.log('game.config.Height= ' + this.game.config.height);

        // 在场景中创建精灵对象
        // const sprite = this.add.sprite(0, 0, 'backgroud');
        const sprite = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'backgroud');
        // 将精灵对象的透明度设置为半透明（0.5）
        sprite.alpha = 0.3;
        sprite.setScale(2);

        //顯示右邊的題目
        for (var i=0;i< oneTimeQustions;i++){

            this.bt = this.add.image(700, 100 * i+10, 'button');
            this.bt.setOrigin(0, 0);
            this.bt.displayWidth = buttonW;
            this.bt.displayHeight = buttonH;
            // this.add(this.bt); // 將圖示添加到容器中
            const label = this.add.text(700+20, 100 * i+ 18, paperData[i][1], { fontFamily: 'Arial', fontSize: '24px', color: '#ffff00' });
        }

        console.log('paperData.length='+paperData.length);

        // 洗牌
        this.newPaperData = shuffleArray(paperData);

        for (var i = 0; i < oneTimeQustions; i++) {
            this.x = 200;
            this.y = 100 * i + 10
            this.bt = this.add.image(this.x, this.y, 'parking');
            this.bt.setOrigin(0, 0);
            this.bt.displayWidth = buttonW;
            this.bt.displayHeight = buttonH;
            this.l = [this.x, this.y];
            parking.push(this.l);
        }

        for (var i = 0; i < oneTimeQustions; i++) {
          this.x = 500;
          this.y = 100 * i + 10
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
          this.y = 100 * i + 10;
          //顯示左邊的答案（洗亂過）
          this.bt = new ansButton(this, this.x, this.y, 'ans', this.newPaperData[i][0]);
        }
    }

    update(){

    }
}
