import Entreprise from "App/Models/Entreprise"
import Address from "App/Models/Address"
import Bank from "App/Models/BankAccount"
import i from "interface"

export default class EntrepriseService {
      private model = Entreprise
      private address = Address
      private bank = Bank

      public async exist(): Promise<Entreprise | null> {
            return this.model.query().first()
      }

      public async getAll(): Promise<Entreprise | null> {
            return this.model.query()
                  .preload('addresses')
                  .preload('banks')
                  .orderBy('createdAt', 'desc')
                  .first()
      }

      public async find(params: i.IFindByKeyValue): Promise<Entreprise | null> {
            return this.model.query().where(params.key, params.value as string)
                  .preload('addresses')
                  .preload('banks')
                  .first()
      }

      public async registre(input: i.IEntreprise): Promise<Entreprise> {
            return this.model.create(input)
      }

      public async update(id: string, input: object): Promise<Entreprise | null> {
            await this.model.query().where('id', id).update(input).first()
            return this.model.findBy('id', id)
      }


      /**
       * Addrese
       */
      public async addresse(params: i.IFindByKeyValue): Promise<Address | null> {
            return this.address.query().where(params.key, params.value as string).first()
      }
      // public async addresseFor(params: i.IFindAddress): Promise<Address | null> {
      //       return this.address.query().where('entreprise_id', params.entreprise_id).where(id).first()
      // }

      public async registreAddress(input: i.IAddress[]): Promise<Address[]> {
            return this.address.createMany(input)
      }
      public async registreNewAddress(input: i.IAddress): Promise<Address> {
            return this.address.create(input)
      }

      public async updateAddress(id: string, input: object): Promise<Address | null> {
            await this.address.query().where('id', id).update(input).first()
            return this.address.findBy('id', id)
      }

      public async deleteAddress(id: string): Promise<Address | null> {
            return await this.address.query().where('id', id).delete().first()
      }

      /**
       * Account Bank
       */
      public async _bank(params: i.IFindByKeyValue): Promise<Bank | null> {
            return this.bank.query().where(params.key, params.value as string).first()
      }

      public async registreBankAccount(input: i.IBankAcount[]): Promise<Bank[]> {
            return this.bank.createMany(input)
      }

      public async registreNewBankAccount(input: i.IBankAcount): Promise<Bank> {
            return this.bank.create(input)
      }

      public async updateBankAccount(id: string, input: object): Promise<Bank | null> {
            await this.bank.query().where('id', id).update(input).first()
            return this.bank.findBy('id', id)
      }

      public async deleteBankAccount(id: string): Promise<Bank | null> {
            return await this.bank.query().where('id', id).delete().first()
      }
}