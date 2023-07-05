let pl1 = document.getElementById("pl1");
let pl2 = document.getElementById("pl2");
let precPl2Value = "";

document.getElementById("table").onsubmit = (e) => {
    if (pl1.value.length > 10) {
        e.preventDefault();
        alert("Giocatore 1, massimo caratteri 10");

    } else if (pl2.value.length > 10) {
        e.preventDefault();
        alert("Giocatore 2, massimo caratteri 10");

    } else if (pl1.value == pl2.value) {
        e.preventDefault();
        alert("Inserite nomi diversi!");

    } else {
        localStorage.memory = JSON.stringify({
            pl1: pl1.value,
            pl2: pl2.value,
        });
    }
}