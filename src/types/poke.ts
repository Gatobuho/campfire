export interface Pokemon {
  id: number
  name: string
  img: string
  type: string
  stats: {
    hp: number
    attack: number
    defense: number
    sp_atk: number
    sp_def: number
    speed: number
  }
}

export interface TrainerStats {
  body: {
    health: number
    brawn: number
    swiftness: number
    defence: number
  }
  mind: {
    sense: number
    wisdom: number
    smarts: number
    nerve: number
  }
  soul: {
    charm: number
    confidence: number
    intuition: number
    luck: number
  }
}

export enum TrainerClasses {
  ACE = 'Ace Trainer',
  PAKCER = 'Backpacker',
  BEAUTY = 'Beauty',
  BIKER = 'Biker',
  KEEPER = 'Bird Keeper',
  BELT = 'Black Belt',
  BREEDER = 'Breeder',
  CATCHER = 'Bug Catcher',
  BURGLAR = 'Burglar',
  CHANNELER = 'Channeler',
  CHEF = 'Chef',
  TAMER = 'Dragon Tamer',
  FISHERMAN = 'Fisherman',
  GAMBLER = 'Gambler',
  JUGGLER = 'Juggler',
  LASS = 'Lass',
  YOUNGSTER = 'Youngster',
  MUSICIAN = 'Musician',
  FAN = 'Pokefan',
  POKEMANIAC = 'Pokemaniac',
  PSYCHIC = 'Psychic',
  SAGE = 'Sage',
  SCIENTIST = 'Scientist',
  SURFER = 'Surfer',
  CUSTOM = 'Custom',
}
export interface ClassMods {
  [string: TrainerClasses]: TrainerStats
}
export const classes: ClassMods = {
  [TrainerClasses.ACE]: {
    body: {
      health: 100,
      brawn: 100,
      swiftness: 100,
      defence: 100,
    },
    mind: {
      sense: 100,
      wisdom: 100,
      smarts: 100,
      nerve: 100,
    },
    soul: {
      charm: 100,
      confidence: 100,
      intuition: 100,
      luck: 100,
    },
  },
}

/*
ACE TRAINER
+ Nerve
+ Swiftness
+ Intuition
+ Confidence
- Charisma
+5 Catch Bonus (ALL)
BACKPACKER
+ Brawn
+ Defense
+ Sense
+10 Catch Bonus (ROCK, GROUND)
BEAUTY
+ Health
++ Charisma
++ Confidence
- Smarts
- Wisdom
- Intuition
+10 Catch Bonus (FIRE, ICE)
BIKER/CYCLIST
+Nerve
++ Defense
+ Swiftness
- Charisma
+10 Catch Bonus (POISON, FLYING)
BIRD KEEPER
++ Sense
+Swiftness
+15 Catch Bonus (FLYING)
BLACKBELT
+ Brawn
++ Defense
+ Swiftness
- Luck
+ 15 Catch Bonus (FIGHTING)
BREEDER
+ Luck
+ Charisma
+ Intuition
- Brawn
+10 Catch Bonus (NORMAL, FAIRY)
BUG CATCHER
++ Swiftness
+Smarts
+ Sense
-- Charisma
+15 Catch Bonus (BUG)
BURGLAR
+ Swiftness
++ Confidence
+ Nerve
- Intuition
+5 Catch Bonus (ALL)
CHANNELER
+++ Intuition
- Health
+15 Catch Bonus (GHOSTS)
CHEF/COOK/BAKER
+++ Charisma
- Nerve
+10 Catch Bonus (FAIRY, NORMAL)
DRAGON TAMER
++ Confidence
+/- Wisdom when around a Dragon
+15 Catch Bonus (DRAGON)
FISHERMAN
++ Wisdom
+ Luck
+ Intuition
- Swiftness
+15 Catch Bonus (WATER)
GAMBLER
++++ Luck
- Intuition
- Nerve
- Health
- Wisdom
- Defense
+10 Catch Bonus (DARK, NORMAL)
JUGGLER/FIREBREATHER
++ Swiftness
+ Sense
+ Nerve
- Charisma
+10 Catch Bonus (FIRE, POISON)
LASS/YOUNGSTER
+ Luck
+ Nerve
+ Charisma
+ Confidence
- Brawn
- Wisdom
+10 Catch Bonus (NORMAL, FIGHTING)
MUSICIAN
+ Swiftness
+ Charisma
+ Health
+10 Catch Bonus (ELECTRIC, ROCK)
POKEFAN
++ Intuition
+ Smarts
+5 Catch Bonus (ALL)
PSYCHIC
++ Wisdom
+ Intuition
+ Health
- Brawn
- Defense
+15 Catch Bonus (PSYCHIC)
SAGE
++++ Wisdom
---- Brawn
+10 Catch Bonus
(GRASS, PSYCHIC, ICE)
SCIENTIST/ENGINEER
++++ Smarts
-- Charisma
- Brawn
+10 Catch Bonus (ELECTRIC, STEEL)
SWIMMER
+ Defense
+ Brawn
+ Sense
+10 Catch Bonus (WATER, ICE)
[ CUSTOM ]
5 + Points to Distribute
2 - Points to Distribute
No single Stat can exceed 2 +
Pick Catch Bonus:
+15 One Type,
+10 Two Types,
or +5 All Types
*/

export interface Trainer {
  id: number
  name: string
  img: string
  class: TrainerClasses
  stats: TrainerStats
  other?: string
}

export const defaultTrainer: Trainer = {
  id: 0,
  name: '',
  img: '3DS---Pokemon-X-Y---Trainer-VS-Faces-Large_175.gif',
  class: TrainerClasses.CUSTOM,
  stats: {
    body: {
      health: 0,
      brawn: 0,
      swiftness: 0,
      defence: 0,
    },
    mind: {
      sense: 1,
      wisdom: 2,
      smarts: 3,
      nerve: 4,
    },
    soul: {
      charm: 0,
      confidence: 0,
      intuition: 0,
      luck: 0,
    },
  },
}

export interface Item {
  id: number
  name: string
  img: string
  amount: number
  price: number
  description: string
}

export const defaultItem: Item = {
  id: 0,
  name: '',
  img: '',
  amount: 0,
  price: 0,
  description: '',
}
export const defaultBadge: Item = {
  id: 1,
  name: 'Medalla Humo',
  img: '/badges/cloudy-mark.png',
  amount: 0,
  price: -1,
  description: 'Una medalla en forma de Nube, demostrando que superaste el Gimnasio del Humo',
}

export interface Pokedex {
  trainer: Trainer
  party: Pokemon[]
  money: number
  bag: Item[]
  badges: Item[]
}

export enum NFCmonType {
  PLAYER = 'Pokedex',
  NPC = 'Npc',
  ENCOUNTER = 'Encounter',
  GYM = 'Gym',
}

export interface NFCmon {
  type: NFCmonType
  id: number
  data: Pokedex | Trainer | Item | Pokemon
}

export default {
  defaultTrainer,
  defaultItem,
  defaultBadge,
}
