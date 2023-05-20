import { inject } from '@adonisjs/fold';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger';
import EntrepriseService from "App/Services/Entreprise.service";
import EntrepriseValidator from "App/Validators/EntrepriseValidator";
import upload from 'App/Utils/Upload.file'

@inject()
export default class EntreprisesController extends EntrepriseValidator {
      constructor(private enreprise: EntrepriseService) {
            super()
      }

      public async index({ response }: HttpContextContract) {
            // const { id } = await request.validate({ schema: this.v_delete, data: { id: request.param('id') } })
            try {
                  const data = await this.enreprise.getAll()
                  return response.ok({ status: true, data })
            } catch (error: any) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, data: null, message: error.message })
            }
      }

      public async show({ request, response }: HttpContextContract) {
            const { id } = await request.validate({ schema: this.v_delete, data: { id: request.param('id') } })
            try {
                  const data = await this.enreprise.find({ key: 'id', value: id })
                  return response.ok({ status: true, data })
            } catch (error: any) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, data: null, message: error.message })
            }
      }

      public async store({ request, response }: HttpContextContract) {
            const payload = await request.validate({ schema: this.v_entreprise_create })
            const pAddress = await request.validate({ schema: this.v_address_create })
            const { bank_accounts } = await request.validate({ schema: this.v_bank_account })

            try {
                  if (await this.enreprise.exist())
                        return response.notFound({ status: false, message: 'Operation faild.' })

                  const entreprise = await this.enreprise.registre(payload)
                  pAddress.addresses.forEach(element => {
                        element.entreprise_id = entreprise.id
                  });

                  const addresses = await this.enreprise.registreAddress(pAddress.addresses)

                  const uniq = {}
                  var bankFiltered = bank_accounts.filter(obj => !uniq[obj.account_number] && (uniq[obj.account_number] = true));

                  bankFiltered.forEach(element => {
                        element.entreprise_id = entreprise.id
                  });
                  const bank = await this.enreprise.registreBankAccount(bankFiltered)
                  return response.ok({ status: true, data: { entreprise, addresses, bank_accounts: bank } })
            } catch (error: any) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, data: null, message: error.message })
            }
      }

      public async update({ request, response }: HttpContextContract) {
            const payload = await request.validate({ schema: this.v_update_entreprise })
            const { id } = await request.validate({ schema: this.v_delete, data: { id: request.param('id') } })
            try {
                  if (!await this.enreprise.find({ key: 'id', value: id }))
                        return response.notFound({ status: false, message: 'Entreprise not found' })

                  const data = await this.enreprise.update(id, payload)
                  return response.ok({ status: true, data })
            } catch (error: any) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, data: null, message: error.message })
            }
      }

      public async updateLogo({ request, response }: HttpContextContract) {
            const payload = await request.validate({ schema: this.v_logo })
            const { id } = await request.validate({ schema: this.v_delete, data: { id: request.param('id') } })
            try {
                  if (payload) {
                        const result = await upload.single(payload.logo)
                        const logo = result.secure_url
                        await this.enreprise.update(id, { logo })
                        return response.created({ status: true, data: { logo } })
                  }
                  throw new Error('Echec de la modification.')
            } catch (error) {
                  Logger.error(error)
                  return response.expectationFailed({ status: false, message: error.message })
            }
      }

      /**
       * 
       * Addresse 
       */
      public async addAddress({ request, response }: HttpContextContract) {
            const payload = await request.validate({ schema: this.v_new_address })
            const { id } = await request.validate({ schema: this.v_delete, data: { id: request.param('id') } })
            try {
                  payload.entreprise_id = id
                  if (!await this.enreprise.find({ key: 'id', value: payload!.entreprise_id }))
                        return response.notFound({ status: false, message: 'Entreprise not found' })

                  const data = await this.enreprise.registreNewAddress(payload)
                  return response.created({ status: true, data })
            } catch (error: any) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, data: null, message: error.message })
            }
      }

      public async updateAddress({ request, response }: HttpContextContract) {
            const payload = await request.validate({ schema: this.v_new_address })
            const { id } = await request.validate({ schema: this.v_delete, data: { id: request.param('id') } })
            try {

                  if (!await this.enreprise.addresse({ key: 'id', value: id }))
                        return response.notFound({ status: false, message: 'Address not found' })

                  const data = await this.enreprise.updateAddress(id, payload)
                  return response.created({ status: true, data })
            } catch (error: any) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, data: null, message: error.message })
            }
      }

      public async destroyAddress({ request, response }: HttpContextContract) {
            const { id } = await request.validate({ schema: this.v_delete, data: { id: request.param('id') } })
            try {

                  if (!await this.enreprise.addresse({ key: 'id', value: id }))
                        return response.notFound({ status: false, message: 'Address not found' })

                  await this.enreprise.deleteAddress(id)
                  return response.created({ status: true, message: 'Address deleted.' })
            } catch (error: any) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, data: null, message: error.message })
            }
      }

      /**
       * 
       * Banks 
       */
      public async addBankAccount({ request, response }: HttpContextContract) {
            const payload = await request.validate({ schema: this.v_new_bank_account })
            const { id } = await request.validate({ schema: this.v_delete, data: { id: request.param('id') } })
            try {

                  payload.entreprise_id = id
                  if (!await this.enreprise.find({ key: 'id', value: payload!.entreprise_id }))
                        return response.notFound({ status: false, message: 'Entreprise not found' })

                  const data = await this.enreprise.registreNewBankAccount(payload)
                  return response.created({ status: true, data })
            } catch (error: any) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, data: null, message: error.message })
            }
      }

      public async updateBankAccount({ request, response }: HttpContextContract) {
            const payload = await request.validate({ schema: this.v_new_bank_account })
            const { id } = await request.validate({ schema: this.v_delete, data: { id: request.param('id') } })
            try {

                  if (!await this.enreprise._bank({ key: 'id', value: id }))
                        return response.notFound({ status: false, message: 'Account Bank not found' })

                  const data = await this.enreprise.updateBankAccount(id, payload)
                  return response.created({ status: true, data })
            } catch (error: any) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, data: null, message: error.message })
            }
      }

      public async destroyBankAccount({ request, response }: HttpContextContract) {
            const { id } = await request.validate({ schema: this.v_delete, data: { id: request.param('id') } })
            try {

                  if (!await this.enreprise._bank({ key: 'id', value: id }))
                        return response.notFound({ status: false, message: 'Bank account not found' })

                  await this.enreprise.deleteBankAccount(id)
                  return response.created({ status: true, message: 'Bank account deleted.' })
            } catch (error: any) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, data: null, message: error.message })
            }
      }
}
