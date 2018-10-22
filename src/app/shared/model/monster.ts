export class Monster {
    constructor(
        public name: string,
        public hp: string,
        public strength: number
    ) { }

    static fromJSONList(list) {
        return list.map(json => Monster.fromJSON(json));
    }
    static fromJSON({name, hp, strength}) {
        return new Monster(name, hp, strength);
    }
}
