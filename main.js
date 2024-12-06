// Array para almacenar los tokens analizados
let tokens = [];
// Índice actual del token que se está mostrando
let currentIndex = 0;

// Añade un listener al botón de análisis
document.getElementById("analyze-btn").addEventListener("click", () => {
    // Obtiene el código de entrada del usuario
    const codeInput = document.getElementById("code-input").value;
    // Obtiene los elementos para mostrar el tipo y valor del token
    const typeElement = document.getElementById("token-type");
    const valueElement = document.getElementById("token-value");

    // Crea una nueva instancia del analizador léxico
    const analex = new Analex();
    // Analiza el código de entrada
    analex.analyze(codeInput);
    // Obtiene los tokens analizados
    tokens = analex.getTokens();
    // Resetea el índice actual
    currentIndex = 0;

    // Si hay tokens, habilita los botones "next" y "finish" y muestra el primer token
    if (tokens.length > 0) {
        document.getElementById("next-btn").disabled = false;
        document.getElementById("finish-btn").disabled = false;
        showToken(typeElement, valueElement);
    }
});

// Añade un listener al botón "next"
document.getElementById("next-btn").addEventListener("click", () => {
    // Obtiene los elementos para mostrar el tipo y valor del token
    const typeElement = document.getElementById("token-type");
    const valueElement = document.getElementById("token-value");
    // Si hay más tokens, incrementa el índice y muestra el siguiente token
    if (currentIndex < tokens.length - 1) {
        currentIndex++;
        showToken(typeElement, valueElement);
    } else {
        // Si no hay más tokens, deshabilita el botón "next"
        document.getElementById("next-btn").disabled = true;
    }
});

// Añade un listener al botón "finish"
document.getElementById("finish-btn").addEventListener("click", () => {
    // Resetea los campos de entrada y visualización de tokens
    document.getElementById("code-input").value = '';
    document.getElementById("token-type").textContent = 'Tipo: ';
    document.getElementById("token-value").textContent = 'Valor: ';
    // Deshabilita los botones "next" y "finish"
    document.getElementById("next-btn").disabled = true;
    document.getElementById("finish-btn").disabled = true;
    // Resetea el array de tokens y el índice actual
    tokens = [];
    currentIndex = 0;
});

// Función para mostrar el token actual
function showToken(typeElement, valueElement) {
    const token = tokens[currentIndex];
    typeElement.textContent = `Tipo: ${token.type}`;
    valueElement.textContent = `Valor: ${token.value}`;
}