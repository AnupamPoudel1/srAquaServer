const userDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}
const fspromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user, psw } = req.body;
    if (!user || !psw) return res.status(400).json({ 'message': 'username and password required' });
    // check for duplicates in database
    const duplicate = userDB.users.find(person => person.username === user);
    // conflict i.e same username for multiple persons
    if (duplicate) return res.sendStatus(409);
    else {
        try {
            // encrypting the message format: (pass, saltOrRounds)
            const encryptedPsw = await bcrypt.hash(psw, 10);
            // store username and password
            const newUser = { 'username': user, 'password': encryptedPsw };
            userDB.setUsers([...userDB.users, newUser]);
            await fspromises.writeFile(
                path.join(__dirname, '..', 'model', 'users.json'),
                JSON.stringify(userDB.users)
            );
            console.log(userDB.users);
            res.status(201).json({ 'success': 'new user was registered successfully' });
        } catch (err) {
            res.status(500).json({ 'message': err.message });
        }
    }
}

module.exports = { handleNewUser };