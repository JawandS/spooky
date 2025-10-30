// Monster Database for Hybrid Generation

const MONSTERS = {
    vampire: {
        name: "Vampire",
        emoji: "🧛",
        traits: {
            head: "sharp fangs and hypnotic eyes",
            torso: "elegant gothic attire",
            arms: "long pale fingers with sharp nails",
            legs: "swift supernatural speed",
            special: "transforms into a bat"
        },
        colors: ["crimson", "midnight black", "pale white"],
        abilities: [
            "drinks blood for sustenance",
            "controls minds with hypnotic gaze",
            "immortal and ageless",
            "vulnerable to sunlight and garlic"
        ],
        personality: ["sophisticated", "charming", "predatory", "nocturnal"]
    },

    werewolf: {
        name: "Werewolf",
        emoji: "🐺",
        traits: {
            head: "wolf-like snout with razor teeth",
            torso: "muscular frame covered in thick fur",
            arms: "powerful claws that tear through steel",
            legs: "digitigrade legs for incredible leaping",
            special: "howls at the full moon"
        },
        colors: ["silver grey", "midnight brown", "blood-stained"],
        abilities: [
            "superhuman strength and speed",
            "enhanced senses of smell and hearing",
            "transforms under the full moon",
            "regenerates wounds rapidly"
        ],
        personality: ["feral", "aggressive", "pack-minded", "instinctual"]
    },

    zombie: {
        name: "Zombie",
        emoji: "🧟",
        traits: {
            head: "decaying flesh with hollow eyes",
            torso: "exposed ribs and rotting organs",
            arms: "twitching limbs with peeling skin",
            legs: "shambling gait, dragging feet",
            special: "spreads infection through bites"
        },
        colors: ["sickly green", "rotting grey", "decay brown"],
        abilities: [
            "feels no pain or fear",
            "infects victims with undead plague",
            "never tires or needs rest",
            "attracted to fresh brains"
        ],
        personality: ["mindless", "relentless", "hungry", "contagious"]
    },

    ghost: {
        name: "Ghost",
        emoji: "👻",
        traits: {
            head: "transparent ethereal visage",
            torso: "wispy floating form",
            arms: "intangible spectral limbs",
            legs: "no legs, just a flowing tail",
            special: "phases through solid matter"
        },
        colors: ["ghostly white", "eerie blue", "translucent"],
        abilities: [
            "passes through walls effortlessly",
            "invisible at will",
            "possesses living creatures",
            "haunts locations of death"
        ],
        personality: ["vengeful", "sorrowful", "ethereal", "haunting"]
    },

    mummy: {
        name: "Mummy",
        emoji: "🧟‍♂️",
        traits: {
            head: "wrapped in ancient bandages",
            torso: "preserved corpse from millennia past",
            arms: "desiccated limbs with supernatural strength",
            legs: "slow but unstoppable stride",
            special: "commands ancient curses"
        },
        colors: ["sandy beige", "ancient brown", "dusty grey"],
        abilities: [
            "survived for thousands of years",
            "casts powerful ancient curses",
            "controls sand and dust",
            "guards treasures with eternal vigilance"
        ],
        personality: ["ancient", "wrathful", "protective", "cursed"]
    }
};

// Generate a portmanteau name from two monster names
function generateHybridName(monster1, monster2) {
    const name1 = monster1.name;
    const name2 = monster2.name;

    // Take first half of first name and second half of second name
    const splitPoint1 = Math.floor(name1.length / 2);
    const splitPoint2 = Math.floor(name2.length / 2);

    return name1.slice(0, splitPoint1) + name2.slice(splitPoint2);
}

// Generate a hybrid monster from random base monsters
function generateHybridMonster() {
    const monsterKeys = Object.keys(MONSTERS);

    // Select 2-3 random monsters to combine
    const numToMix = 2 + Math.floor(Math.random() * 2); // 2 or 3
    const selectedKeys = [];

    while (selectedKeys.length < numToMix) {
        const randomKey = monsterKeys[Math.floor(Math.random() * monsterKeys.length)];
        if (!selectedKeys.includes(randomKey)) {
            selectedKeys.push(randomKey);
        }
    }

    const selectedMonsters = selectedKeys.map(key => MONSTERS[key]);

    // Combine traits
    const hybrid = {
        name: generateHybridName(selectedMonsters[0], selectedMonsters[1]),
        emojis: selectedMonsters.map(m => m.emoji).join(''),
        parents: selectedMonsters.map(m => m.name),
        traits: {
            head: selectedMonsters[0].traits.head,
            torso: selectedMonsters[1 % selectedMonsters.length].traits.torso,
            arms: selectedMonsters[Math.floor(Math.random() * selectedMonsters.length)].traits.arms,
            legs: selectedMonsters[Math.floor(Math.random() * selectedMonsters.length)].traits.legs,
            special: selectedMonsters[Math.floor(Math.random() * selectedMonsters.length)].traits.special
        },
        colors: [],
        abilities: [],
        personality: []
    };

    // Combine colors, abilities, and personality
    selectedMonsters.forEach(monster => {
        // Pick one random color from each monster
        hybrid.colors.push(monster.colors[Math.floor(Math.random() * monster.colors.length)]);

        // Pick 1-2 random abilities from each monster
        const numAbilities = 1 + Math.floor(Math.random() * 2);
        for (let i = 0; i < numAbilities; i++) {
            const ability = monster.abilities[Math.floor(Math.random() * monster.abilities.length)];
            if (!hybrid.abilities.includes(ability)) {
                hybrid.abilities.push(ability);
            }
        }

        // Pick 1-2 random personality traits from each monster
        const numTraits = 1 + Math.floor(Math.random() * 2);
        for (let i = 0; i < numTraits; i++) {
            const trait = monster.personality[Math.floor(Math.random() * monster.personality.length)];
            if (!hybrid.personality.includes(trait)) {
                hybrid.personality.push(trait);
            }
        }
    });

    return hybrid;
}

// Generate a spooky description for the hybrid monster
function generateMonsterDescription(hybrid) {
    const intro = [
        `Behold the terrifying ${hybrid.name}!`,
        `From the depths of darkness emerges... the ${hybrid.name}!`,
        `Witness the horrifying fusion: the ${hybrid.name}!`,
        `A nightmare made flesh... the ${hybrid.name}!`,
        `Born from forbidden experiments... the ${hybrid.name}!`
    ];

    const origin = `This abomination combines the worst of ${hybrid.parents.join(' and ')}.`;

    const appearance = `It has ${hybrid.traits.head}, ${hybrid.traits.torso}, and ${hybrid.traits.arms}. ` +
                      `Its ${hybrid.traits.legs} carry it forward, and ${hybrid.traits.special}.`;

    const description = `${intro[Math.floor(Math.random() * intro.length)]} ` +
                       `${origin} ${appearance}`;

    return description;
}
