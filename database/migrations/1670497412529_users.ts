import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('name', 30)
      table.string('lastname', 30)
      table.string('country_code', 255)
      table.string('phone_number', 255).unique()
      table.string('email', 255).nullable().unique()
      table.string('password', 180).notNullable()
      table
        .string('profile')
        .defaultTo('https://cdn3.iconfinder.com/data/icons/web-and-networking-4/128/45-512.png')
      table.boolean('status').defaultTo(true)
      table.string('remember_me_token').nullable()
      table.unique(['country_code', 'phone_number'])

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
