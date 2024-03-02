import {assertEquals, assertExists} from 'https://deno.land/std/assert/mod.ts'
import {genshin, hsr} from './guidesGameRu.ts'

Deno.test('genshin', async () => {
  const res = await genshin()
  assertEquals(typeof res, 'object')
  assertEquals(typeof res.codes, 'object')
  assertEquals(typeof res.codes.length, 'number')
})

Deno.test('hsr', async () => {
  const res = await hsr()
  assertEquals(typeof res, 'object')
  assertEquals(typeof res.codes, 'object')
  assertEquals(typeof res.codes.length, 'number')
})
