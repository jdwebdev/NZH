/*
ーーー　アプリ　ーーー
日
中
한

ーーー　リスト検索　ーーー
漢字
単語
漢検レベルごと　(アプリで見たレベルでいい)

汉字
单词

단어


ーーー　ゲーム　ーーー
日本語
    漢字
        教育漢字
            学年
        残りの漢字
        表外
        全部
    単語
        漢検で見た単語？
        四字熟語

中文
    汉字
    单词 
        本気で学ぶ中国語
            初級１・２　中級１・２
                レッスンごと
        别的
    
한국어
    단어
        できる韓国語
        
*/

let log = console.log.bind();

let WORD_LIST = [];                                               //!    Pour display

let body = document.getElementsByTagName("body")[0];
let mainListing = id("main_listing");
let mainTraining = id("main_training");
mainTraining.style.display = "none";
let activeBtn = "n";
let activeColor = "rgba(200,200,200,1)";
let inactiveColor = "rgba(217,160,102,1)";
let languagesList = ["n", "z", "h"];
let btnList = [];
let sectionList = [];
let sectionTrainingList = [];
let switchModeBtn = id("switchMode");
switchModeBtn.addEventListener("click", e => {
    e.preventDefault();
    switchMode();
});
let currentMode = 0; //? 0: List | 1: Training

let resultSection = id("result_section");    //!    Pour display

let modal = id("modal");
let popup = id("popup");
let bModal = false;

// popup.addEventListener("click", e => e.stopPropagation());
modal.addEventListener("click", e => closeModal());

languagesList.forEach(l => {
    btnList[l] = id(l);
    sectionList[l] = id(l+"_section");
    sectionTrainingList[l] = id(l+"t_section");
    if (l == "n") {
        btnList[l].style.backgroundColor = activeColor;
    }
    btnList[l].addEventListener("click", e => {
        e.preventDefault();
        changeLanguage(l);
    });
});

// changeLanguage("z");
changeLanguage("n");

function changeLanguage(l) {
    activeBtn = l;
    for (let key in btnList) {
        btnList[key].style.backgroundColor = inactiveColor;
        sectionList[key].style.display = "none";
        sectionTrainingList[key].style.display = "none";
    }
    btnList[activeBtn].style.backgroundColor = activeColor;
    sectionList[activeBtn].style.display = "flex";
    sectionTrainingList[activeBtn].style.display = "flex";

    if (Hangul.lessonList.length > 0 && h_select_lesson.innerHTML == "") {
        let lessonHTML = "";
        lessonHTML = `<option value="all">모두</option>`;
        for(let i = Hangul.lessonList.length-1; i >= 0; i--) {
            lessonHTML += `<option value="${Hangul.lessonList[i]}">${Hangul.lessonList[i]}</option>`;
        }
        h_select_lesson.innerHTML = lessonHTML;
    }

    changeSwitchBtnLabel(l);
}

function changeSwitchBtnLabel(pLanguage) {
    switch(pLanguage) {
        case "n":
            switchModeBtn.innerHTML = currentMode == 0 ? "練習" : "リスト";
            break;
        case "z":
            switchModeBtn.innerHTML = currentMode == 0 ? "练习" : "列表";
            break;
        case "h":
            switchModeBtn.innerHTML = currentMode == 0 ? "연습" : "리스트";
            break;
    }
}

function switchMode() {
    if (currentMode) {//? Training to Listing
        currentMode = 0;
        mainListing.style.display = "block";
        mainTraining.style.display = "none";
    } else {

        if (Kanji.failedList.length > 0 && !b_nt_k_FailedAlreadyInserted) {
            b_nt_k_FailedAlreadyInserted = true;
            let count = 0;
            Kanji.failedList.forEach(k => {
                nt_select_filter.innerHTML += `
                    <option value="NK_${count}">K_${count+1}</option>
                `;
                count++;
            });
        }

        if (Hanzi.failedList.length > 0 && !b_zt_h_FailedAlreadyInserted) {
            b_zt_h_FailedAlreadyInserted = true;
            let count = 0;
            Hanzi.failedList.forEach(h => {
                zt_select_filter.innerHTML += `
                    <option value="ZH_${count}">H_${count+1}</option>
                `;
                count++;
            });
        }
        if (Z_Word.failedList.length > 0 && !b_zt_w_FailedAlreadyInserted) {
            b_zt_w_FailedAlreadyInserted = true;
            let count = 0;
            Z_Word.failedList.forEach(h => {
                zt_select_filter.innerHTML += `
                    <option value="ZW_${count}">W_${count+1}</option>
                `;
                count++;
            });
        }

        if (Hangul.failedList.length > 0 && !b_ht_w_FailedAlreadyInserted) {
            b_ht_w_FailedAlreadyInserted = true;
            let count = 0;
            Hangul.failedList.forEach(h => {
                ht_select_filter.innerHTML += `
                    <option value="HW_${count}">W_${count+1}</option>
                `;
                count++;
            });
        }

        currentMode = 1;
        mainListing.style.display = "none";
        mainTraining.style.display = "block";
    }
    changeSwitchBtnLabel(activeBtn);
}

