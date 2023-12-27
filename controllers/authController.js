const userDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}
const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
    const { user, psw } = req.body;
    if (!user || !psw) return res.status(400).json({ 'message': 'username and password required' });
    // check for user in database
    const foundUser = userDB.users.find(person => person.username === user);
    if (!foundUser) return res.sendStatus(401); //Unauthorized'
    // evaluate password if user found
    const match = await bcrypt.compare(psw, foundUser.password);
    if (match) {
        //create JWT token if user login us succesful
        res.json({ 'success': 'Login Successful' });
    } else {
        res.sendStatus(401); //Unauthorized
    }
}

module.exports = { handleLogin };