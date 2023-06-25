let table = document.getElementById("table");
let h2 = document.querySelector("header > h2");
let pl = document.querySelectorAll(".pl");

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

imgs = imgs.concat(imgs);

//vettore celle e carta precedente
let cells = [];
let previous = {};

//turno e scoperte per turno
let turno = 0, scoperte = 0;

//se è a false è perchè devi aspettare che le carte si girino
let canIclick = true;

shuffleImgs();

for (let i = 0; i < 4; i++) {
    let row = document.createElement("div");

    for (let j = 0; j < 4; j++) {
        const arrInd = i * 4 + j;

        let col = document.createElement("div");
        col.className = "card";
        col.innerHTML = `<div><div></div></div>`;
        col.firstChild.firstChild.style.backgroundImage = "url(./img/" + imgs[arrInd] + ".png)";

        row.appendChild(col);

        cells.push({
            card: col,
            id: imgs[arrInd],
            trovata: false,
        });

        col.addEventListener("click", function () {
            if (!cells[arrInd].trovata && this.firstChild.className == "" && canIclick) {

                this.firstChild.className = "scopri";
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

                    let card = document.createElement("div");
                    card.innerHTML = "<img src='./img/" + imgs[arrInd] + ".png'>";

                    pl[turno].appendChild(card);

                    if (!cells.some(c => !c.trovata)) {
                        setTimeout(() => {
                            alert("Vince il giocatore " + (turno + 1));
                            if (confirm("Volete rigiocare?")) {
                                shuffleImgs();

                                previous = {};

                                for (const k in cells) {
                                    cells[k].trovata = false;
                                    cells[k].card.firstChild.className = "";
                                    cells[k].card.firstChild.firstChild.style.backgroundImage = "url(./img/" + imgs[k] + ".png)";
                                }

                                pl[0].innerHTML = "";
                                pl[1].innerHTML = "";

                                turno = 0;
                                scoperte = 0;
                            } else close();
                        }, 800);
                    }
                } else {
                    //cambio turno
                    canIclick = false;

                    setTimeout(() => {
                        canIclick = true;
                        this.firstChild.className = "";
                        cells[previous.ind].card.firstChild.className = "";
                    }, 800);

                    scoperte = 0;
                    turno ^= 1;

                    h2.textContent = "Turno giocatore " + (turno + 1);
                }
            }
        });
    }

    table.appendChild(row);
}

function shuffleImgs() {
    for (let i = imgs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [imgs[i], imgs[j]] = [imgs[j], imgs[i]];
    }
}