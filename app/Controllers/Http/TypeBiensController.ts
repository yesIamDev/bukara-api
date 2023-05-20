import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TypeBienValidator from "App/Validators/TypeBienValidator";
import TypeBienService from 'App/Services/Typebien.service'
import { inject } from '@adonisjs/fold';
import Logger from '@ioc:Adonis/Core/Logger';

@inject()
export default class TypeBiensController extends TypeBienValidator {
      constructor(private service: TypeBienService) {
            super()
      }

      public async index({ response }: HttpContextContract) {
            try {
                  // const { page = 1, limit = 100, orderBy = "created_at" } = request.qs()
                  // const data = await this.service.getBienType({ page, limit, orderBy })
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
                  if (await this.service.findBienType({ key: "designation", value: payload.designation.toLocaleLowerCase() }))
                        return response.conflict({ status: false, message: 'Bien already exists.' })
                  //3
                  const result = await this.service.registreBienType(payload)
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
                  if (!await this.service.findBienType({ key: 'id', value: payload.id }))
                        return response.notFound({ status: false, message: 'Bien not Found.' })
                  //3
                  await this.service.destroyBienType(payload.id)
                  return response.ok({ status: true, message: 'Bien deleted.' })
            } catch (error) {
                  Logger.error(`Error : ${error.message}`)
                  response.expectationFailed({ status: false, message: error.message })
            }
      }

}

