export class Ambiguity {
    name: string;
    check: Function;
    constructor (name: string, check: Function) {
        this.name = name;
        this.check = check;
    }
}