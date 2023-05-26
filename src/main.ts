import {serve} from 'https://deno.land/std@0.177.0/http/server.ts'
import {Genshin, HSR} from './lib/gifts.ts'

serve(async request => {
  const url = new URL(request.url)
  if (request.method === 'GET') {
    if (url.pathname === '/gifts/genshin') {
      return new Response.json(await Genshin.Gifts())
    }
    if (url.pathname === '/gifts/hsr') {
      return new Response.json(await HSR.Gifts())
    }
  }

  return new Response('Not found!', {
    headers: {
      'cache-control': 'max-age=60'
    }
  })
}, {port: 50000})


