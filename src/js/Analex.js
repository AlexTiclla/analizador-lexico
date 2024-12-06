class Analex {
    #tpc = new Set(["var", "func", "if", "else", "for", "to", "do", "while", 
                    "readln", "println", "repeat", "until", "false", "true", 
                    "return", "not", "and", "or", "mod", "div", "char", "boolean", "integer"]);

    constructor() {
        this.tokens = [];
    }

    analyze(input) {
        const lines = input.split(/\n/);
        for (let line of lines) {
            line = line.trim();
            this.tokenize(line);
        }
        this.tokens.push({ type: "<FIN,_>", value: "EOF" });
    }

    tokenize(line) {
        const regex = /(\w+|\d+|\/\/.*|\(\*.*?\*\)|".*?"|\+\+|--|>=|<=|<>|!=|==|<|>|\(|\)|{|}|:=|\+|-|\*|\/|%|,|;|:|!)/g;
        let match;
        while ((match = regex.exec(line)) !== null) {
            this.classifyToken(match[0]);
        }
    }

    classifyToken(lexeme) {
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
        } else if (/^\d+$/.test(lexeme)) {
            this.tokens.push({ type: `<NUM,${lexeme}>`, value: lexeme });
        } else if (/^\/\/.*/.test(lexeme)) {
            this.tokens.push({ type: "<COMMENT_LINE,_>", value: lexeme });
        } else if (/^\(\*.*\*\)$/.test(lexeme)) {
            this.tokens.push({ type: "<COMMENT_BLOCK,_>", value: lexeme });
        } else if (/^[a-zA-Z]\w*$/.test(lexeme)) {
            this.tokens.push({ type: "<ID,-1>", value: lexeme });
        } else if (/^".*"$/.test(lexeme)) {
            this.tokens.push({ type: "<STRINGctte,0>", value: lexeme });
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

    getTokens() {
        return this.tokens;
    }
}
