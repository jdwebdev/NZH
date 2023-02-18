let z_result_section = id("z_result_section");
let z_searchBtn = id("z_searchBtn");
let z_input = id("z_input");
let z_resultNb = id("z_resultNb");
let z_select = id("z_select"); //? hanzi / word / fanti1 / fanti2
let z_select_lesson = id("z_select_lesson");
z_select.addEventListener("change", e => {
    if (z_select.value == "word") {
        if (z_select_lesson.innerHTML == "") {
            let lessonHTML = "";
            lessonHTML = `<option class="zh_font" value="all">全部</option>`;
            for(let i = 0; i < Z_Word.lessonList.length; i++) {
                lessonHTML += `<option value="${Z_Word.lessonList[i]}">${Z_Word.lessonList[i]}</option>`;
            }
            z_select_lesson.innerHTML = lessonHTML;
        }
        z_select_lesson.style.display = "flex";
    } else {
        z_select_lesson.style.display = "none";
        if (z_select.value == "fanti1" || z_select.value == "fanti2") {
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

let z_resultList = [];

z_searchBtn.addEventListener("click", e => {
    e.preventDefault();
    z_search();
});

function z_search() {
    z_result_section.innerHTML = "";
    z_resultNb.innerHTML = "";
        
    let innerHTML = "";
    switch(z_select.value) {
        case "hanzi":
            if (z_input.value == "") {
                let count = 0;
                for (let i = 0; i < Hanzi.list.length; i++) {
                    if (count == 0) {
                        innerHTML += "<div class='one_line'>";
                    }

                    innerHTML += "<div id='hanzi_" + i + "' class='zh_font' onclick='openHanziPopup("+i+",Hanzi.list)'>" + Hanzi.list[i].hanzi + "</div>";
                    count++;
                    
                    if (i+1 == Hanzi.list.length) {
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
                z_resultNb.innerHTML = Hanzi.list.length;

            } else {
                z_resultList = [];
                Hanzi.list.forEach(h => {
                    if (h.hanzi.includes(z_input.value)) {
                        z_resultList.push(h);
                    }
                    if (h.pinyin.includes(z_input.value)) {
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

            if (z_select_lesson.value != "all") {
                innerHTML = "";
                z_resultList = [];
                Z_Word.list.forEach(w => {
                    if (w.lesson.includes(z_select_lesson.value)) {
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
            } else if (z_input.value == "") {
                
                Z_Word.list.forEach(w => {
                    innerHTML += `
                        <div class="word_one_line">
                            <div id="z_word_${w.id}" class="zh_font" onclick="openZ_WordPopup(${w.id-1},Z_Word.list)">${w.word}</div>
                        </div>
                    `;
                });
                z_result_section.innerHTML = innerHTML;
                z_resultNb.innerHTML = Z_Word.list.length;
                
            } else {
                innerHTML = "";
                z_resultList = [];
                Z_Word.list.forEach(w => {
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
                        <div class="word_one_line" onclick="openZ_WordPopup(${w.id-1},Z_Word.list)">
                            <div id="z_word_${w.id}" class="zh_font">${w.word}</div>
                        </div>
                    `;
                });
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
            </div>
        </div>
    `;
    openModal();
}

function openZ_WordPopup(id, list) {
    popup.innerHTML = "";
    popup.innerHTML = `
        <div class="oneResult">
            <div class="word_container">
                <div class="hanzi zh_font">${list[id].word}</div>
            </div>
            <div class="word_details">
                <p class="yomi_hanzi zh_font"><span class="category zh_font">拼音　</span>${list[id].pinyin}</p>
                <p><span class="category zh_font">意思　</span>${list[id].yisi}</p>
                <p class="zh_font"><span class="category zh_font">例子　</span>${list[id].lizi}</p>
            </div>
        </div>
    `;
    openModal();
}