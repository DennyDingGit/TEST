class Menu extends Phaser.Scene{
    //class 的建構子
    constructor(){
        super({ key: "Menu" });
        this.button=null;
        this.particles=null;
        this.emitter=null;
    }
    //phaser3 的預載入
    preload(){
        this.load.image("button","PNG/simple/24.png");
        this.load.image("heart",'assets/heart.png');
    }

    //phaser3,Scene 的setup
    create(){

// this.add.image(450, 250, "button")：在场景中添加一个图片对象，
//位置位于 (450, 250) 坐标处，使用名为 "button" 的纹理。
// .setInteractive({ useHandCursor: true })：将图片对象设置为可交互，
//并启用手形光标。这使得当鼠标悬停在按钮上时，光标将变为手形指示器，指示该按钮可点击。
// .on("pointerup", () => { this.startgame(); })：为按钮对象添加一个指针抬起事件的监听器。
//当按钮被点击或指针抬起时，将调用回调函数 this.startgame()。
        this.button=this.add.image(450,250,"button").setInteractive({ useHandCursor: true }).on("pointerup", () => {this.startgame();});
        this.gamestart = this.add.text(410, 235, "開 始", {
            fontSize: "32px",
            color: "#ffffff"
        });

        //粒子效果
        this.particles=this.add.particles('heart');
        this.emitter=this.particles.createEmitter();
        this.emitter.setPosition(450,250);
        this.emitter.setSpeed(300);
        this.emitter.setBlendMode(Phaser.BlendModes.ADD);
    }

    startgame(){
      // 将会停止当前的场景，并开始加载和启动目标场景。在目标场景被加载和启动后，控制权将转移到目标场景，开始执行目标场景的逻辑。
        this.scene.start("Scene");
    }

    //phaser3,Scene 的mainloop
    update(){

    }
}

