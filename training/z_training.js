let zt_mode = "hanzi";
let b_zt_h_FailedAlreadyInserted = false;
let b_zt_w_FailedAlreadyInserted = false;
let zt_randomList = [];
let zt_winList = [];
let zt_failList = [];
let zt_select = id("zt_select");
let zt_select_filter = id("zt_select_filter");
let zt_select_lesson = id("zt_select_lesson");

zt_select_lesson.style.display = "none";
let zt_range_input = id("zt_range_input");
zt_range_input.style.display = "none";

let zt_all_option = id("zt_all_option");
let zt_random_option = id("zt_random_option");
let zt_lesson_option = id("zt_lesson_option");

let zt_end = id("zt_end");
let zt_start = id("zt_start");
let fanti_check_div = id("fanti_check_container");
let fanti_check = id("fanti_check");
let spec_check_div = id("spec_check_container");
let spec_check = id("spec_check");
spec_check_div.style.display = "none";

let zt_startBtn = id("zt_startBtn");

zt_select.addEventListener("change", e => {
    zt_all_option.selected = true;
    zt_selectFilterChange("all");
    let count = 0;
    switch (zt_select.value) {
        case "hanzi":
            zt_select_filter.innerHTML = `
                <option id="zt_all_option" class="zh_font" value="all" selected>全部</option>
                <option class="zh_font" value="xy">X-Y</option>
                <option id="zt_random_option" class="zh_font" value="xrandom">x-rd</option>
            `;
            
            Hanzi.failedList.forEach(h => {
                zt_select_filter.innerHTML += `
                    <option value="ZH_${count}">H_${count+1}</option>
                `;
                count++;
            });
            fanti_check_div.style.display = "flex";
            spec_check_div.style.display = "none";
            break;
        case "word":
            zt_select_filter.innerHTML = `
                <option id="zt_all_option" class="zh_font" value="all" selected>全部</option>
                <option id="zt_lesson_option" class="zh_font" value="lesson">课</option>
                <option class="zh_font" value="xy">X-Y</option>
            `;

            Z_Word.failedList.forEach(h => {
                zt_select_filter.innerHTML += `
                    <option value="ZW_${count}">W_${count+1}</option>
                `;
                count++;
            });
            fanti_check_div.style.display = "none";
            spec_check_div.style.display = "flex";
            break;
        case "duo":
            zt_select_filter.innerHTML = `
                <option id="zt_all_option" class="zh_font" value="all" selected>全部</option>
                <option class="zh_font" value="xy">X-Y</option>
            `;
            fanti_check_div.style.display = "none";
            spec_check_div.style.display = "none";
            break;
    }

});
zt_select_filter.addEventListener("change", e => {
    zt_selectFilterChange(zt_select_filter.value);
});
zt_startBtn.addEventListener("click", e => {
    e.preventDefault();
    zt_startTraining();
})

function zt_selectFilterChange(pOption) {
    switch (pOption) {
        case "all":
            zt_range_input.style.display = "none";
            zt_select_lesson.style.display = "none";
            break;
        case "xy":
            zt_range_input.style.display = "flex";
            zt_end.style.display = "flex";
            zt_select_lesson.style.display = "none";
            break;
        case "xrandom":
            zt_range_input.style.display = "flex";
            zt_end.style.display = "none";
            zt_select_lesson.style.display = "none";
            break;
        case "lesson":
            zt_range_input.style.display = "none";
            if (zt_select_lesson.innerHTML == "") {
                let lessonHTML = "";
                // lessonHTML = `<option class="zh_font" value="all">全部</option>`;
                for(let i = 0; i < Z_Word.lessonList.length; i++) {
                    lessonHTML += `<option value="${Z_Word.lessonList[i]}">${Z_Word.lessonList[i]}</option>`;
                }
                zt_select_lesson.innerHTML = lessonHTML;                
            }
            zt_select_lesson.style.display = "flex";
            break;
    }
}

let zt_currentIndex = 0;

