let z_result_section = id("z_result_section");
let z_searchBtn = id("z_searchBtn");
let z_input = id("z_input");
let z_resultNb = id("z_resultNb");
let z_select = id("z_select"); //? hanzi / word / fanti1 / fanti2
let z_select_lesson = id("z_select_lesson");
let z_bushou = id("z_bushou");
let bushouHTML = `<option value="all" class="zh_font" value="bushou" selected>部首</option>`;
Hanzi.bushouList.forEach(b => {
    bushouHTML += `<option value="${b.nb}" class="zh_font testCOLOR" disabled>----- ${b.nb}画 -----</option>`;
    b.key.forEach(k => {
        bushouHTML += `<option value="${k}" class="zh_font">${k}</option>`;
    });
});
z_bushou.innerHTML = bushouHTML;

z_select.addEventListener("change", e => {
    if (z_select.value == "word") {
        if (z_select_lesson.innerHTML == "") {
            let lessonHTML = "";
            lessonHTML = `<option class="zh_font" value="all">全部</option>`;
            for(let i = Z_Word.lessonList.length-1; i >= 0; i--) {
                lessonHTML += `<option value="${Z_Word.lessonList[i]}">${Z_Word.lessonList[i]}</option>`;
            }
            z_select_lesson.innerHTML = lessonHTML;
        }
        z_bushou.style.display = "none";
        z_select_lesson.style.display = "flex";
    } else if (z_select.value == "hanzi") {

        z_bushou.style.display = "flex";
        z_select_lesson.style.display = "none";
        z_bushou.value = "all";
    } else {
        z_bushou.style.display = "none";
        z_select_lesson.style.display = "none";
        if (z_select.value == "fanti1" || z_select.value == "fanti2" || z_select.value == "yoji") {
            z_search();
        }
    }
});
z_select_lesson.addEventListener("change", e => {
    if (z_select_lesson.value == "all") {
        
    } else {
        z_search();
    }
});
z_bushou.addEventListener("change", e => {
    if (z_bushou.value != "all") {
        // log(z_bushou.value)
        z_search();
    }
});

let z_resultList = [];

z_searchBtn.addEventListener("click", e => {
    e.preventDefault();
    z_search(true);
});

