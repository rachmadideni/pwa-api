const { userService } = require('../services')

exports.userList = async (req,res) => {	
	
	let { offset, limit, fields } = req.query
	offset = parseInt(offset)
	limit = parseInt(limit)
	limit = Math.min(limit, 50)
	fields = fields ? fields.split(",") : undefined
	
	const users = await userService.getUsers(offset, limit, fields)
	
	if(users){
		res.json(users)
	}
}

exports.userData = async (req,res) => {
	const { id } = req.params
	const user = await userService.getUser(id)

	if(user){
		res.json(user)
	} 
}