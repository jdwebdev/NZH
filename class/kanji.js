class Kanji {

    static list = [];
    static failedList = [];

    constructor(pId, pKanji, pOnYomi, pKunYomi, pKakusuu, pBushu, pItaiji = "", pExHiragana = "", pExKanji = "", pPinyin = "") {

        this.id = pId;
        this.kanji = pKanji;
        this.onYomiList = pOnYomi.split("、");
        this.kunYomiList = pKunYomi.split("、");
        this.onYomi = pOnYomi;
        this.kunYomi = pKunYomi;
        this.kakusuu = pKakusuu;
        this.bushu = pBushu;
        this.exHiragana = pExHiragana;
        this.exKanji = pExKanji
        this.itaiji = pItaiji;
        this.pinyin = pPinyin;

        // this.exampleList = [];
        Kanji.list.push(this);
    }

    setExamples(pExamples) {
        this.exampleList = pExamples.split("、");
    }

    setItaiji(pList) {
        this.itaiji = pList;
    }

    setPinyin(pPinyin) {
        this.pinyin = pPinyin;
    }
}

readKANJIFile("./tsv/NZH - 漢字.tsv");
readKANJIFile("./failed/n_kanji_failed.txt");

function readKANJIFile(pFile) {
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", pFile, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                tsvFile = rawFile.responseText;
                if (pFile.includes("failed")) {
                    if (tsvFile == "") {
                    } else {
                        n_createFailedList(tsvFile);
                    }
                } else {
                    createKanji(tsvFile);
                }
            }
        }
    }
    rawFile.send(null);    
}

function n_createFailedList(pFile) {
    let row = pFile.split(/\r\n/);
    console.log(row);
    for (let i = 0; i < row.length; i++) {
        let arr = [];
        let tempArr = row[i].split(",");
        for (let j = 0; j < tempArr.length; j++) {
            arr.push(Kanji.list[tempArr[j] - 1]); //? Kanji.id - 1 ==> index de Kanji.list[index]
        }
        Kanji.failedList[i] = arr;
    }
    console.log(Kanji.failedList);
}

function createKanji(pFile) {
    let row = pFile.split(/\r\n|\n/);
    let test;
    for (let i = 1; i < row.length; i++) {
        row[i] = row[i].split('\t');
        //?                   漢字	    音読み	   訓読み	   画数	      部首	     異体字      れい	    例         拼音
        //?             pId, pKanji,   pOnYomi,   pKunYomi,  pKakusuu,  pBushu,    pItaiji,   pExH,      pExK,      pPinyin
        test = new Kanji(i, row[i][0], row[i][1], row[i][2], row[i][3], row[i][4], row[i][5], row[i][6], row[i][7], row[i][8]);
    }
    console.log(Kanji.list);
}