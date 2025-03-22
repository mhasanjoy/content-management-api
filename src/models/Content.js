const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

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

// Define associations
Content.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Content, { foreignKey: "userId", as: "contents" });

module.exports = Content;
