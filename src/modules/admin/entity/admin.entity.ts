import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('admin')
export class Admin {
  @ObjectIdColumn() id: ObjectID;
  @Column() email: string;
  @Column() password: string;
  @BeforeInsert() async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
  constructor(admin?: Partial<Admin>) {
    Object.assign(this, admin);
  }
}
