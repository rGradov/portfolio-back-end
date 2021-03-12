import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity('admin')
export class Admin {
  @ObjectIdColumn() id: ObjectID;
  @Column() email: string;
  @Column() password: string;
  constructor(admin?: Partial<Admin>) {
    Object.assign(this, admin);
  }
}
