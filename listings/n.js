let n_result_section = id("n_result_section");
let n_searchBtn = id("n_searchBtn");
let n_input = id("n_input");
let n_resultNb = id("n_resultNb");
let n_select = id("n_select"); //? kanji / word
let n_select_lesson = id("n_select_lesson");
n_select.addEventListener("change", e => {
    none(n_select_lesson);
    if (n_select.value == "kanji") {
        n_search();
    } else if (n_select.value == "word") {
        // if (n_select_lesson.innerHTML == "") {
        //     let lessonHTML = "";
        //     lessonHTML = `<option class="zh_font" value="all">全部</option>`;
        //     for(let i = 0; i < n_Word.lessonList.length; i++) {
        //         lessonHTML += `<option value="${n_Word.lessonList[i]}">${n_Word.lessonList[i]}</option>`;
        //     }
        //     n_select_lesson.innerHTML = lessonHTML;
        // }
        // n_select_lesson.style.display = "flex";
    } else if (n_select.value == "mkanji" || n_select.value == "minnaKanji") {
        n_search();
    } else if (n_select.value == "minnaWord") {
        n_search();
        flex(n_select_lesson);
    } else {
        n_select_lesson.style.display = "none";
        n_search();
    }
});
n_select_lesson.addEventListener("change", e => {
    n_search();
});

let n_resultList = [];

n_searchBtn.addEventListener("click", e => {
    e.preventDefault();
    n_search();
});

