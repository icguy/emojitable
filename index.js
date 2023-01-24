function hex(dec) {
    return dec.map(c => "u" + c.toString(16)).join("-");
}

function createURL(emoji1, emoji2) {
    if (!emoji1) emoji1 = 0;
    if (!emoji2) emoji2 = 0;
    if (typeof emoji1 == "number") emoji1 = emojis[emoji1];
    if (typeof emoji2 == "number") emoji2 = emojis[emoji2];
    let u1 = hex(emoji1[0]);
    let u2 = hex(emoji2[0]);
    let d = emoji1[1];
    return `https://www.gstatic.com/android/keyboard/emojikitchen/${d}/${u1}/${u1}_${u2}.png`;
}

function getSvg(emoji) {
    return `https://tikolu.net/emojimix/emojis/${emoji[0].map(c => c.toString(16)).filter(c => c != "fe0f").join("_")}.svg`;
}

$(() => {
    let body = document.getElementsByTagName("body")[0];
    let screenWidth = body.clientWidth;
    let screenHeight = body.clientHeight;
    let cellSize = 40;
    let numRows = Math.ceil(screenHeight * 1.0 / cellSize) + 1;
    let numCols = Math.ceil(screenWidth * 1.0 / cellSize) + 1;

    let table = $("body");
    let topHeader = $(`<div class="row"></div>`);
    topHeader.append(`<div class="cell">&nbsp;</div>`);
    for (let emoji of emojis) {
        topHeader.append(`<img class="header" src="${getSvg(emoji)}">`);
    }
    table.append(topHeader);
    let idx = 0;
    let cells = [];
    for (let emoji of emojis) {
        let row = $(`<div class="row"></div>`);
        row.append(`<img class="header" src="${getSvg(emoji)}">`);
        if (idx < numRows) {
            let rowCells = [];
            cells.push(rowCells);
            for (let c = 0; c < numCols; c++) {
                let cell = $(`<div class="cell"><img decoding="async" loading="lazy"></div>`);
                row.append(cell);
                rowCells.push(cell.children());
            }
        }
        table.append(row);
        idx++;
    }

    let lastColOffset, lastRowOffset;
    function render() {
        let colOffset = Math.floor(body.scrollLeft * 1.0 / cellSize);
        let rowOffset = Math.floor(body.scrollTop * 1.0 / cellSize);
        if (colOffset === lastColOffset && rowOffset === lastRowOffset)
            return;
        lastColOffset = colOffset;
        lastRowOffset = rowOffset;

        console.log(colOffset, rowOffset);
        for (let r = 0; r < numRows; r++) {
            let row = cells[r];
            for (let c = 0; c < numCols; c++) {
                let cell = row[c];
                let emoji1 = emojis[r + rowOffset];
                let emoji2 = emojis[c + colOffset];
                cell.attr("src", createURL(emoji1, emoji2));
                cell.attr("style", `top: ${rowOffset * cellSize}px; left: ${colOffset * cellSize}px`);
            }
        }
    }

    render();
    $("body").on("scroll", () => render());
});