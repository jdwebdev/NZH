/*
一　一～林　1～80
二　引～話　81～240
三　悪～和　241～440
四　愛～録　441～640
五　圧～領　641～825
六　異～論　826～1006
*/
let nt_mode = "kanji";
let b_nt_k_FailedAlreadyInserted = false;
let b_nt_w_FailedAlreadyInserted = false;
let nt_randomList = [];
let nt_winList = [];
let nt_failList = [];
let nt_select = id("nt_select");
let nt_select_filter = id("nt_select_filter");
let nt_select_lesson = id("nt_select_lesson");

nt_select_lesson.style.display = "none";
let nt_range_input = id("nt_range_input");
nt_range_input.style.display = "none";

let nt_all_option = id("nt_all_option");
let nt_random_option = id("nt_random_option");
let nt_lesson_option = id("nt_lesson_option");

let nt_end = id("nt_end");
let nt_start = id("nt_start");

let nt_startBtn = id("nt_startBtn");

nt_select.addEventListener("change", e => {
    nt_all_option.selected = true;
    nt_selectFilterChange("all");
    let count = 0;
    switch (nt_select.value) {
        case "kanji":
            nt_select_filter.innerHTML = `
                <option id="nt_all_option" value="all" selected>全部</option>
                <option value="xy">X-Y</option>
                <option id="nt_random_option" value="xrandom">x-rd</option>
            `;
            
            Kanji.failedList.forEach(h => {
                nt_select_filter.innerHTML += `
                    <option value="NK_${count}">K_${count+1}</option>
                `;
                count++;
            });
            fanti_check_div.style.display = "flex";
            spec_check_div.style.display = "none";
            break;
        case "word":
            nt_select_filter.innerHTML = `
                <option id="nt_all_option" value="all" selected>全部</option>
                <option id="nt_lesson_option" value="lesson">课</option>
                <option value="xy">X-Y</option>
            `;

            n_Word.failedList.forEach(h => {
                nt_select_filter.innerHTML += `
                    <option value="ZW_${count}">W_${count+1}</option>
                `;
                count++;
            });
            fanti_check_div.style.display = "none";
            spec_check_div.style.display = "flex";
            break;

    }

});
nt_select_filter.addEventListener("change", e => {
    nt_selectFilterChange(nt_select_filter.value);
});
nt_startBtn.addEventListener("click", e => {
    e.preventDefault();
    nt_startTraining();
})

function nt_selectFilterChange(pOption) {
    switch (pOption) {
        case "all":
            nt_range_input.style.display = "none";
            nt_select_lesson.style.display = "none";
            break;
        case "xy":
            nt_range_input.style.display = "flex";
            nt_end.style.display = "flex";
            nt_select_lesson.style.display = "none";
            break;
        case "xrandom":
            nt_range_input.style.display = "flex";
            nt_end.style.display = "none";
            nt_select_lesson.style.display = "none";
            break;
    }
}

let nt_currentIndex = 0;

