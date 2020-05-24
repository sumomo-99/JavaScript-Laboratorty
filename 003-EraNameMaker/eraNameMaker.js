//Unicode 4E00 - 9FCF
const startCode = 0x4e00;
const endCode = 0x9fcf;

getKanji = () => {
    for (let i = 1; i < 3; i++) {
        let code = Math.floor(Math.random() * (endCode - startCode + 1)) + startCode;
document.getElementById("k" + i).innerHTML=String.fromCodePoint(code);
    }
}