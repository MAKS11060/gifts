import {Hono} from '../src/deps.ts'
import {genshin, hsr} from './lib/guidesGameRu.ts'

const app = new Hono()

app.get('/gifts/:type', async (c) => {
  const type = c.req.param('type')

  try {
    if (type === 'genshin') return c.json(await genshin())
    if (type === 'hsr') return c.json(await hsr())
  } catch (e) {
    return c.json({error: e.message}, {status: 500})
  }
})

Deno.serve(app.fetch)
