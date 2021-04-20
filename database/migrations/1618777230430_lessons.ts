import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Lessons extends BaseSchema {
  protected tableName = 'lessons'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('custom_ordering_index').unsigned().nullable()
      table.enum('type', ['quiz', 'video']).notNullable()
      table.string('title').notNullable()
      table.string('description').nullable()
      table.boolean('must_finish').defaultTo(true)
      table.boolean('is_free').defaultTo(false)
      table.integer('section_id').unsigned().nullable()
      table.integer('watching_count').unsigned().defaultTo(0)
      table
        .foreign('section_id')
        .references('id')
        .inTable('sections')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
