'use client';

import { useState, useEffect } from 'react';
import { userService } from '@/services/userService';
import { User } from '@/types/user';
import { calculateAge, formatDate } from '@/lib/utils';

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    birthDate: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (error) {
      showMessage('error', 'Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        await userService.updateUser(editingId, {
          name: formData.name,
          lastName: formData.lastName,
          email: formData.email,
          birthDate: formData.birthDate,
        });
        showMessage('success', 'Usuario actualizado correctamente');
      } else {
        await userService.createUser({
          name: formData.name,
          lastName: formData.lastName,
          email: formData.email,
          birthDate: formData.birthDate,
        });
        showMessage('success', 'Usuario creado correctamente');
      }
      
      setFormData({ name: '', lastName: '', email: '', birthDate: '' });
      setEditingId(null);
      loadUsers();
    } catch (error) {
      showMessage('error', 'Error al guardar el usuario');
    }
  };

  const handleEdit = (user: User) => {
    setFormData({
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      birthDate: user.birthDate,
    });
    setEditingId(user.id || null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      try {
        await userService.deleteUser(id);
        showMessage('success', 'Usuario eliminado correctamente');
        loadUsers();
      } catch (error) {
        showMessage('error', 'Error al eliminar el usuario');
      }
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', lastName: '', email: '', birthDate: '' });
    setEditingId(null);
  };

  return (
    <div className="container">
      <h1>🔥 CRUD de Usuarios - Firebase</h1>

      {message && (
        <div className={message.type}>
          {message.text}
        </div>
      )}

      <div className="form-container">
        <h2>{editingId ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Apellido:</label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="birthDate">Fecha de Nacimiento:</label>
            <input
              type="date"
              id="birthDate"
              value={formData.birthDate}
              onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn-primary">
            {editingId ? 'Actualizar' : 'Crear'} Usuario
          </button>
          {editingId && (
            <button type="button" onClick={handleCancel} className="btn-secondary">
              Cancelar
            </button>
          )}
        </form>
      </div>

      <div className="users-list">
        <h2>Lista de Usuarios ({users.length})</h2>
        
        {loading ? (
          <div className="loading">Cargando usuarios...</div>
        ) : users.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
            No hay usuarios registrados. ¡Crea el primero!
          </p>
        ) : (
          users.map((user) => (
            <div key={user.id} className="user-card">
              <div className="user-info">
                <h3>{user.name} {user.lastName}</h3>
                <p>📧 {user.email}</p>
                <p>🎂 {calculateAge(user.birthDate)} años</p>
                <p>📅 Nacido el {formatDate(user.birthDate)}</p>
              </div>
              <div className="user-actions">
                <button onClick={() => handleEdit(user)} className="btn-edit">
                  Editar
                </button>
                <button onClick={() => handleDelete(user.id!)} className="btn-danger">
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
