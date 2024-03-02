# Game Gifts

## Examples
```ts
const getCode = async (type: string) => {
  const res = await fetch(`https://hoyoverse-gifts.deno.dev/gifts/${type}`)
  if (!res.ok) throw await res.json()
  return await res.json() // {codes: []}
}
```

## Api
- `[GET]` `/doc` OpenApi schema
  -  [Try on playground](https://editor-next.swagger.io/) `File` > `Import URL` > `https://game-gifts.deno.dev/doc`
- `[GET]` [`/gifts/:type`](https://hoyoverse-gifts.deno.dev/gifts/hsr)

 | Endpoint (JSON)                                                    |                     Redeem Code                      |
 | :----------------------------------------------------------------- | :--------------------------------------------------: |
 | [`/gifts/genshin`](https://hoyoverse-gifts.deno.dev/gifts/genshin) | [Genshin Impact](https://genshin.hoyoverse.com/gift) |
 | [`/gifts/hsr`](https://hoyoverse-gifts.deno.dev/gifts/hsr)         |        [HSR](https://hsr.hoyoverse.com/gift)         |
 | `/gifts/afkArena`                                                  |                          -                           |
 | `/gifts/stateOfSurvival`                                           |                          -                           |
 | `/gifts/idleHeroes`                                                |                          -                           |
 | `/gifts/leftToSurvive`                                             |                          -                           |
 | `/gifts/riseOfKingdoms`                                            |                          -                           |
 | `/gifts/soulKnight`                                                |                          -                           |
 | `/gifts/lordsMobile`                                               |                          -                           |
 | `/gifts/watcherOfRealms`                                           |                          -                           |

## Third-party services used:
[guidesgame.ru](https://guidesgame.ru)
