import 'dotenv/config';
import knex from 'knex';
// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const knexConfig = {
	client: 'mysql2',
	connection: {
		host: process.env.DB_HOST,
		database: process.env.DB_LOCAL_NAME,
		user: process.env.DB_LOCAL_USER,
		password: process.env.DB_LOCAL_PASSWORD,
	},
};

export default knexConfig;