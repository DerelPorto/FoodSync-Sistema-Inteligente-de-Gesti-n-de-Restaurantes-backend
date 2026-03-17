import clientService from '../services/client.service.js';
import catchAsync from '../utils/catchAsync.js';

class ClientController {
    createClient = catchAsync(async (req, res, next) => {
        const newClient = await clientService.createClient(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                client: newClient
            }
        });
    });

    getAllClients = catchAsync(async (req, res, next) => {
        const clients = await clientService.getAllClients();

        res.status(200).json({
            status: 'success',
            results: clients.length,
            data: {
                clients
            }
        });
    });

    getClient = catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const client = await clientService.getClientById(id);

        res.status(200).json({
            status: 'success',
            data: {
                client
            }
        });
    });

    updateClient = catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const updatedClient = await clientService.updateClient(id, req.body);

        res.status(200).json({
            status: 'success',
            data: {
                client: updatedClient
            }
        });
    });

    deleteClient = catchAsync(async (req, res, next) => {
        const { id } = req.params;
        await clientService.deleteClient(id);

        res.status(200).json({
            status: 'success',
            data: null
        });
    });
}

export default new ClientController();
