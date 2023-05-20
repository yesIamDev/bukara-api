import Recovery from 'App/Models/Recovery'
import type i from 'interface'

export default class RecoveryService {

      private recovery = Recovery
      private static _instance: RecoveryService

      public async find(params: i.IFindByKeyValue): Promise<Recovery | null> {
            return this.recovery.findBy(params.key, params.value)
      }

      public async getAll(param: i.IRecoveryQuery): Promise<Recovery[] | null> {
            return this.recovery
                  .query()
                  // .whereNot('rental_contrat_id',)
                  // .if(param.rentalContratStatus, (query) => {
                  //       query.where('current', param.rentalContratStatus)
                  // })
                  .preload('rentalContrat', (query) => {
                        query.select(['id', 'user_id', 'appartement_id', 'landlord_id', 'number_of_habitant', 'amount', 'currency', 'start_date', 'current']).preload('user', (query) => {
                              query.select(['id', 'name', 'lastname', 'country_code', 'phone_number', 'email', 'profile'])
                        })
                              .preload('landlord', (query) => {
                                    query.select(['id', 'name', 'lastname', 'email', 'profile'])
                              })
                              .preload('appartement', (query) => {
                                    query.select(['id', 'type_bien_id', 'type_appartement_id', 'number', 'designation', 'description', 'features']).preload("typeBien", (query) => {
                                          query.select(['id', 'designation', 'description'])
                                    }).preload("typeAppartement", (query) => {
                                          query.select(['id', 'designation', 'description'])
                                    })
                              })
                  })
                  .orderBy('createdAt', 'desc')
                  .paginate(param.page, param.limit)
      }

      public async registre(input: i.IRecovery): Promise<Recovery> {
            return this.recovery.create(input)
      }

      public async destroy(id: string): Promise<Recovery | null> {
            return this.recovery.query().where('id', id).delete().first()
      }

      public static get Instance() {
            return this._instance || (this._instance = new this())
      }
}
