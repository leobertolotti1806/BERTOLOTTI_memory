let table = document.getElementById("table");
let headerName = document.querySelectorAll("header > div > div");
let pl = document.querySelectorAll(".pl");
let menu = document.getElementById("menu");

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

let param = new URLSearchParams(window.location.search);
let plName = [param.get("pl1"), param.get("pl2")];

headerName[1].textContent = plName[0];
headerName[0].textContent = plName[1];

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

                    let card = document.createElement("div");
                    card.innerHTML = "<img src='./img/" + imgs[arrInd] + ".png'>";

                    pl[turno].appendChild(card);

                    if (!cells.some(c => !c.trovata)) {
                        canIclick = false;

                        setTimeout(() => {
                            menu.querySelector("b").textContent = "Ha vinto " + plName[turno] + "!";

                            menu.style.top = "8vh";

                            menu.querySelector("#play").onclick = () => {
                                if (confirm("Volete rigiocare?")) {
                                    canIclick = true;
                                    
                                    menu.style.top = "";

                                    headerName[0].parentElement.className = "turno1";

                                    shuffleImgs();

                                    previous = {};

                                    for (const k in cells) {
                                        cells[k].trovata = false;
                                        cells[k].card.firstChild.className = "";
                                        cells[k].card.firstChild.firstChild.style.backgroundImage = "url(./img/" + imgs[k] + ".png)";
                                        cells[k].id = imgs[k];
                                    }

                                    pl[0].innerHTML = "";
                                    pl[1].innerHTML = "";

                                    turno = 0;
                                    scoperte = 0;
                                }
                            };
                            
                            menu.querySelector("#close").onclick = () => {
                                if (confirm("Volete chiudere?"))
                                    close();
                            };

                        }, 500);
                    }
                } else {
                    //cambio turno

                    scoperte = 0;
                    canIclick = false;
                    turno ^= 1;

                    setTimeout(() => {
                        headerName[0].parentElement.className = "turno" + (turno + 1);
                        canIclick = true;
                        col.firstChild.className = "";
                        cells[previous.ind].card.firstChild.className = "";
                    }, 800);
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