class UserService {

	constructor(User) {	  	
	  this.User = User	  
	  this.getUsers = this.getUsers.bind(this)
	  this.getUser = this.getUser.bind(this)
	}

	// return all user
	async getUsers( offset = 0, limit = 0, fields = [] ) {

		const users = await this.User.findAll({
			offset,
			limit
		})
		
		if(fields.length < 1) return users

		return Array.from(users).map(user => {
		    return this._extractFields(user, fields)
		})
	}

	// return single user by id
	async getUser(userid){		
		return await this.User.findOne({ where: { ID:userid } })
	}

	// helper
	_extractFields(user, fields) {
		
		if (fields.length < 1) return user
		
		const result = fields.reduce((acc, field) => {
		    acc[field] = user[field]
		    return acc
		}, {})

		return result
	}

}

module.exports = UserService