/*
ーーー　アプリ　ーーー
日
中
한

ーーー　リスト検索　ーーー
漢字
単語

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
let activeBtn = "n";
let activeColor = "rgba(200,200,200,1)";
let inactiveColor = "rgba(217,160,102,1)";
let languagesList = ["n", "z", "h"];
let btnList = [];
let sectionList = [];
let switchModeBtn = document.getElementById("switchMode");
let currentMode = 0; //? 0: List | 1: Training

let resultSection = document.getElementById("result_section");    //!    Pour display

let modal = document.getElementById("modal");
let popup = document.getElementById("popup");
let bModal = false;

modal.addEventListener("click", e => closeModal());

languagesList.forEach(l => {
    btnList[l] = document.getElementById(l);
    sectionList[l] = document.getElementById(l+"_section")
    if (l == "n") {
        btnList[l].style.backgroundColor = activeColor;
    }
    btnList[l].addEventListener("click", e => changeLanguage(l));
});

changeLanguage("z");

function changeLanguage(l) {
    activeBtn = l;
    for (let key in btnList) {
        btnList[key].style.backgroundColor = inactiveColor;
        sectionList[key].style.display = "none";
    }
    btnList[activeBtn].style.backgroundColor = activeColor;
    sectionList[activeBtn].style.display = "flex";

    if (Hangul.lessonList.length > 0 && h_select_lesson.innerHTML == "") {
        let lessonHTML = "";
        lessonHTML = `<option value="all">모두</option>`;
        for(let i = 0; i < Hangul.lessonList.length; i++) {
            lessonHTML += `<option value="${Hangul.lessonList[i]}">${Hangul.lessonList[i]}</option>`;
        }
        h_select_lesson.innerHTML = lessonHTML;
    }

    switch(l) {
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

window.addEventListener("keypress", key => {
    if (key.code == "Enter") {
        // key.preventDefault();
    }
});