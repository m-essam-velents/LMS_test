import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Lessons extends BaseSchema {
  protected tableName = 'lessons'
  //TODO needs morph relation
  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.enum('lesson_type', ['course', 'classroom']).notNullable()
      table.integer('custom_ordering_index').unsigned().nullable()
      table.enum('content_type', ['quiz', 'video']).notNullable()
      table.string('title').notNullable()
      table.string('description').nullable()
      table.boolean('is_free').defaultTo(false)
      table.integer('watching_count').unsigned().defaultTo(0)

      table.integer('prerequisite_lesson_id').unsigned()
      table.foreign('prerequisite_lesson_id').references('id').inTable('lessons')

      table.integer('section_id').unsigned().nullable()
      table
        .foreign('section_id')
        .references('id')
        .inTable('sections')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      // classroom or course id
      table.integer('belongs_to').unsigned()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
