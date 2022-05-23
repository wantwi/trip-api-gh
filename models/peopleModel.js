module.exports = (sequelize, DataTypes) => {
  const People = sequelize.define("people", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    others: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
    },
    birthDate: {
      type: DataTypes.DATEONLY,
    },
    birthDate: {
      type: DataTypes.DATEONLY,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    gpsLocation: {
      type: DataTypes.STRING,
    },
    marritalStatus: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    occupation: {
      type: DataTypes.STRING,
    },
    membershipStatus: {
      type: DataTypes.STRING,
    },
    classLeader: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
    organisation: {
      type: DataTypes.STRING,
    },
    emergencyContact: {
      type: DataTypes.STRING,
    },
    emergencyName: {
      type: DataTypes.STRING,
    },
    yearofJoining: {
      type: DataTypes.STRING,
    },
    event: {
      type: DataTypes.STRING,
    },
    society: {
      type: DataTypes.STRING,
    },
    className: {
      type: DataTypes.STRING,
    },
    memberType: {
      type: DataTypes.INTEGER,
    },
    status:{
      type:DataTypes.INTEGER,
      defaultValue:1
  },
    image: {
      type: DataTypes.STRING,
    },
    accountId: {
      type: DataTypes.UUID,
    },
    currentUserId: {
      type: DataTypes.UUID,
    },
  });

  return People;
};
