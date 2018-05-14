export const DB = {
    'monsters': [
        {
            'name': 'slime',
            'strength': 15,
            'hp': 50,
            'drop': [
                'slime goo',
                'old sword',
                'ragged shoes'
            ]
        },
        {
            'name': 'orc',
            'strength': 15,
            'hp': 50,
            'drop': [
                'small axe',
                'simple pants',
                'leather shirt'
            ]
        }
    ],
    'items': [
        {
            'name': 'slime goo',
            'value': 1,
            'type': 'collectable'
        },
        {
            'name': 'old sword',
            'value': 10,
            'type': 'weapon',
            'damage': 5
        },
        {
            'name': 'small axe',
            'value': 20,
            'type': 'weapon',
            'damage': 7
        },
        {
            'name': 'wooden shield',
            'value': 15,
            'type': 'secondary weapon',
            'defense': 3
        },
        {
            'name': 'rusted dagger',
            'value': 50,
            'type': 'secondary weapon',
            'damage': 2
        },
        {
            'name': 'worn helmet',
            'value': 10,
            'type': 'helm',
            'defense': 2
        },
        {
            'name': 'leather shirt',
            'value': 35,
            'type': 'shirt',
            'defense': 5
        },
        {
            'name': 'ragged shoes',
            'value': 5,
            'type': 'shoe',
            'defense': 1
        },
        {
            'name': 'simple pants',
            'value': 15,
            'type': 'shoe',
            'defense': 2
        }
    ]
};
