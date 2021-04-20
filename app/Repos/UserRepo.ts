import User from 'App/Models/User'

export default class UserRepo {
  public async createOne(data) {
    let db_data = { ...data }
    delete db_data.password_confirmation
    const user = await User.create({
      ...db_data,
    })

    return user
  }

  public async editById(data: any, id: number) {
    const user = await User.findOrFail(id)
    user.firstName = data.firstName
    user.lastName = data.lastName
    user.gender = data.gender
    user.phone = data.phone
    user.avatar = data.avatar
    user.defaultPaymentMethod = data.defaultPaymentMethod
    user.facebook = data.facebook
    user.twitter = data.twitter
    user.instagram = data.instagram
    user.linkedin = data.linkedin
    user.extra_link = data.extra_link
    return await user.save()
  }
}
