import clientRepository from '../repositories/client.repository.js';
import AppError from '../utils/appError.js';

class ClientService {
    async createClient(data) {
        if (!data.name || !data.phone) {
            throw new AppError('Name and phone are required', 400);
        }

        // Check if phone already exists to avoid duplicates
        const existingClient = await clientRepository.findByPhone(data.phone);
        if (existingClient) {
            // Option: return existing client or throw error.
            // For reservation systems, usually we might just return the existing client or update it.
            // Let's assume we want to prevent duplicates or just return the existing one.
            // Throwing error for now to be explicit.
            throw new AppError('Client with this phone number already exists', 400);
        }

        return await clientRepository.create(data);
    }

    async getAllClients() {
        return await clientRepository.findAll();
    }

    async getClientById(id) {
        return await clientRepository.findById(id);
    }

    async updateClient(id, updates) {
        return await clientRepository.update(id, updates);
    }

    async deleteClient(id) {
        return await clientRepository.delete(id);
    }
}

export default new ClientService();
