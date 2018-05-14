import {database, initializeApp} from 'firebase';
import {Firebase} from './src/environments/firebase.config';
import {DB} from './db-data';

initializeApp(Firebase.config);

const monsterRef = database().ref('monsters');
const itemRef = database().ref('items');

let monsterKey = '';

class DropMap {
    monster: string;
    dropList: string[];
    constructor(key, list) {
        this.monster = key;
        this.dropList = list;
    }
}
class MonsterDrop {
    values: DropMap[];
    constructor () {
        this.values = [];
    }
    add(key, list) {
        const newDrop: DropMap = new DropMap(key, list);
        this.values.push(newDrop);
    }
}
const monsterDrops = new MonsterDrop();
const itemMap = {};

DB['items'].forEach(item => {
    const key = itemRef.push({
        name: item.name,
        value: item.value,
        type: item.type
    }).key;
    itemMap[item.name] = key;
});
DB['monsters'].forEach(monster => {
    monsterKey = monsterRef.push({
        name: monster.name,
        strength: monster.strength,
        hp: monster.hp
    }).key;
    const array: string[] = monster['drop'];
    const keysArray = [];
    for (const item of array) {
        keysArray.push(itemMap[item]);
    }
    monsterDrops.add(monsterKey, keysArray);
    console.log(keysArray);
});

const dropRef = database().ref('drop');
monsterDrops.values.forEach((monsterDrop) => {
    const monsterDropRef = dropRef.child(monsterDrop.monster);
    for (const element of monsterDrop.dropList) {
        const itemDropRef = monsterDropRef.child(element);
        itemDropRef.set(true);
    }
});