function z_search(pFromBtn = false) {
    z_result_section.innerHTML = "";
    z_resultNb.innerHTML = "";
        
    let innerHTML = "";
    switch(z_select.value) {
        case "hanzi":
            if (z_bushou.value != "all") {
                z_resultList = [];
                Hanzi.list.forEach(h => {
                    if (h.bushou == z_bushou.value) z_resultList.push(h);
                });
                let count = 0;
                for (let i = 0; i < z_resultList.length; i++) {
                    if (count == 0) {
                        innerHTML += "<div class='one_line'>";
                    }
                    innerHTML += "<div id='hanzi_" + i + "' class='zh_font' onclick='openHanziPopup("+i+",z_resultList)'>" + z_resultList[i].hanzi + "</div>";
                    count++;
                    if (i+1 == z_resultList.length) {
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
                z_result_section.innerHTML = innerHTML;
                z_resultNb.innerHTML = z_resultList.length;

            } else if (z_input.value == "") {
                let count = 0;

                for (let i = Hanzi.list.length-1; i >= 0; i--) {
                    if (count == 0) {
                        innerHTML += "<div class='one_line'>";
                    }

                    innerHTML += "<div id='hanzi_" + i + "' class='zh_font' onclick='openHanziPopup("+i+",Hanzi.list)'>" + Hanzi.list[i].hanzi + "</div>";
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
                // for (let i = 0; i < Hanzi.list.length; i++) {
                //     if (count == 0) {
                //         innerHTML += "<div class='one_line'>";
                //     }

                //     innerHTML += "<div id='hanzi_" + i + "' class='zh_font' onclick='openHanziPopup("+i+",Hanzi.list)'>" + Hanzi.list[i].hanzi + "</div>";
                //     count++;
                    
                //     if (i+1 == Hanzi.list.length) {
                //         if (count < 6) {
                //             let diff = 6 - count;
                //             for (j=0; j < diff; j++) {
                //                 innerHTML += "<div class='no_border'>" + "" + "</div>";
                //             }
                //             count = 6;
                //         }
                //     }
                //     if (count == 6) {
                //         innerHTML += "</div>";
                //         count = 0;
                //     }
                // }
                z_result_section.innerHTML = innerHTML;
                z_resultNb.innerHTML = Hanzi.list.length;

            } else {
                z_resultList = [];
                Hanzi.list.forEach(h => {
                    if (h.hanzi.includes(z_input.value)) {
                        z_resultList.push(h);
                    } else if (h.pinyin.includes(z_input.value.toLowerCase())) {
                        z_resultList.push(h);
                    } else if (h.lizi.includes(z_input.value)) {
                        z_resultList.push(h);
                    } else if (h.fanti.includes(z_input.value)) {
                        z_resultList.push(h);
                    }
                });
                let count = 0;
                for (let i = 0; i < z_resultList.length; i++) {
                    if (count == 0) {
                        innerHTML += "<div class='one_line'>";
                    }
                    innerHTML += "<div id='hanzi_" + i + "' class='zh_font' onclick='openHanziPopup("+i+",z_resultList)'>" + z_resultList[i].hanzi + "</div>";
                    count++;
                    if (i+1 == z_resultList.length) {
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
                z_result_section.innerHTML = innerHTML;
                z_resultNb.innerHTML = z_resultList.length;
            }
            break;
            
        case "word":
            innerHTML = "";

            if (z_select_lesson.value != "all" && !pFromBtn) { //? Filtre de leçon précise
                innerHTML = "";
                z_resultList = [];
                Z_Word.list.forEach(w => {
                    //? Only when Select 3.1: 3.11 3.12 3.13... 3.2: (3.21, 3.22, 3.23...) 
                    if(w.lesson[0] == "3" && z_select_lesson.value[0] == "3" && z_select_lesson.value.length == 3) {
                        if (w.lesson[0] + w.lesson[1] + w.lesson[2] == z_select_lesson.value) {
                            z_resultList.push(w);
                        }
                    }

                    if (w.lesson == z_select_lesson.value) {
                        z_resultList.push(w);
                    }
                });
                z_resultList.forEach(w => {
                    innerHTML += `
                        <div id="z_word_${w.id}" class="zh_font z_one_line" onclick="openZ_WordPopup(${w.id-1},Z_Word.list)">${w.word}</div>
                    `;
                });
                z_result_section.innerHTML = innerHTML;
                z_resultNb.innerHTML = z_resultList.length;
            } else if (z_input.value == "") { //? Aucun filtre, affichage de tout
                
                for (let i = Z_Word.list.length - 1; i >= 0; i--) {
                    innerHTML += `
                        <div id="z_word_${Z_Word.list[i].id}" class="zh_font z_one_line" onclick="openZ_WordPopup(${Z_Word.list[i].id-1},Z_Word.list)">${Z_Word.list[i].word}</div>
                    `;
                }
                z_result_section.innerHTML = innerHTML;
                z_resultNb.innerHTML = Z_Word.list.length;
                
            } else { //? Filtre de recherche input
                innerHTML = "";
                z_resultList = [];
                Z_Word.list.forEach(w => {
                    if (w.word.includes(z_input.value)) {
                        z_resultList.push(w);
                    } else if (cleanPinyin(w.pinyin).includes(z_input.value.toLowerCase())) {
                        z_resultList.push(w);
                    } else if (w.lizi.includes(z_input.value)) {
                        z_resultList.push(w);
                    } else if (w.yisi.includes(z_input.value)) {
                        z_resultList.push(w);
                    }
                    // if (h.pinyin.includes(z_input.value)) {
                    //     z_resultList.push(h);
                    // }
                });
                z_resultList.forEach(w => {
                    innerHTML += `
                        <div id="z_word_${w.id}" class="zh_font z_one_line" onclick="openZ_WordPopup(${w.id-1},Z_Word.list)">${w.word}</div>
                    `;
                });

                if (z_resultList.length == 0) {
                    innerHTML += `<a href="https://cjjc.weblio.jp/content/${z_input.value}" target="_blank">词典: ${z_input.value}</a>`  //? %E5%98%B4%E5%B7%B4
                }
                z_result_section.innerHTML = innerHTML;
                z_resultNb.innerHTML = z_resultList.length;
            }

            break;
        case "duo":
            innerHTML = "";

            if (z_input.value == "") {
                Z_Word.duoList.forEach(w => {
                    innerHTML += `
                        <div class="word_one_line">
                            <div id="z_word_${w.id}" class="zh_font" onclick="openZ_WordPopup(${w.id-1},Z_Word.duoList)">${w.word}</div>
                        </div>
                    `;
                });
                z_result_section.innerHTML = innerHTML;
                z_resultNb.innerHTML = Z_Word.duoList.length;
                
            } else {
                innerHTML = "";
                z_resultList = [];
                Z_Word.duoList.forEach(w => {
                    if (w.word.includes(z_input.value)) {
                        z_resultList.push(w);
                    } else if (w.lizi.includes(z_input.value)) {
                        z_resultList.push(w);
                    } else if (w.yisi.includes(z_input.value)) {
                        z_resultList.push(w);
                    }
                    // if (h.pinyin.includes(z_input.value)) {
                    //     z_resultList.push(h);
                    // }
                });
                z_resultList.forEach(w => {
                    innerHTML += `
                        <div class="word_one_line" onclick="openZ_WordPopup(${w.id-1},Z_Word.duoList)">
                            <div id="z_word_${w.id}" class="zh_font">${w.word}</div>
                        </div>
                    `;
                });
                z_result_section.innerHTML = innerHTML;
                z_resultNb.innerHTML = z_resultList.length;
            }

            break;

        case "fanti1":
        case "fanti2":
            z_resultList = [];
            Hanzi.list.forEach(h => {
                if (h.fanti != "") {
                    z_resultList.push(h);
                }
            });
            let count = 0;
            for (let i = 0; i < z_resultList.length; i++) {
                if (count == 0) {
                    innerHTML += "<div class='one_line'>";
                }

                if (z_select.value == "fanti1") {
                    innerHTML += "<div id='hanzi_" + i + "' class='zh_font' onclick='openHanziPopup("+i+",z_resultList)'>" + z_resultList[i].hanzi + "</div>";
                } else {
                    innerHTML += "<div id='hanzi_" + i + "' class='zh_font' onclick='openHanziPopup("+i+",z_resultList)'>" + z_resultList[i].fanti[0] + "</div>";
                }

                count++;
                if (i+1 == z_resultList.length) {
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
            z_result_section.innerHTML = innerHTML;
            z_resultNb.innerHTML = z_resultList.length;
            break;
        case "yoji": 
            innerHTML = "";
            z_resultList = [];
            Z_Word.list.forEach(w => {
                if (w.word.includes("#4")) {
                    z_resultList.push(w);
                }
            });
            z_resultList.forEach(w => {
                innerHTML += `
                    <div class="word_one_line">
                        <div id="z_word_${w.id}" class="zh_font" onclick="openZ_WordPopup(${w.id-1},Z_Word.list)">${w.word}</div>
                    </div>
                `;
            });
            z_result_section.innerHTML = innerHTML;
            z_resultNb.innerHTML = z_resultList.length;
        break;
    }
}

function openHanziPopup(id, list) {
    popup.innerHTML = "";
    popup.innerHTML = `
        <div class="oneResult">
            <div class="word_container">
                <div class="hanzi zh_font">${list[id].hanzi}</div>
            </div>
            <div class="word_details">
                <p class="yomi_hanzi zh_font"><span class="category zh_font">拼音　</span>${list[id].pinyin}</p>
                <p><span class="category zh_font">意思　</span>${list[id].yisi}</p>
                <p class="zh_font"><span class="category zh_font">例子　</span>${list[id].lizi}</p>
            </div>
            <div class="sonota_hanzi">
                <p class="kyuu_z zh_font">${list[id].fanti}</p>
                <a class="dico_link" href="https://cjjc.weblio.jp/content/${list[id].hanzi}" target="_blank">→</a>
            </div>
        </div>
    `;
    openModal();
}

function openZ_WordPopup(id, list) {
    popup.innerHTML = "";
    let windowWidth = window.innerWidth;
    popup.innerHTML = `
        <div class="oneResult">
            <div class="word_container">
            <div class="hanzi zh_font">${list[id].word}</div>
            </div>
            <div class="word_details" style="position:relative">
                <p class="yomi_hanzi zh_font"><span class="category zh_font">拼音　</span>${list[id].pinyin}</p>
                <p><span class="category zh_font">意思　</span>${list[id].yisi}</p>
                <p class="zh_font"><span class="category zh_font">例子　</span>${list[id].lizi}</p>
                <span class="lesson_number">${list[id].lesson}</span>
                <a class="dico_link" href="https://cjjc.weblio.jp/content/${list[id].word}" target="_blank">→</a>
            </div>
        </div>
    `;
    openModal();
}