import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import db from '../db/connection';

class Req extends Model<InferAttributes<Req>, InferCreationAttributes<Req>> {
  declare id: CreationOptional<number>;
  declare user_ip: string | null;
  declare date: CreationOptional<Date>;
  declare artist_name: string;
}

Req.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_ip	: {
    type: DataTypes.STRING
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  artist_name: {
    type: DataTypes.STRING
  }
},
{
  sequelize: db,
  timestamps: false,
  modelName: 'Request'
});

Req.sync();

export default Req;