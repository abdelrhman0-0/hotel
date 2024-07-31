const { DataTypes } = require('sequelize');
const {sequelize} = require('../../config/db');
const Account = require('../account/model');
sequelize.sync({alter:true});

const Client = sequelize.define('client', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(191),
        allowNull: false,
        unique: true,
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birthDate:{
        type:DataTypes.DATE,
        allowNull:false
    },
    personalId:{
        type: DataTypes.STRING,
        allowNull:false
    },
    nationality:{
        type:DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive', 'deleted'),
        defaultValue: 'active',
    },
    accId:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

Client.hasOne(Account, {
    foreignKey: 'accId',
  });
module.exports = Client;