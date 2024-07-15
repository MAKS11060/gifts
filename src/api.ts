import {OpenAPIHono, createRoute, z} from '@hono/zod-openapi'
import {games, getCode} from './lib/guidesGameRu.ts'

const giftsSchema = z
  .object({
    type: z.enum(games),
  })
  .openapi('gifts', {
    param: {
      in: 'path',
      name: 'type',
      example: 'genshin',
    },
  })

const giftsResultSchema = z
  .object({
    codes: z.array(z.string()).openapi({
      examples: [['GENSHINGIFT']],
    }),
  })
  .openapi('giftsResult')

const app = new OpenAPIHono()
  .doc31('/doc', (c) => ({
    openapi: '3.1.0',
    info: {version: '1.0.0', title: 'Game Gifts API'},
    servers: [
      {url: new URL(c.req.url).origin, description: 'production (current)'},
      {url: 'http://localhost:8000', description: 'local server'},
    ],
  }))

  .openapi(
    createRoute({
      method: 'get',
      path: '/gifts/{type}',
      request: {
        params: giftsSchema,
      },
      responses: {
        200: {
          description: 'Retrieve the codes',
          content: {
            'application/json': {
              schema: giftsResultSchema,
            },
          },
        },
        500: {
          description: 'External error',
          content: {
            'application/json': {
              schema: z.object({
                error: z.string(),
              }),
            },
          },
        },
      },
    }),
    async (c) => {
      const {type} = c.req.valid('param')
      try {
        return c.json(await getCode(type), 200)
      } catch (e) {
        // console.error(e)
        return c.json({error: e.message}, 500)
      }
    }
  )

export default app
