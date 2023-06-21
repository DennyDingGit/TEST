class Scene extends Phaser.Scene {
    //建構器
    constructor() {
        super({ key: 'Scene' });
        this.player = null;
        this.platforms = null;
        this.heart = null;
        this.lose = null;
        this.enemys = null;
        this.coins = null;
    }

    //預載入
    preload() {
        //資源的載入，但是還沒有使用！！
        // 載入音效圖片
        this.load.audio('lose', 'music/lose.mp3');
        this.load.audio('pick', 'music/pick.mp3');

        this.load.image('platform', 'assets/platform.png');
        this.load.image('heart', 'assets/heart.png');
        this.load.image('lose', 'assets/lose.png');
        // this.load.image("enemy","assets/c.png");          //敵人
        // this.load.spritesheet('enemy', 'assets/enemy1.png', { frameWidth: 72, frameHeight: 72 });
        this.load.spritesheet('enemyIcon', 'assets/enemy1.png', { frameWidth: 43.6, frameHeight: 65 });
        // this.load.image("enemy","assets/em.png");          //敵人
        this.load.image('coin', 'assets/coin.png');

        //載入player 是一個動畫
        this.load.spritesheet('player', 'assets/rabbit3 - doux.png', { frameWidth: 72, frameHeight: 72 });
    }

    //phaser3,Scene 的setup
    create() {
        //建立角色，而且是可以互動的！！
        this.player = new Player(this, 400, 165).setInteractive();
        //建立一個物件，也是可以互動的！！
        this.lose = this.add.image(450, 170, 'lose').setInteractive();
        //設定lose, player 是可以拖動的。
        //可以一次設定一推，所以是用陣列
        this.input.setDraggable([this.lose, this.player]);
        //如果發生的 drag 拖動
        this.input.on('drag', function (pointer, gameObj, dragX, dragY) {
            gameObj.x = dragX;
            gameObj.y = dragY;
        });
        //如果發生  dragstart 開始拖動
        this.input.on('dragstart', function (pointer, gameObject) {
            gameObject.setTint(0xff69b4);
            gameObject.setScale(2);
            gameObject.setDepth(1);
        });
        //如果發生  dragend 結束拖動
        this.input.on('dragend', function (pointer, gameObject) {
            gameObject.setTint();
            gameObject.setScale();
            gameObject.setDepth();
        });

        //
        this.score = 0;
        //加入一個text
        this.scoreText = this.add.text(10, 10, 'Score:', {
          fontSize: 50,
          fill: 'white',
        });
        //加入一個text
        this.testText = this.add.text(800, 10, 'Test:', {
          fontSize: 25,
          fill: 'yellow',
        });

        //加入一個靜態物理（不會動但是有碰撞，有重量。。。）
        //platforms 是一個靜態物理群
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(300, 214, 'platform');
        this.platforms.create(500, 214, 'platform');
        this.platforms.create(700, 214, 'platform');
        this.platforms.create(900, 214, 'platform');
        this.platforms.create(1100, 214, 'platform');
        this.platforms.create(1300, 214, 'platform');
        this.platforms.create(0, 610, 'platform');
        this.platforms.create(100, 610, 'platform');
        this.platforms.create(300, 610, 'platform');
        this.platforms.create(500, 610, 'platform');
        this.platforms.create(700, 610, 'platform');
        this.platforms.create(900, 610, 'platform');
        this.platforms.create(1100, 610, 'platform');
        this.platforms.create(1300, 610, 'platform');


        //heart 也是一個靜態物理群
        this.heart = this.physics.add.staticGroup();
        this.heart.create(270, 170, 'heart');
        this.heart.create(320, 170, 'heart');
        this.heart.create(220, 170, 'heart');


        // this.cameras.main.setBounds(起始x軸位置, 起始y軸位置, 結束x軸位置, 結束y軸位置);
        // this.cameras.main.startFollow(this.變數名稱);
        this.cameras.main.setBounds(0, 0, 3000, 304);
        this.cameras.main.startFollow(this.player);

        // //加入敵人, 是一個陣列可以數個敵人
        // this.enemy = new Enemy(this, 100, 540);
        // this.enemy1 = new Enemy(this, 400, 540);

        // // this.enemys = [this.enemy];
        // this.enemys = [this.enemy, this.enemy1];

        //靜態物理群
        this.coins = this.physics.add.staticGroup();
        this.coins.create(50, 570, 'coin');
        this.coins.create(400, 570, 'coin');
        this.coins.create(800, 570, 'coin');
        this.coins.create(1100, 570, 'coin');
        this.coins.create(1250, 570, 'coin');


        this.enemys = [];
        let x = 120;
        let y = 550;

        for (let i = 0; i < 13; i++) {
          const enemy = new Enemy(this, x, y).setInteractive();
          this.enemys.push(enemy);
          x += 120;
         }
        // 在上述示例中，使用 for 循环来创建10个敌人。循环变量 i 从0开始，每次递增1，直到小于10。在每次循环中，创建一个新的敌人实例，并将其添加到 enemys 数组中。根据你的需求，你可以自定义初始位置 x 和 y 来调整敌人的位置。
        // 需要注意的是，这里假设你已经定义了 Enemy 类，并且 Enemy 类的构造函数接受 scene、x 和 y 作为参数来创

        //讓player 與platforms 有對撞反應！！
        this.physics.add.collider(this.player, this.platforms);
        //讓player 與enemys 有對撞反應！！
        //可以時陣列，也可以是單一物件
        this.physics.add.collider(this.player, this.enemys);
        this.physics.add.collider(this.platforms, this.enemys);

        //創建一個動畫
        //key ＝'left'
        //player 是一個SprintSheet 裹面本來就是單張組合的畫面
        //第14～16張是一個 left 的動畫
        //frameRate: 10,  每秒10張
        //repeat: 1,    只重複一次
        //flipX: true,  水平翻轉，有的左右動畫只要準備一邊，另一邊使用水平翻轉
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 14, end: 16 }),
            frameRate: 10,
            repeat: 1,
            // flipX: true,
        });

        //right 的動畫是player 裹第5～7張圖，一秒10張重複一次
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 5, end: 7 }),
            frameRate: 10,
            repeat: 1,
        });

        //廠商廠造几個動畫
        this.anims.create({
            key: 'eleft',
            frames: this.anims.generateFrameNumbers('enemyIcon', { start: 13, end: 25 }),
            // frames: this.anims.generateFrameNumbers('enemyIcon', { start: 0, end: 12 }),
            frameRate: 10,
            repeat: -1,
            // flipX:true,
        });

        //建立一個物件，也是可以互動的！！
        this.anims.create({
            key: 'eright',
            frames: this.anims.generateFrameNumbers('enemyIcon', { start: 0, end: 12 }),
            frameRate: 10,
            repeat: -1,
        });

        //設定當heart 與player 碰撞時，呼叫player_touch_heart
        this.physics.add.overlap(this.heart, this.player, this.player_touch_heart, null, this);
        //設定當coins 與enemy 碰撞時，呼叫enemy_touch_coin
        this.physics.add.overlap(this.coins, this.enemys, this.enemy_touch_coin, null, this);
        //宣告 cursors 是一個鍵盤輸入
        this.cursors = this.input.keyboard.createCursorKeys();

        // this.physics.add.overlap(this.enemys, this.player, this.player_touch_enemy, null, this);
    }
    //player 與enemy 碰撯后，停止player 的動位
    player_touch_enemy(enemys, player) {
        player.disableBody(true, true);
    }

    //player 碰到了heart
    player_touch_heart(player, heart) {
        //讓heart 消失
        heart.disableBody(true, true);
        //重建一個新的heart
        var randomInt = Math.round(Math.random() * 900);
        this.heart.create(randomInt, 170, 'heart');
        this.sound.play('pick');
        this.score++;
    }

    //enemy 敵人碰到了 coin
    enemy_touch_coin(enemy, coins) {
        // let random = Math.floor(Math.random() * 1000) % 2;
        let random = Math.round(Math.random() * 10) % 2;
        switch (random) {
            case 0:
                enemy.setDirection('eright');
                break;
            case 1:
                enemy.setDirection('eleft');
                break;
            default:
                break;
        }
    }

    //phaser3,Scene 的mainloop
    //換下一個scene
    update() {
        this.scoreText.setText('Score:' + this.score);

        //鍵盤左按了嗎
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-200);
            this.player.anims.play('left', true);
            //鍵盤右按了嗎
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(200);
            this.player.anims.play('right', true);
        } else if (this.cursors.up.isDown) {
            this.player.setVelocityY(-200);
            // this.player.anims.play('right', true);
        } else if (this.cursors.space.isDown) {
            this.player.setVelocityY(-200);
            // this.player.anims.play('right', true);
            //不是的話就不要動了，但是player 還是有被物理世界控制，所以有可能還是會反彈，重力下落。。。。
        } else {
            this.player.setVelocityX(0);
        }

        //敵人的陣列掃過
        for (var emy of this.enemys) {
            //如果敵人是左移
            if (emy.getDirection() === 'eleft') {
                emy.setVelocity(-50, 0);
                emy.anims.play('eleft', true);
                //如果敵人是右移
            } else if (emy.getDirection() === 'eright') {
                emy.setVelocity(50, 0);
                emy.anims.play('eright', true);
            }
        }
    }
}

