import {serve} from 'https://deno.land/std@0.177.0/http/server.ts'
import {Genshin, HSR} from './lib/gifts.ts'

serve(async request => {
  const url = new URL(request.url)
  if (request.method === 'GET') {
    try {
      if (url.pathname === '/gifts/genshin') {
        return Response.json(await Genshin.Gifts())
      }
      if (url.pathname === '/gifts/hsr') {
        return Response.json(await HSR.Gifts())
      }
    } catch (e) {
      console.error(e)
      return Response.json({
        error: e.message
      }, {
        status: '500'
      })
    }
  }

  return new Response('Not found!', {
    headers: {
      'cache-control': 'max-age=5',
    },
  })
}, {port: 50000})