function zt_startTraining() {
    zt_failList = [];
    zt_winList = [];
    if (zt_nextBtn_container != null) {
        zt_nextBtn_container.innerHTML = "";
    }
    let filter = zt_select_filter.value;
    zt_randomList = [];
    zt_currentIndex = 0;
    zt_mode = zt_select.value;
    //? Check filters
    switch (zt_mode) {
        case "hanzi": //? Hanzi.list
            if (filter == "all") {
                for (let i = 0; i < Hanzi.list.length; i++) {
                    if (!fanti_check.checked || (fanti_check.checked && Hanzi.list[i].fanti != "")) {
                        zt_randomList.push(Hanzi.list[i]);
                    }
                }

            } else if (filter == "xy") {

                let sHanzi = "";
                Hanzi.list.forEach(h => {
                    sHanzi += h.hanzi;
                });
                log(sHanzi);

                for (let i = parseInt(zt_start.value)-1; i < parseInt(zt_end.value)-1; i++) {
                    zt_randomList.push(Hanzi.list[i]);
                }
                log("xy : ");
                sHanzi = "";
                zt_randomList.forEach(h => {
                    sHanzi += h.hanzi;
                });
                log(sHanzi);

            } else if (filter.includes("ZH_")) {
                filter = filter.slice(3);
                log("filter hanzi : " + filter)
                for (let i = 0; i < Hanzi.failedList[filter].length; i++) {
                    zt_randomList.push(Hanzi.failedList[filter][i]);
                }
            }
            zt_randomList = zt_randomizeList(zt_randomList);
            zt_hanziDisplayTraining();
            break;
        case "word": //? Z_Word.lessonList
            if (filter == "all") {
                for (let i = 0; i < Z_Word.list.length; i++) {
                    if (!spec_check.checked || (spec_check.checked && Z_Word.list[i].spec != "")) {
                        zt_randomList.push(Z_Word.list[i]);
                    }
                }
            } else if (filter == "xy") {
                for (let i = parseInt(zt_start.value)-1; i < parseInt(zt_end.value)-1; i++) {
                    zt_randomList.push(Z_Word.list[i]);
                }
            } else if (filter == "lesson") {
                for (let i = 0; i < Z_Word.list.length; i++) {
                    if (Z_Word.list[i].lesson == zt_select_lesson.value) {
                        if (!spec_check.checked || (spec_check.checked && Z_Word.list[i].spec != "")) {
                            zt_randomList.push(Z_Word.list[i]);
                        }
                    }
                }
            } else if (filter.includes("ZW_")) {
                filter = filter.slice(3);
                log("filter word : " + filter)
                for (let i = 0; i < Z_Word.failedList[filter].length; i++) {
                    zt_randomList.push(Z_Word.failedList[filter][i]);
                }
            }
            zt_randomList = zt_randomizeList(zt_randomList);
            zt_ZWordDisplayTraining();
            break;
        case "duo": //? Z_Word.duoList
            if (filter == "all") {
                for (let i = 0; i < Z_Word.duoList.length; i++) {
                    zt_randomList[i] = Z_Word.duoList[i];
                }
            } else if (filter == "xy") {
                for (let i = parseInt(zt_start.value)-1; i < parseInt(zt_end.value)-1; i++) {
                    zt_randomList.push(Z_Word.duoList[i]);
                }
            }
            zt_randomList = zt_randomizeList(zt_randomList);
            zt_ZWordDisplayTraining();
            break;
    }

}

let zt_hanzi; let zt_fanti; let zt_n; let zt_lizi; let zt_n_btn; let zt_kakunin;
let zt_word;
let zt_nextBtn_container = null;
let z_training_section = id("z_training_section");
let zt_progressBar;

function zt_hanziDisplayTraining() {
    let innerHTML = "";
    z_training_section.innerHTML = "";
    innerHTML = `
        <div id="zt_progressBar" class="progressBar"><span id="currentIndex">${zt_currentIndex+1}</span></div>
        <p id="zt_hanzi" class="toFound zh_font">?</p> <!--时-->
        <p id="zt_fanti" class="fantiToFound zh_font">${zt_randomList[zt_currentIndex].fanti != "" ? "?" : ""}</p>
        <p class="zt_p zh_font">${zt_randomList[zt_currentIndex].pinyin}</p>
        <p class="zt_p zh_font">${zt_randomList[zt_currentIndex].pinyinLizi}</p>
        <div class="zt_p zt_nihongo">
            <p id="zt_n" class="">${zt_randomList[zt_currentIndex].yisi != "" ? "?" : ""}</p> <!-- yisi -->
            <button id="zt_n_btn" class="zt_n_btn">日</button>
        </div>
        <p id="zt_lizi" class="zt_p zh_font">?</p> <!-- 三个小时 | 需要几个小时 -->
        <button id="zt_kakunin" class="zh_font">确认</button>
        <div id="zt_nextBtn_container"></div>
    `;
    z_training_section.innerHTML = innerHTML;
    
    zt_progressBar = id("zt_progressBar");
    zt_progressBar.style.width = (zt_currentIndex / zt_randomList.length) * 100 + "%";
    zt_nextBtn_container = id("zt_nextBtn_container");
    zt_hanzi = id("zt_hanzi");
    zt_fanti = id("zt_fanti");
    zt_lizi = id("zt_lizi");
    zt_n = id("zt_n");
    zt_n_btn = id("zt_n_btn");
    zt_n_btn.addEventListener("click", e => {
        e.preventDefault();
        zt_n.innerHTML = zt_randomList[zt_currentIndex].yisi;
    });
    zt_kakunin = id("zt_kakunin");
    zt_kakunin.addEventListener("click", e => {
        zt_hanzi.innerHTML = zt_randomList[zt_currentIndex].hanzi;
        zt_fanti.innerHTML = zt_randomList[zt_currentIndex].fanti;
        zt_n.innerHTML = zt_randomList[zt_currentIndex].yisi;
        zt_lizi.innerHTML = zt_randomList[zt_currentIndex].lizi;
        zt_nextBtn_container.innerHTML = `
            <button id="zt_fail" class="zh_font" onclick="zt_next(false)">错</button>
            <button id="zt_win" class="zh_font" onclick="zt_next(true)">好</button>
        `;
    });
    
}

