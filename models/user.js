module.exports = function(sequelize,Types){
    return sequelize.define('user',{
        ID:{
            type:Types.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },        
        NMLGKP:{
            type: Types.STRING(255),
            allowNull: true
        },
        NOMOHP:{
            type: Types.STRING(15),
            allowNull: true
        },        
        PASSWD:{
            type: Types.TEXT(),
            allowNull: true
        },
        USERTYPE:{
            type: Types.STRING(255),
            allowNull: false,
            defaultValue:'USER'
        },
        EMAIL:{
            type: Types.STRING(255),
            allowNull: true
        },
        IS_ACTIVE:{
            type: Types.CHAR(1),
            allowNull: false,
            defaultValue:'N'
        }
    },{
        tableName: 'dt_user',
        timestamps:false
    })
}