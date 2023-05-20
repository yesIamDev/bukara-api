import TypeAppartement from 'App/Models/TypeAppartement'
import Typebien from "App/Models/TypeBien"
import type i from 'interface'

export default class TypeService {
      /* A way to access the model from the service. */
      private appartement = TypeAppartement
      public bien = Typebien


      public async findAppartType(params: i.IFindByKeyValue): Promise<TypeAppartement | null> {
            return this.appartement.findBy(params.key, params.value)
      }

      /**
       * It returns a paginated list of roles, ordered by the orderBy parameter, in descending order
       * @param params - i.IQuerry
       * @returns An array of Role objects or null.
       */
      public async getAppartType(): Promise<TypeAppartement[] | null> {
            return this.appartement
                  .query()
                  .select(['id', 'designation', 'description'])
                  .orderBy('createdAt', 'desc')
            // .paginate(params.page, params.limit)
      }

      public async registreAppartType(input: i.ISimpleRegistre): Promise<TypeAppartement> {
            return this.appartement.create(input)
      }

      public async destroyAppartType(id: string): Promise<TypeAppartement | null> {
            return this.appartement.query().where('id', id).delete().first()
      }

      /**
       * Bien
       */

      public async findBienType(params: i.IFindByKeyValue): Promise<TypeAppartement | null> {
            return this.bien.findBy(params.key, params.value)
      }

      /**
       * It returns a paginated list of roles, ordered by the orderBy parameter, in descending order
       * @param params - i.IQuerry
       * @returns An array of Role objects or null.
       */
      public async getBienType(): Promise<Typebien[] | null> {
            return this.bien
                  .query()
                  .select(['id', 'designation', 'description'])
                  .orderBy('createdAt', 'desc')
            // .paginate(params.page, params.limit)
      }

      public async registreBienType(input: i.ISimpleRegistre): Promise<TypeAppartement> {
            return this.bien.create(input)
      }

      public async destroyBienType(id: string): Promise<TypeAppartement | null> {
            return this.bien.query().where('id', id).delete().first()
      }
}