function n_search() {
    n_resultList = [];
    n_result_section.innerHTML = "";
    n_resultNb.innerHTML = "";
        
    let innerHTML = "";
    switch(n_select.value) {
        case "kanji":
            if (n_input.value == "") {
                let count = 0;

                for (let i = Kanji.list.length-1; i >= 0; i--) {
                    if (count == 0) {
                        innerHTML += "<div class='one_line'>";
                    }

                    innerHTML += "<div id='kanji_" + i + "' class='' onclick='openKanjiPopup("+i+",Kanji.list)'>" + Kanji.list[i].kanji + "</div>";
                    count++;
                    
                    if (i == 0) {
                        if (count < 6) {
                            let diff = 6 - count;
                            for (j=0; j < diff; j++) {
                                innerHTML += "<div class='no_border'>" + "" + "</div>";
                            }
                            count = 6;
                        }
                    }
                    if (count == 6) {
                        innerHTML += "</div>";
                        count = 0;
                    }
                }
                n_result_section.innerHTML = innerHTML;
                n_resultNb.innerHTML = Kanji.list.length;

            } else {
                n_resultList = [];
                Kanji.list.forEach(h => {
                    if (h.kanji.includes(n_input.value)) {
                        n_resultList.push(h);
                    } else if (h.onYomi.includes(n_input.value.toLowerCase())) {
                        n_resultList.push(h);
                    } else if (h.kunYomi.includes(n_input.value)) {
                        n_resultList.push(h);
                    } else if (h.exKanji.includes(n_input.value)) {
                        n_resultList.push(h);
                    }
                });
                let count = 0;
                for (let i = 0; i < n_resultList.length; i++) {
                    if (count == 0) {
                        innerHTML += "<div class='one_line'>";
                    }
                    innerHTML += "<div id='kanji_" + i + "' class='' onclick='openKanjiPopup("+i+",n_resultList)'>" + n_resultList[i].kanji + "</div>";
                    count++;
                    if (i+1 == n_resultList.length) {
                        if (count < 6) {
                            let diff = 6 - count;
                            for (j=0; j < diff; j++) {
                                innerHTML += "<div class='no_border'>" + "" + "</div>";
                            }
                            count = 6;
                        }
                    }
                    if (count == 6) {
                        innerHTML += "</div>";
                        count = 0;
                    }
                }
                n_result_section.innerHTML = innerHTML;
                n_resultNb.innerHTML = n_resultList.length;
            }
            break;
        case "mkanji":
            if (n_input.value == "") {
                let count = 0;

                for (let i = MKanji.list.length-1; i >= 0; i--) {
                    if (count == 0) {
                        innerHTML += "<div class='one_line'>";
                    }

                    innerHTML += "<div id='kanji_" + i + "' class='' onclick='openMKanjiPopup("+i+",MKanji.list)'>" + MKanji.list[i].kanji + "</div>";
                    count++;
                    
                    if (i == 0) {
                        if (count < 6) {
                            let diff = 6 - count;
                            for (j=0; j < diff; j++) {
                                innerHTML += "<div class='no_border'>" + "" + "</div>";
                            }
                            count = 6;
                        }
                    }
                    if (count == 6) {
                        innerHTML += "</div>";
                        count = 0;
                    }
                }
                n_result_section.innerHTML = innerHTML;
                n_resultNb.innerHTML = MKanji.list.length;

            } else {
                n_resultList = [];
                let idList = [];
                
                MKanji.list.forEach(k => {
                    if (k.kanji.includes(n_input.value)) {
                        if (!idList.includes(k.id)) {
                            idList.push(k.id);
                            n_resultList.unshift(k);
                        }
                    } else {
                        k.vocList.forEach(v => {
                            if (v.word.includes(n_input.value)) {
                                if (!idList.includes(k.id)) {
                                    idList.push(k.id);
                                    n_resultList.push(k);
                                }
                            } else if (v.yomi.includes(n_input.value)) {
                                if (!idList.includes(k.id)) {
                                    idList.push(k.id);
                                    n_resultList.push(k);
                                }
                            } else if (v.imi.includes(n_input.value.toLowerCase())) {
                                if (!idList.includes(k.id)) {
                                    idList.push(k.id);
                                    n_resultList.push(k);
                                }
                            }
                        });
                    }
                });

                

                let count = 0;
                for (let i = 0; i < n_resultList.length; i++) {
                    if (count == 0) {
                        innerHTML += "<div class='one_line'>";
                    }
                    innerHTML += "<div id='kanji_" + i + "' class='' onclick='openMKanjiPopup("+i+",n_resultList)'>" + n_resultList[i].kanji + "</div>";
                    count++;
                    if (i+1 == n_resultList.length) {
                        if (count < 6) {
                            let diff = 6 - count;
                            for (j=0; j < diff; j++) {
                                innerHTML += "<div class='no_border'>" + "" + "</div>";
                            }
                            count = 6;
                        }
                    }
                    if (count == 6) {
                        innerHTML += "</div>";
                        count = 0;
                    }
                }
                n_result_section.innerHTML = innerHTML;
                n_resultNb.innerHTML = n_resultList.length;
            }
            break;

        case "minnaWord":
            if (n_input.value == "") {
                if (n_select_lesson.value != "all") {
                    let count = 0;
                    MinnaWord.list.forEach(w => {
                        if (w.lesson == n_select_lesson.value) {
                            count++
                            if (w.wordKanji != "") {
                                innerHTML += `<div id="n_word_${w.id}" class="n_one_line" onclick="openMinnaWordPopup(${w.id-1},MinnaWord.list)">${w.wordKanji}</div>`;
                            } else {
                                innerHTML += `<div id="n_word_${w.id}" class="n_one_line" onclick="openMinnaWordPopup(${w.id-1},MinnaWord.list)">${w.wordKana}</div>`;
                            }
                        }
                    });
                    n_result_section.innerHTML = innerHTML;
                    n_resultNb.innerHTML = count;
                } else {
                    MinnaWord.list.forEach(w => {
                        if (w.wordKanji != "") {
                            innerHTML += `<div id="n_word_${w.id}" class="n_one_line" onclick="openMinnaWordPopup(${w.id-1},MinnaWord.list)">${w.wordKanji}</div>`;
                        } else {
                            innerHTML += `<div id="n_word_${w.id}" class="n_one_line" onclick="openMinnaWordPopup(${w.id-1},MinnaWord.list)">${w.wordKana}</div>`;
                        }
                    });
                    n_result_section.innerHTML = innerHTML;
                    n_resultNb.innerHTML = MinnaWord.list.length;
                }

            } else if (n_input.value != "") {
                MinnaWord.list.forEach(w => {
                    if (w.wordKanji.includes(n_input.value)) {
                        n_resultList.push(w);
                    } else if (w.wordKana.includes(n_input.value)) {
                        n_resultList.push(w);
                    } else if (w.imi.toLowerCase().includes(n_input.value.toLowerCase())) {
                        n_resultList.push(w);
                    }
                });

                n_resultList.forEach(w => {
                    if (w.wordKanji != "") {
                        innerHTML += `<div id="n_word_${w.id}" class="n_one_line" onclick="openMinnaWordPopup(${w.id-1},MinnaWord.list)">${w.wordKanji}</div>`;
                    } else {
                        innerHTML += `<div id="n_word_${w.id}" class="n_one_line" onclick="openMinnaWordPopup(${w.id-1},MinnaWord.list)">${w.wordKana}</div>`;
                    }
                });
                n_result_section.innerHTML = innerHTML;
                n_resultNb.innerHTML = n_resultList.length;
            }
            break;
        case "minnaKanji":
            if (n_input.value == "") {
                let count = 0;

                for (let i = MinnaKanji.list.length-1; i >= 0; i--) {
                    if (count == 0) {
                        innerHTML += "<div class='one_line'>";
                    }

                    innerHTML += "<div id='kanji_" + i + "' class='' onclick='openMKanjiPopup("+i+",MinnaKanji.list)'>" + MinnaKanji.list[i].kanji + "</div>";
                    count++;
                    
                    if (i == 0) {
                        if (count < 6) {
                            let diff = 6 - count;
                            for (j=0; j < diff; j++) {
                                innerHTML += "<div class='no_border'>" + "" + "</div>";
                            }
                            count = 6;
                        }
                    }
                    if (count == 6) {
                        innerHTML += "</div>";
                        count = 0;
                    }
                }
                n_result_section.innerHTML = innerHTML;
                n_resultNb.innerHTML = MinnaKanji.list.length;
            } else {
                MinnaKanji.list.forEach(w => {
                    if (w.kanji.includes(n_input.value)) {
                        n_resultList.push(w);
                    } else if (w.on.includes(n_input.value)) {
                        n_resultList.push(w);
                    } else if (w.kun.includes(n_input.value)) {
                        n_resultList.push(w);
                    }
                });
                let count = 0;
                for (let i = n_resultList.length-1; i >= 0; i--) {
                    if (count == 0) {
                        innerHTML += "<div class='one_line'>";
                    }

                    innerHTML += "<div id='kanji_" + i + "' class='' onclick='openMKanjiPopup("+i+",n_resultList)'>" + n_resultList[i].kanji + "</div>";
                    count++;
                    
                    if (i == 0) {
                        if (count < 6) {
                            let diff = 6 - count;
                            for (j=0; j < diff; j++) {
                                innerHTML += "<div class='no_border'>" + "" + "</div>";
                            }
                            count = 6;
                        }
                    }
                    if (count == 6) {
                        innerHTML += "</div>";
                        count = 0;
                    }
                }

                n_result_section.innerHTML = innerHTML;
                n_resultNb.innerHTML = n_resultList.length;
            }
            break;
        case "word":
            break;

    }
}

