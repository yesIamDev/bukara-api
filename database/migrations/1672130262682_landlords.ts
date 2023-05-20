import { MARTITAL_STATUS, TID, TYPE_LANDLORD } from "App/Models/Landlord"
import BaseSchema from '@ioc:Adonis/Lucid/Schema'
export default class extends BaseSchema {
  protected tableName = 'landlords'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().notNullable()
      table.string('name', 30)
      table.string('lastname', 30)
      table.string('email', 255).nullable().unique()
      table.string('password', 50)
      table
        .string('profile')
        .defaultTo('https://cdn3.iconfinder.com/data/icons/web-and-networking-4/128/45-512.png')
      table.enum('card_type', Object.values(TID)).notNullable()
      table.string('card_type_id').notNullable().unique()
      table.enum('marital_status', Object.values(MARTITAL_STATUS))
      table.enum('landlord_type', Object.values(TYPE_LANDLORD))

      table.string('nationality').notNullable()
      table.string('last_adress').notNullable()
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
