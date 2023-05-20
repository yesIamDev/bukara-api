import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TypeAppartementValidator from 'App/Validators/TypeAppartementValidator'
import TypeService from 'App/Services/Typebien.service'
import Logger from '@ioc:Adonis/Core/Logger'
import { inject } from '@adonisjs/fold'

@inject()
export default class TypeAppartementsController extends TypeAppartementValidator {

      constructor(private service: TypeService) {
            super()
      }

      public async index({ response }: HttpContextContract) {
            try {
                  // const { page = 1, limit = 100, orderBy = "created_at" } = request.qs()
                  // const data = await this.service.getAppartType()
                  // response.ok({ status: true, data })
            } catch (error) {
                  Logger.error(`Error : ${error.message}`)
                  response.expectationFailed({ status: false, message: error.message })
            }
      }


      public async store({ request, response }: HttpContextContract) {
            //1
            const payload = await request.validate({
                  schema: this.v_create,
                  data: request.body()
            })

            try {
                  //2
                  if (await this.service.findAppartType({ key: "designation", value: payload.designation.toLocaleLowerCase() }))
                        return response.conflict({ status: false, message: 'Appartment already exists.' })
                  //3
                  const result = await this.service.registreAppartType(payload)
                  response.created({ ststus: true, data: result })
            } catch (error) {
                  Logger.error(`Error : ${error.message}`)
                  response.expectationFailed({ status: false, message: error.message })
            }
      }


      public async destroy({ request, response }: HttpContextContract) {
            //1
            const payload = await request.validate({
                  schema: this.v_delete,
                  data: {
                        id: request.param('id')
                  }
            })
            try {
                  //2
                  if (!await this.service.findAppartType({ key: 'id', value: payload.id }))
                        return response.notFound({ status: false, message: 'Appartment not Found.' })
                  //3
                  await this.service.destroyAppartType(payload.id)
                  return response.ok({ status: true, message: 'Appartment deleted.' })
            } catch (error) {
                  Logger.error(`Error : ${error.message}`)
                  response.expectationFailed({ status: false, message: error.message })
            }
      }
}
