"use strict";
const { convertDateTimeFormat } = require("@utils/date_time_helper");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class SlatTiming extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    SlatTiming.init(
        {
            slatTime: DataTypes.STRING,
            session: DataTypes.STRING,
            slat_date: DataTypes.STRING,
            status: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "SlatTiming",
            tableName: "slat_timing",
            underscored: true,
        }
    );
    return SlatTiming;
};
