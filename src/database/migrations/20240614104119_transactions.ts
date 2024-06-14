import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('transactions', table => {
        table.increments('id').primary()
        table.integer('user_id').unsigned().references('id').inTable('users')
        table.enu('type', ['credit', 'debit']).notNullable()
        table.decimal('amount').notNullable()
        table.enu('status', ['pending', 'completed', 'failed']).defaultTo('pending')
        table.timestamps(true, true, true)
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('transactions')
}

