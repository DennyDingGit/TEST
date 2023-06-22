
// const game = new Phaser.Game(config);
var TotalHeight = 0;
const TableCellWidth = 900;
const TableCellHeight = 300;
// 載入 CSV 檔案
var csvFileURL = 'paperFile/wordwall.csv';


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
            //第一個為Key ＝ value;
            //expires   ＝ 有效期限；
            //path      = 路徑；
        this.newCookie = 'myCookie=test; expires=Thu, 1 Jan 2024 12:00:00 UTC; path=/';
        this.newCookie2 = 'myCookie2=test; expires=Thu, 1 Jan 2024 12:00:00 UTC; path=/';
            // 寫入
            //cookie 可以多次寫入不同的Key ＝ value
        document.cookie = this.newCookie;
        document.cookie = this.newCookie2;

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


    //讀取遠端的csv 檔
    //使用fetch （URL）來讀遠端檔案
    //.then(response => response.text())    收到response，轉成文字傳到下一層 .text()
    //.then(csvData => { })                 收到csvData, 執行{ 閉包}
    // funcation XXX().then()  是一個涵數串接的寫法，當前面執行結束後.then 。。。。。
    fetch(csvFileURL).then(response => response.text()).then(csvData => {
        //lines 被 '\n' 分開的行陣列
        const lines = csvData.split('\n');
        //header 是csv 的第[0]行，為欄位名稱！！
        const header = lines[0].split(',');
        // const data = [];
        for (let i = 1; i < lines.length; i++) {
            //line 為lines[1]開始的每一行, 被','隔開的每一欄
            const line = lines[i].split(',');
            if (line.length === header.length) {
                //row ={} 是一個空的數組  字典
                const row = {};
                for (let j = 0; j < header.length; j++) {
                    //將line 裹每一個欄，填入row 字典，對應的Key裹
                    row[header[j]] = line[j];
                }
                //加入一個row 到csvNemu 陣列裹
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

function readPager(filename,array){
  fetch('paperFile/' + filename).then(response => response.text()).then(csvData => {
    //lines 被 '\n' 分開的行陣列
    const lines = csvData.split('\n');
    // const data = [];
    for (let i = 0; i < lines.length; i++) {
      //line 為lines[1]開始的每一行, 被','隔開的每一欄
      const line = lines[i].split(',');
          //row ={} 是一個空的數組  字典
          // const row = [];
          // for (let j = 0; j < header.length; j++) {
            //將line 裹每一個欄，填入row 字典，對應的Key裹
            // row[j] = line[j];
          // }
          //加入一個row 到csvNemu 陣列裹
      array.push(line);
    }
    // console.log('-----------');
    // paperData = array;
  });
}

//依Level&times來選題
function selectQustion(data){
    // setTimeout(1000); // 设置延迟，单位为毫秒
    var arr = [];
    console.log('data.qusNum = ' + data.qusNum);
    console.log('data.times = ' + data.times);
    for (var i = 0; i < data.qusNum; i++) {
        // arr[i] = paperData[data.qusNum * data.times + i];
        arr.push(paperData[data.qusNum * data.times + i]);
        // console.log('arr= [' + i + ']' + paperData[data.qusNum * data.times + i]);
    }
    // console.log('arr= ' + arr);
    // 洗牌
    // paperData = shuffleArray(arr);
    paperData = null;
    paperData = arr;
    // console.log('paperData= ' + paperData);
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

        //MARK: - 按下選單了
        // 點擊事件
        this.setInteractive(new Phaser.Geom.Rectangle(0, 0, width, height), Phaser.Geom.Rectangle.Contains);
        this.on('pointerdown', () => {
            console.log('點擊了項目:', data.title);
            console.log('需要開啟：', data.filename);

            // // 获取 cookie
            // // 讀取
            // var allCookies = document.cookie;
            // var cookies = allCookies.split(';');
            // for (var i = 0; i < cookies.length; i++) {
            //     var cookie = cookies[i].trim();
            //     console.log('[', i, ']=', cookie);
            // }

            //讀入整個題庫
            readPager(data.filename + '.csv', paperData);
            console.log('原始考題＝' + paperData);

            //找出按下的是哪一個考卷
            for (var i = 0; i < csvNemu.length; i++) {
                if (csvNemu[i].filename === data.filename) {
                    pagerIndex = i;
                    break;
                }
            }
            console.log('按下的 ' + data.filename + 'at index= ' + pagerIndex);
            pagerName = data.title;

            allQustions = data.qustions;
            oneTimeQustions = data.qusNum;
            //依Level&times來選題
            // selectQustion(paperData, data);

            // 设置延迟，单位为毫秒
            // window.setTimeout(() => selectQustion(paperData, data), 2000);
            window.setTimeout(function(){
                game.scene.stop('Menu'); //停止目前的MENU
                utterance.text = data.title;
                // 使用 SpeechSynthesisUtterance 物件進行文字轉語音
                // utterance.volume = 0.8;  // 設置音量為 0，將以背景音方式播放
                // utterance.rate = 0.8;  // 調整速率以符合需求
                // utterance.pitch = 0.8;   // 調整音調以符合需求
                window.speechSynthesis.speak(utterance);
                selectQustion( data);
                console.log('考題＝' + paperData);
                switch (data.Icon) {
                    case '配對':
                        // console.log('配對');    
                        game.scene.start('pairGame'); //開始另一個新的SCENE
                        break;
                    case '連連看':
                        // console.log('連連看');
                        game.scene.start('Scene'); //開始另一個新的SCENE
                        break;
                    case '字首':
                        // console.log('字首');
                        game.scene.start('Scene'); //開始另一個新的SCENE
                        break;
                }
            },500);
        });

        scene.add.existing(this);
    }

}