function nt_startTraining() {
    nt_failList = [];
    nt_winList = [];
    if (nt_nextBtn_container != null) {
        nt_nextBtn_container.innerHTML = "";
    }
    let filter = nt_select_filter.value;
    nt_randomList = [];
    nt_currentIndex = 0;
    nt_mode = nt_select.value;
    //? Check filters
    switch (nt_mode) {
        case "kanji": //? Kanji.list
            if (filter == "all") {
                for (let i = 0; i < Kanji.list.length; i++) {
                    nt_randomList.push(Kanji.list[i]);
                }

            } else if (filter == "xy") {

                let sKanji = "";
                Kanji.list.forEach(k => {
                    sKanji += k.kanji;
                });
                // log(sKanji);

                for (let i = parseInt(nt_start.value)-1; i < parseInt(nt_end.value); i++) {
                    nt_randomList.push(Kanji.list[i]);
                }
                log("xy : ");
                sKanji = "";
                nt_randomList.forEach(k => {
                    sKanji += k.kanji;
                });
                log(sKanji.length);
                log(sKanji);

            } else if (filter.includes("NK_")) {
                filter = filter.slice(3);
                log("filter kanji : " + filter)
                for (let i = 0; i < Kanji.failedList[filter].length; i++) {
                    nt_randomList.push(Kanji.failedList[filter][i]);
                }
            }
            nt_randomList = nt_randomizeList(nt_randomList);
            nt_kanjiDisplayTraining();
            break;
        case "word": //? n_Word.lessonList
            if (filter == "all") {
                for (let i = 0; i < n_Word.list.length; i++) {
                    if (!spec_check.checked || (spec_check.checked && n_Word.list[i].spec != "")) {
                        nt_randomList.push(n_Word.list[i]);
                    }
                }
            } else if (filter == "xy") {
                for (let i = parseInt(nt_start.value)-1; i < parseInt(nt_end.value); i++) {
                    nt_randomList.push(n_Word.list[i]);
                }
            } else if (filter == "lesson") {
                for (let i = 0; i < n_Word.list.length; i++) {
                    if (n_Word.list[i].lesson == nt_select_lesson.value) {
                        if (!spec_check.checked || (spec_check.checked && n_Word.list[i].spec != "")) {
                            nt_randomList.push(n_Word.list[i]);
                        }
                    }
                }
            } else if (filter.includes("ZW_")) {
                filter = filter.slice(3);
                log("filter word : " + filter)
                for (let i = 0; i < n_Word.failedList[filter].length; i++) {
                    nt_randomList.push(n_Word.failedList[filter][i]);
                }
            }
            nt_randomList = nt_randomizeList(nt_randomList);
            nt_ZWordDisplayTraining();
            break;

    }

}

let nt_kanji; let nt_itaiji; let nt_n; let nt_lizi; let nt_n_btn; let nt_kakunin;
let nt_word;
let nt_nextBtn_container = null;
let n_training_section = id("n_training_section");
let nt_progressBar;

function nt_kanjiDisplayTraining() {
    let innerHTML = "";
    n_training_section.innerHTML = "";
    innerHTML = `
        <div id="nt_progressBar" class="progressBar"><span id="currentIndex">${nt_currentIndex+1}</span></div>
        <p id="nt_kanji" class="toFound">?</p>
        <p id="nt_itaiji" class="itaijiToFound">${nt_randomList[nt_currentIndex].itaiji != "" ? "?" : ""}</p>
        <p class="nt_p">${nt_randomList[nt_currentIndex].onYomi}</p>
        <p class="nt_p">${nt_randomList[nt_currentIndex].kunYomi}</p>
        <p class="nt_p">${nt_randomList[nt_currentIndex].exHiragana}</p>
        <p id="nt_exK" class="nt_p">?</p>
        <button id="nt_kakunin">確認</button>
        <div id="nt_nextBtn_container"></div>
    `;
    n_training_section.innerHTML = innerHTML;
    
    nt_progressBar = id("nt_progressBar");
    nt_progressBar.style.width = (nt_currentIndex / nt_randomList.length) * 100 + "%";
    nt_nextBtn_container = id("nt_nextBtn_container");
    nt_kanji = id("nt_kanji");
    nt_itaiji = id("nt_itaiji");
    nt_exK = id("nt_exK");
    
    nt_kakunin = id("nt_kakunin");
    nt_kakunin.addEventListener("click", e => {
        e.preventDefault();
        nt_kanji.innerHTML = nt_randomList[nt_currentIndex].kanji;
        nt_itaiji.innerHTML = nt_randomList[nt_currentIndex].itaiji;
        nt_exK.innerHTML = nt_randomList[nt_currentIndex].exKanji;
        nt_nextBtn_container.innerHTML = `
            <button id="nt_fail" onclick="nt_next(false)">ダメ</button>
            <button id="nt_win" onclick="nt_next(true)">正解</button>
        `;
    });
    
}

