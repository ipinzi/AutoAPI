import { Pool } from 'pg'
import config from './config.json'

export const pool = new Pool(config);

// Function to execute SQL query
export async function executeSQLQuery(query : string, params : any) {
    const client = await pool.connect();
    try {
        const res = await client.query(query, params);
        console.log(res);
        return res.rows;
    } catch (error) {
        // Log the error along with the query and parameters for debugging
        console.error('Error executing query:', query);
        console.error('With parameters:', params);
        console.error('Error message:', error);
        return `Error Executing Query: ${query}, With Parameters: [${params}], ERROR: ${error}`;
        //throw error; // Re-throw the error to be handled by the caller
    } finally {
        client.release();
    }
}
export async function createTableIfNotExists(tableName: string) {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS ${tableName} (
      id SERIAL PRIMARY KEY,
      score INTEGER
      -- add more columns as needed
    )
  `;

    await executeSQLQuery(createTableQuery, []);
}
