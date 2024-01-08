class Hangul {

    static list = [];
    static duoList = [];
    static lessonList = [];
    static failedList = [];
    static hanjaList = [];
    static dameList = `하세요사람잘합니다스모포츠달옷쓰레기노래맞은로이혀저녁지난음몇집여름님을찍간먹는히아시겹살된찌개에를
                    나차가들많알루물짓팔깔고무인손으돈네첫막보남내찜질위바말롭날놀짐마되둥곰쪽없밥거리팥설렁트짜제치게듣풀꽃
                    속자장배더미헛해/()?-<>▽～ 　abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`;

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
            if (pHanja != "") {
                for (let i = 0; i < pHanja.length; i++) {
                    if (!Hangul.hanjaList.includes(pHanja[i]) && !Hangul.dameList.includes(pHanja[i])) {
                        Hangul.hanjaList.push(pHanja[i]);
                    }
                }
            }
        }
    }

}

readHangulFile("./tsv/NZH - できる한국어.tsv");
readHangulFile("./tsv/NZH - 듀오.tsv", 1);
// readHangulFile("./failed/h_failed.txt");

function readHangulFile(pFile, pType = 0) {
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", pFile, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                tsvFile = rawFile.responseText;
                if (pFile.includes("failed")) {
                    if (tsvFile == "") {
                    } else {
                        h_createFailedList(tsvFile);
                    }
                } else {
                    createHangul(tsvFile, pType);
                }
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

function h_createFailedList(pFile) {
    let row = pFile.split(/\r\n/);
    // console.log(row);
    for (let i = 0; i < row.length; i++) {
        let arr = [];
        let tempArr = row[i].split(",");
        for (let j = 0; j < tempArr.length; j++) {
            arr.push(Hangul.list[tempArr[j] - 1]); //? Hangul.id - 1 ==> index de Hangul.list[index]
        }
        Hangul.failedList[i] = arr;
    }
    // console.log(Hangul.failedList);
}