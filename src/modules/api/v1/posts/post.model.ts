import { Table, Column, Model } from 'sequelize-typescript';

@Table({
  timestamps: true,
  paranoid: true,
})
export class Idope_rd extends Model {
  @Column({ primaryKey: true, autoIncrement: true, unique: true })
  id: number;
}