function zt_ZWordDisplayTraining() {
    let innerHTML = "";
    z_training_section.innerHTML = "";
    innerHTML = `
        <div id="zt_progressBar" class="progressBar"><span id="currentIndex">${zt_currentIndex+1}</span></div>
        <p id="zt_word" class="toFound zh_font">?</p> <!--时-->
        <p class="zt_p zh_font">${zt_randomList[zt_currentIndex].pinyin}</p>
        <div class="zt_p zt_nihongo">
            <p id="zt_n" class="">${zt_randomList[zt_currentIndex].yisi != "" ? "?" : ""}</p> <!-- yisi -->
            <button id="zt_n_btn" class="zt_n_btn">日</button>
        </div>
        <p id="" class="zt_p zh_font">${zt_randomList[zt_currentIndex].pinyinLizi}</p> <!---->
        <p id="zt_lizi" class="zt_p zh_font">${zt_randomList[zt_currentIndex].lizi != "" ? "?" : ""}</p> <!-- 三个小时 | 需要几个小时 -->
        <button id="zt_kakunin" class="zh_font">确认</button>
        <div id="zt_nextBtn_container"></div>   
    `;
    z_training_section.innerHTML = innerHTML;

    zt_progressBar = id("zt_progressBar");
    zt_progressBar.style.width = (zt_currentIndex / zt_randomList.length) * 100 + "%";
    zt_nextBtn_container = id("zt_nextBtn_container");
    zt_word = id("zt_word");
    zt_lizi = id("zt_lizi");
    zt_n = id("zt_n");
    zt_n_btn = id("zt_n_btn");
    zt_n_btn.addEventListener("click", e => {
        e.preventDefault();
        zt_n.innerHTML = zt_randomList[zt_currentIndex].yisi;
    });
    zt_kakunin = id("zt_kakunin");
    zt_kakunin.addEventListener("click", e => {
        zt_word.innerHTML = zt_randomList[zt_currentIndex].word;
        zt_n.innerHTML = zt_randomList[zt_currentIndex].yisi;
        zt_lizi.innerHTML = zt_randomList[zt_currentIndex].lizi;
        zt_nextBtn_container.innerHTML = `
            <button id="zt_fail" class="zh_font" onclick="zt_next(false)">错</button>
            <button id="zt_win" class="zh_font" onclick="zt_next(true)">好</button>
        `;
    });
    
}

function zt_next(pWin) {
    if (pWin) {
        zt_winList.push(zt_randomList[zt_currentIndex])
    } else {
        zt_failList.push(zt_randomList[zt_currentIndex])
    }

    zt_currentIndex++;
    if (zt_currentIndex >= zt_randomList.length) {
        zt_currentIndex--;

        let failList = "";
        let failIdList = "";
        zt_failList.forEach(h => {
            if (zt_mode == "hanzi") {
                failList += h.hanzi + ",";
            } else {
                failList += h.word + ",";
            }
            failIdList += h.id + ",";
        });

        z_training_section.innerHTML = `
            <h1>終了</h1>
            <p class="zh_font">错的 : ${zt_failList.length}</p>
            <p class="result_fail_list zh_font">${failList}</p>
            <p id="copyList" class="result_fail_list zh_font">${failIdList}</p>
            <button id="copyBtn" onclick="copy()">コピー</button>
        `;

        zt_currentIndex++;
    } else {
        switch(zt_mode) {
            case "hanzi":
                zt_hanziDisplayTraining();
                break;
            case "word":
                zt_ZWordDisplayTraining();
                break;
            case "duo":
                zt_ZWordDisplayTraining();
                break;
            
        }
        // zt_ZWordDisplayTraining();
        // zt_hanziDisplayTraining();
    }

}

function copy() {
    var copyText = id("copyList");
    document.execCommand("copy")
    navigator.clipboard.writeText(copyText.innerHTML);
}

function zt_randomizeList(pList) {
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