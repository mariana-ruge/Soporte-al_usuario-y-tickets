import React, { useState, useEffect } from 'react';

const App = () => {
  const [activeTab, setActiveTab] = useState('Tickets');
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

  // 🌙 Estado del tema oscuro
  const [darkMode, setDarkMode] = useState(false);

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

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Theme colors based on dark mode
  const theme = {
    background: darkMode ? '#121212' : '#f9fafb',
    cardBackground: darkMode ? '#1e1e1e' : '#ffffff',
    text: darkMode ? '#ffffff' : '#1f2937',
    secondaryText: darkMode ? '#9ca3af' : '#6b7280',
    border: darkMode ? '#374151' : '#e5e7eb',
    primary: darkMode ? '#3b82f6' : '#2563eb',
    primaryHover: darkMode ? '#2563eb' : '#1d4ed8',
    success: darkMode ? '#10b981' : '#16a34a',
    warning: darkMode ? '#f59e0b' : '#ca8a04',
    danger: darkMode ? '#ef4444' : '#dc2626',
    info: darkMode ? '#3b82f6' : '#2563eb',
    accent: darkMode ? '#60a5fa' : '#3b82f6',
    hover: darkMode ? '#2d2d2d' : '#f3f4f6',
    active: darkMode ? '#2563eb' : '#dbeafe',
    activeBorder: darkMode ? '#3b82f6' : '#2563eb',
    inputBg: darkMode ? '#2d2d2d' : '#ffffff',
    inputBorder: darkMode ? '#4b5563' : '#d1d5db',
    buttonPrimary: darkMode ? '#3b82f6' : '#2563eb',
    buttonPrimaryText: '#ffffff',
    buttonSecondary: darkMode ? '#374151' : '#f3f4f6',
    buttonSecondaryText: darkMode ? '#ffffff' : '#374151',
    buttonSecondaryBorder: darkMode ? '#4b5563' : '#d1d5db',
    headerBg: darkMode ? '#1f2937' : '#ffffff',
    sidebarBg: darkMode ? '#1e1e1e' : '#ffffff',
    filterBg: darkMode ? '#2d2d2d' : '#f9fafb',
    filterActiveBg: darkMode ? '#374151' : '#dbeafe',
    filterActiveBorder: darkMode ? '#3b82f6' : '#2563eb',
    statBg: darkMode ? '#2d2d2d' : '#f9fafb',
    tableHeaderBg: darkMode ? '#1f2937' : '#f9fafb',
    tableRowBg: darkMode ? '#1e1e1e' : '#ffffff',
    tableRowHover: darkMode ? '#2d2d2d' : '#f3f4f6',
    switchBg: darkMode ? '#374151' : '#ccc',
    switchThumb: '#ffffff',
    switchActiveBg: darkMode ? '#3b82f6' : '#2563eb',
  };

  // Vista de Tickets
  if (activeTab === 'Tickets') {
    return (
      <div className="app-container" style={{ backgroundColor: theme.background, color: theme.text }}>
        <header style={{ backgroundColor: theme.headerBg, borderBottom: `1px solid ${theme.border}` }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0' }}>
            <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
              <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>Centro de Soporte</h1>
              <nav style={{ display: 'flex', gap: '16px' }}>
                {['Tickets', 'Usuarios', 'Reportes', 'Ajustes'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`btn ${activeTab === tab ? 'btn-primary' : 'btn-secondary'}`}
                    style={{
                      backgroundColor: activeTab === tab ? theme.buttonPrimary : theme.buttonSecondary,
                      color: activeTab === tab ? theme.buttonPrimaryText : theme.buttonSecondaryText,
                      borderColor: activeTab === tab ? theme.buttonPrimary : theme.buttonSecondaryBorder,
                      fontWeight: activeTab === tab ? 'bold' : 'normal'
                    }}
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
                style={{
                  padding: '6px 12px',
                  borderRadius: '4px',
                  border: `1px solid ${theme.inputBorder}`,
                  backgroundColor: theme.inputBg,
                  color: theme.text
                }}
              />
              <div style={{
                width: '32px',
                height: '32px',
                background: theme.primary,
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer'
              }} onClick={toggleDarkMode}>
                {darkMode ? '☀️' : '🌙'}
              </div>
            </div>
          </div>
        </header>
        <main className="container" style={{ display: 'flex', gap: '24px', padding: '24px 0' }}>
          {/* Sidebar */}
          <aside style={{ flex: '0 0 260px', padding: '0 16px', backgroundColor: theme.sidebarBg, borderRadius: '8px', border: `1px solid ${theme.border}` }}>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontWeight: 'bold', marginBottom: '16px', fontSize: '16px', color: theme.text }}>Acciones</h2>
              <button onClick={handleCreateTicket} className="btn btn-primary" style={{
                width: '100%',
                backgroundColor: theme.buttonPrimary,
                color: theme.buttonPrimaryText,
                border: `1px solid ${theme.buttonPrimary}`
              }}>
                Nuevo ticket
              </button>
            </div>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '12px', color: theme.secondaryText, marginBottom: '8px', textTransform: 'uppercase', fontWeight: '600' }}>Estado</h3>
              {['Abierto', 'En progreso', 'Resuelto', 'Cerrado'].map(estado => (
                <div 
                  key={estado}
                  onClick={() => handleTicketFilterChange('estado', estado)}
                  style={{ 
                    padding: '8px 12px', 
                    background: ticketFilters.estado === estado ? theme.active : theme.filterBg,
                    borderRadius: '6px', 
                    marginBottom: '8px',
                    cursor: 'pointer',
                    border: ticketFilters.estado === estado ? `2px solid ${theme.activeBorder}` : `2px solid transparent`,
                    color: theme.text
                  }}
                >
                  {estado}
                </div>
              ))}
            </div>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '12px', color: theme.secondaryText, marginBottom: '8px', textTransform: 'uppercase', fontWeight: '600' }}>Prioridad</h3>
              {['Baja', 'Media', 'Alta', 'Crítica'].map(prioridad => (
                <div 
                  key={prioridad}
                  onClick={() => handleTicketFilterChange('prioridad', prioridad)}
                  style={{ 
                    padding: '8px 12px', 
                    background: ticketFilters.prioridad === prioridad ? theme.active : theme.filterBg,
                    borderRadius: '6px', 
                    marginBottom: '8px',
                    cursor: 'pointer',
                    border: ticketFilters.prioridad === prioridad ? `2px solid ${theme.activeBorder}` : `2px solid transparent`,
                    color: theme.text
                  }}
                >
                  {prioridad}
                </div>
              ))}
            </div>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '12px', color: theme.secondaryText, marginBottom: '8px', textTransform: 'uppercase', fontWeight: '600' }}>Asignado</h3>
              <div 
                onClick={() => handleTicketFilterChange('asignado', '')}
                style={{ 
                  padding: '8px 12px', 
                  background: !ticketFilters.asignado ? theme.active : theme.filterBg,
                  borderRadius: '6px', 
                  marginBottom: '8px',
                  cursor: 'pointer',
                  border: !ticketFilters.asignado ? `2px solid ${theme.activeBorder}` : `2px solid transparent`,
                  color: theme.text
                }}
              >
                Sin asignar
              </div>
              <div 
                onClick={() => handleTicketFilterChange('asignado', 'Mi equipo')}
                style={{ 
                  padding: '8px 12px', 
                  background: ticketFilters.asignado === 'Mi equipo' ? theme.active : theme.filterBg,
                  borderRadius: '6px', 
                  marginBottom: '8px',
                  cursor: 'pointer',
                  border: ticketFilters.asignado === 'Mi equipo' ? `2px solid ${theme.activeBorder}` : `2px solid transparent`,
                  color: theme.text
                }}
              >
                Mi equipo
              </div>
              <div 
                onClick={() => handleTicketFilterChange('asignado', 'Yo')}
                style={{ 
                  padding: '8px 12px', 
                  background: ticketFilters.asignado === 'Yo' ? theme.active : theme.filterBg,
                  borderRadius: '6px', 
                  marginBottom: '8px',
                  cursor: 'pointer',
                  border: ticketFilters.asignado === 'Yo' ? `2px solid ${theme.activeBorder}` : `2px solid transparent`,
                  color: theme.text
                }}
              >
                Yo
              </div>
            </div>
          </aside>

          {/* Contenido principal */}
          <div style={{ flex: 1 }}>
            <div style={{ background: theme.cardBackground, borderRadius: '8px', padding: '24px', marginBottom: '24px', border: `1px solid ${theme.border}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 style={{ fontWeight: 'bold', fontSize: '18px', color: theme.text }}>Todos los tickets</h2>
                <button onClick={handleCreateTicket} className="btn btn-primary" style={{
                  backgroundColor: theme.buttonPrimary,
                  color: theme.buttonPrimaryText,
                  border: `1px solid ${theme.buttonPrimary}`
                }}>Nuevo ticket</button>
              </div>

              <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                <div style={{ flex: 1, background: theme.statBg, padding: '16px', borderRadius: '8px', border: `1px solid ${theme.border}` }}>
                  <div style={{ fontSize: '12px', color: theme.secondaryText, marginBottom: '4px' }}>Abiertos</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: theme.text }}>{stats.abiertos}</div>
                </div>
                <div style={{ flex: 1, background: theme.statBg, padding: '16px', borderRadius: '8px', border: `1px solid ${theme.border}` }}>
                  <div style={{ fontSize: '12px', color: theme.secondaryText, marginBottom: '4px' }}>En progreso</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: theme.text }}>{stats.enProgreso}</div>
                </div>
                <div style={{ flex: 1, background: theme.statBg, padding: '16px', borderRadius: '8px', border: `1px solid ${theme.border}` }}>
                  <div style={{ fontSize: '12px', color: theme.secondaryText, marginBottom: '4px' }}>Tiempo prom.</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: theme.text }}>{stats.tiempoPromedio}</div>
                </div>
              </div>

              <div style={{ overflowX: 'auto', borderRadius: '8px', border: `1px solid ${theme.border}` }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: theme.tableHeaderBg, color: theme.text }}>
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
                        style={{
                          cursor: 'pointer',
                          borderBottom: `1px solid ${theme.border}`,
                          backgroundColor: theme.tableRowBg,
                          color: theme.text
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.tableRowHover}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.tableRowBg}
                      >
                        <td style={{ padding: '12px' }}><strong>#{ticket.id}</strong></td>
                        <td style={{ padding: '12px' }}>
                          <div style={{ fontWeight: '600', marginBottom: '4px', color: theme.text }}>{ticket.titulo}</div>
                          <div style={{ fontSize: '12px', color: theme.secondaryText }}>{ticket.categoria} • {ticket.tipo}</div>
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
              <div style={{ background: theme.cardBackground, borderRadius: '8px', padding: '24px', marginTop: '24px', border: `1px solid ${theme.border}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontWeight: 'bold', fontSize: '16px', color: theme.text }}>
                    {isCreatingTicket ? 'Crear nuevo ticket' : `Editar ticket #${selectedTicket.id}`}
                  </h3>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={handleCancelTicket} className="btn btn-secondary" style={{
                      backgroundColor: theme.buttonSecondary,
                      color: theme.buttonSecondaryText,
                      border: `1px solid ${theme.buttonSecondaryBorder}`
                    }}>Cancelar</button>
                    <button onClick={handleSaveTicket} className="btn btn-primary" style={{
                      backgroundColor: theme.buttonPrimary,
                      color: theme.buttonPrimaryText,
                      border: `1px solid ${theme.buttonPrimary}`
                    }}>
                      {isCreatingTicket ? 'Crear' : 'Actualizar'}
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', color: theme.text }}>Título</label>
                    <input
                      type="text"
                      name="titulo"
                      value={ticketForm.titulo}
                      onChange={handleTicketInputChange}
                      style={{
                        width: '100%',
                        padding: '8px',
                        border: `1px solid ${theme.inputBorder}`,
                        borderRadius: '6px',
                        backgroundColor: theme.inputBg,
                        color: theme.text
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', color: theme.text }}>Categoría</label>
                    <select name="categoria" value={ticketForm.categoria} onChange={handleTicketInputChange} style={{
                      width: '100%',
                      padding: '8px',
                      borderRadius: '6px',
                      border: `1px solid ${theme.inputBorder}`,
                      backgroundColor: theme.inputBg,
                      color: theme.text
                    }}>
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
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', color: theme.text }}>Estado</label>
                    <select name="estado" value={ticketForm.estado} onChange={handleTicketInputChange} style={{
                      width: '100%',
                      padding: '8px',
                      borderRadius: '6px',
                      border: `1px solid ${theme.inputBorder}`,
                      backgroundColor: theme.inputBg,
                      color: theme.text
                    }}>
                      <option>Abierto</option>
                      <option>En progreso</option>
                      <option>Resuelto</option>
                      <option>Cerrado</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', color: theme.text }}>Prioridad</label>
                    <select name="prioridad" value={ticketForm.prioridad} onChange={handleTicketInputChange} style={{
                      width: '100%',
                      padding: '8px',
                      borderRadius: '6px',
                      border: `1px solid ${theme.inputBorder}`,
                      backgroundColor: theme.inputBg,
                      color: theme.text
                    }}>
                      <option>Baja</option>
                      <option>Media</option>
                      <option>Alta</option>
                      <option>Crítica</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', color: theme.text }}>Asignado a</label>
                  <select name="asignado" value={ticketForm.asignado} onChange={handleTicketInputChange} style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '6px',
                    border: `1px solid ${theme.inputBorder}`,
                    backgroundColor: theme.inputBg,
                    color: theme.text
                  }}>
                    <option value="">Sin asignar</option>
                    <option value="Yo">Yo</option>
                    {users.map(u => (
                      <option key={u.id} value={u.nombre}>{u.nombre}</option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', color: theme.text }}>Descripción</label>
                  <textarea
                    name="descripcion"
                    value={ticketForm.descripcion}
                    onChange={handleTicketInputChange}
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: `1px solid ${theme.inputBorder}`,
                      borderRadius: '6px',
                      resize: 'vertical',
                      backgroundColor: theme.inputBg,
                      color: theme.text
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  // Vista de Usuarios
  if (activeTab === 'Usuarios') {
    return (
      <div className="app-container" style={{ backgroundColor: theme.background, color: theme.text }}>
        <header style={{ backgroundColor: theme.headerBg, borderBottom: `1px solid ${theme.border}` }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0' }}>
            <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
              <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>Centro de Soporte</h1>
              <nav style={{ display: 'flex', gap: '16px' }}>
                {['Tickets', 'Usuarios', 'Reportes', 'Ajustes'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`btn ${activeTab === tab ? 'btn-primary' : 'btn-secondary'}`}
                    style={{
                      backgroundColor: activeTab === tab ? theme.buttonPrimary : theme.buttonSecondary,
                      color: activeTab === tab ? theme.buttonPrimaryText : theme.buttonSecondaryText,
                      borderColor: activeTab === tab ? theme.buttonPrimary : theme.buttonSecondaryBorder,
                      fontWeight: activeTab === tab ? 'bold' : 'normal'
                    }}
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
                style={{
                  padding: '6px 12px',
                  borderRadius: '4px',
                  border: `1px solid ${theme.inputBorder}`,
                  backgroundColor: theme.inputBg,
                  color: theme.text
                }}
              />
              <div style={{
                width: '32px',
                height: '32px',
                background: theme.primary,
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer'
              }} onClick={toggleDarkMode}>
                {darkMode ? '☀️' : '🌙'}
              </div>
            </div>
          </div>
        </header>
        <main className="container" style={{ display: 'flex', gap: '24px', padding: '24px 0' }}>
          <aside style={{ flex: '0 0 260px', padding: '0 16px', backgroundColor: theme.sidebarBg, borderRadius: '8px', border: `1px solid ${theme.border}` }}> 
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontWeight: 'bold', marginBottom: '16px', fontSize: '16px', color: theme.text }}>Acciones</h2>
              <button onClick={handleCreateUser} className="btn btn-primary" style={{
                width: '100%',
                backgroundColor: theme.buttonPrimary,
                color: theme.buttonPrimaryText,
                border: `1px solid ${theme.buttonPrimary}`
              }}>
                Nuevo usuario
              </button>
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: theme.secondaryText, marginBottom: '8px', textTransform: 'uppercase', fontWeight: '600' }}>
                Rol
              </label>
              <select
                value={filters.rol}
                onChange={(e) => setFilters(prev => ({ ...prev, rol: e.target.value }))}
                style={{ 
                  width: '100%', 
                  padding: '8px 12px', 
                  border: `1px solid ${theme.inputBorder}`, 
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  backgroundColor: theme.inputBg,
                  color: theme.text
                }}
              >
                <option value="">Todos los roles</option>
                <option value="Agente">Agente</option>
                <option value="Administrador">Administrador</option>
                <option value="Colaborador">Colaborador</option>
              </select>
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: theme.secondaryText, marginBottom: '8px', textTransform: 'uppercase', fontWeight: '600' }}>
                Estado
              </label>
              <select
                value={filters.estado}
                onChange={(e) => setFilters(prev => ({ ...prev, estado: e.target.value }))}
                style={{ 
                  width: '100%', 
                  padding: '8px 12px', 
                  border: `1px solid ${theme.inputBorder}`, 
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  backgroundColor: theme.inputBg,
                  color: theme.text
                }}
              >
                <option value="">Todos los estados</option>
                <option value="Activo">Activo</option>
                <option value="Invitado">Invitado</option>
                <option value="Suspendido">Suspendido</option>
              </select>
            </div>
            <div>
              <h3 style={{ fontSize: '12px', color: theme.secondaryText, marginBottom: '8px', textTransform: 'uppercase', fontWeight: '600' }}>Equipos</h3>
              {equipos.map(equipo => (
                <div 
                  key={equipo.nombre} 
                  onClick={() => handleFilterChange('equipo', equipo.nombre)}
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '12px', 
                    background: filters.equipo === equipo.nombre ? theme.active : theme.filterBg,
                    borderRadius: '8px', 
                    marginBottom: '8px',
                    cursor: 'pointer',
                    border: filters.equipo === equipo.nombre ? `2px solid ${theme.activeBorder}` : `2px solid transparent`,
                    color: theme.text
                  }}
                >
                  <span style={{ fontSize: '14px', fontWeight: filters.equipo === equipo.nombre ? '600' : '400', color: theme.text }}>{equipo.nombre}</span>
                  <span style={{ background: theme.secondaryText, padding: '2px 6px', borderRadius: '9999px', fontSize: '12px', color: theme.text }}>{equipo.cantidad}</span>
                </div>
              ))}
              {filters.equipo && (
                <button 
                  onClick={() => setFilters(prev => ({ ...prev, equipo: '' }))}
                  style={{ fontSize: '12px', color: theme.primary, background: 'none', border: 'none', cursor: 'pointer', marginTop: '4px', width: '100%' }}
                >
                  Limpiar filtro
                </button>
              )}
            </div>
          </aside>
          <div style={{ flex: 1 }}>
            <div style={{ background: theme.cardBackground, borderRadius: '8px', padding: '24px', marginBottom: '24px', border: `1px solid ${theme.border}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 style={{ fontWeight: 'bold', fontSize: '18px', color: theme.text }}>Usuarios</h2>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn btn-secondary" disabled style={{
                    backgroundColor: theme.buttonSecondary,
                    color: theme.buttonSecondaryText,
                    border: `1px solid ${theme.buttonSecondaryBorder}`
                  }}>Filtros</button>
                  <button className="btn btn-secondary" disabled style={{
                    backgroundColor: theme.buttonSecondary,
                    color: theme.buttonSecondaryText,
                    border: `1px solid ${theme.buttonSecondaryBorder}`
                  }}>Importar</button>
                  <button onClick={handleCreateUser} className="btn btn-primary" style={{
                    backgroundColor: theme.buttonPrimary,
                    color: theme.buttonPrimaryText,
                    border: `1px solid ${theme.buttonPrimary}`
                  }}>Nuevo usuario</button>
                </div>
              </div>
              <div style={{ overflowX: 'auto', borderRadius: '8px', border: `1px solid ${theme.border}` }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: theme.tableHeaderBg, color: theme.text }}>
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
                        style={{
                          cursor: 'pointer',
                          borderBottom: `1px solid ${theme.border}`,
                          backgroundColor: theme.tableRowBg,
                          color: theme.text
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.tableRowHover}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.tableRowBg}
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
              <div style={{ background: theme.cardBackground, borderRadius: '8px', padding: '24px', marginTop: '24px', border: `1px solid ${theme.border}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontWeight: 'bold', fontSize: '16px', color: theme.text }}>{isCreatingUser ? 'Crear usuario' : 'Editar usuario'}</h3>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={handleCancel} className="btn btn-secondary" style={{
                      backgroundColor: theme.buttonSecondary,
                      color: theme.buttonSecondaryText,
                      border: `1px solid ${theme.buttonSecondaryBorder}`
                    }}>Cancelar</button>
                    <button onClick={handleSaveUser} className="btn btn-primary" style={{
                      backgroundColor: theme.buttonPrimary,
                      color: theme.buttonPrimaryText,
                      border: `1px solid ${theme.buttonPrimary}`
                    }}>Guardar</button>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', color: theme.text }}>Nombre</label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '8px',
                        border: `1px solid ${theme.inputBorder}`,
                        borderRadius: '6px',
                        backgroundColor: theme.inputBg,
                        color: theme.text
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', color: theme.text }}>Correo</label>
                    <input
                      type="email"
                      name="correo"
                      value={formData.correo}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '8px',
                        border: `1px solid ${theme.inputBorder}`,
                        borderRadius: '6px',
                        backgroundColor: theme.inputBg,
                        color: theme.text
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', color: theme.text }}>Rol</label>
                    <select
                      name="rol"
                      value={formData.rol}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '8px',
                        border: `1px solid ${theme.inputBorder}`,
                        borderRadius: '6px',
                        backgroundColor: theme.inputBg,
                        color: theme.text
                      }}
                    >
                      <option>Agente</option>
                      <option>Administrador</option>
                      <option>Colaborador</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', color: theme.text }}>Estado</label>
                    <select
                      name="estado"
                      value={formData.estado}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '8px',
                        border: `1px solid ${theme.inputBorder}`,
                        borderRadius: '6px',
                        backgroundColor: theme.inputBg,
                        color: theme.text
                      }}
                    >
                      <option>Activo</option>
                      <option>Invitado</option>
                      <option>Suspendido</option>
                    </select>
                  </div>
                </div>
                <div style={{ marginTop: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', color: theme.text }}>Nota</label>
                  <textarea
                    name="nota"
                    value={formData.nota}
                    onChange={handleInputChange}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: `1px solid ${theme.inputBorder}`,
                      borderRadius: '6px',
                      resize: 'vertical',
                      backgroundColor: theme.inputBg,
                      color: theme.text
                    }}
                  ></textarea>
                  <p style={{ fontSize: '12px', color: theme.secondaryText, marginTop: '4px' }}>Información interna visible para administradores</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  // Vista de Reportes
  if (activeTab === 'Reportes') {
    const reportData = {
      totalTickets: tickets.length,
      resueltos: tickets.filter(t => t.estado === 'Resuelto').length,
      abiertos: stats.abiertos,
      enProgreso: stats.enProgreso,
      porEquipo: equipos.map(equipo => ({
        nombre: equipo.nombre,
        asignados: tickets.filter(t => 
          users.find(u => u.nombre === t.asignado && u.equipo === equipo.nombre)
        ).length
      })),
      porPrioridad: ['Crítica', 'Alta', 'Media', 'Baja'].map(p => ({
        prioridad: p,
        count: tickets.filter(t => t.prioridad === p).length
      }))
    };

    return (
      <div className="app-container" style={{ backgroundColor: theme.background, color: theme.text }}>
        <header style={{ backgroundColor: theme.headerBg, borderBottom: `1px solid ${theme.border}` }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0' }}>
            <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
              <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>Centro de Soporte</h1>
              <nav style={{ display: 'flex', gap: '16px' }}>
                {['Tickets', 'Usuarios', 'Reportes', 'Ajustes'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`btn ${activeTab === tab ? 'btn-primary' : 'btn-secondary'}`}
                    style={{
                      backgroundColor: activeTab === tab ? theme.buttonPrimary : theme.buttonSecondary,
                      color: activeTab === tab ? theme.buttonPrimaryText : theme.buttonSecondaryText,
                      borderColor: activeTab === tab ? theme.buttonPrimary : theme.buttonSecondaryBorder,
                      fontWeight: activeTab === tab ? 'bold' : 'normal'
                    }}
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
                style={{
                  padding: '6px 12px',
                  borderRadius: '4px',
                  border: `1px solid ${theme.inputBorder}`,
                  backgroundColor: theme.inputBg,
                  color: theme.text
                }}
                disabled
              />
              <div style={{
                width: '32px',
                height: '32px',
                background: theme.primary,
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer'
              }} onClick={toggleDarkMode}>
                {darkMode ? '☀️' : '🌙'}
              </div>
            </div>
          </div>
        </header>
        <main className="container" style={{ padding: '24px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontWeight: 'bold', fontSize: '24px', color: theme.text }}>Reportes</h2>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn btn-secondary" style={{
                backgroundColor: theme.buttonSecondary,
                color: theme.buttonSecondaryText,
                border: `1px solid ${theme.buttonSecondaryBorder}`
              }}>Exportar PDF</button>
              <button className="btn btn-secondary" style={{
                backgroundColor: theme.buttonSecondary,
                color: theme.buttonSecondaryText,
                border: `1px solid ${theme.buttonSecondaryBorder}`
              }}>Exportar CSV</button>
            </div>
          </div>

          {/* Resumen general */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <div style={{ background: theme.cardBackground, borderRadius: '8px', padding: '20px', border: `1px solid ${theme.border}`, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '12px', color: theme.secondaryText, marginBottom: '8px' }}>Total Tickets</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: theme.text }}>{reportData.totalTickets}</div>
            </div>
            <div style={{ background: theme.cardBackground, borderRadius: '8px', padding: '20px', border: `1px solid ${theme.border}`, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '12px', color: theme.secondaryText, marginBottom: '8px' }}>Resueltos</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: theme.success }}>{reportData.resueltos}</div>
            </div>
            <div style={{ background: theme.cardBackground, borderRadius: '8px', padding: '20px', border: `1px solid ${theme.border}`, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '12px', color: theme.secondaryText, marginBottom: '8px' }}>Abiertos</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: theme.danger }}>{reportData.abiertos}</div>
            </div>
            <div style={{ background: theme.cardBackground, borderRadius: '8px', padding: '20px', border: `1px solid ${theme.border}`, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '12px', color: theme.secondaryText, marginBottom: '8px' }}>En Progreso</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: theme.warning }}>{reportData.enProgreso}</div>
            </div>
          </div>

          {/* Gráficos */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
            {/* Por equipo */}
            <div style={{ background: theme.cardBackground, borderRadius: '8px', padding: '20px', border: `1px solid ${theme.border}`, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h3 style={{ fontWeight: '600', marginBottom: '16px', fontSize: '18px', color: theme.text }}>Tickets por Equipo</h3>
              <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '12px' }}>
                {reportData.porEquipo.map((equipo, index) => (
                  <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ 
                      width: '40px', 
                      height: `${(equipo.asignados / Math.max(...reportData.porEquipo.map(e => e.asignados), 1)) * 150}px`, 
                      background: theme.accent, 
                      borderRadius: '4px 4px 0 0',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                      paddingBottom: '4px',
                      color: 'white',
                      fontWeight: 'bold'
                    }}>
                      {equipo.asignados}
                    </div>
                    <div style={{ marginTop: '8px', fontSize: '12px', textAlign: 'center', color: theme.text }}>{equipo.nombre}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Por prioridad */}
            <div style={{ background: theme.cardBackground, borderRadius: '8px', padding: '20px', border: `1px solid ${theme.border}`, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h3 style={{ fontWeight: '600', marginBottom: '16px', fontSize: '18px', color: theme.text }}>Tickets por Prioridad</h3>
              <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '12px' }}>
                {reportData.porPrioridad.map((item, index) => {
                  const maxCount = Math.max(...reportData.porPrioridad.map(p => p.count), 1);
                  return (
                    <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ 
                        width: '40px', 
                        height: `${(item.count / maxCount) * 150}px`, 
                        background: item.prioridad === 'Crítica' ? theme.danger : 
                                   item.prioridad === 'Alta' ? theme.warning : 
                                   item.prioridad === 'Media' ? theme.accent : theme.info,
                        borderRadius: '4px 4px 0 0',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        paddingBottom: '4px',
                        color: 'white',
                        fontWeight: 'bold'
                      }}>
                        {item.count}
                      </div>
                      <div style={{ marginTop: '8px', fontSize: '12px', textAlign: 'center', color: theme.text }}>{item.prioridad}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Tabla detallada */}
          <div style={{ background: theme.cardBackground, borderRadius: '8px', padding: '20px', border: `1px solid ${theme.border}`, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontWeight: '600', marginBottom: '16px', fontSize: '18px', color: theme.text }}>Actividad Reciente</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: theme.tableHeaderBg, color: theme.text }}>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>ID</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>Título</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>Estado</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>Asignado</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>Creado</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.slice(0, 5).map(ticket => (
                    <tr key={ticket.id} style={{ borderBottom: `1px solid ${theme.border}` }}>
                      <td style={{ padding: '12px' }}><strong>#{ticket.id}</strong></td>
                      <td style={{ padding: '12px' }}>{ticket.titulo}</td>
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
                      <td style={{ padding: '12px' }}>{ticket.asignado || 'Sin asignar'}</td>
                      <td style={{ padding: '12px' }}>{ticket.creado}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Vista de Ajustes
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: true,
    autoAssign: false,
    language: 'es',
    timezone: 'America/Mexico_City',
    theme: 'light'
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (activeTab === 'Ajustes') {
    return (
      <div className="app-container" style={{ backgroundColor: theme.background, color: theme.text }}>
        <header style={{ backgroundColor: theme.headerBg, borderBottom: `1px solid ${theme.border}` }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0' }}>
            <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
              <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>Centro de Soporte</h1>
              <nav style={{ display: 'flex', gap: '16px' }}>
                {['Tickets', 'Usuarios', 'Reportes', 'Ajustes'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`btn ${activeTab === tab ? 'btn-primary' : 'btn-secondary'}`}
                    style={{
                      backgroundColor: activeTab === tab ? theme.buttonPrimary : theme.buttonSecondary,
                      color: activeTab === tab ? theme.buttonPrimaryText : theme.buttonSecondaryText,
                      borderColor: activeTab === tab ? theme.buttonPrimary : theme.buttonSecondaryBorder,
                      fontWeight: activeTab === tab ? 'bold' : 'normal'
                    }}
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
                style={{
                  padding: '6px 12px',
                  borderRadius: '4px',
                  border: `1px solid ${theme.inputBorder}`,
                  backgroundColor: theme.inputBg,
                  color: theme.text
                }}
                disabled
              />
              <div style={{
                width: '32px',
                height: '32px',
                background: theme.primary,
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer'
              }} onClick={toggleDarkMode}>
                {darkMode ? '☀️' : '🌙'}
              </div>
            </div>
          </div>
        </header>
        <main className="container" style={{ padding: '24px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontWeight: 'bold', fontSize: '24px', color: theme.text }}>Ajustes</h2>
            <button className="btn btn-primary" style={{
              backgroundColor: theme.buttonPrimary,
              color: theme.buttonPrimaryText,
              border: `1px solid ${theme.buttonPrimary}`
            }}>Guardar cambios</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {/* Configuración general */}
            <div style={{ background: theme.cardBackground, borderRadius: '8px', padding: '24px', border: `1px solid ${theme.border}`, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h3 style={{ fontWeight: '600', marginBottom: '16px', fontSize: '18px', color: theme.text }}>Configuración General</h3>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: theme.text }}>Idioma</label>
                <select
                  value={settings.language}
                  onChange={(e) => handleSettingChange('language', e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '10px', 
                    border: `1px solid ${theme.inputBorder}`, 
                    borderRadius: '6px',
                    backgroundColor: theme.inputBg,
                    color: theme.text
                  }}
                >
                  <option value="es">Español</option>
                  <option value="en">Inglés</option>
                  <option value="pt">Portugués</option>
                </select>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: theme.text }}>Zona horaria</label>
                <select
                  value={settings.timezone}
                  onChange={(e) => handleSettingChange('timezone', e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '10px', 
                    border: `1px solid ${theme.inputBorder}`, 
                    borderRadius: '6px',
                    backgroundColor: theme.inputBg,
                    color: theme.text
                  }}
                >
                  <option value="America/Mexico_City">México (CDMX)</option>
                  <option value="America/Bogota">Colombia (Bogotá)</option>
                  <option value="America/Argentina/Buenos_Aires">Argentina (Buenos Aires)</option>
                  <option value="Europe/Madrid">España (Madrid)</option>
                </select>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: theme.text }}>Tema</label>
                <select
                  value={settings.theme}
                  onChange={(e) => handleSettingChange('theme', e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '10px', 
                    border: `1px solid ${theme.inputBorder}`, 
                    borderRadius: '6px',
                    backgroundColor: theme.inputBg,
                    color: theme.text
                  }}
                >
                  <option value="light">Claro</option>
                  <option value="dark">Oscuro</option>
                  <option value="auto">Sistema</option>
                </select>
              </div>
            </div>

            {/* Notificaciones */}
            <div style={{ background: theme.cardBackground, borderRadius: '8px', padding: '24px', border: `1px solid ${theme.border}`, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h3 style={{ fontWeight: '600', marginBottom: '16px', fontSize: '18px', color: theme.text }}>Notificaciones</h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', padding: '12px 0' }}>
                <div>
                  <div style={{ fontWeight: '500', color: theme.text }}>Notificaciones en la app</div>
                  <div style={{ fontSize: '14px', color: theme.secondaryText }}>Recibir notificaciones dentro de la aplicación</div>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={settings.notifications}
                    onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', padding: '12px 0' }}>
                <div>
                  <div style={{ fontWeight: '500', color: theme.text }}>Alertas por correo</div>
                  <div style={{ fontSize: '14px', color: theme.secondaryText }}>Recibir alertas importantes por email</div>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={settings.emailAlerts}
                    onChange={(e) => handleSettingChange('emailAlerts', e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
                <div>
                  <div style={{ fontWeight: '500', color: theme.text }}>Asignación automática</div>
                  <div style={{ fontSize: '14px', color: theme.secondaryText }}>Asignar nuevos tickets automáticamente al equipo</div>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={settings.autoAssign}
                    onChange={(e) => handleSettingChange('autoAssign', e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Integraciones */}
          <div style={{ background: theme.cardBackground, borderRadius: '8px', padding: '24px', marginTop: '24px', border: `1px solid ${theme.border}`, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontWeight: '600', marginBottom: '16px', fontSize: '18px', color: theme.text }}>Integraciones</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
              <div style={{ border: `1px solid ${theme.border}`, borderRadius: '8px', padding: '16px', textAlign: 'center', backgroundColor: theme.filterBg }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>📧</div>
                <div style={{ fontWeight: '500', marginBottom: '8px', color: theme.text }}>Email</div>
                <button className="btn btn-secondary" style={{
                  width: '100%',
                  backgroundColor: theme.buttonSecondary,
                  color: theme.buttonSecondaryText,
                  border: `1px solid ${theme.buttonSecondaryBorder}`
                }}>Configurar</button>
              </div>
              <div style={{ border: `1px solid ${theme.border}`, borderRadius: '8px', padding: '16px', textAlign: 'center', backgroundColor: theme.filterBg }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>💬</div>
                <div style={{ fontWeight: '500', marginBottom: '8px', color: theme.text }}>Slack</div>
                <button className="btn btn-secondary" style={{
                  width: '100%',
                  backgroundColor: theme.buttonSecondary,
                  color: theme.buttonSecondaryText,
                  border: `1px solid ${theme.buttonSecondaryBorder}`
                }}>Conectar</button>
              </div>
              <div style={{ border: `1px solid ${theme.border}`, borderRadius: '8px', padding: '16px', textAlign: 'center', backgroundColor: theme.filterBg }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>📊</div>
                <div style={{ fontWeight: '500', marginBottom: '8px', color: theme.text }}>Google Analytics</div>
                <button className="btn btn-secondary" style={{
                  width: '100%',
                  backgroundColor: theme.buttonSecondary,
                  color: theme.buttonSecondaryText,
                  border: `1px solid ${theme.buttonSecondaryBorder}`
                }}>Configurar</button>
              </div>
              <div style={{ border: `1px solid ${theme.border}`, borderRadius: '8px', padding: '16px', textAlign: 'center', backgroundColor: theme.filterBg }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔒</div>
                <div style={{ fontWeight: '500', marginBottom: '8px', color: theme.text }}>SSO</div>
                <button className="btn btn-secondary" style={{
                  width: '100%',
                  backgroundColor: theme.buttonSecondary,
                  color: theme.buttonSecondaryText,
                  border: `1px solid ${theme.buttonSecondaryBorder}`
                }}>Configurar</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Default fallback
  return (
    <div className="app-container" style={{ backgroundColor: theme.background, color: theme.text }}>
      <header style={{ backgroundColor: theme.headerBg, borderBottom: `1px solid ${theme.border}` }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0' }}>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>Centro de Soporte</h1>
            <nav style={{ display: 'flex', gap: '16px' }}>
              {['Tickets', 'Usuarios', 'Reportes', 'Ajustes'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`btn ${activeTab === tab ? 'btn-primary' : 'btn-secondary'}`}
                  style={{
                    backgroundColor: activeTab === tab ? theme.buttonPrimary : theme.buttonSecondary,
                    color: activeTab === tab ? theme.buttonPrimaryText : theme.buttonSecondaryText,
                    borderColor: activeTab === tab ? theme.buttonPrimary : theme.buttonSecondaryBorder,
                    fontWeight: activeTab === tab ? 'bold' : 'normal'
                  }}
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
              style={{
                padding: '6px 12px',
                borderRadius: '4px',
                border: `1px solid ${theme.inputBorder}`,
                backgroundColor: theme.inputBg,
                color: theme.text
              }}
              disabled
            />
            <div style={{
              width: '32px',
              height: '32px',
              background: theme.primary,
              color: 'white',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer'
            }} onClick={toggleDarkMode}>
              {darkMode ? '☀️' : '🌙'}
            </div>
          </div>
        </div>
      </header>
      <main className="container" style={{ padding: '24px 0' }}>
        <h2 style={{ color: theme.text }}>{activeTab}</h2>
        <p style={{ color: theme.secondaryText }}>Esta sección aún no está implementada.</p>
      </main>
    </div>
  );
};

export default App;