import db from '../models/index'
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
module.exports = { getHomePage, }