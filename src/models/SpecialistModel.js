"use strict";
const { convertDateTimeFormat } = require("@utils/date_time_helper");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Specialist extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Specialist.init(
        {
            specialist_title: DataTypes.STRING,
            specialist_image: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Specialist",
            tableName: "specialists",
            underscored: true,
        }
    );
    return Specialist;
};
