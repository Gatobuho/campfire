const moveSaver = (move) => {
  return move.move
}

const statSaver = (stat) => {
  const short_name = {
    'hp': 'HP',
    'attack': 'Attack',
    'defense': 'Defense',
    'special-attack': 'Sp.Atk',
    'special-defense': 'Sp.Def',
    'speed': 'Speed',
  }
  console.log('Stat...', stat)
  if (stat.short_name)
    return stat

  return {
    base_stat: stat.base_stat,
    name: stat.stat.name,
    short_name: short_name[stat.stat.name],
    url: stat.stat.url,
  }
}

const typeSaver = (type) => {
  return type.type
}

const abilitySaver = (ability) => {
  return {
    is_hidden: ability.is_hidden,
    ...ability.ability,
  }
}

const spriteMaker = (sprites) => {
  const { dream_world, ...oficial } = sprites.other
  const official_artwork = oficial['official-artwork'].front_default
  const { versions, other, ...others } = sprites
  console.log('Dumping', [dream_world, versions, other])
  return {
    official_artwork,
    ...others,
  }
}

export const formatPoke = (pokemon: any) => {
  console.log(pokemon)
  console.log(`${pokemon.name} (${pokemon.id})`)
  const {
    base_experience,
    game_indices,
    held_items,
    location_area_encounters,
    order,
    is_default,
    ...poke
  } = pokemon
  console.log('Dump', [base_experience, game_indices, held_items, location_area_encounters, order, is_default])
  poke.moves = poke.moves.map(moveSaver)
  poke.stats = poke.stats.map(statSaver)
  poke.types = poke.types.map(typeSaver)
  poke.abilities = poke.abilities.map(abilitySaver)

  poke.sprites = spriteMaker(poke.sprites)
  console.log(poke)
  return poke
}
