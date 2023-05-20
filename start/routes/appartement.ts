import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
      Route.group(() => {
            Route.resource('appartements', 'AppartementsController')
            Route.put('appartements/address/:id', 'AppartementsController.updateAddress')
            Route.post('appartements/images/:id', 'AppartementsController.addImages')
            Route.delete('appartements/images/:id', 'AppartementsController.destroyImage')
      }).middleware('auth:user')

}).prefix('api/v1')