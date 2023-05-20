import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
      Route.post('upload', 'UsersController.profile')
      Route.post('uploads', 'UsersController.multiple')
      
      Route.post('users', 'UsersController.store')
      Route.post('users/signin', 'UsersController.login')

      Route.group(() => {
            Route.get('users', 'UsersController.show')
            Route.put('users', 'UsersController.update')
            Route.put('users/change/profile', 'UsersController.updateProfile')
            Route.put('users/change/psswd', 'UsersController.updatePassword')
            Route.post('users/logout', 'UsersController.logOut')
      }).middleware('auth:user')


}).prefix('api/v1/')