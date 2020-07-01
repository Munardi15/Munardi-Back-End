const User = require('../models/user');
const request = require('superagent');
const redis = require('redis');
const client = redis.createClient();

//AllUser
const allUser = (req, res, next) => {
    User.find()
        .then(response => {
            res.json({
                response
            })
        })
        .catch(err => {
            res.json({
                message: 'an error server!!'
            })
        })
}

//findById
const findUserId = (req, res, next) => {
    const key = JSON.stringify(req.params);
    User.findById({_id: req.params.id}, function (err, user) {
        if (err)
            return res.send(err);
        client.setex(key, 3600, JSON.stringify(user));
        res.json(user);
    })
}

//findByAccountNumber
const findAccountNumber = (req, res, next) => {
    const key = JSON.stringify(req.params);
    User.find(
        {accountNumber: req.params.accountNumber}, function (err, user) {
            if (err)
                return res.send(err);
            client.setex(key, 3600, JSON.stringify(user));
            res.json(user);
        })
}

const findIdentityNumber = (req, res, next) => {
    const key = JSON.stringify(req.params);
    User.find({identityNumber: req.params.identityNumber}, function (err, user) {
        if (err)
            return res.send(err);
        client.setex(key, 3600, JSON.stringify(user));
        res.json(user);
    })
}

//add user
const addUser = (req, res, next) => {
    let user = new User({
        userName: req.body.userName,
        accountNumber: req.body.accountNumber,
        emailAddress: req.body.emailAddress,
        identityNumber: req.body.identityNumber
    })
    user.save()
        .then(response => {
            res.json({
                message: 'User Added'
            })
        })
        .catch(err => {
            res.json({
                message: 'an error server!!'
            })
        })
}

//User Update
const updateUser = (req, res, next) => {
    let userUpdate = ({
        userName: req.body.userName,
        accountNumber: req.body.accountNumber,
        emailAddress: req.body.emailAddress,
        identityNumber: req.body.identityNumber
    })

    User.findByIdAndUpdate({_id: req.params.id}, {$set: userUpdate})
        .then(() => {
            res.json({
                message: 'User Updated success!'
            })
        })
        .catch(err => {
            res.json({
                message: 'an error server!!'
            })
        })
}

//delete user
const deleteUser = (req, res, next) => {
    User.findByIdAndRemove({_id: req.params.id}, function (err, user) {
        if (err)
            return res.send(err);
        res.json(user);
    })
}

function cache(req, res, next) {
    const key = JSON.stringify(req.params);
    client.get(key, function (err, data) {
        if (err) throw err;
        if (data != null) {
            res.send(data);
        } else {
            next();
        }
    });
}

module.exports = {
    allUser, addUser, deleteUser, findUserId, updateUser, findAccountNumber, findIdentityNumber, cache
}
