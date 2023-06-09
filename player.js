// 宣告一個 Player 類別，繼承了Phaser, 物理，街機，精靈
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        //preload 時有載入 player 動畫
        //將這程式碼輸入後之後就能直接套入此設定做使用，"player"為我們之前在場景匯入圖片時設定的角色圖片名稱，需輸入角色才會顯現。
        super(scene, x, y, 'player');
        this.scene = scene;               //：設定場景，之後能夠輸入場景，使角色套入該場景。
        scene.physics.world.enable(this); //：設定角色會受物理設定影響。
        scene.add.existing(this);         //：將角色匯入至場景中。
        this.setBounce(0.9);              //彈跳系數 1 是全反彈
        this.setCollideWorldBounds(true); //設定碰撞邊界, 設定的是整個player 的邊界
        // this.setCollideWorldBounds(false); //設定碰撞邊界
    }
  }