function openModal() {
    bModal = true;
    body.classList.add("no-scroll");
    editClass(modal, "fadeIn",true);
    modal.style.zIndex = 10;
}

function closeModal() {
    modal.classList.remove("fadeIn");
    if (bModal) {
        body.classList.remove("no-scroll");
        bModal = false;
    }
}

modal.addEventListener("transitionend", e => {
    if (bModal) {
        modal.style.zIndex = 10;
    } else {
        modal.style.zIndex = -10;
    }
})


function editClass(e, pClass, pAdd = true) {
    if (pAdd) {
        e.classList.add(pClass);
    } else {
        e.classList.remove(pClass);
    }
}

//? 日本語のために取っておく
function displayResult(pActiveBtn, obj, pType = "") {
    if (obj == "") {
        resultSection.innerHTML = "<p style='font-size: 50px; margin-top: 30px;'>無</p>";
    } else {
        switch(pActiveBtn) {
            case "n":
                if (pType == "Kanji") {
                    obj.forEach(o => {
                        WORD_LIST[o._id + "_nk"] = o;
                        resultSection.innerHTML += `
                            <div id="${o._id}_nk" class="oneResult" onclick="openEditModal(this, this.id)">
                                <div class="word_container">
                                    <div class="kanji">${o.kanji}</div>
                                    <div class="kakusuu">${o.kakusuu}</div>
                                    <div class="bushu">${o.bushu}</div>
                                </div>
                                <div class="word_details">
                                    <p class="onyomi"><span class="category">音　</span>${o.onyomi}</p>
                                    <p class="kunyomi"><span class="category">訓　</span>${o.kunyomi}</p>
                                    <p><span class="category">例　</span>${o.examples}</p>
                                </div>
                                <div class="sonota">
                                    <p class="kyuu">${(o.kyuujitai != "" ? o.kyuujitai : "-")  }</p>
                                    <p class="zh_font">${o.meaning_z}</p>
                                    <p class="pinyin zh_font">${o.pinyin}</p>
                                    <p>${o.meaning_h}</p>
                                </div>
                            </div>
                        `;
                    });
                } else {
                    let fontSize = 40;
                    obj.forEach(o => {
                        WORD_LIST[o._id + "_nw"] = o;
                        resultSection.innerHTML += `
                            <div id="${o._id}_nw"class="oneResult" onclick="openEditModal(this, this.id)">
                                <div class="word_container">
                                    <div class="word_n" style="font-size: ${fontSize}px">${o.word}</div>
                                </div>
                                <div class="word_details">
                                    <p class="yomi_n"><span class="category">読み　</span>${o.yomi}</p>
                                    <p><span class="category">意味　</span>${o.meaning}</p>
                                    <p><span class="category">例　</span>${o.examples}</p>
                                </div>
                                <div class="sonota_n">
                                    <p class="meaning_z zh_font">${o.meaning_z}</p>
                                    <p class="pinyin zh_font">${o.pinyin}</p>
                                    <p class="meaning_h">${o.meaning_h}</p>
                                </div>
                            </div>
                        `;
                    });
                }
                break;
        }
    }
}

function emptyInput() {
    let inputList = document.querySelectorAll("input");
    inputList.forEach(i => {
        i.value = "";
    });
}
function id(pId) {
    return document.getElementById(pId);
}
function rnd(pMin, pMax) { //? pMax NON COMPRIS
    return Math.floor(Math.random() * (pMax - pMin)) + pMin;
}

function cleanPinyin(pPinyin) {
    let a = "āáǎà";
    let i = "īíǐì";
    let u = "ūúǔùǖǘǚǜ";
    let e = "ēéěè";
    let o = "ōóǒò";
    let cleanedPinyin = "";
    
    for (let j = 0; j < pPinyin.length; j++) {
        if (a.includes(pPinyin[j])) {
            cleanedPinyin += "a";
        } else if (i.includes(pPinyin[j])) {
            cleanedPinyin += "i";
        } else if (u.includes(pPinyin[j])) {
            cleanedPinyin += "u";
        } else if (e.includes(pPinyin[j])) {
            cleanedPinyin += "e";
        } else if (o.includes(pPinyin[j])) {
            cleanedPinyin += "o";
        } else {
            cleanedPinyin += pPinyin[j];
        }
    }
    return cleanedPinyin;
}

window.addEventListener("keypress", key => {
    if (key.code == "Enter") {
        // key.preventDefault();
    }
});