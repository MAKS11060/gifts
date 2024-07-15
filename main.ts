import {Hono} from 'hono'
import {cors} from 'hono/cors'
import api from './src/api.ts'

const app = new Hono()
  .use(cors())

  .get('/', (c) => c.redirect('https://github.com/MAKS11060/gifts'))

  .route('/', api)

Deno.serve(app.fetch)
