import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
      Route.group(() => {
            Route.resource('entreprises', 'EntreprisesController')
            Route.put('entreprises/logo/:id', 'EntreprisesController.updateLogo')

            Route.post('address/:id', 'EntreprisesController.addAddress')
            Route.put('address/:id', 'EntreprisesController.updateAddress')
            Route.delete('address/:id', 'EntreprisesController.destroyAddress')

            Route.post('bank-account/:id', 'EntreprisesController.addBankAccount')
            Route.put('bank-account/:id', 'EntreprisesController.updateBankAccount')
            Route.delete('bank-account/:id', 'EntreprisesController.destroyBankAccount')
      }).middleware('auth:user')

}).prefix('api/v1/')