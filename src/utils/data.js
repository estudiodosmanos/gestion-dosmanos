// ─── USUARIOS ─────────────────────────────────────────────────────────────────
export const INITIAL_USERS = [
  { id: 'u1', name: 'Admin',    email: 'hola@estudiodosmanos.com',          password: 'Dosmanos_02',       role: 'admin',  color: '#6366f1' },
  { id: 'u2', name: 'Blanca',   email: 'meseguer.blanca@gmail.com',         password: 'Dosmanos_02',       role: 'member', color: '#f59e0b' },
  { id: 'u3', name: 'Virginia', email: 'virginia.illu@gmail.com',           password: 'Dosmanos_02',       role: 'member', color: '#10b981' },
  { id: 'u4', name: 'Andrea',   email: 'marketing@estudiodosmanos.com',     password: 'Dosmanos_marketing', role: 'member', color: '#ef4444' },
  { id: 'u5', name: 'Nacho',    email: 'clientesestudiodosmanos@gmail.com', password: 'Dosmanos_clientes', role: 'member', color: '#8b5cf6' },
]

// ─── SERVICIOS (extraídos de SERVICIOS Y CLIENTES.docx) ───────────────────────
export const SERVICE_TYPES = [
  { id: 's1',  name: 'Diseño Web',       color: '#6366f1', icon: '🌐' },
  { id: 's2',  name: 'Branding',         color: '#f59e0b', icon: '✨' },
  { id: 's3',  name: 'Redes Sociales',   color: '#10b981', icon: '📱' },
  { id: 's4',  name: 'SEO',              color: '#06b6d4', icon: '🔍' },
  { id: 's5',  name: 'SEM',              color: '#8b5cf6', icon: '📊' },
  { id: 's6',  name: 'Catálogos / Editorial', color: '#f97316', icon: '📄' },
  { id: 's7',  name: 'Campañas / Meta Ads',   color: '#ec4899', icon: '🎯' },
  { id: 's8',  name: 'GMB',              color: '#84cc16', icon: '📍' },
  { id: 's9',  name: 'Audiovisual',      color: '#a855f7', icon: '🎬' },
  { id: 's10', name: 'Mailing',          color: '#14b8a6', icon: '✉️' },
]

// ─── PRIORIDADES ──────────────────────────────────────────────────────────────
export const PRIORITIES = [
  { id: 'high',   label: 'Alta',  color: '#ef4444' },
  { id: 'medium', label: 'Media', color: '#f59e0b' },
  { id: 'low',    label: 'Baja',  color: '#10b981' },
]

// ─── ESTADOS ──────────────────────────────────────────────────────────────────
export const STATUS_LIST = [
  { id: 'pending',     label: 'Pendiente',   color: '#94a3b8' },
  { id: 'in_progress', label: 'En progreso', color: '#6366f1' },
  { id: 'review',      label: 'Revisión',    color: '#f59e0b' },
  { id: 'done',        label: 'Completada',  color: '#10b981' },
]

