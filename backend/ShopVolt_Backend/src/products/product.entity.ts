import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('decimal', { precision: 10, scale: 2 })
  originalPrice: number;

  @Column('decimal', { precision: 3, scale: 1 })
  rating: number;

  @Column()
  reviews: number;

  @Column()
  image: string;

  @Column()
  category: string;

  @Column()
  discount: number;

  @Column({ default: true })
  inStock: boolean;

  @Column({ default: false })
  isFeatured: boolean;

  @Column({ default: false })
  isTrending: boolean;

  @Column('text')
  description: string;

  @Column('simple-array', { nullable: true })
  specs: string[];
}
