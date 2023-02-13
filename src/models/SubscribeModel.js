"use strict";
const { convertDateTimeFormat } = require("@utils/date_time_helper");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Subscribe extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Subscribe.init(
        {
            pack_id: DataTypes.STRING,
            packactivated_date: DataTypes.DATE,
            packexperied_date: DataTypes.DATE,
            user_id: DataTypes.STRING,
            payable_amount: DataTypes.STRING,
            payment_id: DataTypes.STRING,

        },
        {
            sequelize,
            modelName: "Subscribe",
            tableName: "subscribed_users",
            underscored: true,
        }
    );
    return Subscribe;
};
