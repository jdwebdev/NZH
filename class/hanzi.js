class Hanzi {

    static list = [];
    static failedList = [];
    static bushouListRAW = [
        "亻","讠","阝","刂","冖","冫","十","八","人","厂","力","卩","廴","勹","厶","匚","冂",
        "彳","女","氵","口","饣","忄","土","扌","子","纟","马","艹","宀","辶","囗","彡","广","夕","寸","大","小","门","巾","山","犭","尸","弓","丬","廾","尢","夂",
        "木","日","王","车","火","礻","攵","灬","心","方","手","止","户","曰","父","爫","月",
        "目","钅","衤","疒","穴","立","田","石","矢","罒","皿","禾","白","鸟",
        "⺮","米","覀","页","舌","缶","耳","虫","虍","舟",
        "足","走","角","身",
        "鱼","隹","雨","齿",
        "革","骨","音"
    ];
    static bushouList  = [
    {nb:2,key:["亻","讠","阝","刂","冖","冫","十","八","人"," ","力","卩","廴","勹","厶","匚","冂"]},
    {nb:3,key:["彳","女","氵","口","饣","忄","土","扌","子","纟","马","艹","宀","辶","囗","彡","广","夕","寸","大","小","门","巾","山","犭","尸","弓","丬","廾","尢","夂"]},
    {nb:4,key:["木","日","王","车","火","礻","攵","灬","心","方","手","止","户","曰","父","爫","月"]},
    {nb:5,key:["目","钅","衤","疒","穴","立","田","石","矢","罒","皿","禾","白","鸟"]},
    {nb:6,key:["⺮","米","覀","页","舌","缶","耳","虫","虍","舟"]},
    {nb:7,key:["足","走","角","身"]},
    {nb:8,key:["鱼","隹","雨","齿"]},
    {nb:9,key:["革","骨","音"]},
    {nb:10,key:[]},
    ];
    // let bushou  = [
    //     {nb:1,key:["丨","亅","丿","乛","一","乙","乚","丶"]},
    //     {nb:2,key:["八","勹","匕","冫","卜","厂","刀","刂","儿","二","匚","阝","丷","几","卩","冂","力","冖","凵","人","亻","入","十","厶","亠","讠","廴","又","匸","㔾","⺈","⺊","⺁"]},
    //     {nb:3,key:["艹","屮","彳","巛","川","辶","寸","大","飞","干","工","弓","廾","广","己","彐","彑","巾","口","马","门","宀","女","犭","山","彡","尸","饣","士","扌","氵","纟","巳","土","囗","兀","夕","小","忄","幺","弋","尢","夂","子","夊","丬","⺌"]},
    //     {nb:4,key:["贝","比","灬","长","车","歹","斗","厄","方","风","父","戈","户","火","旡","见","斤","耂","毛","木","牛","牜","片","攴","攵","气","欠","犬","日","氏","礻","手","殳","水","瓦","王","韦","文","毋","心","牙","爻","曰","月","爫","支","止","爪","卝","尣","戶","无","爿","禸","肀","龵","朩","冃","⺗"]},
    //     {nb:5,key:["白","癶","甘","瓜","禾","钅","立","龙","矛","皿","母","目","疒","鸟","皮","生","石","矢","示","罒","田","玄","穴","疋","衤","用","玉","业","歺","襾","氺"]},
    //     {nb:6,key:["耒","臣","虫","而","耳","缶","艮","虍","臼","米","齐","肉","色","舌","覀","页","行","血","羊","聿","至","舟","衣","竹","自","羽","糸","糹","先","网","老","舛","艸","辵","𦍌","⺶"]},
    //     {nb:7,key:["采","辰","赤","豆","谷","見","角","里","麦","身","豕","辛","言","酉","豸","走","足","貝","車","镸","克","卤","邑","釆"]},
    //     {nb:8,key:["青","雨","齿","非","金","釒","隶","門","飠","鱼","隹","長","阜","靑","靣","龺"]},
    //     {nb:9,key:["革","骨","鬼","面","首","香","音","頁","風","韋","韭","飛","食"]},
    //     {nb:10,key:["髟","高","鬲","馬","鬥","鬯"]},
    //     {nb:11,key:["黄","鹿","麻","鳥","鹵","麥","魚"]},
    //     {nb:12,key:["鼎","黑","黽","黍","黹","黃"]},
    //     {nb:13,key:["鼓","鼠"]},
    //     {nb:14,key:["鼻","齊"]},
    //     {nb:15,key:["齒"]},
    //     {nb:16,key:["龍","龜"]},
    //     {nb:17,key:["龠"]},
    // ];

    constructor(pId, pHanzi, pPinyin, pPinyinLizi, pLizi, pYisi = "", pFanti = "", pBushou = "") {

        this.id = pId;

        this.hanzi = pHanzi;
        this.pinyin = pPinyin;
        this.pinyinLizi = pPinyinLizi;
        this.lizi = pLizi;
        this.yisi = pYisi;
        this.fanti = pFanti;
        if (pBushou != "") {
            this.bushou = pBushou.split("|")[1];
            this.bushouMingcheng = pBushou.split("|")[0];
        }

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
    // console.log(row);
    for (let i = 0; i < row.length; i++) {
        let arr = [];
        let tempArr = row[i].split(",");
        for (let j = 0; j < tempArr.length; j++) {
            arr.push(Hanzi.list[tempArr[j] - 1]); //? hanzi.id - 1 ==> index de hanzi.list[index]
        }
        Hanzi.failedList[i] = arr;
    }
    // console.log(Hanzi.failedList);
}

function createHanzi(pFile) {
    let row = pFile.split(/\r\n|\n/);
    let test;
    for (let i = 1; i < row.length; i++) {
        row[i] = row[i].split('\t');
        //?              id,hanzi,     pinyin,    pinyinlizi,lizi,      yisi,      fanti,     bushou
        test = new Hanzi(i, row[i][0], row[i][2], row[i][3], row[i][4], row[i][5], row[i][1], row[i][8]);
    }

    // console.log(Hanzi.list);
}

class Z_Word {
    static list = [];
    static duoList = [];
    static lessonList = [];
    static failedList = [];
    static yojiList = [];

    constructor(pId, pWord, pPinyin, pYisi = "", pPinyinLizi = "", pLizi = "", pLesson = "", pYoji = false, pDuo = false) {

        this.id = pId;

        this.word = pWord;
        this.pinyin = pPinyin;
        this.yisi = pYisi;
        this.pinyinLizi = pPinyinLizi;
        this.lizi = pLizi;
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
            //?               id, word,      pinyin,    yisi,      pinyinLizi, lizi,    
            test = new Z_Word(id, row[i][0], row[i][1], row[i][2], row[i][3],  row[i][4], lesson, bYoji, pType);
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