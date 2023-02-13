"use strict";
const { convertDateTimeFormat } = require("@utils/date_time_helper");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class SlatDate extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    SlatDate.init(
        {
            therapist_id: DataTypes.STRING,
            date: DataTypes.STRING,
            status: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "SlatDate",
            tableName: "slat_date",
            underscored: true,
        }
    );
    return SlatDate;
};
