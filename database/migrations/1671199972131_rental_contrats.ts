import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'rental_contrats'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().notNullable()
      table.uuid('user_id').references('users.id').notNullable().onDelete('CASCADE')
      table.uuid('appartement_id').references('appartements.id').notNullable().onDelete('CASCADE')
      table.uuid('landlord_id').references('landlords.id').notNullable().onDelete('CASCADE')
      table.integer('number_of_habitant').notNullable()
      table.float('amount').notNullable()
      table.string('currency', 4).defaultTo('USD')
      table.timestamp('start_date', { useTz: true })
      table.timestamp('end_date')

      table.boolean('current').defaultTo(true)
      table.boolean('status').defaultTo(true)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
