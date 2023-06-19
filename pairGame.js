var buttonW = 180;
var buttonH = 50;

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

        this.bt = scene.add.image(x, y, butKey);
        this.bt.setOrigin(0, 0);
        this.bt.displayWidth = buttonW;
        this.bt.displayHeight = buttonH;
        // // this.add(this.bt); // 將圖示添加到容器中
        // const label = scene.add.text(x + 20, y + 18, text, {
        //     fontFamily: 'Arial',
        //     fontSize: '24px',
        //     color: '#303030',
        // });

        // 创建文本
        this.text2 = scene.add.text(x + 20  , y + 20 , text, { fontFamily: 'Arial', fontSize: '24px', fill: '#f303030' });
        this.text2.setOrigin(0);
        // 设置按钮和文本为可交互
        this.text2.setInteractive();

        // 设置按钮为可交互
        this.bt.setInteractive();

        this.bt.on('pointerdown', pointer => {
            // 记录按下时的按钮位置
            this.btOn = true;
            this.buttonStartX = this.bt.x;
            this.buttonStartY = this.bt.y;
            this.pointerOffsetX = pointer.x - this.bt.x;
            this.pointerOffsetY = pointer.y - this.bt.y;
            console.log('x=' + this.bt.x + ' y=' + this.bt.y);
            // console.log('pointer x=' + pointer.x + ' y=' + pointer.y);
        });

        this.bt.on('pointermove', pointer => {
            // 记录按下时的按钮位置
            // 计算按钮的新位置
            if (this.btOn == true) {
                const newX = pointer.x - this.pointerOffsetX;
                const newY = pointer.y - this.pointerOffsetY;
                const newTextX = newX + 20;
                const newTextY = newY + 20;

                // 更新按钮位置
                this.bt.setPosition(newX, newY);
                this.text2.setPosition(newTextX, newTextY);
            }
        });

        this.bt.on('pointerup', pointer => {
            this.btOn = false;
            this.foundParking = false;
            for (var i = 0; i < parking.length; i++) {
                // console.log('[' + i + ']=(' + parking[i][0] + ',' + parking[i][1] + ')');
                //找出放開時的parking 位置
                if ((parking[i][0]<=pointer.x)&(parking[i][1]<=pointer.y)&((parking[i][0] + buttonW )>=pointer.x)&((parking[i][1] + buttonH) >=pointer.y)){
                  // console.log('找到了！');
                  const newX = parking[i][0] ;
                  const newY = parking[i][1] ;
                  const newTextX = newX + 20;
                  const newTextY = newY + 20;

                  // 更新按钮位置
                  this.bt.setPosition(newX, newY);
                  this.text2.setPosition(newTextX, newTextY);
                  this.foundParking = true;
                  break;
                }
            }
            if (!this.foundParking){
                const newX = this.buttonStartX;
                const newY = this.buttonStartY;
                const newTextX = newX + 20;
                const newTextY = newY + 20;

                // 更新按钮位置
                animation(scene,this.bt, newX, newY);
                animation(scene,this.text2, newTextX, newTextY);
                this.foundParking = false;
            }
        });
    }

}

var parking = [];

class pairGame extends Phaser.Scene {
    //建構器
    constructor() {
        super({ key: 'pairGame' });
        this.background = null;
        this.allQustions = null;
        this.oneTimeQustions = null;
        this.bt = null;
        this.newPaperData = [];
        this.parking = [];

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
