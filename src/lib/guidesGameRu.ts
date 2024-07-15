import {DOMParser, HTMLDocument} from '@b-fuze/deno-dom'

const getPage = async (uri: string) => {
  const res = await fetch(uri)
  if (res.status != 200) throw await res.text()

  const htmlRaw = await res.text()
  const dom = new DOMParser().parseFromString(htmlRaw, 'text/html')
  if (!dom || !dom?.textContent) throw new Error('Parse html error')

  return {res, dom}
}

const parseCodes = (dom: HTMLDocument) => {
  // Get table content
  const tbody = dom.querySelector('table > tbody')!
  if (!tbody?.textContent) throw new Error('Parse table error')

  // Get table items
  const c = tbody.querySelectorAll('th > .gcode')
  const codes = [...c].map((v) => v.textContent.trim())
  if (!codes.length) throw new Error('Parse codes error')

  return codes
}

export const genshin = async () => {
  const page = await getPage(
    'https://guidesgame.ru/cheats/genshin-impact-kody-nabora/'
  )

  // Get table content
  const tbody = page.dom.querySelector('.dcf-overflow-x-auto > table > tbody')!
  if (!tbody?.textContent) throw new Error('Parse table error')

  // Get table items
  const c = tbody.querySelectorAll('th > .gcode')
  const codes = [...c].map((v) => v.textContent.trim())
  if (!codes.length) throw new Error('Parse codes error')

  return {codes}
}

export const hsr = async () => {
  const page = await getPage(
    'https://guidesgame.ru/podarochnye-kody/honkai-star-rail-promokody/'
  )
  const codes = parseCodes(page.dom)
  return {codes}
}

export const afkArena = async () => {
  const page = await getPage(
    'https://guidesgame.ru/publ/guides/afk_arena/afk_arena_kody_vozmeshhenija/316-1-0-1502'
  )
  const codes = parseCodes(page.dom)
  return {codes}
}

export const stateOfSurvival = async () => {
  const page = await getPage(
    'https://guidesgame.ru/cheats/state-of-survival-kody-obmena/'
  )
  const codes = parseCodes(page.dom)
  return {codes}
}

export const idleHeroes = async () => {
  const page = await getPage(
    'https://guidesgame.ru/idle-heroes/idle-heroes-kody-obmena/'
  )
  const codes = parseCodes(page.dom)
  return {codes}
}

export const leftToSurvive = async () => {
  const page = await getPage(
    'https://guidesgame.ru/podarochnye-kody/left-to-survive-kody/'
  )
  const codes = parseCodes(page.dom)
  return {codes}
}

export const riseOfKingdoms = async () => {
  const page = await getPage(
    'https://guidesgame.ru/publ/guides/rise_of_kingdoms/rise_of_kingdoms_podarochnye_kody/314-1-0-1532'
  )
  const codes = parseCodes(page.dom)
  return {codes}
}

export const soulKnight = async () => {
  const page = await getPage(
    'https://guidesgame.ru/podarochnye-kody/soul-knight-kody/'
  )
  const codes = parseCodes(page.dom)
  return {codes}
}

export const lordsMobile = async () => {
  const page = await getPage('https://guidesgame.ru/cheats/lords-mobile-kody/')
  const codes = parseCodes(page.dom)
  return {codes}
}

export const watcherOfRealms = async () => {
  const page = await getPage(
    'https://guidesgame.ru/podarochnye-kody/watcher-of-realms-kody/'
  )
  const codes = parseCodes(page.dom)
  return {codes}
}

export const games = [
  'genshin',
  'hsr',
  'afkArena',
  'stateOfSurvival',
  'idleHeroes',
  'leftToSurvive',
  'riseOfKingdoms',
  'soulKnight',
  'lordsMobile',
  'watcherOfRealms',
] as const

export type GamesType = (typeof games)[number]

export const getCode = (type: GamesType) => {
  if (type === 'genshin') return genshin()
  if (type === 'hsr') return hsr()
  if (type === 'afkArena') return afkArena()
  if (type === 'stateOfSurvival') return stateOfSurvival()
  if (type === 'idleHeroes') return idleHeroes()
  if (type === 'leftToSurvive') return leftToSurvive()
  if (type === 'riseOfKingdoms') return riseOfKingdoms()
  if (type === 'soulKnight') return soulKnight()
  if (type === 'lordsMobile') return lordsMobile()
  if (type === 'watcherOfRealms') return watcherOfRealms()
}