// ─── PROYECTOS (un proyecto = un cliente) ─────────────────────────────────────
export const INITIAL_PROJECTS = [
  { id: 'p1',  name: 'Topcaravaning',    client: 'Topcaravaning',          serviceId: 's3',  color: '#10b981' },
  { id: 'p2',  name: 'ORLY',             client: 'Orlycaravan SL',         serviceId: 's3',  color: '#6366f1' },
  { id: 'p3',  name: 'Calma Hammam',     client: 'Calma Hammam',           serviceId: 's3',  color: '#06b6d4' },
  { id: 'p4',  name: 'RESET',            client: 'Reset Free Beauty',      serviceId: 's1',  color: '#8b5cf6' },
  { id: 'p5',  name: 'Cris Quevedo',     client: 'Cris Quevedo',           serviceId: 's1',  color: '#f59e0b' },
  { id: 'p6',  name: 'Treecologic',      client: 'Treecologic',            serviceId: 's1',  color: '#84cc16' },
  { id: 'p7',  name: 'Morés',            client: 'Morés',                  serviceId: 's1',  color: '#a855f7' },
  { id: 'p8',  name: 'Fabregas',         client: 'Fabregas',               serviceId: 's3',  color: '#ec4899' },
  { id: 'p9',  name: 'Bodegas Javier',   client: 'Bodegas Javier SL',      serviceId: 's3',  color: '#f97316' },
  { id: 'p10', name: 'Carpas Zaragoza',  client: 'Carpas Zaragoza SL',     serviceId: 's1',  color: '#ef4444' },
  { id: 'p11', name: 'Curvaser',         client: 'Maquinaria Curvaser SLU',serviceId: 's1',  color: '#14b8a6' },
  { id: 'p12', name: 'DASER',            client: 'Daser Gestión de Proyectos', serviceId: 's3', color: '#6366f1' },
  { id: 'p13', name: 'Erlinda',          client: 'Erlinda',                serviceId: 's3',  color: '#f59e0b' },
  { id: 'p14', name: 'Ana Sancho',       client: 'Ana Sancho',             serviceId: 's3',  color: '#10b981' },
  { id: 'p15', name: 'Tecnoven',         client: 'Tecnoven',               serviceId: 's2',  color: '#94a3b8' },
  { id: 'p16', name: 'Advantis',         client: 'Advantis',               serviceId: 's1',  color: '#8b5cf6' },
  { id: 'p17', name: 'Raíces y Trazos',  client: 'Raíces y Trazos',        serviceId: 's1',  color: '#06b6d4' },
  { id: 'p18', name: 'APB24',            client: 'APB24',                  serviceId: 's1',  color: '#ec4899' },
  { id: 'p19', name: 'Shop and Roll',    client: 'Shop & Roll',            serviceId: 's4',  color: '#84cc16' },
  { id: 'p20', name: 'OM Retail',        client: 'OM Retail',              serviceId: 's1',  color: '#a855f7' },
  { id: 'p21', name: 'Merci',            client: 'Merci The Shop SL',      serviceId: 's10', color: '#f97316' },
  { id: 'p22', name: 'Dos Manos',        client: 'Dos Manos',              serviceId: 's1',  color: '#6366f1' },
  { id: 'p23', name: 'VEOLI',            client: 'Importaciones Veoli SL', serviceId: 's2',  color: '#14b8a6' },
  { id: 'p24', name: 'ZAC',              client: 'ZAC',                    serviceId: 's2',  color: '#ef4444' },
  { id: 'p25', name: 'Sandra Alegre',    client: 'Sandra Alegre',          serviceId: 's2',  color: '#ec4899' },
  { id: 'p26', name: 'SEICO',            client: 'SEICO',                  serviceId: 's2',  color: '#8b5cf6' },
]

