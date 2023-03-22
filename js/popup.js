//windows error noise
const popup = {
    container: document.getElementById("popup"),
    text: document.getElementById("popup-text"),
    title: document.getElementById("popup-title"),

    inputContainer: document.getElementById("popup-input-container"),
    input: document.getElementById("popup-input"),
    inputSend: document.getElementById("popup-send"),

    selectContainer: document.getElementById("popup-select-container"),
    select: document.getElementById("popup-select"),
    selectSend: document.getElementById("popup-select-send")
}

//generic popup functions
function closePopUp() {
    popup.container.style.display = "none";
    popup.inputContainer.style.display = "none";
    popup.selectContainer.style.display = "none";
}

function openPopUp(msg, title = "alert") {
    popup.text.innerHTML = msg;
    popup.title.innerHTML = title;
    popup.container.style.display = "block";

    //hide inputs by default
    popup.inputContainer.style.display = "none";
    popup.selectContainer.style.display = "none";
}

//specific popup stuff!
function errorPopUp(msg) {
    openPopUp(msg, "error :(");
}

function infoPopUp(msg) {
    openPopUp(msg, "info");
}

function inputPopUp(prompt) {
    openPopUp(prompt, "input");
    popup.inputContainer.style.display = "block";
}

//opens a "select" popup.
//options: an array used to build the options in the select dropdown
//sendAction: string representing a function. executed on completion, passing in the select value.
function selectPopUp(prompt, options, sendAction) {
    openPopUp(prompt, "select an option");

    optionsBlock = "";

    for (o of options) {
        optionsBlock += `<option value="${o}">${o}</option>`;
    }
    popup.select.innerHTML = optionsBlock;
    popup.selectSend.onclick = `closePopUp(); ${sendAction}(popup.select.value);`;
    console.log(sendAction);

    popup.selectContainer.style.display = "block";
}