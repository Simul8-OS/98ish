const { Record } = require('../models/record.model');

module.exports.index = (request, response) => {
    response.json({
        message: "98ish Users"
    });
}

module.exports.findAllUsers = (request, response) => {
    User.find() 
      .then(userList => response.json(userList.sort((a, b)=> a.name.localeCompare(b.name))))
      .catch(err => response.json({ message: "Something went wrong", error: err }))
  };

module.exports.createUser = (request, response) => {
    User.create({
        ...request.body
    })
        .then(user => response.json(user))
        .catch(err => response.status(400).json(err));
}

module.exports.getUser = (request, response) => {
    User.findOne({_id:request.params.id})
        .then(user => {response.json(user)})
        .catch(err => response.json(err))
}

module.exports.updateUser = (request, response) => {
    User.findOneAndUpdate({_id:request.params.id}, request.body, {new:true, runValidators: true})
        .then(updatedUser => response.json(updatedUser))
        .catch(err => {
            response.status(400).json(err)
        })
}

module.exports.deleteUser = (request, response) => {
    User.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}