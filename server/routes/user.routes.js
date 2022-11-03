const UserController = require('../controllers/user.controller');
module.exports = function(app){
    app.get('/api', UserController.index);
    app.get('/api/users', UserController.findAllUsers);
    app.get('/api/users/:id', UserController.getUser)
    app.post('/api/users', UserController.createUser);
    app.put('/api/users/:id', UserController.updateUser);
    app.delete('/api/users/:id', UserController.deleteUser);
}