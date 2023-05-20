
import RentalLocationValidator from "App/Validators/RentalLocationValidator";
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LocationService from "App/Services/Location.service"
import Logger from "@ioc:Adonis/Core/Logger";
import { inject } from "@adonisjs/fold";
import AppartementService from "App/Services/Appartement.service";

@inject()
export default class RentalContratsController extends RentalLocationValidator {
      constructor(private location: LocationService, private appart: AppartementService) {
            super()
      }

      public async index({ request, response }: HttpContextContract) {
            try {
                  const { page = 1, limit = 100, orderBy = "created_at", appartement, landlord, status, startDate, endDate, user } = request.qs()
                  const data = await this.location.getRentals({ page, limit, orderBy, appartement, landlord, status, startDate, endDate, user })
                  response.ok({ status: true, data })
            } catch (error) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, message: error.message })
            }
      }

      public async show({ request, response }: HttpContextContract) {
            //1
            const { id } = await request.validate({ schema: this.v_id_param, data: { id: request.param('id') } })
            try {
                  //2
                  const rentalFind = await this.location.find({ key: 'id', value: id })
                  if (!rentalFind)
                        return response.notFound({ status: false, message: 'Rental contrat no found.' })
                  //3
                  response.ok({ status: true, data: rentalFind })
            } catch (error) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, message: error.message })
            }
      }

      public async store({ request, response, auth }: HttpContextContract) {
            //1
            const payload = await request.validate({ schema: this.v_create, })
            const { month } = await request.validate({ schema: this.v_guarantee, })
            try {
                  const appartFind = await this.appart.find({ key: 'id', value: payload.appartementId })
                  if (!appartFind)
                        return response.notFound({ status: false, message: 'Appartment no found.' })

                  if (appartFind.status)
                        return response.notAcceptable({ status: false, message: 'Appartment is occupied.' })

                  payload.userId = auth.use('user').user?.id
                  LocationService.guranteeMoth = month

                  const data = await this.location.registre(payload)
                  response.created({ status: true, data: data })
            } catch (error) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, message: error.message })
            }
      }

      public async delete({ request, response }: HttpContextContract) {
            //1
            const { id } = await request.validate({ schema: this.v_id_param, data: { id: request.param('id') } })
            try {
                  //2
                  const appartFind = await this.location.find({ key: 'id', value: id })
                  if (!appartFind)
                        return response.notFound({ status: false, message: 'Rental contrat no found.' })
                  await this.location.delete(id)
                  response.created({ status: true, message: 'Rental deleted.' })
            } catch (error) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, message: error.message })
            }
      }

      public async breakContract({ request, response }: HttpContextContract) {
            //1
            const { id } = await request.validate({ schema: this.v_id_param, data: { id: request.param('id') } })
            const prayload = await request.validate({ schema: this.v_break })
            try {
                  //2
                  const rentalFind = await this.location.find({ key: 'id', value: id })
                  if (!rentalFind || !rentalFind.status)
                        return response.notFound({ status: false, message: 'Rental contrat no found.' })
                  //3
                  if (rentalFind.landlordId !== prayload.landlordId)
                        return response.unauthorized({ status: false, message: 'unauthorized perssone.' })
                  //4
                  const rentalCurrenty = await this.location.find({ key: 'appartement_id', value: rentalFind.appartementId }, true)
                  if (!rentalCurrenty)
                        return response.notFound({ status: false, message: 'Rental contrat current no found.' })
                  //5
                  await this.location.break({ appartementId: rentalFind.appartementId, landlordId: prayload.landlordId }, { status: false, current: false })
                  //6
                  await this.location.update(rentalCurrenty.id, { end_date: new Date() })
                  //7
                  await this.appart.update(rentalFind.appartementId, { status: false })
                  response.created({ status: true, message: 'Rental contrat break.' })
            } catch (error) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, message: error.message })
            }
      }

      /**
       * 
       */
      public async indexGuarantee({ request, response }: HttpContextContract) {
            try {
                  const { page = 1, limit = 100, orderBy = "created_at", month, status, rentalContrat } = request.qs()

                  const data = await this.location.getGuarantee({ page, limit, orderBy, status, month, rentalContrat })
                  response.ok({ status: true, data })
            } catch (error) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, message: error.message })
            }
      }
}
