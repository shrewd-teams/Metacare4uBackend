"use strict";
const { convertDateTimeFormat } = require("@utils/date_time_helper");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Therapist extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Therapist.init(
        {
            specialist_id: DataTypes.STRING,
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            email: DataTypes.STRING,
            mobile: DataTypes.STRING,
            clinic_name: DataTypes.STRING,
            password:DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Therapist",
            tableName: "therapist_details",
            underscored: true,
        }
    );
    return Therapist;
};
