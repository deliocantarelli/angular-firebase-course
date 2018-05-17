export class Item {
    constructor(
        public name: string,
        public type: string,
        public value: number
    ) { }

    get isRare() {
        return this.value >= 50;
    }

    static fromJSONList(list) {
        return list.map(json => Item.fromJSON(json));
    }
    static fromJSON({name, type, value}) {
        return new Item(name, type, value);
    }
}
