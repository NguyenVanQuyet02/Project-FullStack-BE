import db from '../models/index';
import CRUDService from '../services/CRUDService';


let getHomePage = async (req, res) => {
    let data = null;
    try {
        data = await db.User.findAll();
        console.log('---------------------------');
        console.log(data);
        console.log('---------------------------');

    } catch (error) {
        console.log(error);
    }
    return res.render("homePage.ejs", { data: JSON.stringify(data) });
}

let getCRUD = async (req, res) => {
    return res.render("CRUD.ejs");

}

let postCRUD = async (req, res) => {
    let result = await CRUDService.createNewUser(req.body);
    // console.log(req.body);// req.body lay tham so tu phia client gui len server
    // console.log(result);
    return res.send('post crud from server');
}
let displayGetCRUD = async (req, res) => {
    let result = await CRUDService.getAllUser();
    return res.render('displayCRUD.ejs', { users: result });
}
let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserById(userId);
        if (userData) {
            return res.render('editCRUD.ejs', { User: userData })
        }
    }
    else {
        return res.send('edit failed!!!');
    }
}

let putUpdateCRUD = async (req, res) => {
    let data = req.body;
    await CRUDService.updateUserData(data);
    return res.redirect('/get-crud');
}
let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDService.deleteUserById(id);
        return res.redirect('/get-crud');
    }
    else {
        return res.redirect('/get-crud');
    }
}
module.exports = {
    getHomePage, getCRUD, postCRUD,
    displayGetCRUD, getEditCRUD, putUpdateCRUD, deleteCRUD
}