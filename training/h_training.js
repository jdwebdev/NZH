let ht_mode = "word";
let b_ht_w_FailedAlreadyInserted = false;
let ht_randomList = [];
let ht_winList = [];
let ht_failList = [];
let ht_select = id("ht_select");
let ht_select_filter = id("ht_select_filter");
let ht_select_lesson = id("ht_select_lesson");

ht_select_lesson.style.display = "none";
let ht_range_input = id("ht_range_input");
ht_range_input.style.display = "none";

let ht_all_option = id("ht_all_option");
let ht_random_option = id("ht_random_option");
let ht_lesson_option = id("ht_lesson_option");

let ht_end = id("ht_end");
let ht_start = id("ht_start");
let hanja_check_div = id("hanja_check_container");
let hanja_check = id("hanja_check");
let h_to_n_check = id("h_to_n_check");

let ht_startBtn = id("ht_startBtn");

ht_select.addEventListener("change", e => {
    ht_all_option.selected = true;
    ht_selectFilterChange("all");
    switch (ht_select.value) {
        case "word":
            ht_select_filter.innerHTML = `
                <option id="ht_all_option" class="zh_font" value="all" selected>모두</option>
                <option id="ht_lesson_option" class="zh_font" value="lesson">수업</option>
                <option class="zh_font" value="xy">X-Y</option>
            `;
            // hanja_check_div.style.display = "none";
            break;
        case "duo":
            ht_select_filter.innerHTML = `
                <option id="ht_all_option" class="zh_font" value="all" selected>모두</option>
                <option class="zh_font" value="xy">X-Y</option>
            `;
            // hanja_check_div.style.display = "none";
            break;
    }
});
ht_select_filter.addEventListener("change", e => {
    ht_selectFilterChange(ht_select_filter.value);
});
ht_startBtn.addEventListener("click", e => {
    e.preventDefault();
    ht_startTraining();
})

function ht_selectFilterChange(pOption) {
    switch (pOption) {
        case "all":
            ht_range_input.style.display = "none";
            ht_select_lesson.style.display = "none";
            break;
        case "xy":
            ht_range_input.style.display = "flex";
            ht_end.style.display = "flex";
            ht_select_lesson.style.display = "none";
            break;
        case "xrandom":
            ht_range_input.style.display = "flex";
            ht_end.style.display = "none";
            ht_select_lesson.style.display = "none";
            break;
        case "lesson":
            ht_range_input.style.display = "none";
            if (ht_select_lesson.innerHTML == "") {
                let lessonHTML = "";
                // lessonHTML = `<option class="zh_font" value="all">全部</option>`;
                for(let i = Hangul.lessonList.length-1; i >= 0; i--) {
                    lessonHTML += `<option value="${Hangul.lessonList[i]}">${Hangul.lessonList[i]}</option>`;
                }
                ht_select_lesson.innerHTML = lessonHTML;                
            }
            ht_select_lesson.style.display = "flex";
            break;
    }
}

let ht_currentIndex = 0;

