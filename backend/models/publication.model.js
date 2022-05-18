module.exports = (sequelize, DataTypes) => {
  const Publication = sequelize.define("publication", {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Publication;
};
