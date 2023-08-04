import {DOMParser} from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts"

export class Genshin {
	static async Gifts() {
		const response = await fetch('https://guidesgame.ru/cheats/genshin-impact-kody-nabora/')
		if (response.status != 200) throw await response.text()
		const htmlRaw = await response.text()

		const html = new DOMParser().parseFromString(htmlRaw, 'text/html')
		if (!html?.textContent) throw new Error('Parse html error')

		// Get table content
		const tbody = html.querySelector(".dcf-overflow-x-auto > table > tbody")
		if (!tbody?.textContent) throw new Error('Parse table error')

		// Get table items
		const c = tbody.querySelectorAll('th > .gcode')
		if (![...c].length) throw new Error('Parse codes error')

		return {
			codes: [...c].map(value => value.textContent)
		}
	}
}

export class HSR {
	static async Gifts() {
		const response = await fetch('https://guidesgame.ru/podarochnye-kody/honkai-star-rail-promokody/')
		if (response.status != 200) throw await response.text()
		const htmlRaw = await response.text()

		const html = new DOMParser().parseFromString(htmlRaw, 'text/html')
		if (!html?.textContent) throw new Error('Parse html error')

		// Get table content
		const tbody = html.querySelector("table > tbody")
		if (!tbody?.textContent) throw new Error('Parse table error')

		// Get table items
		const c = tbody.querySelectorAll('th > .gcode')
		if (![...c].length) throw new Error('Parse codes error')

		return {
			codes: [...c].map(value => value.textContent)
		}
	}
}
