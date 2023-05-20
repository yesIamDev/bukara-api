import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LandlordValidator from 'App/Validators/LandlordValidator'
import Service from 'App/Services/Landlord.service'
import Logger from '@ioc:Adonis/Core/Logger'
import { inject } from '@adonisjs/fold'

@inject()
export default class LandlordsController extends LandlordValidator {
      constructor(private landlord: Service) {
            super()
      }
      public async index({ request, response }: HttpContextContract) {
            try {
                  const { page = 1, limit = 100, status = true, landlordType, maritalStatus, orderBy = "created_at" } = request.qs()

                  const data = await this.landlord.getAll({ page, limit, status, orderBy, landlordType, maritalStatus })

                  return response.ok({ status: true, data })
            } catch (error: any) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, data: null, message: error.message })
            }
      }

      public async store({ request, response }: HttpContextContract) {
            const prayload = await request.validate({ schema: this.v_create })
            const prayloadPhone = await request.validate({ schema: this.v_phones })
            try {
                  const _landlord = await this.landlord.create(prayload)
                  let phones: unknown

                  if (_landlord) {
                        prayloadPhone.phones.map((value) => {
                              value.landlordId = _landlord.id
                        })
                        phones = await this.landlord.registrePhone(prayloadPhone.phones)
                  }

                  return response.created({
                        status: true, data: {
                              personne: _landlord,
                              phones
                        }
                  })

            } catch (error: any) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, message: error.message })
            }
      }

      public async update({ request, response }: HttpContextContract) {
            const prayload = await request.validate({ schema: this.v_create })
            const { id } = await request.validate({
                  schema: this.v_delete,
                  data: { id: request.param('id') }
            })
            try {

                  if (!await this.landlord.find({ key: 'id', value: id }))
                        return response.notFound({ status: false, message: 'Personne no found.' })

                  const data = await this.landlord.update(id, prayload)
                  return response.created({
                        status: true, data
                  })
            } catch (error: any) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, data: null, message: error.message })
            }
      }

      public async destroy({ request, response }: HttpContextContract) {
            const { id } = await request.validate({
                  schema: this.v_delete,
                  data: { id: request.param('id') }
            })
            try {

                  if (!await this.landlord.find({ key: 'id', value: id }))
                        return response.notFound({ status: false, message: 'Landlord no found.' })

                  await this.landlord.delete(id)
                  return response.created({
                        status: true, data: 'Landlord deleted.'
                  })
            } catch (error: any) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, data: null, message: error.message })
            }
      }

      /**
      * Phones
      */
      public async addPhone({ request, response }: HttpContextContract) {
            const { id } = await request.validate({
                  schema: this.v_delete,
                  data: { id: request.param('id') }
            })

            const prayload = await request.validate({ schema: this.v_phone })
            try {

                  if (!await this.landlord.find({ key: 'id', value: id }))
                        return response.notFound({ status: false, message: 'Personne no found.' })

                  prayload.landlordId = id
                  await this.landlord.registrePhone([prayload])
                  const data = await this.landlord.find({ key: 'id', value: id })
                  return response.created({
                        status: true, data
                  })
            } catch (error: any) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, data: null, message: error.message })
            }
      }

      public async updatePhone({ request, response }: HttpContextContract) {
            const { id } = await request.validate({
                  schema: this.v_delete,
                  data: { id: request.param('id') }
            })

            const prayload = await request.validate({ schema: this.v_phone })
            try {

                  if (!await this.landlord.findPhone({ key: 'id', value: id }))
                        return response.notFound({ status: false, message: 'Phone no found.' })

                  await this.landlord.updatePhone(id, prayload)
                  return response.created({
                        status: true, message: 'Phone updated.'
                  })
            } catch (error: any) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, data: null, message: error.message })
            }
      }
      public async selectRunningPhone({ request, response }: HttpContextContract) {
            const { id } = await request.validate({
                  schema: this.v_delete,
                  data: { id: request.param('id') }
            })

            // const prayload = await request.validate({ schema: this.v_phone })
            try {
                  const phoneFind = await this.landlord.findPhone({ key: 'id', value: id })
                  if (!phoneFind)
                        return response.notFound({ status: false, message: 'Phone no found.' })

                  await this.landlord.updatePhoneDefault(phoneFind.landlordId)
                  await this.landlord.updatePhone(id, { running: true })
                  return response.created({
                        status: true, message: 'Phone updated.'
                  })
            } catch (error: any) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, data: null, message: error.message })
            }
      }

      public async deletePhone({ request, response }: HttpContextContract) {
            const { id } = await request.validate({
                  schema: this.v_delete,
                  data: { id: request.param('id') }
            })
            try {

                  if (!await this.landlord.findPhone({ key: 'id', value: id }))
                        return response.notFound({ status: false, message: 'Phone no found.' })

                  await this.landlord.deletePhone(id)
                  return response.created({
                        status: true, message: 'Phone deleted.'
                  })
            } catch (error: any) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, data: null, message: error.message })
            }
      }
}
