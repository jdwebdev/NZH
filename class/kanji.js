class Kanji {

    static list = [];

    constructor(pId, pKanji, pOnYomi, pKunYomi, pKakusuu = 0, pBushu = "") {

        this.id = pId;
        this.kanji = pKanji;
        this.onYomiList = pOnYomi.split("、");
        this.kunYomiList = pKunYomi.split("、");
        this.kakusuu = pKakusuu;
        // this.bushu = pBushu;
        let tmpBushu = pBushu.split("、");
        let tmpBushu2 = [];

        this.bushu = []
        tmpBushu.forEach(b => {
            if (b.includes("・")) {
                tmpBushu2 = b.split("・");
                tmpBushu2.forEach(tb => {
                    this.bushu.push(tb);
                });
            } else {
                this.bushu.push(b);
            }
        })
        this.exampleList = [];

        this.itaiji = "";
        this.pinyin = "";

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