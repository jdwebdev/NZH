class Hangul {

    static list = [];
    static duoList = [];
    static lessonList = [];

    constructor(pId, pWord, pNihongo, pExampleHangul, pExampleNihongo, pHanja, pLesson = "", pDuo = false) {

        this.id = pId;

        this.word = pWord;
        this.nihongo = pNihongo;
        this.hanja = pHanja;
        this.lesson = pLesson; //? できる한국어
        this.h_ex = pExampleHangul;
        this.n_ex = pExampleNihongo;

        this.exampleHList = pExampleHangul.split("|");
        this.exampleNList = pExampleNihongo.split("|");

        if (pDuo) {
            Hangul.duoList.push(this);
        } else {
            Hangul.list.push(this);
        }
    }

}

readHangulFile("./tsv/NZH - できる한국어.tsv");
readHangulFile("./tsv/NZH - 듀어.tsv", 1);

function readHangulFile(pFile, pType = 0) {
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", pFile, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                tsvFile = rawFile.responseText;
                createHangul(tsvFile, pType);
            }
        }
    }
    rawFile.send(null);    
}

function createHangul(pFile, pType) {
    let row = pFile.split(/\r\n|\n/);
    let test;
    let lesson = "";
    let id = 1;
    for (let i = 1; i < row.length; i++) {
        row[i] = row[i].split('\t');
        if (row[i][0][0] =="@") {
            lesson = row[i][0].split(' ')[1];
            Hangul.lessonList.push(lesson);
        } else {
            //?               id, word,      nihongo,   h_ex,      n_ex,      hanja
            test = new Hangul(id, row[i][0], row[i][1], row[i][2], row[i][3], row[i][4], lesson, pType);
            id++;
        }
    }

    if (pType) {
        // console.log(Hangul.duoList);
    } else {
        // console.log(Hangul.list);
    }
}