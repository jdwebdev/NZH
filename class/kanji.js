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
// readKANJIFile("./failed/n_kanji_failed.txt");

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
    // console.log(row);
    for (let i = 0; i < row.length; i++) {
        let arr = [];
        let tempArr = row[i].split(",");
        for (let j = 0; j < tempArr.length; j++) {
            arr.push(Kanji.list[tempArr[j] - 1]); //? Kanji.id - 1 ==> index de Kanji.list[index]
        }
        Kanji.failedList[i] = arr;
    }
    // console.log(Kanji.failedList);
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
    // console.log(Kanji.list);
}

let joyo = `
    亜亞哀挨愛曖悪惡握圧壓扱宛嵐安案暗以衣位囲圍医醫依委威為爲畏胃尉異移萎偉椅彙意違維慰遺緯域育一壱壹逸茨芋引印因咽姻員院淫陰飲
    飮隠隱韻右宇羽羽雨唄鬱畝浦運雲永泳英映栄榮営營詠影鋭銳衛衞易疫益益液駅驛悦悅越謁閲閱円圓延沿炎怨宴媛援園煙猿遠鉛塩鹽演縁緣艶
    艷汚王凹央応應往押旺欧歐殴毆桜櫻翁奥奧横橫岡屋億憶臆虞乙俺卸音恩温溫穏穩下化火加可仮假何花佳価價果河苛科架夏家荷華菓貨渦過嫁
    暇禍禍靴寡歌箇稼課蚊牙瓦我画畫芽賀雅餓介回灰会會快戒改怪拐悔悔海海界皆械絵繪開階塊楷解潰壊壞懐懷諧貝外劾害崖涯街慨慨蓋該概槪
    骸垣柿各角拡擴革格核殻殼郭覚覺較隔閣確獲嚇穫学學岳嶽楽樂額顎掛潟括活喝渇渴割葛滑褐轄且株釜鎌刈干刊甘汗缶罐完肝官冠巻卷看陥陷
    乾勘患貫寒喚堪換敢棺款間閑勧勸寛寬幹感漢慣管関關歓歡監緩憾還館環簡観觀韓艦鑑丸含岸岩玩眼頑顔顏願企伎危机気氣岐希忌汽奇祈祈季
    紀軌既旣記起飢鬼帰歸基寄規亀龜喜幾揮期棋貴棄毀旗器器畿輝機騎技宜偽僞欺義疑儀戯戲擬犠犧議菊吉喫詰却客脚逆虐九久及弓丘旧舊休吸
    朽臼求究泣急級糾宮救球給嗅窮牛去巨居拒拠據挙擧虚虛許距魚御漁凶共叫狂京享供協況峡峽挟挾狭狹恐恭胸脅強教敎郷鄕境橋矯鏡競響響驚
    仰暁曉業凝曲局極玉巾斤均近金菌勤勤琴筋僅禁緊錦謹謹襟吟銀区區句苦駆驅具惧愚空偶遇隅串屈掘窟熊繰君訓勲勳薫薰軍郡群兄刑形系径徑
    茎莖係型契計恵惠啓掲揭渓溪経經蛍螢敬景軽輕傾携継繼詣慶憬稽憩警鶏鷄芸藝迎鯨隙劇撃擊激桁欠缺穴血決結傑潔月犬件見券肩建研硏県縣
    倹儉兼剣劍拳軒健険險圏圈堅検檢嫌献獻絹遣権權憲賢謙鍵繭顕顯験驗懸元幻玄言弦限原現舷減源厳嚴己戸戶古呼固股虎孤弧故枯個庫湖雇誇
    鼓錮顧五互午呉吳後娯娛悟碁語誤護口工公勾孔功巧広廣甲交光向后好江考行坑孝抗攻更効幸拘肯侯厚恒恆洪皇紅荒郊香候校耕航貢降高康控
    梗黄黃喉慌港硬絞項溝鉱鑛構綱酵稿興衡鋼講購乞号號合拷剛傲豪克告谷刻国國黒黑穀穀酷獄骨駒込頃今困昆恨根婚混痕紺魂墾懇左佐沙査砂
    唆差詐鎖座挫才再災妻采砕碎宰栽彩採済濟祭斎齋細菜最裁債催塞歳歲載際埼在材剤劑財罪崎作削昨柵索策酢搾錯咲冊册札刷刹拶殺殺察撮擦
    雑雜皿三山参參桟棧蚕蠶惨慘産產傘散算酸賛贊残殘斬暫士子支止氏仕史司四市矢旨死糸絲至伺志私使刺始姉枝祉祉肢姿思指施師恣紙脂視視
    紫詞歯齒嗣試詩資飼飼誌雌摯賜諮示字寺次耳自似児兒事侍治持時滋慈辞辭磁餌璽鹿式識軸七𠮟失室疾執湿濕嫉漆質実實芝写寫社社車舎舍者
    者射捨赦斜煮煮遮謝邪蛇勺尺借酌釈釋爵若弱寂手主守朱取狩首殊珠酒腫種趣寿壽受呪授需儒樹収收囚州舟秀周宗拾秋臭臭修袖終羞習週就衆
    集愁酬醜蹴襲十汁充住柔重従從渋澁銃獣獸縦縱叔祝祝宿淑粛肅縮塾熟出述術俊春瞬旬巡盾准殉純循順準潤遵処處初所書庶暑暑署署緒緖諸諸
    女如助序叙敍徐除小升少召匠床抄肖尚尙招承昇松沼昭宵将將消症祥祥称稱笑唱商渉涉章紹訟勝掌晶焼燒焦硝粧詔証證象傷奨奬照詳彰障憧衝
    賞償礁鐘上丈冗条條状狀乗乘城浄淨剰剩常情場畳疊蒸縄繩壌壤嬢孃錠譲讓醸釀色拭食植殖飾触觸嘱囑織職辱尻心申伸臣芯身辛侵信津神神唇
    娠振浸真眞針深紳進森診寝寢慎愼新審震薪親人刃仁尽盡迅甚陣尋腎須図圖水吹垂炊帥粋粹衰推酔醉遂睡穂穗錘随隨髄髓枢樞崇数數据杉裾寸
    瀬瀨是井世正生成西声聲制姓征性青靑斉齊政星牲省凄逝清淸盛婿晴晴勢聖誠精精製誓静靜請整醒税稅夕斥石赤昔析席脊隻惜戚責跡積績籍切
    折拙窃竊接設雪摂攝節節説說舌絶絕千川仙占先宣専專泉浅淺洗染扇栓旋船戦戰煎羨腺詮践踐箋銭錢銑潜潛線遷選薦繊纖鮮全前善然禅禪漸膳
    繕狙阻祖祖租素措粗組疎訴塑遡礎双雙壮壯早争爭走奏相荘莊草送倉捜搜挿揷桑巣巢掃曹曽曾爽窓創喪痩瘦葬装裝僧僧想層層総總遭槽踪操燥
    霜騒騷藻造像増增憎憎蔵藏贈贈臓臟即卽束足促則息捉速側測俗族属屬賊続續卒率存村孫尊損遜他多汰打妥唾堕墮惰駄太対對体體耐待怠胎退
    帯帶泰堆袋逮替貸隊滞滯態戴大代台臺第題滝瀧宅択擇沢澤卓拓託濯諾濁但達脱脫奪棚誰丹旦担擔単單炭胆膽探淡短嘆嘆端綻誕鍛団團男段断
    斷弾彈暖談壇地池知値恥致遅遲痴稚置緻竹畜逐蓄築秩窒茶着嫡中仲虫蟲沖宙忠抽注昼晝柱衷酎鋳鑄駐著著貯丁弔庁廳兆町長挑帳張彫眺釣頂
    鳥朝脹貼超腸跳徴徵嘲潮澄調聴聽懲懲直勅捗沈珍朕陳賃鎮鎭追椎墜通痛塚塚漬坪爪鶴低呈廷弟定底抵邸亭貞帝訂庭逓遞停偵堤提程艇締諦泥
    的笛摘滴適敵溺迭哲鉄鐵徹撤天典店点點展添転轉塡田伝傳殿電斗吐妬徒途都都渡塗賭土奴努度怒刀冬灯燈当當投豆東到逃倒凍唐島桃討透党
    黨悼盗盜陶塔搭棟湯痘登答等筒統稲稻踏糖頭謄藤闘鬪騰同洞胴動堂童道働銅導瞳峠匿特得督徳德篤毒独獨読讀栃凸突突届屆屯豚頓貪鈍曇丼
    那奈内內梨謎鍋南軟難難二尼弐貳匂肉虹日入乳尿任妊忍認寧熱年念捻粘燃悩惱納能脳腦農濃把波派破覇馬婆罵拝拜杯背肺俳配排敗廃廢輩売
    賣倍梅梅培陪媒買賠白伯拍泊迫剝舶博薄麦麥漠縛爆箱箸畑肌八鉢発發髪髮伐抜拔罰閥反半氾犯帆汎伴判坂阪板版班畔般販斑飯飯搬煩頒範繁
    繁藩晩番蛮蠻盤比皮妃否批彼披肥非卑卑飛疲秘祕被悲扉費碑碑罷避尾眉美備微鼻膝肘匹必泌筆姫姬百氷表俵票評漂標苗秒病描猫品浜濱貧賓
    賓頻頻敏敏瓶甁不夫父付布扶府怖阜附訃負赴浮婦符富普腐敷膚賦譜侮侮武部舞封風伏服副幅復福福腹複覆払拂沸仏佛物粉紛雰噴墳憤奮分文
    聞丙平兵併倂並柄陛閉塀塀幣弊蔽餅米壁璧癖別蔑片辺邊返変變偏遍編弁辨瓣辯便勉勉歩步保哺捕補舗舖母募墓慕暮簿方包芳邦奉宝寶抱放法
    泡胞俸倣峰砲崩訪報蜂豊豐飽褒縫亡乏忙坊妨忘防房肪某冒剖紡望傍帽棒貿貌暴膨謀頰北木朴牧睦僕墨墨撲没沒勃堀本奔翻凡盆麻摩磨魔毎每
    妹枚昧埋幕膜枕又末抹万萬満滿慢漫未味魅岬密蜜脈妙民眠矛務無夢霧娘名命明迷冥盟銘鳴滅免免面綿麺麵茂模毛妄盲耗猛網目黙默門紋問匁
    冶夜野弥彌厄役約訳譯薬藥躍闇由油喩愉諭輸癒唯友有勇幽悠郵湧猶裕遊雄誘憂融優与與予豫余餘誉譽預幼用羊妖洋要容庸揚揺搖葉陽溶腰様
    樣瘍踊窯養擁謡謠曜抑沃浴欲翌翼拉裸羅来來雷頼賴絡落酪辣乱亂卵覧覽濫藍欄欄吏利里理痢裏履璃離陸立律慄略柳流留竜龍粒隆隆硫侶旅虜
    虜慮了両兩良料涼猟獵陵量僚領寮療瞭糧力緑綠林厘倫輪隣臨瑠涙淚累塁壘類類令礼禮冷励勵戻戾例鈴零霊靈隷齢齡麗暦曆歴歷列劣烈裂恋戀
    連廉練練錬鍊呂炉爐賂路露老労勞弄郞朗浪廊廊楼樓漏籠六録錄麓論和話賄脇惑枠湾灣腕
    伍肆
`;
let kinshiChar = `
    abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ÀÁÂÄÇÉÈÊËÍÌÎÏÑÓÒÔÖÚÙÛÜĀÁǍÀĪÍǏÌŌÓǑÒĒÉĚÈŪÚǓÙÜǕǗǙǛ
    āáǎàâäīíǐìîïūúǔùǖǘǚǜûüēéěèêëōóǒòôö²&()-_ç=²+°~#{}[]|\ ^@€*$¨£µ%!:;,?./§<>
    ‘！＠＃＄％＾＆＊（）ー＝＿＋￥」「｜｝｛’；”：・。、？＞＜￥｜～゛
    あﾞいﾞ
    あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゐゆゑよらりるれろわをんあ゙あﾞいﾞゔ
    がぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽぁぃぅぇぉゃゅょっ
    アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤヰユヱヨラリルレロワヲンア゙ヴエﾞ
    ガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポァィゥェォャュョッ
`;

