import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
      Route.group(() => {
            Route.resource('type/biens', 'TypeBiensController')
            Route.resource('type/appartements', 'TypeAppartementsController')
      }).middleware('auth:user')
}).prefix('api/v1')