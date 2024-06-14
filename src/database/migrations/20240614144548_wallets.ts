import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('wallets', table => {
        table.increments('id').primary()
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').unique()
        table.decimal('balance').defaultTo(0)
        table.timestamps(true, true, true)
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('wallets')
}

