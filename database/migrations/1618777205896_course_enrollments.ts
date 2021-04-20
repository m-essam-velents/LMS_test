import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CoursesEnrollments extends BaseSchema {
  protected tableName = 'course_enrollments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('user_id').unsigned()
      table.integer('course_id').unsigned()
      table.primary(['user_id', 'course_id'])
      table
        .foreign('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .foreign('course_id')
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
