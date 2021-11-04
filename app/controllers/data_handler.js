"use strict";

const User = require("../models/users")

function getUsers(req, res) {
    User.find({}).then(users => {
        res.status(200).json(users);
    });
}

function getUserByEmail(req, res) {
    let email = req.body.email;
    User.findOne({ email: email }).then(user => {
        res.status(200).json(user);
    });
}

function createUser(user) {
    let user = User(req.body);

    user.save().then(user => {
        res.set('Content-Type', 'text/plain; charset=utf-8');
        res.send(`User ${user.firstName} was created!`);
    });
}

function updateUser(email, updatedUser) {
    let email = req.params.email;
    let updatedUser = req.body;

    for (let property in updatedUser) {
        if (['firstName', 'lastName', 'password', 'date', 'sex', 'image'].includes(property)) continue;
        delete updatedUser[property];
    } 

    User.findOneAndUpdate({ email: `${email}`}, updatedUser, {new: true}).then(user => {
        res.type('text/plain; charset=utf-8');
        res.send(`User ${user.firstName} was updated!`);
    })
}

function deleteUser(email) {    
    let email = req.params.email;

    User.findOneAndDelete({ email: `${email}`}).then(user => {
        res.type('text/plain; charset=utf-8');
        res.send(user != undefined ? `User ${user.firstName} was deleted!` : `No user with email ${email} was found!`);
    })
}
/*
function isUserValid(firstName, lastName, email) {
    if (users.find(user => user.firstName == firstName && user.lastName == lastName)) return false;
    if (users.find(user => user.email == email)) return false;
    return true;
}
*/
exports.getUsers = getUsers;
exports.getUserByEmail = getUserByEmail;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
