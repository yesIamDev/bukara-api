import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
      Route.group(() => {
            Route.resource('rental-contrats', 'RentalContratsController')
            Route.post('rental-contrats/break/:id', 'RentalContratsController.breakContract')
            Route.get('guarantees', 'RentalContratsController.indexGuarantee')
            Route.resource('recoveries', 'RecoveriesController')
      }).middleware('auth:user')

}).prefix('api/v1')