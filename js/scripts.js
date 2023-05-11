const data = [

    {
        min: 1,
        max: 16.4,
        classification: "Menor que 16,0",
        info: "Magresa ",
        obesity: "(Grave)",
        tier: 4,
    },

    {
        min: 16.5,
        max: 18.5,
        classification: "Entre 16.5 a 18,5",
        info: "Magreza",
        obesity: "",
        tier: 1,
    },

    {
        min: 18.6,
        max: 24.9,
        classification: "Entre 18,6 a 24,9",
        info: "Normal",
        obesity: "",
        tier: 0,
    },

    {
        min: 25,
        max: 29.9,
        classification: "Entre 30,0 a 34,9",
        info: "Sobrepeso",
        obesity: "",
        tier: 2,
    },

    {
        min: 30,
        max: 34.9,
        classification: "Entre 30,0 a 34,9",
        info: "Obesidade ",
        obesity: "I",
        tier: 3,
    },

    {
        min: 35,
        max: 39.9,
        classification: "Entre 35,0 a 39,9",
        info: "Obesidade",
        obesity: "II",
        tier: 3,

    },

    {
        min: 40,
        max: 99,
        classification: "Maior que 40,0",
        info: "Obesidade",
        obesity: "III (Grave)",
        tier: 4,
    },

];

// Seleções de inputs
const inputWeight = document.querySelector("#weight");
const inputHeight = document.querySelector("#height");

// Seleções dos buttons
const btnCalculator = document.querySelector("#btn-calculator");
const btnReset = document.querySelector("#btn-reset");

// Seleção de elementos
const formResult = document.querySelector("#form-result");


// Funções 

// Calcula o imc
function calcImc(height, weight) {
    const imc = (weight / (height * height)).toFixed(1);
    return imc;
}

// Limpar inputs
function clearInputs() {
    inputWeight.value = "";
    inputHeight.value = "";
    formResult.style.display = "none";
}

// Limpa os dados do resultado ao apagar os valores dos inputs.
function clearResults() {
    if (inputWeight.value === "" || inputHeight.value === "") {
        formResult.innerHTML = "";
        formResult.style.display = "none";
    }
}

// Cria o tamplate com o resultado.
let imcNumberSpan;
let imcInfoSpan;

function createTable() {
    formResult.innerHTML = "";
    formResult.style.display = "flex";

    // Cria o elemento "result" que mostra o IMC e a classificação
    const resultIMC = document.createElement("div");
    resultIMC.id = "result";

    // Cria o imc-number 
    const imcNumberP = document.createElement("p");
    imcNumberP.id = "imc-number";
    imcNumberP.textContent = "O seu IMC: ";

    // Cria o span e adiona dentro do imc-number
    imcNumberSpan = document.createElement("span");
    imcNumberP.appendChild(imcNumberSpan);
    resultIMC.appendChild(imcNumberP);

    // Cria "imc-info"
    const imcInfoP = document.createElement("p");
    imcInfoP.id = "imc-info";
    imcInfoP.textContent = "Sua Classificação: ";

    imcInfoSpan = document.createElement("span");
    imcInfoSpan.textContent = data.info;

    imcInfoP.appendChild(imcInfoSpan);
    resultIMC.appendChild(imcInfoP);

    // Cria a tabela
    const table = document.createElement("table")
    table.id = "table";

    // cria o elemento thead
    const tableHead = document.createElement("thead");
    tableHead.id = "table-head";

    // Cria o elemento tr
    const headerRow = document.createElement("tr");
    headerRow.id = "header-row";

    // Criar um array que recebe duas strings "IMC" e "Classificação"
    const headerColumns = ["IMC", "Classificação"];

    for (let i = 0; i < headerColumns.length; i++) {
        const headerColumn = document.createElement("th");
        headerColumn.classList.add("header-columns");
        headerColumn.textContent = headerColumns[i];
        headerRow.appendChild(headerColumn);
    }

    // Cria o tbody
    const tBody = document.createElement("tbody");
    tBody.id = "table-body";

    // Adiciona as linhas de dados na tabela
    data.forEach((item) => {
        // imcInfoSpan.textContent = `${item.info} ${item.obesity}`

        const tr = document.createElement("tr");
        tr.classList.add("table-data");

        const td1 = document.createElement("td");
        td1.classList.add("table-line");
        td1.textContent = `${item.classification}`;
        tr.appendChild(td1);

        const td2 = document.createElement("td");
        td2.classList.add("table-line");
        td2.textContent = `${item.info} ${item.obesity}`;
        tr.appendChild(td2);

        tBody.appendChild(tr);
    });

    // Adiciona o "result" ao "form-result"
    formResult.appendChild(resultIMC);

    // Adiciona a table ao "form-result" depois do "result".
    formResult.appendChild(table);

    // Adiciona o "table-head" dentro da tabela.
    table.appendChild(tableHead);

    // Adiciona o "header-row" dentro do "table-header"
    tableHead.appendChild(headerRow);

    // Adiciona o table-body dentro do table
    table.appendChild(tBody);

    // Criando o botão 
    const controlButton = document.createElement("div");
    controlButton.id = "control-button-result";
    formResult.appendChild(controlButton);
}

function tiago() {
    const weight = +inputWeight.value.replace(",", ".");
    const height = +inputHeight.value.replace(",", ".");

    if (!weight || !height) return;

    const imc = calcImc(height, weight);

    data.forEach((item) => {
        if (imc >= item.min && imc <= item.max) {
            info = item.info;
            tier = item.tier;
            obesity = item.obesity;
        }
    });

    imcNumberSpan.textContent = `${imc}`;
    imcInfoSpan.innerText = [info + " " + obesity];

    switch (tier) {

        case 0:
            imcNumberSpan.classList.add("good");
            imcInfoSpan.classList.add("good");
            break;

        case 1:
            imcNumberSpan.classList.add("low");
            imcInfoSpan.classList.add("low");
            break;

        case 2:
            imcNumberSpan.classList.add("low");
            imcInfoSpan.classList.add("low");
            break;

        case 3:
            imcNumberSpan.classList.add("midium");
            imcInfoSpan.classList.add("midium");
            break;

        case 4:
            imcNumberSpan.classList.add("high");
            imcInfoSpan.classList.add("high");
            break;
    }
}

// Eventos 
btnCalculator.addEventListener("click", (e) => {
    if (!inputHeight.value || !inputWeight.value) return;
    e.preventDefault();
    createTable();
    tiago();
});

btnReset.addEventListener("click", (e) => {
    e.preventDefault();
    clearInputs();
});

const inputs = [inputWeight, inputHeight];

inputs.forEach((input) => {
    input.addEventListener("input", clearResults);
});