import menuRepository from '../repositories/menu.repository.js';
import AppError from '../utils/appError.js';

class MenuService {
    async createMenu(data) {
        // 1. Separate Menu fields from Ingredients
        const { ingredients, ...menuItemData } = data;

        // Validate Input
        if (!menuItemData.name || !menuItemData.price) {
            throw new AppError('Menu name and price are required', 400);
        }

        // 2. Create Menu Item
        // Note: In a real production env, we might want to check for duplicate names here
        const createdItem = await menuRepository.createMenuItem(menuItemData);

        // 3. Create Recipes (if ingredients provided)
        if (ingredients && ingredients.length > 0) {
            const recipesToInsert = ingredients.map(ing => ({
                menu_item_id: createdItem.id,
                inventory_item_id: ing.ingredient_id, // Assuming frontend sends 'ingredient_id'
                quantity_required: ing.quantity
            }));

            // We rely on repository to handle DB interaction
            // Note: If this fails, we have an orphan menu item. 
            // Supabase RPC is better for strict atomicity, but this fits the requested service logic pattern.
            await menuRepository.addRecipes(recipesToInsert);
        }

        // Return the full item (maybe fetch again if we want to include recipe details in response)
        return createdItem;
    }

    async getAllMenu() {
        return await menuRepository.findAll();
    }

    async updateMenuPrice(id, price) {
        if (!price || price < 0) throw new AppError('Invalid price', 400);
        return await menuRepository.update(id, { price });
    }

    async deleteMenu(id) {
        return await menuRepository.delete(id);
    }
}

export default new MenuService();