function ht_startTraining() {
    ht_failList = [];
    ht_winList = [];
    if (ht_nextBtn_container != null) {
        ht_nextBtn_container.innerHTML = "";
    }
    let filter = ht_select_filter.value;
    ht_randomList = [];
    ht_currentIndex = 0;
    ht_mode = ht_select.value;
    //? Check filters
    switch (ht_mode) {
        case "word": //? Hangul.lessonList
            if (filter == "all") {
                for (let i = 0; i < Hangul.list.length; i++) {
                    if (!hanja_check.checked || (hanja_check.checked && Hangul.list[i].hanja != "")) {
                        ht_randomList.push(Hangul.list[i]);
                    }
                }
                log(ht_randomList);
            } else if (filter == "xy") {
                for (let i = parseInt(ht_start.value)-1; i < parseInt(ht_end.value)-1; i++) {
                    if (!hanja_check.checked || (hanja_check.checked && Hangul.list[i].hanja != "")) {
                        ht_randomList.push(Hangul.list[i]);
                    }
                }
            } else if (filter == "lesson") {
                for (let i = 0; i < Hangul.list.length; i++) {
                    if (Hangul.list[i].lesson == ht_select_lesson.value) {
                        ht_randomList.push(Hangul.list[i]);
                    }
                }
            } else if (filter.includes("HW_")) {
                filter = filter.slice(3);
                for (let i = 0; i < Hangul.failedList[filter].length; i++) {
                    ht_randomList.push(Hangul.failedList[filter][i]);
                }
            }
            ht_randomList = ht_randomizeList(ht_randomList);
            break;
        case "duo": //? Hangul.duoList
            if (filter == "all") {
                for (let i = 0; i < Hangul.duoList.length; i++) {
                    if (!hanja_check.checked || (hanja_check.checked && Hangul.duoList[i].hanja != "")) {
                        ht_randomList.push(Hangul.duoList[i]);
                    }
                }
            } else if (filter == "xy") {
                for (let i = parseInt(ht_start.value)-1; i < parseInt(ht_end.value)-1; i++) {
                    if (!hanja_check.checked || (hanja_check.checked && Hangul.duoList[i].hanja != "")) {
                        ht_randomList.push(Hangul.duoList[i]);
                    }
                }
            } else if (filter.includes("HW_")) {
                filter = filter.slice(3);
                log("filter word : " + filter)
                for (let i = 0; i < Hangul.failedList[filter].length; i++) {
                    ht_randomList.push(Hangul.failedList[filter][i]);
                }
            }
            ht_randomList = ht_randomizeList(ht_randomList);
            
            break;
    }
    if (h_to_n_check.checked) {
        ht_h_to_n_WordDisplayTraining();
    } else {
        ht_WordDisplayTraining();
    }
}

let ht_word; let ht_hanja; let ht_n; let ht_ex; let ht_n_btn; let ht_kakunin;
let ht_nextBtn_container = null;
let h_training_section = id("h_training_section");
let ht_progressBar;

function ht_WordDisplayTraining() {
    let innerHTML = "";
    h_training_section.innerHTML = "";
    innerHTML = `
        <div id="ht_progressBar" class="progressBar"><span id="currentIndex">${ht_currentIndex+1}</span></div>
        <p id="ht_word" class="toFound zh_font">?</p>
        <p id="ht_hanja" class="hanjaToFound zh_font">${ht_randomList[ht_currentIndex].hanja != "" ? "?" : ""}</p>
        <p id="ht_n" class="ht_p">${ht_randomList[ht_currentIndex].nihongo}</p>
        <p id="ht_n_ex" class="ht_h_ex zh_font">${ht_randomList[ht_currentIndex].n_ex}</p>
        <p id="ht_h_ex" class="ht_p zh_font">${ht_randomList[ht_currentIndex].h_ex != "" ? "?" : ""}</p>
        <button id="ht_kakunin" class="zh_font">확인</button>
        <div id="ht_nextBtn_container"></div>   
    `;
    h_training_section.innerHTML = innerHTML;

    ht_progressBar = id("ht_progressBar");
    ht_progressBar.style.width = (ht_currentIndex / ht_randomList.length) * 100 + "%";
    ht_nextBtn_container = id("ht_nextBtn_container");
    ht_word = id("ht_word");
    ht_hanja = id("ht_hanja");
    ht_n = id("ht_n");
    ht_n_ex = id("ht_n_ex");
    ht_h_ex = id("ht_h_ex");
    ht_kakunin = id("ht_kakunin");
    ht_kakunin.addEventListener("click", e => {
        e.preventDefault();
        ht_word.innerHTML = ht_randomList[ht_currentIndex].word;
        ht_hanja.innerHTML = ht_randomList[ht_currentIndex].hanja;
        ht_n.innerHTML = ht_randomList[ht_currentIndex].nihongo;
        ht_n_ex.innerHTML = ht_randomList[ht_currentIndex].n_ex;
        ht_h_ex.innerHTML = ht_randomList[ht_currentIndex].h_ex;
        ht_nextBtn_container.innerHTML = `
            <button id="ht_fail" class="zh_font" onclick="ht_next(false)">错</button>
            <button id="ht_win" class="zh_font" onclick="ht_next(true)">好</button>
        `;
    });
}

