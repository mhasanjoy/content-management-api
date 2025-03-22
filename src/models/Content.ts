import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import User from "./User";

const Content = sequelize.define(
  "Content",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: User, key: "id" },
      onDelete: "CASCADE",
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    youtubeUrl: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: { isUrl: true },
    },
    publiclyViewable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    indexes: [
      {
        fields: ["userId"], // Index on userId for faster lookups
      },
    ],
  }
);

Content.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Content, { foreignKey: "userId" });

export default Content;
