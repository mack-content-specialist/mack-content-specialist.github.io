export const UserModel = {
    name: String,
    email: String,
    password: String,
};

export const ProductModel = {
    title: String,
    description: String,
    price: Number,
};

export const OrderModel = {
    userId: String,
    productId: String,
    quantity: Number,
    status: String,
};