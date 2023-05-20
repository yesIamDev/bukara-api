import AppartementAddress from "App/Models/AppartementAddress";
import Appartement from "App/Models/Appartement";
import Images from "App/Models/ImageAppartement";
import i from "interface"

export default class AppartementService {

      private model = Appartement
      private img = Images
      private address = AppartementAddress;
      private static _instance: AppartementService

      public async find(param: i.IFindByKeyValue): Promise<Appartement | null> {
            return await this.model.query()
                  .where(param.key, param.value as string)
                  .preload("address")
                  .preload("images")
                  .first()
      }

      public async findAll(params: i.IQAppartement): Promise<Appartement[]> {
            return await this.model.query()
                  .if(params.typeAppartement, (query) => {
                        query.where('type_appartement_id', params.typeAppartement)
                  })
                  .if(params.typeBien, (query) => {
                        query.where('type_bien_id', params.typeBien)
                  })
                  .preload("typeBien", (query) => {
                        query.select(['id', 'designation', 'description'])
                  })
                  .preload("typeAppartement", (query) => {
                        query.select(['id', 'designation', 'description'])
                  })
                  .preload("address")
                  .preload("images")
                  .orderBy('created_at', 'desc')
                  .paginate(params.page, params.limit)
      }

      public async registre(input: i.IAppartement): Promise<Appartement> {
            return await this.model.create(input)
      }

      public async update(id: string, input: object): Promise<Appartement | null> {
            await this.model.query().where('id', id).update(input).first()
            return this.model.query().where('id', id).preload("images").first()
      }

      public async destroy(id: string): Promise<Appartement> {
            return await this.model.query().where('id', id).delete().first()
      }

      /**
       *  Images
       */
      public async findImg(id: string): Promise<Images | null> {
            return await this.img.findBy('id', id)
      }

      public async registreImg(input: i.IAppartementImage[]): Promise<Images[]> {
            return await this.img.createMany(input)
      }

      public async destroyImg(id: string): Promise<Images> {
            return await this.img.query().where('id', id).delete().first()
      }

      /**
       * Adresses
       */
      public async addresse(params: i.IFindByKeyValue): Promise<AppartementAddress | null> {
            return this.address.query().where(params.key, params.value as string).first()
      }

      public async registreAddress(input: i.IAppartAddress): Promise<AppartementAddress> {
            return this.address.create(input)
      }

      public async updateAddress(id: string, input: i.IAppartAddress): Promise<AppartementAddress | null> {
            await this.address.query().where('appartement_id', id).update(input).first()
            return this.address.findBy('appartement_id', id)
      }

      public static get Instance() {
            return this._instance || (this._instance = new this())
      }
}