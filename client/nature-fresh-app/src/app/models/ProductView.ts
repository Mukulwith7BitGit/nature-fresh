export interface ProductView {
    _id?: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    info: string;
    createdAt?: Date;
    updatedAt?: Date;
}