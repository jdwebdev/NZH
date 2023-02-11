let h_result_section = document.getElementById("h_result_section");
let h_searchBtn = document.getElementById("h_searchBtn");
let h_input = document.getElementById("h_input");
let h_resultNb = document.getElementById("h_resultNb");
let h_select = document.getElementById("h_select"); //? hanzi / word / fanti1 / fanti2
let h_select_lesson = document.getElementById("h_select_lesson");
h_select.addEventListener("change", e => {
    if (h_select.value == "lesson") {
        // if (h_select_lesson.innerHTML == "") {
        //     let lessonHTML = "";
        //     lessonHTML = `<option class="zh_font" value="all">모두</option>`;
        //     for(let i = 0; i < Hangul.lessonList.length; i++) {
        //         lessonHTML += `<option value="${Hangul.lessonList[i]}">${Hangul.lessonList[i]}</option>`;
        //     }
        //     h_select_lesson.innerHTML = lessonHTML;
        // }
        h_select_lesson.style.display = "flex";
    } else if (h_select.value == "hanja") {
        h_select_lesson.style.display = "none";
        h_search();
    } else {
        h_select_lesson.style.display = "none";
    }
});
h_select_lesson.addEventListener("change", e => {
    if (h_select_lesson.value == "all") {
        
    } else {
        h_search();
    }
});

let h_resultList = [];

h_searchBtn.addEventListener("click", e => {
    e.preventDefault();
    h_search();
});

function h_search() {

    h_result_section.innerHTML = "";
    h_resultNb.innerHTML = "";
        
    let innerHTML = "";
    switch(h_select.value) {
        case "lesson":
            innerHTML = "";

            if (h_select_lesson.value != "all") { //? Si aucun filtre de leçon précise
                innerHTML = "";
                h_resultList = [];
                Hangul.list.forEach(w => {
                    if (w.lesson.includes(h_select_lesson.value)) {
                        h_resultList.push(w);
                    }
                });
                h_resultList.forEach(w => {
                    innerHTML += `
                        <div class="word_one_line">
                            <div id="h_word_${w.id}" class="h_word zh_font" onclick="openHangulPopup(${w.id-1},Hangul.list)">${w.word}</div>
                        </div>
                    `;
                });
                h_result_section.innerHTML = innerHTML;
                h_resultNb.innerHTML = h_resultList.length;

            } else if (h_input.value == "") { //? Aucun filtre, affichage de tout
                
                Hangul.list.forEach(w => {
                    innerHTML += `
                        <div class="word_one_line">
                            <div id="h_word_${w.id}" class="h_word zh_font" onclick="openHangulPopup(${w.id-1},Hangul.list)">${w.word}</div>
                        </div>
                    `;
                });
                h_result_section.innerHTML = innerHTML;
                h_resultNb.innerHTML = Hangul.list.length;
                
            } else { //? Filtre de recherche input
                innerHTML = "";
                h_resultList = [];
                Hangul.list.forEach(w => {
                    if (w.word.includes(h_input.value)) {
                        h_resultList.push(w);
                    } else if (w.nihongo.includes(h_input.value)) {
                        h_resultList.push(w);
                    } else if (w.h_ex.includes(h_input.value)) {
                        h_resultList.push(w);
                    } else if (w.n_ex.includes(h_input.value)) {
                        h_resultList.push(w);
                    }
                });
                h_resultList.forEach(w => {
                    innerHTML += `
                        <div class="word_one_line" onclick="openHangulPopup(${w.id-1},Hangul.list)">
                            <div id="h_word_${w.id}" class="zh_font">${w.word}</div>
                        </div>
                    `;
                });
                h_result_section.innerHTML = innerHTML;
                h_resultNb.innerHTML = h_resultList.length;
            }

            break;

        case "hanja":
            innerHTML = "";
            Hangul.list.forEach(w => {
                if (w.hanja != "") {
                    h_resultList.push(w);
                }
            });
            h_resultList.forEach(w => {
                innerHTML += `
                    <div class="word_one_line">
                        <div id="h_word_${w.id}" class="h_word zh_font" onclick="openHangulPopup(${w.id-1},Hangul.list)">${w.word}</div>
                    </div>
                `;
            });
            h_result_section.innerHTML = innerHTML;
            h_resultNb.innerHTML = h_resultList.length;

            break;
        case "duo":
            innerHTML = "";

                if (h_input.value == "") { //? Aucun filtre, affichage de tout
                
                Hangul.duoList.forEach(w => {
                    innerHTML += `
                        <div class="word_one_line">
                            <div id="h_word_${w.id}" class="h_word zh_font" onclick="openHangulPopup(${w.id-1},Hangul.duoList)">${w.word}</div>
                        </div>
                    `;
                });
                h_result_section.innerHTML = innerHTML;
                h_resultNb.innerHTML = Hangul.duoList.length;
                
            } else { //? Filtre de recherche input
                innerHTML = "";
                h_resultList = [];
                Hangul.duoList.forEach(w => {
                    if (w.word.includes(h_input.value)) {
                        h_resultList.push(w);
                    } else if (w.nihongo.includes(h_input.value)) {
                        h_resultList.push(w);
                    } else if (w.h_ex.includes(h_input.value)) {
                        h_resultList.push(w);
                    } else if (w.n_ex.includes(h_input.value)) {
                        h_resultList.push(w);
                    }
                });
                h_resultList.forEach(w => {
                    innerHTML += `
                        <div class="word_one_line" onclick="openHangulPopup(${w.id-1},Hangul.duoList)">
                            <div id="h_word_${w.id}" class="zh_font">${w.word}</div>
                        </div>
                    `;
                });
                h_result_section.innerHTML = innerHTML;
                h_resultNb.innerHTML = h_resultList.length;
            }

            break;
    }
}

function openHangulPopup(id, list) {
    popup.innerHTML = "";

    popup.innerHTML = `
        <div class="oneResult">
            <div class="word_container">
                <div class="word_h zh_font">${list[id].word}</div>
            </div>
            <div class="word_details">
                <p><span class="category zh_font">의미　</span>${list[id].nihongo}</p>
                <p class="zh_font"><span class="category zh_font">예　</span>${list[id].h_ex}</p>
                <p><span class="category zh_font">예　</span>${list[id].n_ex}</p>
            </div>
            <div class="sonota_h">
                <p class="zh_font">${list[id].hanja}</p>
            </div>
        </div>
    `;
    openModal();
}