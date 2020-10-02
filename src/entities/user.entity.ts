import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, AfterLoad, BeforeInsert, ManyToMany, JoinTable } from 'typeorm';
const crypto = require('crypto');

@Entity()
export class User extends BaseEntity {

    @PrimaryColumn()
    username: string;

    @Column()
    password: string;

    @Column({ type: 'boolean', default: true })
    active: boolean;

    @CreateDateColumn({ select: false })
    createdAt: string;

    @UpdateDateColumn({ select: false })
    updatedAt: string;

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
