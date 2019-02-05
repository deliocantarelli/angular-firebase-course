export class Monster {
    constructor(
        public name: string,
        public hp: string,
        public strength: number,
        public video: string
    ) { }

    static fromJSONList(list) {
        return list.map(json => Monster.fromJSON(json));
    }
    static fromJSON({name, hp, strength, video}) {
        return new Monster(name, hp, strength, video);
    }
}
