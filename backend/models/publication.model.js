module.exports = (sequelize, DataTypes) => {
  const Publication = sequelize.define("publication", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });
  return Publication;
};
