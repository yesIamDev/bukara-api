import Phones from "App/Models/LandlordPhone"
import Landlord from "App/Models/Landlord"
import type i from "interface"

export default class LandlordService {

      private landlord = Landlord
      private phone = Phones

      public async getAll(parms: i.ILandlordQuerry): Promise<Landlord[]> {
            return await this.landlord.query()
                  .if(parms.maritalStatus, (query) => {
                        query.where('marital_status', parms.maritalStatus)
                  })
                  .if(parms.landlordType, (query) => {
                        query.where('landlord_type', parms.landlordType)
                  })
                  .preload("phones")
                  .orderBy(parms.orderBy, 'desc')
                  .paginate(parms.page, parms.limit)
      }

      public async find(parms: i.IFindByKeyValue): Promise<Landlord | null> {
            return await this.landlord.query().where(parms.key, parms.value as string).preload("phones").first()
      }

      public async create(input: i.ILandlord): Promise<Landlord> {
            return await this.landlord.create(input)
      }

      public async update(id: string, input: i.ILandlord): Promise<Landlord | null> {
            await this.landlord.query().where('id', id).update(input).first()
            return await this.landlord.query().where('id', id).first()
      }

      public async delete(id: string): Promise<Landlord | null> {
            return await this.landlord.query().where('id', id).delete().first()
      }

      /**
       * phones
       */
      public async findPhone(parms: i.IFindByKeyValue): Promise<Phones | null> {
            return await this.phone.query().where(parms.key, parms.value as string).first()
      }

      public async registrePhone(input: i.IPhone[]): Promise<Phones[]> {
            return await this.phone.createMany(input)
      }

      public async updatePhone(id: string, input: i.IPhone | i.IPhoneRunning): Promise<Phones> {
            return await this.phone.query().where('id', id).update(input).first()
      }
      public async updatePhoneDefault(id: string): Promise<Phones[]> {
            return await this.phone.query().where('landlord_id', id).update({ running: false })
      }

      public async deletePhone(id: string): Promise<Phones> {
            return await this.phone.query().where('id', id).delete().first()
      }

}