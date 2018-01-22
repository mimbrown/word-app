export class AbstractSegmental {
    char: string;
    constructor (char) {
        this.char = char;
    }

    get readable () {
        return this.char;
    }
}
