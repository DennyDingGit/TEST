
// const game = new Phaser.Game(config);
var TotalHeight = 0;
const TableCellWidth = 900;
const TableCellHeight = 300;
// 載入 CSV 檔案
var csvFileURL = 'paperFile/wordwall.csv';
var csvNemu = [];
    // 设置 cookie
    document.cookie = 'myCookie=test; expires=Thu, 1 Jan 2023 12:00:00 UTC; path=/';


class Menu extends Phaser.Scene {
    //phaser3 的預載入
    preload() {
        this.load.image('button2', 'PNG/simple/24_bg.png');
        this.load.image('heart', 'assets/heart.png');
        this.load.image('pairIcon','PNG/pairIcon.png');
        this.load.image('lineIcon','PNG/lineIcon.png');
        this.load.image('headIcon','PNG/headIcon.png');
        this.load.image('level0Icon','PNG/新手.png');
        this.load.image('level1Icon','PNG/銅牌.png');
        this.load.image('level2Icon','PNG/銀牌.png');
        this.load.image('level3Icon','PNG/金牌.png');
        // this.load.csv('wordwall','paperFile/wordwall.csv');
      }
    constructor() {
        //class 的建構子
        super({ key: 'Menu' });
        this.button = null;
        this.particles = null;
        this.emitter = null;


            // 讀取
            // allCookies = document.cookie;

            // 设置 cookie
            //
        this.newCookie = 'myCookie=test; expires=Thu, 1 Jan 2024 12:00:00 UTC; path=/';
            // 寫入
        document.cookie = this.newCookie;

    }

// 在適當的地方聲明一個 XMLHttpRequest 對象
// const xhr = new XMLHttpRequest();

// // 設定回調函數處理載入完成後的數據
// xhr.onload = function() {
//   const csvData = xhr.responseText;
//   // 在這裡解析 CSV 數據
//   // parseCSVData(csvData);
//   console.log(this.csvData);
// };






    create() {

      // 讀進CSV檔
    // fetch(csvFileURL)
    //     .then(response => response.text())
    //     .then(csvData => {
    //       console.log("csvData＝",csvData);
    //     //   Papa.parse(csvData, {
    //     //     complete: function (results) {
    //     //         // 在這裡處理解析後的 CSV 數據
    //     //         console.log(results.data);
    //     //     },
    //     // });
    // });

fetch(csvFileURL)
    .then(response => response.text())
    .then(csvData => {
        const lines = csvData.split('\n');
        const header = lines[0].split(',');
        // const data = [];

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].split(',');
            if (line.length === header.length) {
                const row = {};
                for (let j = 0; j < header.length; j++) {
                    row[header[j]] = line[j];
                }
                csvNemu.push(row);
            }
        }

        console.log("-----------")
        console.log(csvNemu);
        const tableView = new TableView(this, 50, 30, TableCellWidth, TableCellHeight, csvNemu);
        // 在這裡處理解析後的 CSV 數據陣列
    });

        this.input.mouse.enabled = true;
        console.log('this.game.config.height＝' + this.game.config.height);

    }

    update() {
        // // 获取鼠标在相机上的位置
        // const mouseX = this.input.mousePointer.worldX;
        // const mouseY = this.input.mousePointer.worldY;
        const mouseY = this.input.y;

        // // 更新相机的位置
        // this.cameras.main.scrollX = mouseX;
        // this.cameras.main.scrollY = (mouseY / TotalHeight) * this.game.config.height; //this.game.config.height;

        this.cameras.main.scrollY = (mouseY / this.game.config.height) * TotalHeight - TableCellHeight;

    }


}
class TableView {
    constructor(scene, x, y, width, height, data) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.data = data;

        this.items = [];

        this.createItems();
    }

    createItems() {
        // const itemHeight = 50; // 項目的高度
        console.log("count=" + this.data.length);

        for (let i = 0; i < this.data.length; i++) {
            const item = new TableCell(this.scene, this.x, this.y + i * this.height, this.width, this.height, this.data[i]);
            TotalHeight += this.height;
            this.items.push(item);

        }
    }
}


