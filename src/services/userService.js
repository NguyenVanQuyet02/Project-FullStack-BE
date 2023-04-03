import db from '../models/index';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);


let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['email', 'password', 'roleId'],
                    where: { email: email },
                    raw: true// in ra duoi dang object
                })
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password); // false
                    if (check) {
                        userData.errorCode = 0;
                        userData.message = `ok!!!`;
                        delete user.password;
                        userData.user = user;
                    }
                    else {
                        userData.errorCode = 1;
                        userData.message = `Wrong password`
                    }
                }
                else {
                    userData.errorCode = 1;
                    userData.message = `Usernot found!!`
                }
            }
            else {
                userData.errorCode = 1;
                userData.message = `Your's email isn't exist in your system.plz try other email!!!`
            }
            resolve(userData)

        } catch (error) {
            reject(error);
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { email: userEmail } })
            if (user)
                resolve(true);
            else
                resolve(false);
        } catch (error) {
            reject(error);
        }
    })
}
let getAllUserService = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = db.User.findAll({
                    attributes: {
                        exclude: ['password']// ko in password
                    }
                });
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']// ko in password
                    }
                })
            }
            resolve(users);
        } catch (error) {
            reject(error);
        }
    })
}
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
let createNewUserAPI = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkEmail = await checkUserEmail(data.email);
            if (checkEmail) {
                resolve({
                    errCode: 1,
                    message: 'This email already in use, plz try again!!!'
                })
            }

            let hashPassword = await hashUserPassword(data.password);
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
            resolve({
                errCode: 0,
                message: 'create new user successful'
            });
        } catch (error) {
            reject(error);
        }
    })
}
let updateUserAPI = async (data) => {
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
                resolve({
                    errCode: 0,
                    message: 'Update a user successful!!!!'
                });
            }
            else {
                resolve({
                    errCode: 1,
                    message: 'Update a user failed!!!!!'
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}

let deleteUserByIdAPI = (userId) => {
    return new Promise(async (resolve, reject) => {

        let user = await db.User.findOne({ where: { id: userId } })
        if (!user) {
            resolve({
                errCode: 1,
                errMessage: "The user isn't exist!"
            })
        }
        await user.destroy();
        resolve({
            errCode: 0,
            message: "The user is deleted!"
        });

    })
}
module.exports = {
    handleUserLogin, checkUserEmail, getAllUserService,
    deleteUserByIdAPI, createNewUserAPI, updateUserAPI
}