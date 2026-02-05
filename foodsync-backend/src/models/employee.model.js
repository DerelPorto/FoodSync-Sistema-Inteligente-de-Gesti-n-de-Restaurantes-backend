// src/models/employee.model.js
class Employee {
    constructor(data) {
        this.employee_id = data.employee_id; // Serial, primary key
        this.name = data.name; // String, required
         this.position = data.position; // String, required
    }

    // Método para validar los datos del empleado
    validate() {
        if (!this.name || !this.position) {
            throw new Error('Nombre y posición son requeridos');
        }
    }
}

export default Employee;
