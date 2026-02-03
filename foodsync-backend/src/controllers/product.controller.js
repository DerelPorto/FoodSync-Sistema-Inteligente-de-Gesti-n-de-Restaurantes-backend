import productService from '../services/product.service.js';
import catchAsync from '../utils/catchAsync.js';

class ProductController {
    createProduct = catchAsync(async (req, res) => {
        const product = await productService.createProduct(req.body);

        res.status(201).json({
            status: 'success',
            data: { product }
        });
    });

    getAllProducts = catchAsync(async (req, res) => {
        const products = await productService.getAllProducts();

        res.status(200).json({
            status: 'success',
            results: products.length,
            data: { products }
        });
    });

    getProductById = catchAsync(async (req, res) => {
        const product = await productService.getProductById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: { product }
        });
    });

    updateProduct = catchAsync(async (req, res) => {
        const product = await productService.updateProduct(req.params.id, req.body);

        res.status(200).json({
            status: 'success',
            data: { product }
        });
    });

    deleteProduct = catchAsync(async (req, res) => {
        await productService.deleteProduct(req.params.id);

        res.status(204).json({
            status: 'success',
            data: null
        });
    });
}

export default new ProductController();
