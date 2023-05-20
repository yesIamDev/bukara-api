import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'appartements'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('designation')
      table.uuid('type_bien_id').references('type_biens.id').primary().notNullable()
      table.uuid('type_appartement_id').references('type_appartements.id').primary().notNullable()
      table.integer('number').notNullable().defaultTo(0)
      table.string('description').notNullable()
      table.string('features').notNullable()
      table.boolean('status').defaultTo(false)
      table.integer('price').notNullable()

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
