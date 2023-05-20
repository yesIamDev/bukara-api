import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
      Route.group(() => {
            Route.resource('landlords', 'LandlordsController')
            Route.post('landlords/phones/:id', 'LandlordsController.addPhone')
            Route.put('landlords/phones/:id', 'LandlordsController.updatePhone')
            Route.put('landlords/phones/running/:id', 'LandlordsController.selectRunningPhone')
            Route.delete('landlords/phones/:id', 'LandlordsController.deletePhone')
      }).middleware('auth:user')


}).prefix('api/v1/')