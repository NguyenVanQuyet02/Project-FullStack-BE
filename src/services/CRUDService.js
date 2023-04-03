import bcrypt from 'bcryptjs';
import db from '../models/index';


const salt = bcrypt.genSaltSync(10);


let createNewUser = async (data) => {
    console.log(data);
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await hashUserPassword(data.passWord);
            await db.User.create({
                email: data.email,
                password: hashPassword,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender,
                roleId: data.roleId
            })
            resolve('Create a user successful!!');
        } catch (error) {
            reject(error);
        }
    })
}

// de sd funcition hashUserPassword can import bcrypt from 'bcryptjs';
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true
            });
            resolve(users);
        } catch (error) {
            reject(error);
        }
    });
}

let editCRUDService = () => {
    return resizeBy.send('edit successful!!');
}
let getUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true
            });
            if (user)
                resolve(user);
            else
                resolve({});
        } catch (error) {
            reject(error);
        }
    })
}
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { id: data.userId } });
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.phoneNumber = data.phoneNumber;
                user.gender = data.gender;
                user.roleId = data.roleId;
                await user.save();
                resolve();
            }
            else {
                resolve();
            }
        } catch (error) {
            reject(error);
        }
    })
}

let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { id: userId } })
            if (user) {
                user.destroy();
            }
            resolve();
        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    createNewUser, getAllUser, editCRUDService,
    getUserById, updateUserData, deleteUserById
}