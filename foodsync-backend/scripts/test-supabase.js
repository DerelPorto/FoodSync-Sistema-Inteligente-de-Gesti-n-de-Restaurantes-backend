// scripts/test-supabase.js
// Prueba rápida de CRUD para `role` y `shift` usando el cliente Supabase del proyecto.

import dotenv from 'dotenv';
dotenv.config();

import supabase from '../src/config/supabase.js';

async function testRole() {
    console.log('--- Testing role CRUD ---');
    try {
        // Create
        const rolePayload = { name: 'test-role-' + Date.now() };
        let { data: created, error } = await supabase.from('role').insert(rolePayload).select().single();
        if (error) throw error;
        console.log('Created role:', created);

        const id = created.role_id;

        // Read
        let { data: all } = await supabase.from('role').select('*');
        console.log('Total roles:', all.length);

        // Update
        const newName = rolePayload.name + '-updated';
        let { data: updated } = await supabase.from('role').update({ name: newName }).eq('role_id', id).select().single();
        console.log('Updated role:', updated);

        // Delete
        let { data: deleted } = await supabase.from('role').delete().eq('role_id', id).select().single();
        console.log('Deleted role:', deleted);
    } catch (err) {
        console.error('Role test error:', err.message || err);
        throw err;
    }
}

async function testShift() {
    console.log('--- Testing shift CRUD ---');
    try {
        // Create (employee_id is nullable)
        const today = new Date().toISOString().slice(0, 10);
        const shiftPayload = {
            employee_id: null,
            date: today,
            start_time: '09:00:00',
            end_time: '17:00:00'
        };

        let { data: created, error } = await supabase.from('shift').insert(shiftPayload).select().single();
        if (error) throw error;
        console.log('Created shift:', created);

        const id = created.shift_id;

        // Read
        let { data: all } = await supabase.from('shift').select('*');
        console.log('Total shifts:', all.length);

        // Update
        const updates = { end_time: '18:00:00' };
        let { data: updated } = await supabase.from('shift').update(updates).eq('shift_id', id).select().single();
        console.log('Updated shift:', updated);

        // Delete
        let { data: deleted } = await supabase.from('shift').delete().eq('shift_id', id).select().single();
        console.log('Deleted shift:', deleted);
    } catch (err) {
        console.error('Shift test error:', err.message || err);
        throw err;
    }
}

async function run() {
    try {
        console.log('Starting Supabase tests. Ensure SUPABASE_URL and SUPABASE_ANON_KEY are set.');
        await testRole();
        await testShift();
        console.log('All tests completed successfully.');
        process.exit(0);
    } catch (err) {
        console.error('Tests failed:', err.message || err);
        process.exit(1);
    }
}

run();