function ht_h_to_n_WordDisplayTraining() {
    let innerHTML = "";
    h_training_section.innerHTML = "";
    innerHTML = `
        <div id="ht_progressBar" class="progressBar"><span id="currentIndex">${ht_currentIndex+1}</span></div>
        <p id="ht_word" class="toFound zh_font">${ht_randomList[ht_currentIndex].word}</p>
        <p id="ht_hanja" class="hanjaToFound zh_font">${ht_randomList[ht_currentIndex].hanja != "" ? "?" : ""}</p>
        <p id="ht_n" class="ht_p">${ht_randomList[ht_currentIndex].nihongo != "" ? "?" : ""}</p>
        <p id="ht_n_ex" class="ht_h_ex zh_font">${ht_randomList[ht_currentIndex].n_ex != "" ? "?" : ""}</p>
        <p id="ht_h_ex" class="ht_p zh_font">${ht_randomList[ht_currentIndex].h_ex}</p>
        <button id="ht_kakunin" class="zh_font">확인</button>
        <div id="ht_nextBtn_container"></div>   
    `;
    h_training_section.innerHTML = innerHTML;

    ht_progressBar = id("ht_progressBar");
    ht_progressBar.style.width = (ht_currentIndex / ht_randomList.length) * 100 + "%";
    ht_nextBtn_container = id("ht_nextBtn_container");
    ht_word = id("ht_word");
    ht_hanja = id("ht_hanja");
    ht_n = id("ht_n");
    ht_n_ex = id("ht_n_ex");
    ht_h_ex = id("ht_h_ex");
    ht_kakunin = id("ht_kakunin");
    ht_kakunin.addEventListener("click", e => {
        e.preventDefault();
        ht_word.innerHTML = ht_randomList[ht_currentIndex].word;
        ht_hanja.innerHTML = ht_randomList[ht_currentIndex].hanja;
        ht_n.innerHTML = ht_randomList[ht_currentIndex].nihongo;
        ht_n_ex.innerHTML = ht_randomList[ht_currentIndex].n_ex;
        ht_h_ex.innerHTML = ht_randomList[ht_currentIndex].h_ex;
        ht_nextBtn_container.innerHTML = `
            <button id="ht_fail" class="zh_font" onclick="ht_next(false, true)">错</button>
            <button id="ht_win" class="zh_font" onclick="ht_next(true, true)">好</button>
        `;
    });
}

function ht_next(pWin, ph_to_n = false) {
    if (pWin) {
        ht_winList.push(ht_randomList[ht_currentIndex]);
    } else {
        ht_failList.push(ht_randomList[ht_currentIndex]);
    }

    ht_currentIndex++;
    if (ht_currentIndex >= ht_randomList.length) {
        ht_currentIndex--;

        let failList = "";
        let failIdList = "";
        ht_failList.forEach(h => {
            failList += h.word + ",";
            failIdList += h.id + ",";
        });

        h_training_section.innerHTML = `
            <h1>終了</h1>
            <p class="zh_font">잘못된 : ${ht_failList.length}</p>
            <p class="result_fail_list zh_font">${failList}</p>
            <p id="copyList" class="result_fail_list zh_font">${failIdList}</p>
            <button id="copyBtn" onclick="copy()">コピー</button>
        `;

        ht_currentIndex++;
    } else {
        if (ph_to_n) {
            ht_h_to_n_WordDisplayTraining();
        } else {
            ht_WordDisplayTraining();
        }
    }

}

function ht_randomizeList(pList) {
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