let instance;

class CartService {
    constructor() {
        // Nếu đã có CartService thì trả lại instance cũ
        if (instance) {
            return instance;
        }

        // Chỉ khởi tạo products ở lần tạo đầu tiên
        this.products = [];

        // Lưu instance duy nhất
        instance = this;
    }

    addProduct(product) {
        this.products.push(product);
    }

    removeProduct(productId) {
        this.products = this.products.filter(
            product => product.id !== productId
        );
    }

    getProducts() {
        return this.products;
    }
}

export { CartService };