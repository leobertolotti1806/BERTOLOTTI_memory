let table = document.getElementById("table");
let h1 = document.querySelector("main > h1");
//vettore immagini
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

//vettore celle e carta precedente
let cells = [];
let previous = {};

//turno e scoperte per turno
let turno = 0, scoperte = 0;

//vettori giocatori
let pl1 = [], pl2 = [];

//se è a false è perchè devi aspettare che le carte si girino
let canIclick = true;

shuffleImgs();

for (let i = 0; i < 4; i++) {
    let row = document.createElement("div");

    for (let j = 0; j < 4; j++) {
        let arrInd = i * 4 + j;

        let col = document.createElement("div");
        col.className = "card";
        col.innerHTML = `<div><div></div></div>`;
        col.firstChild.firstChild.style.backgroundImage = "url(./img/" + imgs[arrInd] + ".png)";

        row.appendChild(col);

        cells.push({
            card: col,
            id: imgs[arrInd],
            trovata: false, //numero giocatore
        });

        col.addEventListener("click", () => {
            if (!cells[arrInd].trovata && col.firstChild.className == "" && canIclick) {


                col.firstChild.className = "scopri";
                scoperte++;

                if (scoperte % 2 == 1) {
                    previous = {
                        id: cells[arrInd].id,
                        ind: arrInd,
                    };
                } else if (cells[arrInd].id == previous.id) {
                    //coppia
                    cells[arrInd].trovata = true;
                    cells[previous.ind].trovata = true;
                    cells[previous.ind].card.firstChild.className = "scopri";
                } else {
                    canIclick = false;

                    setTimeout(() => {
                        canIclick = true;
                        col.firstChild.className = "";
                        cells[previous.ind].card.firstChild.className = "";
                    }, 800);

                    scoperte = 0;
                    turno++;
                    h1.textContent = "Turno giocatore " + (turno % 2 + 1);
                }
            }
        });
    }

    table.appendChild(row);
}

function shuffleImgs() {
    imgs = imgs.concat(imgs);
    for (let i = imgs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [imgs[i], imgs[j]] = [imgs[j], imgs[i]];
    }
}