import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ClassroomEnrollments extends BaseSchema {
  protected tableName = 'classroom_enrollments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('user_id').unsigned()
      table.integer('classroom_id').unsigned()
      table.primary(['user_id', 'classroom_id'])
      table
        .foreign('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .foreign('classroom_id')
        .references('id')
        .inTable('classrooms')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
