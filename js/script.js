let pl1 = document.getElementById("pl1");
let pl2 = document.getElementById("pl2");
let ia = document.getElementById("ia");
let precPl2Value;

ia.addEventListener("change", () => {
    if (ia.checked) {
        precPl2Value = pl2.value;
        pl2.value = "I.A.";
    } else pl2.value = precPl2Value;

    pl2.readOnly = ia.checked;
    pl2.classList.toggle("noFocus");
});

document.getElementById("table").onsubmit = () => {
    localStorage.memory = JSON.stringify({
        pl1: pl1.value,
        pl2: pl2.value,
        ia: ia.checked
    });
}