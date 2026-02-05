import productRepository from '../repositories/product.repository.js';

class ProductService {
    async createProduct(data) {
        return await productRepository.create(data);
    }

    async getAllProducts() {
        return await productRepository.findAll();
    }

    async getProductById(id) {
        return await productRepository.findById(id);
    }

    async updateProduct(id, updates) {
        return await productRepository.update(id, updates);
    }

    async deleteProduct(id) {
        return await productRepository.delete(id);
    }
}

export default new ProductService();
