function hex(dec) {
    return dec.map(c => "u" + c.toString(16)).join("-");
}

function createURL(emoji1, emoji2) {
	if(!emoji1) emoji1 = 0;
	if(!emoji2) emoji2 = 0;
	if(typeof emoji1 == "number") emoji1 = emojis[emoji1];
	if(typeof emoji2 == "number") emoji2 = emojis[emoji2];
	let u1 = hex(emoji1[0]);
	let u2 = hex(emoji2[0]);
	let d = emoji1[1];
	return `${API}${d}/${u1}/${u1}_${u2}.png`;
}

function getSvg(emoji) {
    return `https://tikolu.net/emojimix/emojis/${emoji[0].map(c => c.toString(16)).filter(c => c != "fe0f").join("_")}.svg`;
}

// https://tikolu.net/emojimix/emojis/1f31c.svg
$(() => {
    let table = $(".main table");
    let topHeader = $("<tr></tr>");
    topHeader.append("<th></th>");
    for(let emoji of emojis) {
        topHeader.append(`<th><img src="${getSvg(emoji)}"></th>`);
    }
    table.append(topHeader);
    for(let emoji of emojis) {
        let row = $("<tr></tr>");
        row.append(`<th><img src="${getSvg(emoji)}"></th>`);
        for(let emoji2 of emojis) {
            row.append(`<td><img src=${createURL(emoji, emoji2)}></td>`);
        }
        table.append(row);
    }
});