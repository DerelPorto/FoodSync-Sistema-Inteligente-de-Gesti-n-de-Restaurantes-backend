import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import qrcode from 'qrcode-terminal';

class WhatsAppService {
    constructor() {
        this.client = new Client({
            authStrategy: new LocalAuth({ dataPath: './.wwebjs_auth' }),
            puppeteer: {
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            }
        });

        this.isReady = false;

        this.client.on('qr', (qr) => {
            console.log('\n======================================================');
            console.log('🤖 ESCANEA ESTE QR DESDE TU WHATSAPP PARA CONECTAR EL BOT');
            console.log('======================================================');
            qrcode.generate(qr, { small: true });
        });

        this.client.on('ready', () => {
            console.log('\n✅ Cliente de WhatsApp conectado y listo para enviar mensajes!');
            this.isReady = true;
        });

        this.client.on('auth_failure', msg => {
            console.error('\n❌ Falla de autenticación en WhatsApp:', msg);
        });

        this.client.on('disconnected', (reason) => {
            console.log('\n❌ Cliente de WhatsApp desconectado:', reason);
            this.isReady = false;
        });
    }

    initialize() {
        console.log('Iniciando servicio de WhatsApp...');
        this.client.initialize().catch(err => {
            console.error('Error al inicializar WhatsApp:', err);
        });
    }

    async sendMessage(phone, message) {
        if (!this.isReady) {
            console.log('⚠️ WhatsApp no está listo. Mensaje no enviado a', phone);
            return false;
        }

        try {
            // phone ya debe venir limpio y con código de país (Ej: 18091234567)
            const chatId = `${phone}@c.us`;
            await this.client.sendMessage(chatId, message);
            console.log(`✉️ Mensaje enviado exitosamente a WhatsApp: ${phone}`);
            return true;
        } catch (error) {
            console.error(`❌ Error al enviar mensaje a ${phone}:`, error);
            return false;
        }
    }
}

export default new WhatsAppService();
