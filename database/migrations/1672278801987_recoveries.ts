import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'recoveries'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().notNullable()
      table.uuid('rental_contrat_id').references('rental_contrats.id').notNullable().onDelete('CASCADE')
      table.string('label_month', 20).notNullable()
      table.string('label_str', 80).notNullable()
      table.timestamp('date_recovery', { useTz: true }).notNullable()
      table.boolean('status').defaultTo(false)
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
