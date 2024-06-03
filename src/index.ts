import { Hono } from 'hono'
import games from './games.json';

const app = new Hono()

type Game = {
  id: string;
  tables: { id: string }[];
};

app.get('/', (c) => {
  return c.text('Arrogant Pixel High Score API.... Motherfucker!')
});


for (const game of games as Game[]) {
  console.log(`Game ID: ${game.id}`);

  for (const table of game.tables) {
    console.log(`Table ID: ${table.id}`);
    app.get(`/${game}/${table}/highscores`, async(c) => {
      // You can access the request body with c.req.body
      // For example: const { score } = c.req.body;

      return c.json({"boobs":"YES"});
    });
  }
}

export default {
  port: 4000,
  fetch: app.fetch,
}
