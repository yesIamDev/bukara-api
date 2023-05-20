import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AppartementValidator from "App/Validators/AppartementValidator"
import Service from "App/Services/Appartement.service"
import Type from "App/Services/Typebien.service"
import { inject } from "@adonisjs/fold";
import Logger from '@ioc:Adonis/Core/Logger';
import { EBienType } from 'App/Models/TypeBien';
import upload from 'App/Utils/Upload.file';
import i from 'interface'

@inject()
export default class AppartementsController extends AppartementValidator {
      constructor(public appartment: Service, private type: Type) {
            super()
      }

      public async index({ request, response }: HttpContextContract) {
            try {
                  const { page = 1, limit = 100, orderBy = "created_at", typeAppartement, typeBien, status } = request.qs()
                  const data = await this.appartment.findAll({ page, limit, orderBy, typeAppartement, typeBien, status })
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
                  const appartFind = await this.appartment.find({ key: 'id', value: id })
                  if (!appartFind)
                        return response.notFound({ status: false, message: 'Appartement no found.' })
                  //3
                  response.ok({ status: true, data: appartFind })
            } catch (error) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, message: error.message })
            }
      }

      public async store({ request, response }: HttpContextContract) {
            //1
            const payload = await request.validate({ schema: this.v_create })
            const { address } = await request.validate({ schema: this.v_address_create })
            try {
                  //2
                  const typeAppart = await this.type.findAppartType({ key: 'id', value: payload.typeAppartementId })
                  if (typeAppart?.designation === EBienType.APPARTEMENT && !payload.number)
                        return response.notAcceptable({ status: false, message: 'Appartement number is required' })
                  else
                        payload.number = 0
                  //3
                  const data = await this.appartment.registre(payload)
                  let _address

                  if (data) {
                        address.appartement_id = data.id
                        _address = await this.appartment.registreAddress(address)
                  }

                  response.created({
                        status: true, data: {
                              appartement: data,
                              address: _address
                        }
                  })
            } catch (error) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, message: error.message })
            }
      }

      public async update({ request, response }: HttpContextContract) {
            //1
            const { id } = await request.validate({ schema: this.v_id_param, data: { id: request.param('id') } })
            const payload = await request.validate({ schema: this.v_create })
            try {
                  //2
                  const appartFind = await this.appartment.find({ key: 'id', value: id })
                  if (!appartFind)
                        return response.notFound({ status: false, message: 'Appartement no found.' })
                  //3
                  const typeAppart = await this.type.findBienType({ key: 'id', value: payload.typeBienId })
                  if (typeAppart?.designation === EBienType.APPARTEMENT && !payload.number)
                        return response.notAcceptable({ status: false, message: 'Appartement number is required' })
                  else
                        payload.number = 0
                  //4
                  const data = await this.appartment.update(id, payload)
                  response.created({ status: true, data })
            } catch (error) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, message: error.message })
            }
      }

      public async destroy({ request, response }: HttpContextContract) {
            //1
            const { id } = await request.validate({
                  schema: this.v_id_param,
                  data: { id: request.param('id') }
            })
            try {
                  //2
                  const appartFind = await this.appartment.find({ key: 'id', value: id })
                  if (!appartFind)
                        return response.notFound({ status: false, message: 'Appartement no found.' })
                  //3
                  await this.appartment.destroy(id)
                  response.created({ status: true, message: 'Appartement deleted.' })
            } catch (error) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, message: error.message })
            }
      }

      /**
       *  Image Appartement
       */

      public async addImages({ request, response }: HttpContextContract) {
            //1
            const { id } = await request.validate({
                  schema: this.v_id_param,
                  data: { id: request.param('id') }
            })

            //2
            const { images } = await request.validate({
                  schema: this.v_upload_multiple
                  , data: { images: request.files('image') }
            })
            try {
                  //3
                  const appartFind = await this.appartment.find({ key: 'id', value: id })
                  if (!appartFind)
                        return response.notFound({ status: false, message: 'Appartement no found.' })
                  //4
                  const imageUploded = await upload.multiple(images)
                  //5
                  var input: i.IAppartementImage[] = []
                  imageUploded.map((img) => {
                        img.appartement_id = id
                        input.push(img)
                  })
                  //6
                  if (input.length) {
                        //7
                        const data = await this.appartment.registreImg(input)
                        return response.created({ status: true, data })
                  }
                  return response.ok({ status: true, message: 'No image recorded.' })
            } catch (error) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, message: error.message })
            }
      }

      public async destroyImage({ request, response }: HttpContextContract) {
            //1
            const { id } = await request.validate({
                  schema: this.v_id_param,
                  data: { id: request.param('id') }
            })
            try {
                  //2
                  const imageFind = await this.appartment.findImg(id)
                  if (!imageFind)
                        return response.notFound({ status: false, message: 'Imge no found.' })
                  //3
                  await this.appartment.destroyImg(id)
                  response.created({ status: true, message: 'Image deleted.' })
            } catch (error) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, message: error.message })
            }
      }
      /**
       * 
       * Addresses
       */
      public async updateAddress({ request, response }: HttpContextContract) {
            const { id } = await request.validate({ schema: this.v_delete, data: { id: request.param('id') } })
            const payload = await request.validate({ schema: this.v_address_update })
            try {

                  const appartFind = await this.appartment.find({ key: 'id', value: id })
                  if (!appartFind)
                        return response.notFound({ status: false, message: 'Appartement not found.' })

                  const data = await this.appartment.updateAddress(appartFind.id, payload)
                  return response.created({ status: true, data })
            } catch (error: any) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, data: null, message: error.message })
            }
      }

}