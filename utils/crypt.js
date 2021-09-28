const bcrypt = require('bcrypt');
const saltRounds = 10;

const encrypt= async (plainText)=>{
    const salt = await bcrypt.genSaltSync(saltRounds);
    return await bcrypt.hashSync(plainText, salt);
}
const compare=async (ciphertext,plainText)=>{
    return await bcrypt.compareSync(plainText, ciphertext);
}

module.exports = {encrypt,compare}