import React, { useState, useEffect } from 'react';

const App = () => {
  const [activeTab, setActiveTab] = useState('Usuarios');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    rol: 'Agente',
    estado: 'Activo',
    equipo: 'Soporte N1',
    nota: ''
  });
  const [filters, setFilters] = useState({
    rol: '',
    estado: '',
    equipo: ''
  });

  // State for Tickets tab
  const [tickets, setTickets] = useState([
    {
      id: 1041,
      titulo: "Error 500 al subir archivos grandes",
      descripcion: "Al intentar subir archivos superiores a 50MB, el servidor responde con error 500. Ocurre desde versión 2.3.1.",
      estado: "En progreso",
      prioridad: "Crítica",
      asignado: "Juan Pérez",
      creado: "12 Mar",
      tipo: "Bug",
      categoria: "Backend"
    },
    {
      id: 1042,
      titulo: "La app no envía correos de verificación",
      descripcion: "Los usuarios nuevos no reciben correos de verificación tras registrarse. Se ha confirmado en múltiples casos.",
      estado: "Abierto",
      prioridad: "Alta",
      asignado: "Ana Gómez",
      creado: "11 Mar",
      tipo: "Email",
      categoria: "Frontend"
    },
    {
      id: 1043,
      titulo: "Solicitud: acceso a reportes mensuales",
      descripcion: "El departamento de finanzas necesita acceso a los reportes mensuales del sistema para análisis.",
      estado: "Resuelto",
      prioridad: "Media",
      asignado: "María López",
      creado: "10 Mar",
      tipo: "Solicitud",
      categoria: "UI"
    },
    {
      id: 1044,
      titulo: "La interfaz se ve borrosa en pantallas 4K",
      descripcion: "En monitores con resolución 4K, la interfaz aparece borrosa y con textos poco legibles.",
      estado: "Abierto",
      prioridad: "Baja",
      asignado: "Carlos Ruiz",
      creado: "9 Mar",
      tipo: "UI",
      categoria: "Frontend"
    },
    {
      id: 1045,
      titulo: "No se puede restablecer la contraseña",
      descripcion: "El enlace de restablecimiento de contraseña no funciona correctamente y redirige a una página de error.",
      estado: "En progreso",
      prioridad: "Alta",
      asignado: "Lucía Méndez",
      creado: "8 Mar",
      tipo: "Bug",
      categoria: "Auth"
    }
  ]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isCreatingTicket, setIsCreatingTicket] = useState(false);
  const [ticketForm, setTicketForm] = useState({
    titulo: '',
    descripcion: '',
    estado: 'Abierto',
    prioridad: 'Media',
    asignado: '',
    categoria: 'General',
    tipo: 'Bug'
  });
  const [ticketFilters, setTicketFilters] = useState({
    estado: '',
    prioridad: '',
    asignado: '',
    miEquipo: false
  });

  const users = [
    { id: 1, nombre: 'Ana Gómez', correo: 'ana.gomez@empresa.com', rol: 'Agente', estado: 'Activo', equipo: 'Soporte N1' },
    { id: 2, nombre: 'Juan Pérez', correo: 'juan.perez@empresa.com', rol: 'Administrador', estado: 'Activo', equipo: 'Soporte N2' },
    { id: 3, nombre: 'María López', correo: 'maria.lopez@empresa.com', rol: 'Colaborador', estado: 'Invitado', equipo: 'Backoffice' },
    { id: 4, nombre: 'Carlos Ruiz', correo: 'carlos.ruiz@empresa.com', rol: 'Agente', estado: 'Suspendido', equipo: 'Soporte N1' },
    { id: 5, nombre: 'Lucía Méndez', correo: 'lucia.mendez@empresa.com', rol: 'Agente', estado: 'Activo', equipo: 'Soporte N2' }
  ];

  const equipos = [
    { nombre: 'Soporte N1', cantidad: 12 },
    { nombre: 'Soporte N2', cantidad: 8 },
    { nombre: 'Backoffice', cantidad: 5 }
  ];

  // ✅ Limpia la búsqueda al cambiar de pestaña
  useEffect(() => {
    setSearchTerm('');
  }, [activeTab]);

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.correo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRol = !filters.rol || user.rol === filters.rol;
    const matchesEstado = !filters.estado || user.estado === filters.estado;
    const matchesEquipo = !filters.equipo || user.equipo === filters.equipo;
    return matchesSearch && matchesRol && matchesEstado && matchesEquipo;
  });

  // Filter tickets
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEstado = !ticketFilters.estado || ticket.estado === ticketFilters.estado;
    const matchesPrioridad = !ticketFilters.prioridad || ticket.prioridad === ticketFilters.prioridad;
    const matchesAsignado = !ticketFilters.asignado || ticket.asignado === ticketFilters.asignado;
    const matchesMiEquipo = !ticketFilters.miEquipo || 
      (users.find(u => u.nombre === ticket.asignado && u.equipo === 'Soporte N1') !== undefined);
    return matchesSearch && matchesEstado && matchesPrioridad && matchesAsignado && (!ticketFilters.miEquipo || matchesMiEquipo);
  });

  // User handlers
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType] === value ? '' : value
    }));
  };

  const handleCreateUser = () => {
    setIsCreatingUser(true);
    setSelectedUser(null);
    setFormData({
      nombre: '',
      correo: '',
      rol: 'Agente',
      estado: 'Activo',
      equipo: 'Soporte N1',
      nota: ''
    });
  };

  const handleEditUser = (user) => {
    setIsCreatingUser(false);
    setSelectedUser(user);
    setFormData({
      nombre: user.nombre,
      correo: user.correo,
      rol: user.rol,
      estado: user.estado,
      equipo: user.equipo,
      nota: ''
    });
  };

  const handleSaveUser = () => {
    console.log('Guardando usuario:', formData);
    setIsCreatingUser(false);
    setSelectedUser(null);
  };

  const handleCancel = () => {
    setIsCreatingUser(false);
    setSelectedUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Ticket handlers
  const handleCreateTicket = () => {
    setIsCreatingTicket(true);
    setSelectedTicket(null);
    setTicketForm({
      titulo: '',
      descripcion: '',
      estado: 'Abierto',
      prioridad: 'Media',
      asignado: '',
      categoria: 'General',
      tipo: 'Bug'
    });
  };

  const handleEditTicket = (ticket) => {
    setIsCreatingTicket(false);
    setSelectedTicket(ticket);
    setTicketForm({
      titulo: ticket.titulo,
      descripcion: ticket.descripcion,
      estado: ticket.estado,
      prioridad: ticket.prioridad,
      asignado: ticket.asignado,
      categoria: ticket.categoria,
      tipo: ticket.tipo
    });
  };

  const handleSaveTicket = () => {
    if (isCreatingTicket) {
      const newTicket = {
        id: tickets.length > 0 ? Math.max(...tickets.map(t => t.id)) + 1 : 1000,
        ...ticketForm,
        creado: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }).replace('.', ''),
      };
      setTickets(prev => [newTicket, ...prev]);
    } else {
      setTickets(prev => prev.map(t => 
        t.id === selectedTicket.id ? { ...t, ...ticketForm } : t
      ));
    }
    setIsCreatingTicket(false);
    setSelectedTicket(null);
  };

  const handleCancelTicket = () => {
    setIsCreatingTicket(false);
    setSelectedTicket(null);
  };

  const handleTicketInputChange = (e) => {
    const { name, value } = e.target;
    setTicketForm(prev => ({ ...prev, [name]: value }));
  };

  const handleTicketFilterChange = (filterType, value) => {
    setTicketFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType] === value ? '' : value
    }));
  };

  const stats = {
    abiertos: tickets.filter(t => t.estado === 'Abierto').length,
    enProgreso: tickets.filter(t => t.estado === 'En progreso').length,
    tiempoPromedio: '3.2h'
  };

  // === RENDERIZADO ===

  // Vista de Tickets
  if (activeTab === 'Tickets') {
    return (
      <div className="app-container">
        <header>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0' }}>
            <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
              <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>Centro de Soporte</h1>
              <nav style={{ display: 'flex', gap: '16px' }}>
                {['Tickets', 'Usuarios', 'Reportes', 'Ajustes'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`btn ${activeTab === tab ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <input
                type="text"
                placeholder="Buscar tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              <div style={{ width: '32px', height: '32px', background: '#ccc', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                U
              </div>
            </div>
          </div>
        </header>
        <main className="container" style={{ display: 'flex', gap: '24px', padding: '24px 0' }}>
          {/* Sidebar */}
          <aside style={{ flex: '0 0 260px', padding: '0 16px' }}>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontWeight: 'bold', marginBottom: '16px', fontSize: '16px' }}>Acciones</h2>
              <button onClick={handleCreateTicket} className="btn btn-primary" style={{ width: '100%' }}>
                Nuevo ticket
              </button>
            </div>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px', textTransform: 'uppercase', fontWeight: '600' }}>Estado</h3>
              {['Abierto', 'En progreso', 'Resuelto', 'Cerrado'].map(estado => (
                <div 
                  key={estado}
                  onClick={() => handleTicketFilterChange('estado', estado)}
                  style={{ 
                    padding: '8px 12px', 
                    background: ticketFilters.estado === estado ? '#dbeafe' : '#f9fafb',
                    borderRadius: '6px', 
                    marginBottom: '8px',
                    cursor: 'pointer',
                    border: ticketFilters.estado === estado ? '2px solid #2563eb' : '2px solid transparent'
                  }}
                >
                  {estado}
                </div>
              ))}
            </div>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px', textTransform: 'uppercase', fontWeight: '600' }}>Prioridad</h3>
              {['Baja', 'Media', 'Alta', 'Crítica'].map(prioridad => (
                <div 
                  key={prioridad}
                  onClick={() => handleTicketFilterChange('prioridad', prioridad)}
                  style={{ 
                    padding: '8px 12px', 
                    background: ticketFilters.prioridad === prioridad ? '#dbeafe' : '#f9fafb',
                    borderRadius: '6px', 
                    marginBottom: '8px',
                    cursor: 'pointer',
                    border: ticketFilters.prioridad === prioridad ? '2px solid #2563eb' : '2px solid transparent'
                  }}
                >
                  {prioridad}
                </div>
              ))}
            </div>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px', textTransform: 'uppercase', fontWeight: '600' }}>Asignado</h3>
              <div 
                onClick={() => handleTicketFilterChange('asignado', '')}
                style={{ 
                  padding: '8px 12px', 
                  background: !ticketFilters.asignado ? '#dbeafe' : '#f9fafb',
                  borderRadius: '6px', 
                  marginBottom: '8px',
                  cursor: 'pointer',
                  border: !ticketFilters.asignado ? '2px solid #2563eb' : '2px solid transparent'
                }}
              >
                Sin asignar
              </div>
              <div 
                onClick={() => handleTicketFilterChange('asignado', 'Mi equipo')}
                style={{ 
                  padding: '8px 12px', 
                  background: ticketFilters.asignado === 'Mi equipo' ? '#dbeafe' : '#f9fafb',
                  borderRadius: '6px', 
                  marginBottom: '8px',
                  cursor: 'pointer',
                  border: ticketFilters.asignado === 'Mi equipo' ? '2px solid #2563eb' : '2px solid transparent'
                }}
              >
                Mi equipo
              </div>
              <div 
                onClick={() => handleTicketFilterChange('asignado', 'Yo')}
                style={{ 
                  padding: '8px 12px', 
                  background: ticketFilters.asignado === 'Yo' ? '#dbeafe' : '#f9fafb',
                  borderRadius: '6px', 
                  marginBottom: '8px',
                  cursor: 'pointer',
                  border: ticketFilters.asignado === 'Yo' ? '2px solid #2563eb' : '2px solid transparent'
                }}
              >
                Yo
              </div>
            </div>
          </aside>

          {/* Contenido principal */}
          <div style={{ flex: 1 }}>
            <div style={{ background: '#fff', borderRadius: '8px', padding: '24px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 style={{ fontWeight: 'bold', fontSize: '18px' }}>Todos los tickets</h2>
                <button onClick={handleCreateTicket} className="btn btn-primary">Nuevo ticket</button>
              </div>

              <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                <div style={{ flex: 1, background: '#f9fafb', padding: '16px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Abiertos</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.abiertos}</div>
                </div>
                <div style={{ flex: 1, background: '#f9fafb', padding: '16px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>En progreso</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.enProgreso}</div>
                </div>
                <div style={{ flex: 1, background: '#f9fafb', padding: '16px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Tiempo prom.</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.tiempoPromedio}</div>
                </div>
              </div>

              <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f9fafb' }}>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>#</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>Título</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>Asignado</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>Estado</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>Prioridad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTickets.map(ticket => (
                      <tr
                        key={ticket.id}
                        onClick={() => handleEditTicket(ticket)}
                        style={{ cursor: 'pointer', borderBottom: '1px solid #e5e7eb' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                      >
                        <td style={{ padding: '12px' }}><strong>#{ticket.id}</strong></td>
                        <td style={{ padding: '12px' }}>
                          <div style={{ fontWeight: '600', marginBottom: '4px' }}>{ticket.titulo}</div>
                          <div style={{ fontSize: '12px', color: '#6b7280' }}>{ticket.categoria} • {ticket.tipo}</div>
                        </td>
                        <td style={{ padding: '12px' }}>{ticket.asignado || 'Sin asignar'}</td>
                        <td style={{ padding: '12px' }}>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: '9999px',
                            fontSize: '12px',
                            fontWeight: '600',
                            backgroundColor: ticket.estado === 'Abierto' ? '#dcfce7' : 
                                          ticket.estado === 'En progreso' ? '#fef3c7' : 
                                          ticket.estado === 'Resuelto' ? '#bfdbfe' : '#fee2e2',
                            color: ticket.estado === 'Abierto' ? '#166534' : 
                                   ticket.estado === 'En progreso' ? '#92400e' : 
                                   ticket.estado === 'Resuelto' ? '#1d4ed8' : '#991b1b'
                          }}>
                            {ticket.estado}
                          </span>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: '9999px',
                            fontSize: '12px',
                            fontWeight: '600',
                            backgroundColor: ticket.prioridad === 'Baja' ? '#dbeafe' : 
                                          ticket.prioridad === 'Media' ? '#fef3c7' : 
                                          ticket.prioridad === 'Alta' ? '#fecaca' : '#fca5a5',
                            color: ticket.prioridad === 'Baja' ? '#1d4ed8' : 
                                   ticket.prioridad === 'Media' ? '#92400e' : 
                                   ticket.prioridad === 'Alta' ? '#b91c1c' : '#991b1b'
                          }}>
                            {ticket.prioridad}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Formulario de edición o creación */}
            {(isCreatingTicket || selectedTicket) && (
              <div style={{ background: '#fff', borderRadius: '8px', padding: '24px', marginTop: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontWeight: 'bold', fontSize: '16px' }}>
                    {isCreatingTicket ? 'Crear nuevo ticket' : `Editar ticket #${selectedTicket.id}`}
                  </h3>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={handleCancelTicket} className="btn btn-secondary">Cancelar</button>
                    <button onClick={handleSaveTicket} className="btn btn-primary">
                      {isCreatingTicket ? 'Crear' : 'Actualizar'}
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Título</label>
                    <input
                      type="text"
                      name="titulo"
                      value={ticketForm.titulo}
                      onChange={handleTicketInputChange}
                      style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Categoría</label>
                    <select name="categoria" value={ticketForm.categoria} onChange={handleTicketInputChange} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db' }}>
                      <option>General</option>
                      <option>Backend</option>
                      <option>Frontend</option>
                      <option>UI</option>
                      <option>Auth</option>
                      <option>Email</option>
                      <option>Database</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Estado</label>
                    <select name="estado" value={ticketForm.estado} onChange={handleTicketInputChange} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db' }}>
                      <option>Abierto</option>
                      <option>En progreso</option>
                      <option>Resuelto</option>
                      <option>Cerrado</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Prioridad</label>
                    <select name="prioridad" value={ticketForm.prioridad} onChange={handleTicketInputChange} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db' }}>
                      <option>Baja</option>
                      <option>Media</option>
                      <option>Alta</option>
                      <option>Crítica</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Asignado a</label>
                  <select name="asignado" value={ticketForm.asignado} onChange={handleTicketInputChange} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db' }}>
                    <option value="">Sin asignar</option>
                    <option value="Yo">Yo</option>
                    {users.map(u => (
                      <option key={u.id} value={u.nombre}>{u.nombre}</option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Descripción</label>
                  <textarea
                    name="descripcion"
                    value={ticketForm.descripcion}
                    onChange={handleTicketInputChange}
                    rows={4}
                    style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', resize: 'vertical' }}
                  />
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  // Otras pestañas no implementadas
  if (activeTab !== 'Usuarios') {
    return (
      <div className="app-container">
        <header>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0' }}>
            <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
              <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>Centro de Soporte</h1>
              <nav style={{ display: 'flex', gap: '16px' }}>
                {['Tickets', 'Usuarios', 'Reportes', 'Ajustes'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`btn ${activeTab === tab ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <input
                type="text"
                placeholder="Buscar..."
                style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              <div style={{ width: '32px', height: '32px', background: '#ccc', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                U
              </div>
            </div>
          </div>
        </header>
        <main className="container" style={{ padding: '24px 0' }}>
          <h2>{activeTab}</h2>
          <p>Esta sección aún no está implementada.</p>
        </main>
      </div>
    );
  }

  // Vista de Usuarios (ya existente)
  return (
    <div className="app-container">
      <header>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0' }}>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>Centro de Soporte</h1>
            <nav style={{ display: 'flex', gap: '16px' }}>
              {['Tickets', 'Usuarios', 'Reportes', 'Ajustes'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`btn ${activeTab === tab ? 'btn-primary' : 'btn-secondary'}`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <input
              type="text"
              placeholder="Buscar usuarios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <div style={{ width: '32px', height: '32px', background: '#ccc', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              U
            </div>
          </div>
        </div>
      </header>
      <main className="container" style={{ display: 'flex', gap: '24px', padding: '24px 0' }}>
        <aside style={{ flex: '0 0 260px', padding: '0 16px' }}> 
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontWeight: 'bold', marginBottom: '16px', fontSize: '16px' }}>Acciones</h2>
            <button onClick={handleCreateUser} className="btn btn-primary" style={{ width: '100%' }}>
              Nuevo usuario
            </button>
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', marginBottom: '8px', textTransform: 'uppercase', fontWeight: '600' }}>
              Rol
            </label>
            <select
              value={filters.rol}
              onChange={(e) => setFilters(prev => ({ ...prev, rol: e.target.value }))}
              style={{ 
                width: '100%', 
                padding: '8px 12px', 
                border: '1px solid #d1d5db', 
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer',
                backgroundColor: 'white'
              }}
            >
              <option value="">Todos los roles</option>
              <option value="Agente">Agente</option>
              <option value="Administrador">Administrador</option>
              <option value="Colaborador">Colaborador</option>
            </select>
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', marginBottom: '8px', textTransform: 'uppercase', fontWeight: '600' }}>
              Estado
            </label>
            <select
              value={filters.estado}
              onChange={(e) => setFilters(prev => ({ ...prev, estado: e.target.value }))}
              style={{ 
                width: '100%', 
                padding: '8px 12px', 
                border: '1px solid #d1d5db', 
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer',
                backgroundColor: 'white'
              }}
            >
              <option value="">Todos los estados</option>
              <option value="Activo">Activo</option>
              <option value="Invitado">Invitado</option>
              <option value="Suspendido">Suspendido</option>
            </select>
          </div>
          <div>
            <h3 style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px', textTransform: 'uppercase', fontWeight: '600' }}>Equipos</h3>
            {equipos.map(equipo => (
              <div 
                key={equipo.nombre} 
                onClick={() => handleFilterChange('equipo', equipo.nombre)}
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '12px', 
                  background: filters.equipo === equipo.nombre ? '#dbeafe' : '#f9fafb',
                  borderRadius: '8px', 
                  marginBottom: '8px',
                  cursor: 'pointer',
                  border: filters.equipo === equipo.nombre ? '2px solid #2563eb' : '2px solid transparent'
                }}
              >
                <span style={{ fontSize: '14px', fontWeight: filters.equipo === equipo.nombre ? '600' : '400' }}>{equipo.nombre}</span>
                <span style={{ background: '#e5e7eb', padding: '2px 6px', borderRadius: '9999px', fontSize: '12px' }}>{equipo.cantidad}</span>
              </div>
            ))}
            {filters.equipo && (
              <button 
                onClick={() => setFilters(prev => ({ ...prev, equipo: '' }))}
                style={{ fontSize: '12px', color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer', marginTop: '4px', width: '100%' }}
              >
                Limpiar filtro
              </button>
            )}
          </div>
        </aside>
        <div style={{ flex: 1 }}>
          <div style={{ background: '#fff', borderRadius: '8px', padding: '24px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontWeight: 'bold', fontSize: '18px' }}>Usuarios</h2>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn btn-secondary" disabled>Filtros</button>
                <button className="btn btn-secondary" disabled>Importar</button>
                <button onClick={handleCreateUser} className="btn btn-primary">Nuevo usuario</button>
              </div>
            </div>
            <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f9fafb' }}>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>#</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>Nombre</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>Correo</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>Rol</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr
                      key={user.id}
                      onClick={() => handleEditUser(user)}
                      style={{ cursor: 'pointer', borderBottom: '1px solid #e5e7eb' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                    >
                      <td style={{ padding: '12px' }}>{index + 1}</td>
                      <td style={{ padding: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '32px', height: '32px', background: '#1976D2', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                            {user.nombre.charAt(0)}
                          </div>
                          {user.nombre}
                        </div>
                      </td>
                      <td style={{ padding: '12px' }}>{user.correo}</td>
                      <td style={{ padding: '12px' }}>{user.rol}</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '9999px',
                          fontSize: '12px',
                          fontWeight: '600',
                          backgroundColor: user.estado === 'Activo' ? '#dcfce7' : user.estado === 'Invitado' ? '#fef3c7' : '#fee2e2',
                          color: user.estado === 'Activo' ? '#166534' : user.estado === 'Invitado' ? '#92400e' : '#991b1b'
                        }}>
                          {user.estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {(isCreatingUser || selectedUser) && (
            <div style={{ background: '#fff', borderRadius: '8px', padding: '24px', marginTop: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontWeight: 'bold', fontSize: '16px' }}>{isCreatingUser ? 'Crear usuario' : 'Editar usuario'}</h3>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={handleCancel} className="btn btn-secondary">Cancelar</button>
                  <button onClick={handleSaveUser} className="btn btn-primary">Guardar</button>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Correo</label>
                  <input
                    type="email"
                    name="correo"
                    value={formData.correo}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Rol</label>
                  <select
                    name="rol"
                    value={formData.rol}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }}
                  >
                    <option>Agente</option>
                    <option>Administrador</option>
                    <option>Colaborador</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Estado</label>
                  <select
                    name="estado"
                    value={formData.estado}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }}
                  >
                    <option>Activo</option>
                    <option>Invitado</option>
                    <option>Suspendido</option>
                  </select>
                </div>
              </div>
              <div style={{ marginTop: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Nota</label>
                <textarea
                  name="nota"
                  value={formData.nota}
                  onChange={handleInputChange}
                  rows={3}
                  style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', resize: 'vertical' }}
                ></textarea>
                <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>Información interna visible para administradores</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;