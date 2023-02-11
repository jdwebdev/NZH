class Hanzi {

    static list = [];

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

function readHANZIFile(pFile) {
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", pFile, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                tsvFile = rawFile.responseText;
                createHanzi(tsvFile);
            }
        }
    }
    rawFile.send(null);    
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

    constructor(pId, pWord, pPinyin, pYisi = "", pLizi = "", pLesson = "", pDuo = false) {

        this.id = pId;

        this.word = pWord;
        this.pinyin = pPinyin;
        this.yisi = pYisi;
        this.lizi = pLizi;
        this.lesson = pLesson;

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

function readZ_WORDFile(pFile, pType = 0) {
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", pFile, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                tsvFile = rawFile.responseText;
                createZ_WORD(tsvFile, pType);
            }
        }
    }
    rawFile.send(null);    
}

function createZ_WORD(pFile, pType) {
    let row = pFile.split(/\r\n|\n/);
    let test;
    let lesson = "";
    let id = 1;
    for (let i = 1; i < row.length; i++) {
        row[i] = row[i].split('\t');
        if (row[i][0][0] =="@") {
            lesson = row[i][0].split(' ')[1];
            Z_Word.lessonList.push(lesson);
        } else {
            //?               id, word,      pinyin,    yisi,      lizi,      
            test = new Z_Word(id, row[i][0], row[i][1], row[i][2], row[i][3], lesson, pType);
            id++;
        }
    }

    if (pType) {
        // console.log(Z_Word.duoList);
    } else {
        // console.log(Z_Word.list);
    }
}