//? -------- マノン --------
class MKanji {
    static id = 0;
    static list = [];
    static tmpList = [];
    static kanjiSoloList = [];

    constructor(pKanji) {

        this.id = MKanji.id;
        MKanji.id++;
        this.kanji = pKanji;
        this.vocList = [];
        this.yomi = MKanji.kanjiSoloList[this.kanji];

        MKanji.list.push(this);

        // console.log(this.kanji + " : " + this.yomi);
    }

    addVoc(pWord, pYomi, pImi) {
        this.vocList.push({
            word: pWord,
            yomi: pYomi,
            imi: pImi
        });
    }
}

readMKANJISoloFile("./tsv/マノン達の漢字 - マノン・漢字.tsv");
function readMKANJISoloFile(pFile) {
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", pFile, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                tsvFile = rawFile.responseText;
                addKanjiSoloToList(tsvFile);
            }
        }
    }
    rawFile.send(null);    
}

function addKanjiSoloToList(pFile) {
    let row = pFile.split(/\r\n|\n/);
    let test;
    for (let i = 1; i < row.length; i++) {
        row[i] = row[i].split('\t');
        //?         漢字       読み     
        //?         pKanji,    pYomi,
        MKanji.kanjiSoloList[row[i][0]] = row[i][1];
    }
    readMKANJIFile("./tsv/マノン達の漢字 - マノン・単語帳.tsv");
}

