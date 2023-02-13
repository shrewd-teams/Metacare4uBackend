"use strict";
const { convertDateTimeFormat } = require("@utils/date_time_helper");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class UserToken extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    UserToken.init(
        {
            user_id: DataTypes.STRING,
            refresh_token: DataTypes.TEXT,
            user_type: DataTypes.STRING,
            created_at: {
                type: DataTypes.DATE,
                get() {
                    return convertDateTimeFormat(this.getDataValue("created_at"));
                },
            },
            expired_at: {
                type: DataTypes.DATE,
                get() {
                    return convertDateTimeFormat(this.getDataValue("expired_at"));
                },
            },
        },
        {
            sequelize,
            modelName: "UserToken",
            tableName: "user_tokens",
            createdAt: "created_at",
            underscored: true,
            timestamps: false,
        }
    );
    UserToken.removeAttribute('id');
    return UserToken;
};
