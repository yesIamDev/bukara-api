import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'appartement_addresses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().notNullable()
      table.uuid('appartement_id').references('appartements.id').notNullable().onDelete('CASCADE')
      table.string('country').notNullable()
      table.string('town').notNullable()
      table.string('city').notNullable()
      table.string('quarter').notNullable()
      table.string('street').notNullable()
      table.integer('number').notNullable()

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
