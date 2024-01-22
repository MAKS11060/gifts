import {DOMParser, HTMLDocument} from '../deps.ts'

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
