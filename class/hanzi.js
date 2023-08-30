class Hanzi {

    static list = [];
    static failedList = [];

    constructor(pId, pHanzi, pPinyin, pPinyinLizi, pLizi, pYisi = "", pFanti = "") {

        this.id = pId;

        this.hanzi = pHanzi;
        this.pinyin = pPinyin;
        this.pinyinLizi = pPinyinLizi;
        this.lizi = pLizi;
        this.yisi = pYisi;
        this.fanti = pFanti;

        this.liziList = pLizi.split(" | ");
        this.pinyinLizi = pPinyinLizi.split(" | ");
        if (pFanti != "") {
            this.fantiList = pFanti.split(",");
        } else {
            this.fantiList = [];
        }
        
        Hanzi.list.push(this);
    }
}

readHANZIFile("./tsv/NZH - 汉字.tsv");
readHANZIFile("./failed/z_hanzi_failed.txt");

function readHANZIFile(pFile) {
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", pFile, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                tsvFile = rawFile.responseText;
                if (pFile.includes("failed")) {
                    if (tsvFile == "") {
                    } else {
                        z_h_createFailedList(tsvFile);
                    }
                } else {
                    createHanzi(tsvFile);
                }
            }
        }
    }
    rawFile.send(null);    
}

function z_h_createFailedList(pFile) {
    let row = pFile.split(/\r\n/);
    console.log(row);
    for (let i = 0; i < row.length; i++) {
        let arr = [];
        let tempArr = row[i].split(",");
        for (let j = 0; j < tempArr.length; j++) {
            arr.push(Hanzi.list[tempArr[j] - 1]); //? hanzi.id - 1 ==> index de hanzi.list[index]
        }
        Hanzi.failedList[i] = arr;
    }
    console.log(Hanzi.failedList);
}

function createHanzi(pFile) {
    let row = pFile.split(/\r\n|\n/);
    let test;
    for (let i = 1; i < row.length; i++) {
        row[i] = row[i].split('\t');
        //?              id,hanzi,     pinyin,    pinyinlizi,lizi,      yisi,      fanti 
        test = new Hanzi(i, row[i][0], row[i][2], row[i][3], row[i][4], row[i][5], row[i][1]);
    }

    // console.log(Hanzi.list);
}

class Z_Word {
    static list = [];
    static duoList = [];
    static lessonList = [];
    static failedList = [];
    static yojiList = [];

    constructor(pId, pWord, pPinyin, pYisi = "", pPinyinLizi = "", pLizi = "", pSpec = "", pLesson = "", pYoji = false, pDuo = false) {

        this.id = pId;

        this.word = pWord;
        this.pinyin = pPinyin;
        this.yisi = pYisi;
        this.pinyinLizi = pPinyinLizi;
        this.lizi = pLizi;
        this.spec = pSpec;
        this.lesson = pLesson;
        this.bYoji = pYoji;

        // this.liziList = pLizi.split(" | ");
        // if (pFanti != "") {
        //     this.fantiList = pFanti.split(",");
        // } else {
        //     this.fantiList = [];
        // }
        
        if (pDuo) {
            Z_Word.duoList.push(this)
        } else {
            Z_Word.list.push(this);
        }
    }
}

readZ_WORDFile("./tsv/NZH - 本気で学ぶ中国語.tsv");
readZ_WORDFile("./tsv/NZH - Duo单词.tsv", 1);
readZ_WORDFile("./failed/z_zword_failed.txt");

function readZ_WORDFile(pFile, pType = 0) {
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", pFile, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                tsvFile = rawFile.responseText;
                if (pFile.includes("failed")) {
                    if (tsvFile == "") {
                    } else {
                        z_w_createFailedList(tsvFile);
                    }
                } else {
                    createZ_WORD(tsvFile, pType);
                }
            }
        }
    }
    rawFile.send(null);    
}

function createZ_WORD(pFile, pType) {
    let row = pFile.split(/\r\n|\n/);
    let test;
    let lesson = "";
    let bYoji = false;
    let id = 1;
    let currentLesson = "" //? For 3 & 4
    for (let i = 1; i < row.length; i++) {
        row[i] = row[i].split('\t');
        if (row[i][0][0] == "@") {
            
            lesson = row[i][0].split(' ')[1];
            if (lesson[0] == "3" || lesson[0] == "4") {
                if (currentLesson != (lesson[0] + lesson[1] + lesson[2])) {
                    currentLesson = lesson[0] + lesson[1] + lesson[2];
                    Z_Word.lessonList.push(currentLesson);
                }
            }
            Z_Word.lessonList.push(lesson);
        } else {
            bYoji = row[i][0].includes("#4");
            // if (row[i][0].includes("#4")) {
            //     console.log("Includes #4: " + row[i][0]);
            // }
            //?               id, word,      pinyin,    yisi,      pinyinLizi, lizi,      -
            test = new Z_Word(id, row[i][0], row[i][1], row[i][2], row[i][3],  row[i][4], row[i][5], lesson, bYoji, pType);
            id++;
        }
    }

    if (pType) {
        // console.log(Z_Word.duoList);
    } else {
        // console.log(Z_Word.list);
    }
}

function z_w_createFailedList(pFile) {
    let row = pFile.split(/\r\n/);
    console.log(row);
    for (let i = 0; i < row.length; i++) {
        let arr = [];
        let tempArr = row[i].split(",");
        for (let j = 0; j < tempArr.length; j++) {
            arr.push(Z_Word.list[tempArr[j] - 1]); //? Z_Word.id - 1 ==> index de Z_Word.list[index]
        }
        Z_Word.failedList[i] = arr;
    }
    console.log(Z_Word.failedList);
}