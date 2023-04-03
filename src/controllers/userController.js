import userService from '../services/userService';


let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(202).json({
            errorCode: 1,
            message: "Missing inputs parameter!!!"
        })
    }
    let userData = await userService.handleUserLogin(email, password)
    return res.status(202).json({
        errorCode: userData.errorCode,
        message: userData.message,
        user: userData.user ? userData.user : {}
    })
}
let handleGetAllUser = async (req, res) => {
    let id = req.query.id;//all || single
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter!!!',
            users: []
        })
    }
    let users = await userService.getAllUserService(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'ok api get all users!!!',
        users
    })
}

let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUserAPI(req.body);
    return res.status(202).json(message);
}
let handleEditAUser = async (req, res) => {
    let message = await userService.updateUserAPI(req.body);
    return res.status(202).json(message);
}
let handleDeleteAUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(202).json({
            errCode: 1,
            message: "Missing required parameters!!"
        })
    }
    let message = await userService.deleteUserByIdAPI(req.body.id);
    return res.status(202).json(message);
}
module.exports = {
    handleLogin, handleGetAllUser, handleCreateNewUser,
    handleEditAUser, handleDeleteAUser
}