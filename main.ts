import {Hono} from 'hono'
import {cors} from 'hono/cors'
import api from './src/api.ts'

const app = new Hono()
  .use(cors())

  .route('/', api)

Deno.serve(app.fetch)
