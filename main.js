// import './src/css/style.css'
// import './src/js/Analex'

let tokens = [];
let currentIndex = 0;

document.getElementById("analyze-btn").addEventListener("click", () => {
    const codeInput = document.getElementById("code-input").value;
    const typeElement = document.getElementById("token-type");
    const valueElement = document.getElementById("token-value");

    const analex = new Analex();
    analex.analyze(codeInput);
    tokens = analex.getTokens();
    currentIndex = 0;

    if (tokens.length > 0) {
        document.getElementById("next-btn").disabled = false;
        document.getElementById("finish-btn").disabled = false;
        showToken(typeElement, valueElement);
    }
});

document.getElementById("next-btn").addEventListener("click", () => {
    const typeElement = document.getElementById("token-type");
    const valueElement = document.getElementById("token-value");
    if (currentIndex < tokens.length - 1) {
        currentIndex++;
        showToken(typeElement, valueElement);
    } else {
        document.getElementById("next-btn").disabled = true;
    }
});

document.getElementById("finish-btn").addEventListener("click", () => {
    document.getElementById("code-input").value = '';
    document.getElementById("token-type").textContent = 'Tipo: ';
    document.getElementById("token-value").textContent = 'Valor: ';
    document.getElementById("next-btn").disabled = true;
    document.getElementById("finish-btn").disabled = true;
    tokens = [];
    currentIndex = 0;
});

function showToken(typeElement, valueElement) {
    const token = tokens[currentIndex];
    typeElement.textContent = `Tipo: ${token.type}`;
    valueElement.textContent = `Valor: ${token.value}`;
}