class TableCell extends Phaser.GameObjects.Container {
    constructor(scene, x, y, width, height, data) {
        super(scene, x, y);
        this.background = null;
        this.label = null;
        this.icon = null;

        // 背景
        this.background = scene.add.image(0, 0, 'button2');
        // background.setOrigin(-width/2, -height/2);
        this.background.setOrigin(0, 0);
        this.background.displayWidth = width;
        this.background.displayHeight = height;
        this.add(this.background);

        //考卷ICON
        var iconKey = 'pairIcon';
        switch (data.Icon) {
            case '配對':
                this.iconKey = 'pairIcon';
                // console.log('配對');
                break;
            case '連連看':
                this.iconKey = 'lineIcon';
                // console.log('連連看');
                break;
            case '字首':
                this.iconKey = 'headIcon';
                // console.log('字首');
                break;
        }

        this.icon = scene.add.image(30, 40, this.iconKey);
        this.icon.setOrigin(0, 0);
        this.icon.displayWidth = 200;
        this.icon.displayHeight = 200;
        this.add(this.icon); // 將圖示添加到容器中

        //等及
        var iconKey = 'level0Icon';
        switch (data.level) {
            case '0':
                this.iconKey = 'level0Icon';
                // console.log('配對');
                break;
            case '1':
                this.iconKey = 'level1Icon';
                // console.log('連連看');
                break;
            case '2':
                this.iconKey = 'level2Icon';
                // console.log('字首');
                break;
            case '3':
                this.iconKey = 'level3Icon';
                // console.log('字首');
                break;
        }

        this.levelicon = scene.add.image(TableCellWidth - 200, 50, this.iconKey);
        this.levelicon.setOrigin(0, 0);
        this.levelicon.displayWidth = 150;
        this.levelicon.displayHeight = 150;
        this.add(this.levelicon); // 將圖示添加到容器中

        // 考卷名稱
        this.label = scene.add.text(300, 50, data.title, { fontSize: '30px', fill: '#f0f0f0' });
        this.add(this.label);

        // 得分
        this.scope = scene.add.text(300, 150, '得分：' + data.scope, { fontSize: '50px', fill: '#00f0f0' });
        this.add(this.scope);

        //progressBar
        const progressBarWidth = 400;
        const progressBarHeight = 50;

        this.progressBarFill = scene.add.graphics();
        this.progressBarFill.fillStyle(0x909090, 1);
        this.progressBarFill.fillRect(300, 250 - 30, progressBarWidth, progressBarHeight);
        this.add(this.progressBarFill); //底色

        this.progressBarFill = scene.add.graphics();
        this.progressBarFill.fillStyle(0xffff00, 1);

        this.progressBarFill.fillRect(
            300,
            250 - 30,
            (parseInt(data.qusNum) * parseInt(data.times) * progressBarWidth) / parseInt(data.qustions),
            progressBarHeight
        );
        this.add(this.progressBarFill); //底色

        // 點擊事件
        this.setInteractive(new Phaser.Geom.Rectangle(0, 0, width, height), Phaser.Geom.Rectangle.Contains);
        this.on('pointerdown', () => {
            console.log('點擊了項目:', data.title);
            console.log('需要開啟：', data.filename);

            // 获取 cookie
            // 讀取
            var allCookies = document.cookie;
            var cookies = allCookies.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                console.log('[', i, ']=', cookie);
            }

            game.scene.stop('Menu'); //停止目前的MENU
            game.scene.start('Scene'); //開始另一個新的SCENE
        });

        scene.add.existing(this);
    }




    // startgame(sceneName) {
    //     // 将会停止当前的场景，并开始加载和启动目标场景。在目标场景被加载和启动后，控制权将转移到目标场景，开始执行目标场景的逻辑。
    //     sceneName.start('Scene');
    // }
}
