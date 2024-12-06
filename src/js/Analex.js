class Analex {
    // Conjunto de palabras clave reservadas
    #tpc = new Set(["var", "func", "if", "else", "for", "to", "do", "while", 
                    "readln", "println", "repeat", "until", "false", "true", 
                    "return", "not", "and", "or", "mod", "div", "char", "boolean", "integer"]);

    constructor() {
        // Array para almacenar los tokens generados
        this.tokens = [];
    }

    // Método principal para analizar el input
    analyze(input) {
        // Divide el input en líneas
        const lines = input.split(/\n/);
        for (let line of lines) {
            // Elimina espacios en blanco al inicio y al final de la línea
            line = line.trim();
            // Tokeniza la línea
            this.tokenize(line);
        }
        // Añade un token de fin de archivo
        this.tokens.push({ type: "<FIN,_>", value: "EOF" });
    }

    // Método para tokenizar una línea
    tokenize(line) {
        // Expresión regular para identificar diferentes tipos de lexemas
        const regex = /(\w+|\d+|\/\/.*|\(\*.*?\*\)|".*?"|\+\+|--|>=|<=|<>|!=|==|=|<|>|\(|\)|{|}|:=|\+|-|\*|\/|%|,|;|:|!)/g;
        let match;
        // Encuentra todos los lexemas en la línea
        while ((match = regex.exec(line)) !== null) {
            // Clasifica cada lexema encontrado
            this.classifyToken(match[0]);
        }
    }

    // Método para clasificar un lexema y añadir el token correspondiente
    classifyToken(lexeme) {
        // Verifica si el lexema es una palabra clave reservada
        if (this.#tpc.has(lexeme.toLowerCase())) {
            switch (lexeme.toLowerCase()) {
                case 'char':
                    this.tokens.push({ type: "<TIPO,CHAR>", value: lexeme });
                    break;
                case 'boolean':
                    this.tokens.push({ type: "<TIPO,BOOLEAN>", value: lexeme });
                    break;
                case 'integer':
                    this.tokens.push({ type: "<TIPO,INT>", value: lexeme });
                    break;
                default:
                    this.tokens.push({ type: `<${lexeme.toUpperCase()},_>`, value: lexeme });
            }
        // Verifica si el lexema es un número
        } else if (/^\d+$/.test(lexeme)) {
            this.tokens.push({ type: `<NUM,${lexeme}>`, value: lexeme });
        // Verifica si el lexema es un comentario de línea, si es lo salta
        } else if (/^\/\/.*/.test(lexeme)) {
            return;
        // Verifica si el lexema es un comentario de bloque, si es lo salta
        } else if (/^\(\*.*\*\)$/.test(lexeme)) {
            return;
        // Verifica si el lexema es un identificador
        } else if (/^[a-zA-Z]\w*$/.test(lexeme)) {
            this.tokens.push({ type: "<ID,-1>", value: lexeme });
        // Verifica si el lexema es una cadena de texto
        } else if (/^".*"$/.test(lexeme)) {
            this.tokens.push({ type: "<STRINGctte,0>", value: lexeme });
        // Clasifica operadores y otros símbolos
        } else {
            switch (lexeme) {
                case ',':
                    this.tokens.push({ type: "<COMA,_>", value: lexeme });
                    break;
                case ';':
                    this.tokens.push({ type: "<PTOCOMA,_>", value: lexeme });
                    break;
                case ':':
                    this.tokens.push({ type: "<DOSPUNTOS,_>", value: lexeme });
                    break;
                case ':=':
                    this.tokens.push({ type: "<ASSIGN,_>", value: lexeme });
                    break;
                case '(':
                    this.tokens.push({ type: "<PA,_>", value: lexeme });
                    break;
                case ')':
                    this.tokens.push({ type: "<PC,_>", value: lexeme });
                    break;
                case '{':
                    this.tokens.push({ type: "<LA,_>", value: lexeme });
                    break;
                case '}':
                    this.tokens.push({ type: "<LC,_>", value: lexeme });
                    break;
                case '=':
                    this.tokens.push({ type: "<OPREL,IGUAL>", value: lexeme });
                    break;
                case '<':
                    this.tokens.push({ type: "<OPREL,MEN>", value: lexeme });
                    break;
                case '>':
                    this.tokens.push({ type: "<OPREL,MAY>", value: lexeme });
                    break;
                case '<=':
                    this.tokens.push({ type: "<OPREL,MEI>", value: lexeme });
                    break;
                case '>=':
                    this.tokens.push({ type: "<OPREL,MAI>", value: lexeme });
                    break;
                case '!=':
                case '<>':
                    this.tokens.push({ type: "<OPREL,DIS>", value: lexeme });
                    break;
                case '++':
                    this.tokens.push({ type: "<INC,_>", value: lexeme });
                    break;
                case '--':
                    this.tokens.push({ type: "<DEC,_>", value: lexeme });
                    break;
                case '!':
                    this.tokens.push({ type: "<NOT,_>", value: lexeme });
                    break;
                case '*':
                    this.tokens.push({ type: "<POR,_>", value: lexeme });
                    break;
                case '%':
                    this.tokens.push({ type: "<MOD,_>", value: lexeme });
                    break;
                case '/':
                    this.tokens.push({ type: "<DIV,_>", value: lexeme });
                    break;
                case '+':
                    this.tokens.push({ type: "<MAS,_>", value: lexeme });
                    break;
                case '-':
                    this.tokens.push({ type: "<MENOS,_>", value: lexeme });
                    break;
                default:
                    this.tokens.push({ type: "<ERROR,_>", value: lexeme });
            }
        }
    }

    // Método para obtener los tokens generados
    getTokens() {
        return this.tokens;
    }
}
