class AuthService {

	constructor(User) {	  
		this.User = User
		this.signup = this.signup.bind(this)
		this.signin = this.signin.bind(this)

	}

	async signup(NMLGKP,NOMOHP,PASSWD,EMAIL){

		// console.log(namalengkap,nomorhp,password,email)
		
		// const isEmailExist = await this.User.findOne({ where: { email} })
		// if(isEmailExist) return isEmailExist		
		// console.log(isEmailExist)

		/*const userCreate = await this.User.findOrCreate({ where:{EMAIL:'email'}, defaults:{
			NMLGKP:namalengkap,
			NOMOHP:nomorhp,
			PASSWD:password,
			EMAIL:email
		} })*/
		
		try{
			
			const userCreate = await this.User.findOrCreate({ where: { EMAIL: EMAIL },defaults:{
				NMLGKP:NMLGKP,
				NOMOHP:NOMOHP,
				PASSWD:PASSWD,
				EMAIL:EMAIL
			}})
			.spread((user,created)=>{
				if(created) return true
				return false
			})

		}catch(err){
			console.log(err)
		}

		

	}

	async signin(username,password){
		const isUserExist = await this.User.findOne({ where: { username } })
		if(isUserExist) return isUserExist


	}
}

module.exports = AuthService