function readMKANJIFile(pFile) {
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", pFile, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                tsvFile = rawFile.responseText;
                createMKanji(tsvFile);
            }
        }
    }
    rawFile.send(null);    
}

function createMKanji(pFile) {
    let row = pFile.split(/\r\n|\n/);
    let test;
    for (let i = 1; i < row.length; i++) {
        row[i] = row[i].split('\t');
        //?         漢字       読み	      意味
        //?         pKanji,    pYomi,     pImi,  
        filterKanji(row[i][0], row[i][1], row[i][2]);
    }
    // console.log(Kanji.list);
}

function filterKanji(pWord, pYomi, pImi) {
    let bAlreadyExist = false;
    let kanjiToAdd = "";
    for (let i = 0; i < pWord.length; i++) {
        kanjiToAdd = pWord[i];
        if (joyo.includes(kanjiToAdd) && !kinshiChar.includes(kanjiToAdd)) {
            bAlreadyExist = false;
            for(let j = 0; j < MKanji.list.length; j++) {
                if (MKanji.list[j].kanji == kanjiToAdd) {
                    bAlreadyExist = true;
                    MKanji.list[j].addVoc(pWord,pYomi,pImi);
                }
            }
            if (!bAlreadyExist) {
                test = new MKanji(kanjiToAdd);
                test.addVoc(pWord,pYomi,pImi);
            }

        } else if (kinshiChar.includes(kanjiToAdd)) {
            // console.log("JANAI : " + kanjiToAdd);
        } else {
            console.log("To Check : " + kanjiToAdd);
        }
    }

    //?                   漢字	    読み	   意味
    //?             pId, pKanji,    pYomi,     pImi,  
    // test = new MKanji(i, row[i][0], row[i][1], row[i][2]);
}

