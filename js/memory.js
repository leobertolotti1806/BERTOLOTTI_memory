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

let formData = JSON.parse(localStorage.memory);
let ia = {
    card: [],
    toCheck: [],
    scoperte: []
};

pl[0].previousElementSibling.textContent = formData.pl1;
pl[1].previousElementSibling.textContent = formData.pl2;
h2.textContent = "Turno giocatore " + formData.pl1;


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

                console.log(ia);

                if (ia.scoperte.length == 14) {
                    console.clear();
                }

                /* if (ia.scoperte.length == 15) {
                    return;
                } */

                this.firstChild.className = "scopri";
                scoperte++;

                if (scoperte % 2 == 1) {
                    previous = {
                        id: cells[arrInd].id,
                        ind: arrInd,
                    };

                    if (formData.ia)
                        iaFunc(arrInd);

                } else if (cells[arrInd].id == previous.id) {
                    //coppia
                    cells[arrInd].trovata = true;
                    cells[previous.ind].trovata = true;
                    cells[previous.ind].card.firstChild.className = "scopri";

                    let card = document.createElement("div");
                    card.innerHTML = "<img src='./img/" + imgs[arrInd] + ".png'>";

                    pl[turno].appendChild(card);


                    if (formData.ia) {
                        let iaInd = ia.card.findIndex(c => c.id == cells[arrInd].id);
                        
                        /* let posInd = ia.scoperte.findIndex(p => p == arrInd);
                        ia.scoperte.splice(posInd, 0); */

                        if (!ia.scoperte.includes(arrInd)) {
                            ia.scoperte.push(arrInd);
                        }

                        if (!ia.scoperte.includes(previous.ind)) {
                            ia.scoperte.push(previous.ind);
                        }

                        ia.card.splice(iaInd, 1);

                        iaInd = ia.toCheck.findIndex(c => c.id == cells[arrInd].id);
                        ia.toCheck.splice(iaInd, 1);

                        if (turno == 1)
                            iaFunc(arrInd);
                    }

                    if (!cells.some(c => !c.trovata)) {
                        alert("Vince il giocatore " + (turno + 1));
                        if (confirm("Volete rigiocare?")) {
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

                            ia = {
                                card: [],
                                toCheck: [],
                                scoperte: []
                            };

                            turno = 0;
                            scoperte = 0;
                        } else close();
                    }
                } else {
                    //cambio turno
                    if (condition) {
                        
                    }

                    scoperte = 0;

                    canIclick = false;
                    turno ^= 1;

                    h2.textContent = "Turno giocatore " + (turno == 0 ? formData.pl1 : formData.pl2);

                    if (formData.ia) {
                        let posInd = ia.scoperte.findIndex(s => s == arrInd);
                        ia.scoperte.splice(posInd, 0);

                        posInd = ia.scoperte.findIndex(s => s == previous.ind);
                        ia.scoperte.splice(posInd, 0);

                        iaFunc(arrInd);
                    }

                    setTimeout(() => {
                        canIclick = true;
                        this.firstChild.className = "";
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

function iaFunc(arrInd) {

    if (!ia.scoperte.includes(arrInd)) {
        if (!ia.card.some(c => c.id == cells[arrInd].id)) {
            /* prima volta scoperta */
            ia.card.push({
                id: cells[arrInd].id,
                card: cells[arrInd].card,
                ind: arrInd
            });

            ia.scoperte.push(arrInd);
        } else {
            /* già memorizzata */
            ia.toCheck.push({
                id: cells[arrInd].id,
                card: cells[arrInd].card,
                ind: arrInd
            });
        }
    }

    if (turno == 1) {
        /* TOCCA a ia */
        if (ia.toCheck.length > 0) {
            if (scoperte % 2 == 1) {
                setTimeout(() => {
                    let IaCardId = ia.card.findIndex(c => c.id == ia.toCheck[0].id);
                    ia.card[IaCardId].card.click();
                }, 500);
            } else {
                setTimeout(() => {
                    ia.toCheck[0].card.click();
                    //se da errore metti cells[sfas]card
                }, 1000);
            }
        } else {
            let k;

            do
                k = Math.floor(Math.random() * 16);
            while (cells[k].trovata || ia.scoperte.includes(k));

            setTimeout(() => {
                canIclick = true;
                cells[k].card.click();
            }, 850);
        }
    }
}