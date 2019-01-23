const { authService } = require('../services')

exports.signup = async(req,res) => {
	const { NMLGKP, NOMOHP, PASSWD, EMAIL } = req.body
	const user = await authService.signup(NMLGKP, NOMOHP, PASSWD, EMAIL)
	if(user){
		res.json(user)
	}else{
		res.json({'msg':'error'})
	}
	console.log('my req body:',req.body)
}

exports.signin = async(req,res) => {
	const { username, password } = req.body
	const user = await authService.signin(username,password)

	if(user){
		res.json(user)
	}

}