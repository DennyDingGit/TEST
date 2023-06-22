var utterance = new SpeechSynthesisUtterance();
// utterance.onend = function() {
//     // 文字轉語音結束後的處理程式碼
//     console.log('文字轉語音結束');
// };

const SendOutBtX = 1100 ;
const SendOutBtY = 0;
const SendOutBtW = 100;
const SendOutBtH = 80;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
