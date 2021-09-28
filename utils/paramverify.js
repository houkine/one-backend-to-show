const moment = require('moment')

const NotNullCheck = array =>{
    let result = true
    array.forEach(element => {
        if(typeof element == 'undefined' || element == ''){
            result = false
        }
    });
    return result
}

const DateTransfer = (dateString,format) =>{
    // 1 check if dateString is valid
    if(typeof dateString == 'undefined' || dateString == ''){
        result = 'false'
    }

    // 2 check if valid
    let date = moment(dateString)
    if(!date.isValid) return 'false'

    // 3 return correct format
    return date.format(format || 'YYYY-MM-DD')
}

const TimeTransfer = (timeString,format) => {
    // 1 check if dateString is valid
    if(typeof timeString == 'undefined' || timeString == ''){
        result = 'false'
    }

    // 2 check if valid
    let time = moment(timeString)
    if(!time.isValid) return 'false'

    // 3 return correct format
    return time.format(format || 'YYYY-MM-DD HH:mm:ss') // to mormal
    // return timeString.format(format || 'X') // to unix
}

module.exports = {
    NotNullCheck,
    DateTransfer,
    TimeTransfer,
}