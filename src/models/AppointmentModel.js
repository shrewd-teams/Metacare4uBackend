"use strict";
const { convertDateTimeFormat } = require("@utils/date_time_helper");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Appointment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Appointment.init(
        {
            appointment_id: DataTypes.STRING,
            user_id: DataTypes.STRING,
            therapist_id: DataTypes.STRING,
            appointment_date: DataTypes.DATEONLY,
            appointment_time: DataTypes.STRING,
            appointment_session: DataTypes.STRING,
            appointment_mode: DataTypes.STRING,
            appointment_status: DataTypes.STRING,

        },
        {
            sequelize,
            modelName: "Appointment",
            tableName: "appointments",
            underscored: true,
        }
    );
    return Appointment;
};
