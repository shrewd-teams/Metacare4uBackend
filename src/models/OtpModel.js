"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class OTP extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    OTP.init(
        {
             date_time:DataTypes.DATE,
            user_email: DataTypes.STRING,
            otp: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "OTP",
            tableName: "otp",
            underscored: true,
       
        }
    );
    return OTP;
};
