/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('sheets', table => {
        table.increments('id');
        table.string('title').notNullable();
        table.text('description');
        table.string('file_path');
        table.date('upload_date').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('sheets');
};
