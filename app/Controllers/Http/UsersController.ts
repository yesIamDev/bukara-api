import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserValidator from 'App/Validators/UserValidator'
import UserService from 'App/Services/User.service'
import Logger from '@ioc:Adonis/Core/Logger'
import upload from 'App/Utils/Upload.file'
import Hash from '@ioc:Adonis/Core/Hash'
import { inject } from '@adonisjs/fold'
import TypeService from 'App/Services/Typebien.service'

@inject()
export default class UsersController extends UserValidator {
      constructor(private readonly user: UserService, private bien: TypeService) {
            super()
      }

      /**
       * It gets all the users from the database, and returns them in the response
       * @param {HttpContextContract}  - page - The page number to return.
       * @returns The response object is being returned.
       */
      public async index({ request, response }: HttpContextContract) {
            try {
                  const { page = 1, limit = 100, status = true, orderBy = "created_at" } = request.qs()
                  const data = await this.user.getAll({ page, limit, status, orderBy })
                  return response.ok({ status: true, data })
            } catch (error: any) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, data: null, message: error.message })
            }
      }

      /**
       * It fetches the user's data from the database using the user's id
       * @param {HttpContextContract}  - HttpContextContract - This is the context of the request. It
       * contains the request, response, and auth objects.
       * @returns The user object
       */
      public async show({ response, auth }: HttpContextContract) {
            try {
                  const { id } = auth.use('user').user!
                  const data = await this.user.find({ key: 'id', value: id })
                  return response.ok({ status: true, data })
            } catch (error: any) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, data: null, message: error.message })
            }
      }

      /**
       * 1. We validate the request using the schema we defined earlier.
       * 2. If the request is valid, we proceed to upload the file.
       * 3. If the upload is successful, we return a success response
       * @param {HttpContextContract}  - 1. The request object is used to validate the request.
       * @returns The url of the uploaded image.
       */
      public async multiple({ request, response }: HttpContextContract) {
            //1
            const profiles = await request.files('profile', {
                  extnames: ['jpg', 'png', 'gif', 'jpeg'],
                  size: '2mb',
            })

            try {
                  //2
                  var imageUrlList: string[] = [];
                  for (var i = 0; i < profiles.length; i++) {
                        if (profiles[i]) {
                              var reslt = await upload.single(profiles[i])
                              imageUrlList.push(reslt.url)
                        }
                  }

                  return response.ok({
                        status: true,
                        data: { url: imageUrlList },
                        message: 'Profile Upload.',
                  })

            } catch (error) {
                  Logger.error(error)
                  return response.expectationFailed({ status: false, message: error.message })
            }
      }
      public async profile({ request, response }: HttpContextContract) {
            //1
            const { profile } = await request.validate({ schema: this.v_profile })

            try {
                  //2
                  if (profile) {
                        //3
                        const result = await upload.single(profile)
                        return response.ok({
                              status: true,
                              data: { url: result.secure_url },
                              message: 'Profile Upload.',
                        })
                  }
                  throw new Error('Echec de chargement du profile.')
            } catch (error) {
                  Logger.error(error)
                  return response.expectationFailed({ status: false, message: error.message })
            }
      }

      /**
       * A function that creates a user.
       * @param {HttpContextContract}  - HttpContextContract - This is the context of the request. It
       * contains the request and response objects.
       * @returns return response.expectationFailed({ status: false, data: null, message: error.message
       * })
       */
      public async store({ request, response }: HttpContextContract) {
            const payload = await request.validate({
                  schema: this.v_create
            })
            try {
                  // if (await this.user.exist())
                  //       return response.notFound({ status: false, message: 'Operation faild.' })
                  const result = await this.user.registre(payload)
                  response.created({ status: true, data: result })
            } catch (error) {
                  Logger.error(`Error: ${error.message}`)
                  return response.expectationFailed({ status: false, data: null, message: error.message })
            }
      }


      /**
       * 1. Validate the request body using the schema defined in the `v_sign` property.
       * 2. Attempt to login the user using the `user` guard
       * @param {HttpContextContract}  - 1. The request object is used to validate the request body.
       * @returns The token and the user data
       */
      public async login({ request, response, auth }: HttpContextContract) {
            //1
            // Logger.info(`${JSON.stringify(`${JSON.stringify(request.body())}`)}`)
            const { email, password } = await request.validate({
                  schema: this.v_sign,
            })

            try {
                  //2
                  const userFind = await this.user.signin(email)
                  if (!userFind || !userFind.status) return response.notFound({ status: false, message: 'Identifiants inccorect' })
                  //3
                  if (!(await Hash.verify(userFind.password, password)))
                        return response.notFound({ status: false, message: 'Identifiants inccorect.' })
                  //4
                  const token = await auth.use('user').generate(userFind)
                  const config = {
                        typeBiens: await this.bien.getBienType(),
                        typeAppart: await this.bien.getAppartType(),

                  }
                  return response.created({ status: true, token, data: { user: userFind, config } })
            } catch (error) {
                  Logger.error(error)
                  return response.expectationFailed({ status: false, message: error.message })
            }
      }


      /**
       * It validates the request payload, uploads the profile image to cloudinary, updates the user's
       * profile image and returns a response
       * @param {HttpContextContract}  - request: The request object.
       * @returns The response is being returned.
       */
      public async updateProfile({ request, response, auth }: HttpContextContract) {
            const payload = await request.validate({ schema: this.v_profile })
            try {
                  if (payload) {
                        const result = await upload.single(payload.profile)
                        const profile = result.secure_url
                        await this.user.update(auth.use('user').user!.id, { profile })
                        return response.created({ status: true, data: { profile } })
                  }
                  throw new Error('Echec de la modification.')
            } catch (error) {
                  Logger.error(error)
                  return response.expectationFailed({ status: false, message: error.message })
            }
      }

      /**
       * 1. We validate the request payload using the schema defined in the `v_change_psswd` property.
       * 2. We get the user from the auth context and check if the old password is correct.
       * 3. If the old password is correct, we hash the new password and update the user's password
       * @param {HttpContextContract}  - 1. The payload is the data sent by the user.
       * @returns return response.created({
       *             status: true,
       *             message: 'mot de pass modifier.',
       *       })
       */
      public async updatePassword({ request, response, auth }: HttpContextContract) {
            //1
            const payload = await request.validate({ schema: this.v_change_psswd })
            try {
                  //2
                  const user = auth.use('user').user!
                  if (!(await Hash.verify(user.password as string, payload.oldPassword)))
                        return response.notFound({ status: false, message: 'Ancien mot de passe inccorect.' })
                  //3
                  const password = await Hash.make(payload.password)
                  await this.user.update(user.id as string, { password })
                  return response.created({
                        status: true,
                        message: 'mot de pass modifier.',
                  })
            } catch (error) {
                  Logger.error(error)
                  return response.expectationFailed({ status: false, message: error.message })
            }
      }

      /**
       * It validates the request payload, then updates the user's data
       * @param {HttpContextContract}  - HttpContextContract - This is the context of the request. It
       * contains the request, response, and auth objects.
       * @returns The response object is being returned.
       */
      public async update({ request, response, auth }: HttpContextContract) {
            const payload = await request.validate({
                  schema: this.v_update,
            })
            try {
                  const data = await this.user.update(auth.use('user').user!.id, payload)
                  return response.ok({ status: false, data })
            } catch (error) {
                  Logger.error(error)
                  return response.expectationFailed({ status: false, message: error.message })
            }
      }

      /**
       * It logs out the user
       * @param {HttpContextContract}  - HttpContextContract - This is the context of the request. It
       * contains the request, response, and auth objects.
       * @returns The response object is being returned.
       */
      public async logOut({ response, auth }: HttpContextContract) {
            try {
                  auth.logout()
                  return response.ok({
                        status: true,
                        message: 'User logOut.',
                  })
            } catch (error) {
                  Logger.error(error)
                  return response.expectationFailed({ status: false, message: error.message })
            }
      }
}