//? -------- みんなの日本語 --------
class MinnaWord {
    static list = [];
    static lessonList = [];

    constructor(pId, pWordKanji, pWordKana, pImi, pLesson) {
        this.id = pId;
        if (pWordKanji != "-") {
            this.wordKanji = pWordKanji;
        } else {
            this.wordKanji = "";
        }
        this.wordKana = pWordKana;
        this.imi = pImi;
        this.lesson = pLesson;
        MinnaWord.list.push(this);
    }
}

readMinnaWordFile("./tsv/マノン達の漢字 - マーニョン・みんなの日本語.tsv");
function readMinnaWordFile(pFile) {
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", pFile, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                tsvFile = rawFile.responseText;
                createMinnaWord(tsvFile);
            }
        }
    }
    rawFile.send(null);    
}

function createMinnaWord(pFile) {
    let row = pFile.split(/\r\n|\n/);
    let newWord;
    let lesson;
    let id = 1;
    for (let i = 1; i < row.length; i++) {
        row[i] = row[i].split('\t');
        if (row[i][0] == "") {
            i = row.length;
        } else {
            if (row[i][0][0] == "@") {
                lesson = row[i][0].split('第')[1]; //? @第14課 => 14課
                lesson = lesson.split('課')[0]; //? 14課 => 14
                MinnaWord.lessonList.push(lesson);
            } else {
                //?                               漢字        読み	      意味,  レッソン
                //?                         pId   pWordKanji, pWordKana, pImi,  pLesson
                newWord = new MinnaWord(id,row[i][0], row[i][1], row[i][2], lesson);
                id++;
            }
        }
    }
    readMinnaKANJIFile("./tsv/マノン達の漢字 - マーニョン・みんなの日本語 - 漢字.tsv");
    console.log(MinnaWord.list);
    let sel_lesson = document.getElementById("n_select_lesson");
    let innerHTML = "";
    innerHTML += `<option value="all">All</option>`
    MinnaWord.lessonList.forEach(l => {
        innerHTML += `<option value="${l}">${l}</option>`
    });
    sel_lesson.innerHTML = innerHTML;
}

