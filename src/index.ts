import { Hono } from 'hono'
import games from './api.json';
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import {createTableIfNotExists, executeSQLQuery} from "./db";

const app = new Hono()

type Game = {
  id: string;
  tables: {
    id: string,
    endpoints: {
      endpoint: string,
      sqlQuery: string,
      validationSchema: z.ZodType<any, any>
    }[]
  }[];
};

for (const game of games as Game[]) {
  //console.log(`Game ID: ${game.id}`);

  for (const table of game.tables) {
    //console.log(`Table ID: ${table.id}`);
    createTableIfNotExists(table.id);

    for (const endpoint of table.endpoints) {
      app.post(`/${game.id}/${table.id}/${endpoint.endpoint}`, async(c) => {
        const params = await c.req.json();
        console.log(params);

        // Validate parameters using zod schema
        if (!zValidator(params, endpoint.validationSchema)) {
          return c.json({ error: `Invalid value for parameters` });
        }
        console.log("Parameters valid")
        const result = await executeSQLQuery(endpoint.sqlQuery, params);
        return c.json(result);
      });
      console.log(`API Route added: /${game.id}/${table.id}/${endpoint.endpoint}`);
    }
  }
}

console.log("==================================================")
console.log("API Routes Ready - Arrogant Pixel Auto API Running...")
console.log("==================================================")
export default {
  port: 4000,
  fetch: app.fetch,
}
