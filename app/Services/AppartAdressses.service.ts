import AppartementAddress from "App/Models/AppartementAddress";
import i from "interface"

export default class AppartementAddressService {

      private address = AppartementAddress;

      public async addresse(params: i.IFindByKeyValue): Promise<AppartementAddress | null> {
            return this.address.query().where(params.key, params.value as string).first()
      }

      public async registreNewAddress(input: i.IAddress): Promise<AppartementAddress> {
            return this.address.create(input)
      }

      public async updateAddress(id: string, input: object): Promise<AppartementAddress | null> {
            await this.address.query().where('id', id).update(input).first()
            return this.address.findBy('id', id)
      }

      // public async deleteAddress(id: string): Promise<AppartementAddress | null> {
      //       return await this.address.query().where('id', id).delete().first()
      // }
}