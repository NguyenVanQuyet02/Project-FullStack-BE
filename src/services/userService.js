import db from '../models/index';
import bcrypt from 'bcryptjs';


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
module.exports = {
    handleUserLogin, checkUserEmail, getAllUserService
}