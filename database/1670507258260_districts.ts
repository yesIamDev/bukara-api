import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'districts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().notNullable()
      table.uuid('common_id').references('commons.id').notNullable()
      table.uuid('designation').notNullable().unique()

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