class MinnaKanji {
    static id = 0;
    static list = [];
    static tmpList = [];
    static kanjiSoloList = [];

    constructor(pKanji, pOn, pKun) {

        this.id = MinnaKanji.id;
        MinnaKanji.id++;
        this.kanji = pKanji;
        this.on = pOn;
        this.kun = pKun;
        this.vocList = [];

        MinnaKanji.list.push(this);
        // console.log(this.kanji + " : " + this.yomi);
    }

    addVoc(pWord, pYomi, pImi) {
        this.vocList.push({
            word: pWord,
            yomi: pYomi,
            imi: pImi
        });
    }
}

function readMinnaKANJIFile(pFile) {
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", pFile, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                tsvFile = rawFile.responseText;
                createMinnaKanji(tsvFile);
            }
        }
    }
    rawFile.send(null);    
}

function createMinnaKanji(pFile) {
    let row = pFile.split(/\r\n|\n/);
    let newKanji;
    for (let i = 1; i < row.length; i++) {
        row[i] = row[i].split('\t');
        //?                       漢字	     音読み      訓読み	     
        //?                       pKanji,    pOn,       pKun  
        newKanji = new MinnaKanji(row[i][0], row[i][1], row[i][2]);
        for (let j = 0; j < MinnaWord.list.length; j++) {
            if (MinnaWord.list[j].wordKanji.includes(newKanji.kanji)) {
                newKanji.addVoc(MinnaWord.list[j].wordKanji, MinnaWord.list[j].wordKana, MinnaWord.list[j].imi);
            }
        }
    }
    console.log(MinnaKanji.list);
    // console.log(Kanji.list);
}

