//200 OK
exports.status200=(res,object)=>res.status(200).json(object)

//400 request error, (missing param, param not valid)
exports.status400=(res,msg)=>res.status(400).json(msg)

//401 Unauthorized (JWT)
exports.status401= res =>res.status(401).json('Unauthorized')

//404 target not found
exports.status404= res =>res.status(404).json('target not found')

//500 internel error (mysql)
exports.status500= res =>res.status(500).json('internel error')