function nt_ZWordDisplayTraining() {
    let innerHTML = "";
    n_training_section.innerHTML = "";
    innerHTML = `
        <div id="nt_progressBar" class="progressBar"><span id="currentIndex">${nt_currentIndex+1}</span></div>
        <p id="nt_word" class="toFound">?</p> <!--时-->
        <p class="nt_p">${nt_randomList[nt_currentIndex].pinyin}</p>
        <div class="nt_p nt_nihongo">
            <p id="nt_n" class="">${nt_randomList[nt_currentIndex].yisi != "" ? "?" : ""}</p> <!-- yisi -->
            <button id="nt_n_btn" class="nt_n_btn">日</button>
        </div>
        <p id="" class="nt_p">${nt_randomList[nt_currentIndex].pinyinLizi}</p> <!---->
        <p id="nt_exK" class="nt_p">${nt_randomList[nt_currentIndex].lizi != "" ? "?" : ""}</p> <!-- 三个小时 | 需要几个小时 -->
        <button id="nt_kakunin">確認</button>
        <div id="nt_nextBtn_container"></div>   
    `;
    n_training_section.innerHTML = innerHTML;

    nt_progressBar = id("nt_progressBar");
    nt_progressBar.style.width = (nt_currentIndex / nt_randomList.length) * 100 + "%";
    nt_nextBtn_container = id("nt_nextBtn_container");
    nt_word = id("nt_word");
    nt_lizi = id("nt_lizi");
    nt_n = id("nt_n");
    nt_n_btn = id("nt_n_btn");
    nt_n_btn.addEventListener("click", e => {
        e.preventDefault();
        nt_n.innerHTML = nt_randomList[nt_currentIndex].yisi;
    });
    nt_kakunin = id("nt_kakunin");
    nt_kakunin.addEventListener("click", e => {
        e.preventDefault();
        nt_word.innerHTML = nt_randomList[nt_currentIndex].word;
        nt_n.innerHTML = nt_randomList[nt_currentIndex].yisi;
        nt_lizi.innerHTML = nt_randomList[nt_currentIndex].lizi;
        nt_nextBtn_container.innerHTML = `
            <button id="nt_fail" onclick="nt_next(false)">错</button>
            <button id="nt_win" onclick="nt_next(true)">好</button>
        `;
    });
    
}

function nt_next(pWin) {
    if (pWin) {
        nt_winList.push(nt_randomList[nt_currentIndex])
    } else {
        nt_failList.push(nt_randomList[nt_currentIndex])
    }

    nt_currentIndex++;
    if (nt_currentIndex >= nt_randomList.length) {
        nt_currentIndex--;

        let failList = "";
        let failIdList = "";
        nt_failList.forEach(k => {
            if (nt_mode == "kanji") {
                failList += k.kanji + ",";
            } else {
                failList += k.word + ",";
            }
            failIdList += k.id + ",";
        });

        n_training_section.innerHTML = `
            <h1>終了</h1>
            <p>間違い : ${nt_failList.length}</p>
            <p class="result_fail_list">${failList}</p>
            <p id="copyList" class="result_fail_list">${failIdList}</p>
            <button id="copyBtn" onclick="copy()">コピー</button>
        `;

        nt_currentIndex++;
    } else {
        switch(nt_mode) {
            case "kanji":
                nt_kanjiDisplayTraining();
                break;
            case "word":
                nt_ZWordDisplayTraining();
                break;
        }
    }

}

function copy() {
    var copyText = id("copyList");
    document.execCommand("copy")
    navigator.clipboard.writeText(copyText.innerHTML);
}

function nt_randomizeList(pList) {
    // log("List origin : ");
    // log("length : " + pList.length);
    // log(pList);
    // let word = "";
    // pList.forEach(h => {
    //     word += h.word + ",";
    // });
    // log(word);
    // word = "";

    let tmp = 0;
    let rndIndex = 0;
    for (let i = 0; i < pList.length; i++) {
        rndIndex = rnd(0, pList.length);
        tmp = pList[i];
        pList[i] = pList[rndIndex];
        pList[rndIndex] = tmp;
    }

    // log("List random : ");
    // log(pList.length);
    // pList.forEach(h => {
    //     word += h.word + ",";
    // });
    // log(word);

    return pList;
}