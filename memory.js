let table = document.querySelector("main > div");
let cells = [];
let imgs = [
    "gambero",
    "granchio",
    "pesce",
    "piatto",
    "polipo",
    "stella",
    "tazza",
    "tazzina"
];

let card = [
    {
        id: imgs, //immagine
        trovata: false, //numero giocatore
    }
];

imgs = imgs.concat(imgs);
shuffleImgs();

for (let i = 0; i < 4; i++) {
    let row = document.createElement("div");

    for (let j = 0; j < 4; j++) {
        let col = document.createElement("div");
        col.className = "card";
        col.innerHTML = `<div><div></div></div>`;

        col.addEventListener("click", function () {
            if () {
                this.firstChild.style.transform = "rotateY(180deg)";

                setTimeout(function () {
                    this.firstChild.style.transform = "";
                }, 1500);
            }
        })

        row.appendChild(col);
        cells.push(col);
    }

    table.appendChild(row);
}

for (let i = 0; i < cells.length; i++) {
    cells[i].firstChild.firstChild.style.backgroundImage = "url('./img/" + imgs[i] + ".png')";
    /* cells[i].firstChild.style.transform = "rotateY(180deg)"; */
}

function shuffleImgs() {
    for (let i = imgs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = imgs[i];
        imgs[i] = imgs[j];
        imgs[j] = temp;
    }
}

