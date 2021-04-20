import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ClassroomLessons extends BaseSchema {
  protected tableName = 'classroom_lessons'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('classroom_id').unsigned()
      table.integer('lesson_id').unsigned()
      table.primary(['classroom_id', 'lesson_id'])
      table
        .foreign('classroom_id')
        .references('id')
        .inTable('classrooms')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .foreign('lesson_id')
        .references('id')
        .inTable('lessons')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
