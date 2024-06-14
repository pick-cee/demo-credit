import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('fullName').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.decimal('balance').defaultTo(0);
        table.timestamps(true, true, true)
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('users')
}

