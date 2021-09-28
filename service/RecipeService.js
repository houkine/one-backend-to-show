const {NotNullCheck,DateTransfer,TimeTransfer} = require('../utils/paramverify')

/**
 * ckeck category input 
 * @param {string} category 
 * @returns {boolean}, true - done, false - error
 */
 module.exports.CheckCategory = (category) => {
    // 1 not null
    let check_params = NotNullCheck([category])
    if(!check_params) return false

    // 2 validation 
    if(
        category=='breakfast' ||
        category=='lunch' ||
        category=='snack' ||
        category=='dinner' 
    ) return true
    else return false
}