//! -----------
// TODO -------部首、画数
//! -----------
function openKanjiPopup(id, list) {
    popup.innerHTML = "";
    popup.innerHTML = `
        <div class="oneResult">
            <div class="word_container">
                <div class="kanji">${list[id].kanji}</div>
            </div>
            <div class="word_details">
                <p><span class="category">音　</span>${list[id].onYomi}</p>
                <p><span class="category">訓　</span>${list[id].kunYomi}</p>
                <p><span class="category">例　</span>${list[id].exKanji}</p>
            </div>
            <div class="sonota_hanzi">
                <p class="kyuu_z">${list[id].itaiji}</p>
            </div>
        </div>
    `;
    openModal();
}

function openMKanjiPopup(id, list) {
    //? if n_select.value == "mkanji" || "minnaKanji"
    let innerHTML = "";
    popup.innerHTML = "";
    innerHTML = `
        <div id="oneResult" class="oneResult">
            <div class="word_container">
                <div class="kanji">${list[id].kanji}</div>
    `;

    if (n_select.value == "minnaKanji") {
        if (list[id].on != "" && list[id].kun != "") {
            innerHTML += `<div>${list[id].on}、${list[id].kun}</div>`;
        } else if (list[id].on != "") {
            innerHTML += `<div>${list[id].on}</div>`;
        } else if (list[id].kun != "") {
            innerHTML += `<div>${list[id].kun}</div>`;
        }
    }   

    innerHTML += `
            </div>
            <div class="word_details">
                <ul>
    `;

    let count = 0;
    let mk_voc_class = "mk_voc";
    list[id].vocList.forEach(v => {
        if (count == list[id].vocList.length-1) {
            mk_voc_class = "mk_voc mk_voc_last";
        }
        //? TODO : ADD Lesson number here 
        innerHTML += `
            <li id="mk_voc_${id}_${count}" class="${mk_voc_class}">
                <div class="mk_word">${v.word}</div>
                <div id="void_yomi_${id}_${count}" class="mk_yomi mk_void_yomi"><span class="mk_void_hide"></span></div>
                <div id="yomi_${id}_${count}" class="mk_yomi" style="display:none">${v.yomi}</div>
                <div class="mk_imi zh_font">${v.imi}</div>
            </li>
        `;
        count++;
    });
    innerHTML += `
                </ul>
            </div>
        </div>
    `;
    popup.innerHTML = innerHTML;

    for (let i = 0; i < count; i++) {
        const mk_voc = document.getElementById("mk_voc_" + id + "_" + i);
        const void_yomi = document.getElementById("void_yomi_" + id + "_" + i);
        const yomi = document.getElementById("yomi_" + id + "_" + i);
        mk_voc.addEventListener("click", e => {
            if (yomi.style.display == "none") {
                yomi.style.display = "flex";
                void_yomi.style.display = "none";
            } else {
                yomi.style.display = "none";
                void_yomi.style.display = "flex";
            }
        });
    }

    let oneResult = document.getElementById("oneResult");
    oneResult.addEventListener("click", e => {
        e.stopPropagation();
    });

    openModal();
}

function openMinnaWordPopup(id, list) {
    log(list);
    popup.innerHTML = "";
    let word = list[id].wordKanji != "" ? list[id].wordKanji : list[id].wordKana;
    let yomiClass = list[id].wordKanji != "" ? "n_yomi" : "n_yomi_none";
    
    popup.innerHTML = `
        <div class="oneResult">
            <div class="word_container">
                <div class="n_word">${word}</div>
            </div>
            <div class="word_details">
                <p class="${yomiClass}">${list[id].wordKana}</p>
                <p class="n_imi zh_font">${list[id].imi}</p>
            </div>
            <div class="n_lesson">第${list[id].lesson}課</div>
        </div>
    `;
    openModal();
}