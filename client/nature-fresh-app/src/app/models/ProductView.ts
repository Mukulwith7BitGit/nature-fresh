export interface ProductView {
    name: string;
    image: string;
    price: number;
    quantity: number;
    info: string;
    createdAt?: Date;
    updatedAt?: Date;
}