// src/models/role.model.js
class Role {
    constructor(data) {
        this.role_id = data.role_id;
        this.name = data.name;
    }

    validate() {
        if (!this.name) {
            throw new Error('El nombre del rol es requerido');
        }
    }
}

export default Role;
