import i from "interface"
import User from "App/Models/User"

export default class UserService {

      private model = User
      private static _instance: UserService

      /**
      * This function returns a promise that resolves to a User object or null.
      * @param params - i.IFindByKeyValue
      * @returns A promise of a User or null
      */
      public async find(params: i.IFindByKeyValue): Promise<User | null> {
            return this.model.query().where(params.key, params.value as string).first()
      }

      public async exist(): Promise<User | null> {
            return this.model.query().first()
      }

      public async signin(email: string): Promise<User | null> {
            return await this.model
                  .query()
                  .where('email', email)
                  .andWhere('status', true)
                  .first()
      }

      public async getAll(params: i.IQuerry): Promise<User[] | null> {
            return this.model
                  .query()
                  .orderBy(params.orderBy, 'desc')
                  .paginate(params.page, params.limit)
      }

      public async registre(input: i.IUser): Promise<User> {
            return this.model.create(input)
      }

      public async update(id: string, input: object): Promise<User | null> {
            await this.model.query().where('id', id).update(input).first()
            return this.model.findBy('id', id)
      }

      public async destroy(UserId: string): Promise<User | null> {
            return this.model.query().where('id', UserId).delete().first()
      }

      public static get Instance() {
            return this._instance || (this._instance = new this())
      }
}