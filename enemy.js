// 宣告一個 Enemy 類別，繼承了Phaser, 物理，街機，精靈
class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'enemy');
        this.scene = scene;
        scene.physics.world.enable(this); //：設定角色會受物理設定影響。
        scene.add.existing(this); //：將角色匯入至場景中。
        this.setBounce(0.9); //彈跳系數 1 是全反彈
        this.setCollideWorldBounds(true); //設定碰撞邊界, 設定的是整個player 的邊界

        let random1 = Math.round(Math.random() * 10) % 2;
        if (random1 == 0) {
            this.direction = 'eleft';
        } else {
            this.direction = 'eright';
        }
    }
    getDirection() {
        return this.direction;
      }

    setDirection(dir) {
        this.direction = dir;
      }
  }

