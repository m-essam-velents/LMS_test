import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CourseLessons extends BaseSchema {
  protected tableName = 'course_lessons'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('course_id').unsigned()
      table.integer('lesson_id').unsigned()
      table.primary(['course_id', 'lesson_id'])
      table
        .foreign('course_id')
        .references('id')
        .inTable('classrooms')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .foreign('lesson_id')
        .references('id')
        .inTable('courses')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
