import { Table, Column, Model } from 'sequelize-typescript';

@Table({
  timestamps: true,
  paranoid: true,
})
export class Post extends Model {
  @Column({ primaryKey: true, unique: true })
  id: string;

  @Column
  title: string;

  @Column
  body: string;

  @Column
  img: string;

  @Column
  author: string;

  @Column
  private: boolean;

  @Column
  token: string;
}
