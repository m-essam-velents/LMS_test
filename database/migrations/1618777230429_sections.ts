import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Sections extends BaseSchema {
  protected tableName = 'sections'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.string('description').nullable()
      table.boolean('must_watch').defaultTo(true)
      table.boolean('free_trial').defaultTo(false)
      table.timestamp('trial_expiry').nullable()
      table.integer('watching_count').unsigned().defaultTo(0)
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
