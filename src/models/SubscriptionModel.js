"use strict";
const { convertDateTimeFormat } = require("@utils/date_time_helper");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Subscription extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Subscription.init(
        {
            pack_name: DataTypes.STRING,
            pack_rate: DataTypes.BIGINT,
            pack_validity: DataTypes.INTEGER,
            video_call: DataTypes.INTEGER,
            chat: DataTypes.INTEGER,
            pack_image:DataTypes.STRING,

        },
        {
            sequelize,
            modelName: "Subscription",
            tableName: "subscription_packs",
            underscored: true,
        }
    );
    return Subscription;
};
