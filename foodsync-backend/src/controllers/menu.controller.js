import menuService from '../services/menu.service.js';
import catchAsync from '../utils/catchAsync.js';

class MenuController {
    createMenu = catchAsync(async (req, res, next) => {
        const newItem = await menuService.createMenu(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                menu_item: newItem
            }
        });
    });

    getAllMenu = catchAsync(async (req, res, next) => {
        const items = await menuService.getAllMenu();

        res.status(200).json({
            status: 'success',
            results: items.length,
            data: {
                menu: items
            }
        });
    });

    updatePrice = catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const { price } = req.body;

        const updatedItem = await menuService.updateMenuPrice(id, price);

        res.status(200).json({
            status: 'success',
            data: {
                menu_item: updatedItem
            }
        });
    });

    deleteMenu = catchAsync(async (req, res, next) => {
        const { id } = req.params;
        await menuService.deleteMenu(id);

        res.status(204).json({
            status: 'success',
            data: null
        });
    });
}

export default new MenuController();
