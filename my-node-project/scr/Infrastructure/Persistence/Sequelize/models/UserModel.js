const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const UserModel = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: { // generated as a hash by senha
        type: DataTypes.STRING,
        allowNull: false
    },
    tableName: 'users',
    timestamps: true, // created_at, updated_at
});

module.exports = UserModel;