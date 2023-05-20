import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RecoveryService from 'App/Services/Recovery.service'
import { inject } from '@adonisjs/fold'
import Logger from '@ioc:Adonis/Core/Logger'

@inject()
export default class RecoveriesController {
      constructor(private recovery: RecoveryService) {
      }
      public async index({ request, response }: HttpContextContract) {
            try {
                  const { page = 1, limit = 100, status = true, orderBy = "created_at", rentalContratStatus } = request.qs()

                  const data = await this.recovery.getAll({ page, limit, status, orderBy, rentalContratStatus })

                  return response.ok({ status: true, data })
            } catch (error: any) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, data: null, message: error.message })
            }
      }
}
