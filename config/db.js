const Sequelize = require('sequelize')
const fs = require('fs')
const path = require('path')

const Conn = new Sequelize(
		process.env.db_name,
		process.env.db_user,
		process.env.db_pass,
		{
		    dialect:'mssql',
		    host:process.env.db_host,
		    logging:false
		})

// import Model Definition files

fs.readdirSync(path.join(__dirname,'../models/'))
.filter( file=> (file.indexOf() !==0) && (file.slice(-3) === '.js') && file !== 'index.js' )
.forEach( file=> Conn.import(path.join(__dirname,'../models/' + file)) )

Conn.sync({ force:false })

module.exports = Conn