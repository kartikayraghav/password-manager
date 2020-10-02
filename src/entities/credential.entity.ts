import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, AfterLoad, BeforeInsert, ManyToMany, JoinTable, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
const crypto = require('crypto');

@Entity()
export class Credential extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column({ type: 'boolean', default: true })
    active: boolean;

    @CreateDateColumn({ select: false })
    createdAt: string;

    @UpdateDateColumn({ select: false })
    updatedAt: string;

    @ManyToOne(type => User, user => user.credential)
    user: User;

    @BeforeInsert()
    async encryptPassword() {
        try {
            var cipher = crypto.createCipher('aes256', process.env.SECRET_KEY);
            this.password = cipher.update(this.password, 'utf8', 'hex') + cipher.final('hex');
        } catch (error) {
            throw error;
        }
    }

    @AfterLoad()
    async decryptPassword() {
        try {
            var decipher = crypto.createDecipher('aes256', process.env.SECRET_KEY);
            this.password = decipher.update(this.password, 'hex', 'utf8') + decipher.final('utf8');
        } catch (error) {
            throw error;
        }
    }
}
