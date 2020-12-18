module.exports = function(sequelize, Sequelize) {
    var User = sequelize.define('user', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        username: {
            type: Sequelize.STRING,
            notEmpty: true,
            unique: true
        },
        email: {
            type: Sequelize.STRING,
            validate: {isEmail: true}
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        last_login: {
            type: Sequelize.DATE
        },
        registration_date: {
            type: Sequelize.DATE
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });
    return User;
}