// ─── TAREAS ───────────────────────────────────────────────────────────────────
// u1=Admin  u2=Blanca (diseño/branding/visuales)  u3=Virginia (redes/texto/SEO)  u4=Andrea (redes/publicación/gmb)  u5=Nacho (web/programación/SEM)
// [x] = done  |  [ ] = pending/in_progress
export const INITIAL_TASKS = [

  // ── TOPCARAVANING ──────────────────────────────────────────────────────────
  { id: 'tc1', projectId: 'p1', title: 'RRSS Junio - Texto',         description: '',                          assignedTo: 'u4', serviceId: 's3', priority: 'high',   status: 'pending',     dueDate: '2026-06-30', estimatedHours: 2, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'tc2', projectId: 'p1', title: 'RRSS Junio - Visuales',      description: '',                          assignedTo: 'u2', serviceId: 's3', priority: 'high',   status: 'pending',     dueDate: '2026-06-30', estimatedHours: 3, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'tc3', projectId: 'p1', title: 'RRSS Junio - Programación',  description: '',                          assignedTo: 'u4', serviceId: 's3', priority: 'high',   status: 'pending',     dueDate: '2026-06-30', estimatedHours: 1, loggedTime: 0, createdAt: '2026-06-01' },

  // ── ORLY ───────────────────────────────────────────────────────────────────
  { id: 'or1', projectId: 'p2', title: 'RRSS Junio - Texto',         description: '',                          assignedTo: 'u4', serviceId: 's3', priority: 'high',   status: 'pending',     dueDate: '2026-06-30', estimatedHours: 2, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'or2', projectId: 'p2', title: 'RRSS Junio - Visuales',      description: '',                          assignedTo: 'u2', serviceId: 's3', priority: 'high',   status: 'pending',     dueDate: '2026-06-30', estimatedHours: 3, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'or3', projectId: 'p2', title: 'RRSS Junio - Programación',  description: '',                          assignedTo: 'u4', serviceId: 's3', priority: 'high',   status: 'pending',     dueDate: '2026-06-30', estimatedHours: 1, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'or4', projectId: 'p2', title: 'SEO - Acciones Kit Digital', description: '',                          assignedTo: 'u3', serviceId: 's4', priority: 'high',   status: 'pending',     dueDate: '2026-06-20', estimatedHours: 4, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'or5', projectId: 'p2', title: 'Campaña IEDMT - Meta',       description: 'Campaña completada',        assignedTo: 'u3', serviceId: 's7', priority: 'high',   status: 'done',        dueDate: '2026-06-01', estimatedHours: 3, loggedTime: 0, createdAt: '2026-05-20' },
  { id: 'or6', projectId: 'p2', title: 'Campaña IEDMT - Landing',    description: 'Landing completada',        assignedTo: 'u2', serviceId: 's7', priority: 'high',   status: 'done',        dueDate: '2026-06-01', estimatedHours: 4, loggedTime: 0, createdAt: '2026-05-20' },
  { id: 'or7', projectId: 'p2', title: 'Campaña IEDMT - Pop-up',     description: 'Pop-up completado',         assignedTo: 'u2', serviceId: 's7', priority: 'medium', status: 'done',        dueDate: '2026-06-01', estimatedHours: 2, loggedTime: 0, createdAt: '2026-05-20' },

  // ── CALMA HAMMAM ───────────────────────────────────────────────────────────
  { id: 'ca1', projectId: 'p3', title: 'Experiencia de grupos',          description: '',                      assignedTo: 'u2', serviceId: 's1', priority: 'medium', status: 'done',        dueDate: '2026-06-05', estimatedHours: 4, loggedTime: 0, createdAt: '2026-05-25' },
  { id: 'ca2', projectId: 'p3', title: 'Masajes nuevos web',             description: '',                      assignedTo: 'u3', serviceId: 's1', priority: 'medium', status: 'pending',     dueDate: '2026-06-20', estimatedHours: 3, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'ca3', projectId: 'p3', title: 'Flyer',                          description: '',                      assignedTo: 'u2', serviceId: 's2', priority: 'low',    status: 'done',        dueDate: '2026-06-05', estimatedHours: 2, loggedTime: 0, createdAt: '2026-05-25' },
  { id: 'ca4', projectId: 'p3', title: 'GMB',                            description: '',                      assignedTo: 'u4', serviceId: 's8', priority: 'low',    status: 'done',        dueDate: '2026-06-05', estimatedHours: 1, loggedTime: 0, createdAt: '2026-05-25' },
  { id: 'ca5', projectId: 'p3', title: 'Blog - Web verano',              description: 'Artículo web verano',   assignedTo: 'u4', serviceId: 's4', priority: 'medium', status: 'done',        dueDate: '2026-06-08', estimatedHours: 2, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'ca6', projectId: 'p3', title: 'Blog - Nuevo artículo',          description: '',                      assignedTo: 'u4', serviceId: 's4', priority: 'medium', status: 'pending',     dueDate: '2026-06-25', estimatedHours: 2, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'ca7', projectId: 'p3', title: 'Redes - Contenido mes',          description: '',                      assignedTo: 'u4', serviceId: 's3', priority: 'high',   status: 'pending',     dueDate: '2026-06-30', estimatedHours: 3, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'ca8', projectId: 'p3', title: 'Redes - Campaña grupos',         description: '',                      assignedTo: 'u2', serviceId: 's7', priority: 'medium', status: 'pending',     dueDate: '2026-07-01', estimatedHours: 4, loggedTime: 0, createdAt: '2026-06-01' },

  // ── RESET ──────────────────────────────────────────────────────────────────
  { id: 're1', projectId: 'p4', title: 'Web - Diseño',                   description: '',                      assignedTo: 'u2', serviceId: 's1', priority: 'high',   status: 'in_progress', dueDate: '2026-06-20', estimatedHours: 12, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 're2', projectId: 'p4', title: 'Web - Programación',             description: '',                      assignedTo: 'u5', serviceId: 's1', priority: 'high',   status: 'pending',     dueDate: '2026-07-01', estimatedHours: 16, loggedTime: 0, createdAt: '2026-06-01' },

  // ── CRIS QUEVEDO ───────────────────────────────────────────────────────────
  { id: 'cq1', projectId: 'p5', title: 'Web + SEO - Factura',            description: '',                      assignedTo: 'u3', serviceId: 's1', priority: 'low',    status: 'done',        dueDate: '2026-06-05', estimatedHours: 1, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'cq2', projectId: 'p5', title: 'Facturar SEO a Isaac',           description: '',                      assignedTo: 'u1', serviceId: 's4', priority: 'high',   status: 'pending',     dueDate: '2026-06-15', estimatedHours: 1, loggedTime: 0, createdAt: '2026-06-01' },

  // ── TREECOLOGIC ────────────────────────────────────────────────────────────
  { id: 'tr1', projectId: 'p6', title: 'Cambios web',                    description: '',                      assignedTo: 'u5', serviceId: 's1', priority: 'medium', status: 'done',        dueDate: '2026-06-05', estimatedHours: 3, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'tr2', projectId: 'p6', title: 'Revisar cambio word',            description: '',                      assignedTo: 'u5', serviceId: 's1', priority: 'medium', status: 'pending',     dueDate: '2026-06-15', estimatedHours: 1, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'tr3', projectId: 'p6', title: 'Landing clientes',               description: '',                      assignedTo: 'u2', serviceId: 's1', priority: 'medium', status: 'pending',     dueDate: '2026-06-25', estimatedHours: 6, loggedTime: 0, createdAt: '2026-06-01' },

  // ── MORÉS ──────────────────────────────────────────────────────────────────
  { id: 'mo1', projectId: 'p7', title: 'Diseño web',                     description: '',                      assignedTo: 'u2', serviceId: 's1', priority: 'high',   status: 'in_progress', dueDate: '2026-06-20', estimatedHours: 10, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'mo2', projectId: 'p7', title: 'Programación web',               description: '',                      assignedTo: 'u5', serviceId: 's1', priority: 'medium', status: 'pending',     dueDate: '2026-07-05', estimatedHours: 14, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'mo3', projectId: 'p7', title: 'Carrascada',                     description: '',                      assignedTo: 'u2', serviceId: 's2', priority: 'medium', status: 'pending',     dueDate: '2026-06-25', estimatedHours: 4, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'mo4', projectId: 'p7', title: 'Contestar a Farlek',             description: '',                      assignedTo: 'u1', serviceId: 's1', priority: 'high',   status: 'pending',     dueDate: '2026-06-12', estimatedHours: 1, loggedTime: 0, createdAt: '2026-06-01' },

  // ── FABREGAS ───────────────────────────────────────────────────────────────
  { id: 'fa1', projectId: 'p8', title: 'RRSS',                           description: '',                      assignedTo: 'u4', serviceId: 's3', priority: 'low',    status: 'done',        dueDate: '2026-06-05', estimatedHours: 3, loggedTime: 0, createdAt: '2026-05-25' },
  { id: 'fa2', projectId: 'p8', title: 'GMB',                            description: '',                      assignedTo: 'u4', serviceId: 's8', priority: 'low',    status: 'done',        dueDate: '2026-06-05', estimatedHours: 1, loggedTime: 0, createdAt: '2026-05-25' },

  // ── BODEGAS JAVIER ─────────────────────────────────────────────────────────
  { id: 'bj1', projectId: 'p9', title: 'RRSS Junio - Texto',             description: '',                      assignedTo: 'u4', serviceId: 's3', priority: 'high',   status: 'done',        dueDate: '2026-06-05', estimatedHours: 2, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'bj2', projectId: 'p9', title: 'RRSS Junio - Visuales',          description: '',                      assignedTo: 'u2', serviceId: 's3', priority: 'high',   status: 'done',        dueDate: '2026-06-05', estimatedHours: 3, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'bj3', projectId: 'p9', title: 'RRSS Junio - Programación',      description: '',                      assignedTo: 'u4', serviceId: 's3', priority: 'high',   status: 'done',        dueDate: '2026-06-05', estimatedHours: 1, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'bj4', projectId: 'p9', title: 'WEB - Propuesta home',           description: '',                      assignedTo: 'u2', serviceId: 's1', priority: 'medium', status: 'pending',     dueDate: '2026-06-25', estimatedHours: 5, loggedTime: 0, createdAt: '2026-06-01' },

  // ── CARPAS ZARAGOZA ────────────────────────────────────────────────────────
  { id: 'cp1',  projectId: 'p10', title: 'Programación web - Textos soluciones industriales', description: '', assignedTo: 'u5', serviceId: 's1', priority: 'medium', status: 'done',        dueDate: '2026-06-05', estimatedHours: 2, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'cp2',  projectId: 'p10', title: 'Programación web',             description: '',                      assignedTo: 'u5', serviceId: 's1', priority: 'high',   status: 'in_progress', dueDate: '2026-06-20', estimatedHours: 8, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'cp3',  projectId: 'p10', title: 'SEO',                          description: '',                      assignedTo: 'u3', serviceId: 's4', priority: 'medium', status: 'done',        dueDate: '2026-06-05', estimatedHours: 4, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'cp4',  projectId: 'p10', title: 'SEM',                          description: '',                      assignedTo: 'u3', serviceId: 's5', priority: 'medium', status: 'done',        dueDate: '2026-06-05', estimatedHours: 3, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'cp5',  projectId: 'p10', title: 'RRSS - Texto',                 description: '',                      assignedTo: 'u4', serviceId: 's3', priority: 'high',   status: 'done',        dueDate: '2026-06-05', estimatedHours: 2, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'cp6',  projectId: 'p10', title: 'RRSS - Visuales',              description: '',                      assignedTo: 'u2', serviceId: 's3', priority: 'high',   status: 'done',        dueDate: '2026-06-05', estimatedHours: 3, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'cp7',  projectId: 'p10', title: 'RRSS - Programación',          description: '',                      assignedTo: 'u4', serviceId: 's3', priority: 'high',   status: 'pending',     dueDate: '2026-06-30', estimatedHours: 1, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'cp8',  projectId: 'p10', title: 'Catálogo - Naves industriales (actualizar puertas)', description: '', assignedTo: 'u2', serviceId: 's6', priority: 'medium', status: 'pending',    dueDate: '2026-06-25', estimatedHours: 4, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'cp9',  projectId: 'p10', title: 'Catálogo - 10 razones naves',  description: '',                      assignedTo: 'u2', serviceId: 's6', priority: 'medium', status: 'pending',     dueDate: '2026-06-25', estimatedHours: 3, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'cp10', projectId: 'p10', title: 'Catálogo - Naves + soluciones industriales', description: '',        assignedTo: 'u2', serviceId: 's6', priority: 'medium', status: 'pending',     dueDate: '2026-06-30', estimatedHours: 4, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'cp11', projectId: 'p10', title: 'Catálogo - Arq. Textil',       description: '',                      assignedTo: 'u2', serviceId: 's6', priority: 'low',    status: 'done',        dueDate: '2026-06-05', estimatedHours: 3, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'cp12', projectId: 'p10', title: 'Catálogo - Soluciones deportivas', description: '',                  assignedTo: 'u2', serviceId: 's6', priority: 'low',    status: 'pending',     dueDate: '2026-07-05', estimatedHours: 3, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'cp13', projectId: 'p10', title: 'Campaña genérica - Visuales Meta Ads (3 formatos)', description: '', assignedTo: 'u2', serviceId: 's7', priority: 'high',   status: 'pending',     dueDate: '2026-06-20', estimatedHours: 5, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'cp14', projectId: 'p10', title: 'Campaña genérica - Configurar Meta Ads', description: '',            assignedTo: 'u5', serviceId: 's7', priority: 'high',   status: 'pending',     dueDate: '2026-06-22', estimatedHours: 3, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'cp15', projectId: 'p10', title: 'GMB',                          description: '',                      assignedTo: 'u4', serviceId: 's8', priority: 'low',    status: 'done',        dueDate: '2026-06-05', estimatedHours: 1, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'cp16', projectId: 'p10', title: 'Blog',                         description: '',                      assignedTo: 'u4', serviceId: 's4', priority: 'medium', status: 'pending',     dueDate: '2026-06-25', estimatedHours: 2, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'cp17', projectId: 'p10', title: 'Configurador',                 description: '',                      assignedTo: 'u5', serviceId: 's1', priority: 'low',    status: 'pending',     dueDate: '2026-07-10', estimatedHours: 10, loggedTime: 0, createdAt: '2026-06-01' },

  // ── CURVASER ───────────────────────────────────────────────────────────────
  { id: 'cu1',  projectId: 'p11', title: 'WEB - Actualización imágenes productos', description: '',            assignedTo: 'u5', serviceId: 's1', priority: 'medium', status: 'pending',     dueDate: '2026-06-20', estimatedHours: 3, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'cu2',  projectId: 'p11', title: 'WEB - Subir nuevos productos', description: '',                      assignedTo: 'u5', serviceId: 's1', priority: 'medium', status: 'pending',     dueDate: '2026-06-20', estimatedHours: 4, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'cu3',  projectId: 'p11', title: 'SEO - Landing servicios',      description: '',                      assignedTo: 'u3', serviceId: 's4', priority: 'high',   status: 'pending',     dueDate: '2026-06-25', estimatedHours: 5, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'cu4',  projectId: 'p11', title: 'SEO - Preguntas frecuentes',   description: '',                      assignedTo: 'u3', serviceId: 's4', priority: 'medium', status: 'pending',     dueDate: '2026-06-25', estimatedHours: 3, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'cu5',  projectId: 'p11', title: 'SEM - Varilla',                description: '',                      assignedTo: 'u5', serviceId: 's5', priority: 'high',   status: 'pending',     dueDate: '2026-06-15', estimatedHours: 2, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'cu6',  projectId: 'p11', title: 'RRSS - Texto',                 description: '',                      assignedTo: 'u4', serviceId: 's3', priority: 'high',   status: 'pending',     dueDate: '2026-06-30', estimatedHours: 2, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'cu7',  projectId: 'p11', title: 'RRSS - Visuales',              description: '',                      assignedTo: 'u2', serviceId: 's3', priority: 'high',   status: 'pending',     dueDate: '2026-06-30', estimatedHours: 3, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'cu8',  projectId: 'p11', title: 'RRSS - Programación',          description: '',                      assignedTo: 'u4', serviceId: 's3', priority: 'high',   status: 'pending',     dueDate: '2026-06-30', estimatedHours: 1, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'cu9',  projectId: 'p11', title: 'Mailing - Máquinas usadas 1',  description: '',                      assignedTo: 'u2', serviceId: 's10', priority: 'medium', status: 'pending',    dueDate: '2026-06-25', estimatedHours: 2, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'cu10', projectId: 'p11', title: 'Mailing - Máquinas usadas 2',  description: '',                      assignedTo: 'u2', serviceId: 's10', priority: 'medium', status: 'pending',    dueDate: '2026-06-25', estimatedHours: 2, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'cu11', projectId: 'p11', title: 'GMB',                          description: '',                      assignedTo: 'u4', serviceId: 's8', priority: 'low',    status: 'pending',     dueDate: '2026-06-20', estimatedHours: 1, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'cu12', projectId: 'p11', title: 'Informe mailing',              description: '',                      assignedTo: 'u3', serviceId: 's10', priority: 'medium', status: 'pending',    dueDate: '2026-06-20', estimatedHours: 2, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'cu13', projectId: 'p11', title: 'Blog',                         description: '',                      assignedTo: 'u4', serviceId: 's4', priority: 'low',    status: 'pending',     dueDate: '2026-06-30', estimatedHours: 2, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'cu14', projectId: 'p11', title: 'Albarán',                      description: '',                      assignedTo: 'u1', serviceId: 's1', priority: 'low',    status: 'done',        dueDate: '2026-06-05', estimatedHours: 1, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'cu15', projectId: 'p11', title: 'Pedir Albarán',                description: '',                      assignedTo: 'u1', serviceId: 's1', priority: 'low',    status: 'done',        dueDate: '2026-06-05', estimatedHours: 1, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'cu16', projectId: 'p11', title: 'Oficina',                      description: '',                      assignedTo: 'u1', serviceId: 's1', priority: 'medium', status: 'pending',     dueDate: '2026-06-20', estimatedHours: 2, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'cu17', projectId: 'p11', title: 'Interempresas - Video',        description: '',                      assignedTo: 'u2', serviceId: 's9', priority: 'medium', status: 'pending',     dueDate: '2026-07-01', estimatedHours: 6, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'cu18', projectId: 'p11', title: 'Feria Metalmadrid',            description: '',                      assignedTo: 'u2', serviceId: 's2', priority: 'low',    status: 'pending',     dueDate: '2026-07-15', estimatedHours: 8, loggedTime: 0, createdAt: '2026-06-01' },

  // ── DASER ──────────────────────────────────────────────────────────────────
  { id: 'da1', projectId: 'p12', title: 'RRSS - Texto',                  description: '',                      assignedTo: 'u4', serviceId: 's3', priority: 'high',   status: 'done',        dueDate: '2026-06-05', estimatedHours: 2, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'da2', projectId: 'p12', title: 'RRSS - Visuales',               description: '',                      assignedTo: 'u2', serviceId: 's3', priority: 'high',   status: 'pending',     dueDate: '2026-06-30', estimatedHours: 3, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'da3', projectId: 'p12', title: 'RRSS - Programación',           description: '',                      assignedTo: 'u4', serviceId: 's3', priority: 'high',   status: 'pending',     dueDate: '2026-06-30', estimatedHours: 1, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'da4', projectId: 'p12', title: 'Blog',                          description: '',                      assignedTo: 'u4', serviceId: 's4', priority: 'medium', status: 'pending',     dueDate: '2026-06-25', estimatedHours: 2, loggedTime: 0, createdAt: '2026-06-01' },

  // ── ERLINDA ────────────────────────────────────────────────────────────────
  { id: 'er1', projectId: 'p13', title: 'RRSS - Texto',                  description: '',                      assignedTo: 'u4', serviceId: 's3', priority: 'medium', status: 'pending',     dueDate: '2026-06-30', estimatedHours: 2, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'er2', projectId: 'p13', title: 'RRSS - Visuales',               description: '',                      assignedTo: 'u2', serviceId: 's3', priority: 'medium', status: 'pending',     dueDate: '2026-06-30', estimatedHours: 3, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'er3', projectId: 'p13', title: 'RRSS - Programación',           description: '',                      assignedTo: 'u4', serviceId: 's3', priority: 'medium', status: 'pending',     dueDate: '2026-06-30', estimatedHours: 1, loggedTime: 0, createdAt: '2026-06-01' },

  // ── ANA SANCHO ─────────────────────────────────────────────────────────────
  { id: 'as1', projectId: 'p14', title: 'RRSS - Texto',                  description: '',                      assignedTo: 'u4', serviceId: 's3', priority: 'medium', status: 'pending',     dueDate: '2026-06-30', estimatedHours: 2, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'as2', projectId: 'p14', title: 'RRSS - Visuales',               description: '',                      assignedTo: 'u2', serviceId: 's3', priority: 'medium', status: 'pending',     dueDate: '2026-06-30', estimatedHours: 3, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'as3', projectId: 'p14', title: 'RRSS - Programación',           description: '',                      assignedTo: 'u4', serviceId: 's3', priority: 'medium', status: 'pending',     dueDate: '2026-06-30', estimatedHours: 1, loggedTime: 0, createdAt: '2026-06-01' },

  // ── TECNOVEN ───────────────────────────────────────────────────────────────
  { id: 'te1', projectId: 'p15', title: 'Pizarras',                      description: '',                      assignedTo: 'u2', serviceId: 's2', priority: 'low',    status: 'pending',     dueDate: '2026-06-30', estimatedHours: 3, loggedTime: 0, createdAt: '2026-06-01' },

  // ── ADVANTIS ───────────────────────────────────────────────────────────────
  { id: 'ad1', projectId: 'p16', title: 'Auditoría',                     description: '',                      assignedTo: 'u2', serviceId: 's2', priority: 'medium', status: 'done',        dueDate: '2026-06-05', estimatedHours: 4, loggedTime: 0, createdAt: '2026-05-25' },
  { id: 'ad2', projectId: 'p16', title: 'Web - Diseño',                  description: '',                      assignedTo: 'u2', serviceId: 's1', priority: 'high',   status: 'in_progress', dueDate: '2026-06-22', estimatedHours: 10, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'ad3', projectId: 'p16', title: 'Web - Programación',            description: '',                      assignedTo: 'u5', serviceId: 's1', priority: 'high',   status: 'pending',     dueDate: '2026-07-05', estimatedHours: 14, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'ad4', projectId: 'p16', title: 'LinkedIn',                      description: '',                      assignedTo: 'u4', serviceId: 's3', priority: 'medium', status: 'pending',     dueDate: '2026-06-25', estimatedHours: 3, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'ad5', projectId: 'p16', title: 'Factura el 50%',                description: '',                      assignedTo: 'u1', serviceId: 's1', priority: 'high',   status: 'done',        dueDate: '2026-06-05', estimatedHours: 1, loggedTime: 0, createdAt: '2026-06-01' },

  // ── RAÍCES Y TRAZOS ────────────────────────────────────────────────────────
  { id: 'rt1', projectId: 'p17', title: 'Kit Digital - Firma acuerdo',   description: '',                      assignedTo: 'u1', serviceId: 's1', priority: 'high',   status: 'done',        dueDate: '2026-06-05', estimatedHours: 1, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'rt2', projectId: 'p17', title: 'Kit Digital - RRSS informe',    description: '',                      assignedTo: 'u4', serviceId: 's3', priority: 'high',   status: 'pending',     dueDate: '2026-06-20', estimatedHours: 3, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'rt3', projectId: 'p17', title: 'Kit Digital - Propuesta acciones', description: '',                   assignedTo: 'u2', serviceId: 's3', priority: 'high',   status: 'pending',     dueDate: '2026-06-20', estimatedHours: 4, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'rt4', projectId: 'p17', title: 'Dar acceso Analytics',          description: '',                      assignedTo: 'u3', serviceId: 's4', priority: 'medium', status: 'pending',     dueDate: '2026-06-15', estimatedHours: 1, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'rt5', projectId: 'p17', title: 'Manual de uso',                 description: '',                      assignedTo: 'u4', serviceId: 's1', priority: 'low',    status: 'pending',     dueDate: '2026-06-30', estimatedHours: 3, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'rt6', projectId: 'p17', title: 'Lawwwing',                      description: '',                      assignedTo: 'u3', serviceId: 's1', priority: 'low',    status: 'pending',     dueDate: '2026-06-30', estimatedHours: 2, loggedTime: 0, createdAt: '2026-06-01' },

  // ── APB24 ──────────────────────────────────────────────────────────────────
  { id: 'ap1', projectId: 'p18', title: 'Web Kit Digital - Diseño',      description: '',                      assignedTo: 'u2', serviceId: 's1', priority: 'high',   status: 'pending',     dueDate: '2026-06-25', estimatedHours: 10, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'ap2', projectId: 'p18', title: 'Web Kit Digital - Programación',description: '',                      assignedTo: 'u5', serviceId: 's1', priority: 'high',   status: 'pending',     dueDate: '2026-07-10', estimatedHours: 14, loggedTime: 0, createdAt: '2026-06-01' },

  // ── SHOP AND ROLL ──────────────────────────────────────────────────────────
  { id: 'sr1', projectId: 'p19', title: 'Propuesta SEO',                 description: '',                      assignedTo: 'u3', serviceId: 's4', priority: 'low',    status: 'done',        dueDate: '2026-06-05', estimatedHours: 2, loggedTime: 0, createdAt: '2026-06-01' },

  // ── OM RETAIL ──────────────────────────────────────────────────────────────
  { id: 'om1', projectId: 'p20', title: 'Web de venta',                  description: '',                      assignedTo: 'u5', serviceId: 's1', priority: 'high',   status: 'pending',     dueDate: '2026-07-01', estimatedHours: 20, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'om2', projectId: 'p20', title: 'Factura 30% + LinkedIn',        description: '',                      assignedTo: 'u1', serviceId: 's3', priority: 'high',   status: 'done',        dueDate: '2026-06-05', estimatedHours: 1, loggedTime: 0, createdAt: '2026-06-01' },

  // ── MERCI ──────────────────────────────────────────────────────────────────
  { id: 'me1', projectId: 'p21', title: 'Newsletter - Propuesta',        description: '',                      assignedTo: 'u2', serviceId: 's10', priority: 'medium', status: 'done',       dueDate: '2026-06-05', estimatedHours: 2, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'me2', projectId: 'p21', title: 'Pendiente VAT',                 description: '',                      assignedTo: 'u1', serviceId: 's10', priority: 'high',   status: 'done',       dueDate: '2026-06-05', estimatedHours: 1, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'me3', projectId: 'p21', title: 'Facturar',                      description: '',                      assignedTo: 'u1', serviceId: 's10', priority: 'high',   status: 'done',       dueDate: '2026-06-05', estimatedHours: 1, loggedTime: 0, createdAt: '2026-06-01' },

  // ── DOS MANOS ──────────────────────────────────────────────────────────────
  { id: 'dm1', projectId: 'p22', title: 'Web',                           description: '',                      assignedTo: 'u2', serviceId: 's1', priority: 'medium', status: 'pending',     dueDate: '2026-07-15', estimatedHours: 10, loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'dm2', projectId: 'p22', title: 'Redes',                         description: '',                      assignedTo: 'u4', serviceId: 's3', priority: 'medium', status: 'pending',     dueDate: '2026-07-15', estimatedHours: 4,  loggedTime: 0, createdAt: '2026-06-01' },
  { id: 'dm3', projectId: 'p22', title: 'Catálogo',                      description: '',                      assignedTo: 'u2', serviceId: 's6', priority: 'low',    status: 'pending',     dueDate: '2026-07-15', estimatedHours: 6,  loggedTime: 0, createdAt: '2026-06-01' },

  // ── VEOLI ──────────────────────────────────────────────────────────────────
  { id: 've1', projectId: 'p23', title: 'Bolas de Navidad extras',       description: '',                      assignedTo: 'u2', serviceId: 's2', priority: 'low',    status: 'done',        dueDate: '2026-06-01', estimatedHours: 3, loggedTime: 0, createdAt: '2026-05-20' },
  { id: 've2', projectId: 'p23', title: 'Carnaval de Cádiz',             description: '',                      assignedTo: 'u2', serviceId: 's2', priority: 'low',    status: 'done',        dueDate: '2026-06-01', estimatedHours: 4, loggedTime: 0, createdAt: '2026-05-20' },
  { id: 've3', projectId: 'p23', title: 'Bolas - Smile + Reyes Magos',  description: '',                      assignedTo: 'u2', serviceId: 's2', priority: 'low',    status: 'done',        dueDate: '2026-06-01', estimatedHours: 3, loggedTime: 0, createdAt: '2026-05-20' },

  // ── ZAC ────────────────────────────────────────────────────────────────────
  { id: 'za1', projectId: 'p24', title: 'Plantillas El Brinco',          description: '',                      assignedTo: 'u2', serviceId: 's2', priority: 'low',    status: 'done',        dueDate: '2026-06-01', estimatedHours: 2, loggedTime: 0, createdAt: '2026-05-20' },

  // ── SANDRA ALEGRE ──────────────────────────────────────────────────────────
  { id: 'sa1', projectId: 'p25', title: 'Branding',                      description: '',                      assignedTo: 'u2', serviceId: 's2', priority: 'medium', status: 'pending',     dueDate: '2026-07-01', estimatedHours: 12, loggedTime: 0, createdAt: '2026-06-01' },

  // ── SEICO ──────────────────────────────────────────────────────────────────
  { id: 'se1', projectId: 'p26', title: 'Vinilos y corpóreos',           description: '',                      assignedTo: 'u2', serviceId: 's2', priority: 'medium', status: 'pending',     dueDate: '2026-06-25', estimatedHours: 5, loggedTime: 0, createdAt: '2026-06-01' },
]

// ─── HELPERS ──────────────────────────────────────────────────────────────────
export function loadFromStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : fallback
  } catch {
    return fallback
  }
}

export function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function formatTime(seconds) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) return `${h}h ${m}m`
  if (m > 0) return `${m}m ${s}s`
  return `${s}s`
}

export function formatHours(seconds) {
  return (seconds / 3600).toFixed(1) + 'h'
}
