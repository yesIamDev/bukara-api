import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'landlord_phones'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().notNullable()
      table.uuid('landlord_id').references('landlords.id').notNullable().onDelete('CASCADE')
      table.string('country_code', 5)
      table.string('number', 12).unique()
      table.boolean('running').defaultTo(false)

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
