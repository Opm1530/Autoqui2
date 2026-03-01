import { dbService } from '../services/db';
import { authService } from '../services/auth';
import { toast } from '../services/toast';
import { confirm } from '../services/confirm';

interface Appointment {
    id: string;
    companyId: string;
    clientName: string;
    clientPhone: string;
    serviceId: string;
    serviceName: string;
    servicePrice: number;
    date: string; // YYYY-MM-DD
    time: string; // HH:MM
    duration: number; // minutes
    status: 'agendado' | 'confirmado' | 'concluido' | 'cancelado';
    notes?: string;
    storeId?: string;
}

interface Service {
    id: string;
    name: string;
    price: number;
    duration?: number;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: string }> = {
    agendado: { label: 'Agendado', color: '#6366f1', icon: 'fa-clock' },
    confirmado: { label: 'Confirmado', color: '#10b981', icon: 'fa-circle-check' },
    concluido: { label: 'Concluído', color: '#64748b', icon: 'fa-flag-checkered' },
    cancelado: { label: 'Cancelado', color: '#ef4444', icon: 'fa-ban' },
};

const pad = (n: number) => String(n).padStart(2, '0');

const formatDate = (dateStr: string) => {
    const [y, m, d] = dateStr.split('-');
    return `${d}/${m}/${y}`;
};

const formatPrice = (n: number) =>
    n?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) ?? 'R$ 0,00';

const todayStr = () => {
    const d = new Date();
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

export const Schedule = async () => {
    const currentUser = authService.getCurrentUser() as any;
    if (!currentUser || !currentUser.companyId) {
        return `<p>Usuário sem empresa.</p>`;
    }

    const companyId = currentUser.companyId;

    // Check module
    const companyDoc = await dbService.get('companies', companyId) as any;
    const modulos = companyDoc?.modulos_ativos || [];
    if (!modulos.includes('agendamento')) {
        return `
            <div class="card" style="text-align:center; padding: 3rem;">
                <i class="fa-solid fa-calendar-xmark" style="font-size:3rem; color: var(--text-dim); margin-bottom:1rem; display:block;"></i>
                <h2>Módulo de Agendamento</h2>
                <p style="color:var(--text-muted);">O módulo de IA Agendamento não está ativo para esta conta.<br>Entre em contato com o administrador para ativá-lo.</p>
            </div>`;
    }

    // Load services (products with module agendamento)
    const allProducts = await dbService.getAll('products', { field: 'companyId', operator: '==', value: companyId }) as Service[];
    const services = allProducts.filter((p: any) => p.active !== false);

    // Load appointments
    let appointments = await dbService.getAll('agendamentos', { field: 'companyId', operator: '==', value: companyId }) as Appointment[];

    let selectedDate = todayStr();
    let viewMode: 'day' | 'week' | 'list' = 'day';

    // ── Helpers ───────────────────────────────────────────────────────────────
    const getWeekDays = (dateStr: string) => {
        const base = new Date(dateStr + 'T12:00:00');
        const day = base.getDay(); // 0 = Sun
        const monday = new Date(base);
        monday.setDate(base.getDate() - ((day === 0 ? 7 : day) - 1));
        return Array.from({ length: 7 }, (_, i) => {
            const d = new Date(monday);
            d.setDate(monday.getDate() + i);
            return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
        });
    };

    const getAppointmentsForDate = (dateStr: string) =>
        appointments.filter(a => a.date === dateStr).sort((a, b) => a.time.localeCompare(b.time));

    const getWeekAppointments = (days: string[]) =>
        appointments.filter(a => days.includes(a.date)).sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));

    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    const getDayName = (dateStr: string) => {
        const d = new Date(dateStr + 'T12:00:00');
        return dayNames[d.getDay()];
    };

    const getMonthYear = (dateStr: string) => {
        const d = new Date(dateStr + 'T12:00:00');
        return `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
    };

    // ── Render status badge ───────────────────────────────────────────────────
    const statusBadge = (status: string) => {
        const cfg = STATUS_CONFIG[status] || STATUS_CONFIG['agendado'];
        return `<span class="sched-badge" style="background:${cfg.color}22;color:${cfg.color};border-color:${cfg.color}44;">
            <i class="fa-solid ${cfg.icon}"></i> ${cfg.label}
        </span>`;
    };

    // ── Render appointment card ───────────────────────────────────────────────
    const appointmentCard = (a: Appointment) => {
        const cfg = STATUS_CONFIG[a.status] || STATUS_CONFIG['agendado'];
        return `
        <div class="sched-card" data-id="${a.id}" style="border-left-color: ${cfg.color};">
            <div class="sched-card-time">
                <span class="sched-time">${a.time}</span>
                <span class="sched-duration">${a.duration || 30}min</span>
            </div>
            <div class="sched-card-body">
                <div class="sched-client">
                    <i class="fa-solid fa-user"></i>
                    <strong>${a.clientName}</strong>
                    <span class="sched-phone"><i class="fa-brands fa-whatsapp"></i> ${a.clientPhone}</span>
                </div>
                <div class="sched-service">
                    <i class="fa-solid fa-list-check"></i>
                    <span>${a.serviceName}</span>
                    <span class="sched-price">${formatPrice(a.servicePrice)}</span>
                </div>
                ${a.notes ? `<div class="sched-notes"><i class="fa-solid fa-note-sticky"></i> ${a.notes}</div>` : ''}
                ${statusBadge(a.status)}
            </div>
            <div class="sched-card-actions">
                ${a.status === 'agendado' ? `<button class="sched-action-btn confirm" onclick="window.confirmAppointment('${a.id}')" title="Confirmar"><i class="fa-solid fa-check"></i></button>` : ''}
                ${a.status === 'confirmado' ? `<button class="sched-action-btn done" onclick="window.completeAppointment('${a.id}')" title="Concluir"><i class="fa-solid fa-flag-checkered"></i></button>` : ''}
                <button class="sched-action-btn edit" onclick="window.editAppointment('${a.id}')" title="Editar"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="sched-action-btn cancel" onclick="window.cancelAppointment('${a.id}')" title="Cancelar/Excluir"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>`;
    };

    // ── Render day view ───────────────────────────────────────────────────────
    const renderDayView = () => {
        const appts = getAppointmentsForDate(selectedDate);
        const total = appts.reduce((s, a) => s + (a.servicePrice || 0), 0);
        return `
        <div class="sched-day-header">
            <button class="sched-nav-btn" id="prev-day"><i class="fa-solid fa-chevron-left"></i></button>
            <div class="sched-day-info">
                <span class="sched-day-name">${getDayName(selectedDate)}</span>
                <span class="sched-day-date">${formatDate(selectedDate)}</span>
                <span class="sched-day-month">${getMonthYear(selectedDate)}</span>
            </div>
            <button class="sched-nav-btn" id="next-day"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
        <div class="sched-stats-row">
            <div class="sched-stat"><i class="fa-solid fa-calendar-check"></i> <strong>${appts.length}</strong> agendamentos</div>
            <div class="sched-stat"><i class="fa-solid fa-dollar-sign"></i> <strong>${formatPrice(total)}</strong> previsão</div>
            <div class="sched-stat"><i class="fa-solid fa-circle-check" style="color:#10b981"></i> <strong>${appts.filter(a => a.status === 'confirmado').length}</strong> confirmados</div>
        </div>
        <div class="sched-appointments-list" id="appointments-list">
            ${appts.length === 0 ? `
            <div class="sched-empty">
                <i class="fa-solid fa-calendar-xmark"></i>
                <p>Nenhum agendamento para este dia.</p>
                <button class="btn-primary" id="btn-add-for-day" style="margin-top:1rem;">
                    <i class="fa-solid fa-plus"></i> Novo Agendamento
                </button>
            </div>` : appts.map(appointmentCard).join('')}
        </div>`;
    };

    // ── Render week view ──────────────────────────────────────────────────────
    const renderWeekView = () => {
        const days = getWeekDays(selectedDate);
        const appts = getWeekAppointments(days);
        return `
        <div class="sched-week-header">
            <button class="sched-nav-btn" id="prev-week"><i class="fa-solid fa-chevron-left"></i></button>
            <span class="sched-week-label">Semana de ${formatDate(days[0])} a ${formatDate(days[6])}</span>
            <button class="sched-nav-btn" id="next-week"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
        <div class="sched-week-grid">
            ${days.map(day => {
            const dayAppts = appts.filter(a => a.date === day);
            const isToday = day === todayStr();
            const isSelected = day === selectedDate;
            return `
                <div class="sched-week-col ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}" data-date="${day}" onclick="window.selectWeekDay('${day}')">
                    <div class="sched-week-col-header">
                        <span class="sched-wday">${getDayName(day)}</span>
                        <span class="sched-wdate">${day.split('-')[2]}</span>
                        ${dayAppts.length > 0 ? `<span class="sched-wcount">${dayAppts.length}</span>` : ''}
                    </div>
                    <div class="sched-week-appts">
                        ${dayAppts.map(a => {
                const cfg = STATUS_CONFIG[a.status] || STATUS_CONFIG['agendado'];
                return `<div class="sched-week-item" style="border-left-color:${cfg.color};" onclick="event.stopPropagation(); window.editAppointment('${a.id}')">
                                <span class="sched-wtime">${a.time}</span>
                                <span class="sched-wclient">${a.clientName}</span>
                            </div>`;
            }).join('')}
                    </div>
                </div>`;
        }).join('')}
        </div>`;
    };

    // ── Render list view ──────────────────────────────────────────────────────
    const renderListView = () => {
        const sorted = [...appointments].sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
        const upcoming = sorted.filter(a => a.date >= todayStr() && a.status !== 'cancelado');
        const past = sorted.filter(a => a.date < todayStr() || a.status === 'cancelado');
        return `
        <div class="sched-list-section">
            <div class="sched-list-title"><i class="fa-solid fa-clock"></i> Próximos agendamentos (${upcoming.length})</div>
            ${upcoming.length === 0 ? `<p style="color:var(--text-dim);padding:1rem;">Nenhum agendamento futuro.</p>` : ''}
            ${upcoming.map(a => `
                <div class="sched-list-row">
                    <div class="sched-list-date">
                        <span>${formatDate(a.date)}</span>
                        <span>${a.time}</span>
                    </div>
                    <div class="sched-list-info">
                        <strong>${a.clientName}</strong>
                        <span>${a.serviceName}</span>
                    </div>
                    <div>${formatPrice(a.servicePrice)}</div>
                    <div>${statusBadge(a.status)}</div>
                    <div class="sched-list-actions">
                        ${a.status === 'agendado' ? `<button class="sched-action-btn confirm" onclick="window.confirmAppointment('${a.id}')" title="Confirmar"><i class="fa-solid fa-check"></i></button>` : ''}
                        <button class="sched-action-btn edit" onclick="window.editAppointment('${a.id}')" title="Editar"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button class="sched-action-btn cancel" onclick="window.cancelAppointment('${a.id}')" title="Excluir"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>`).join('')}
        </div>
        ${past.length > 0 ? `
        <div class="sched-list-section" style="margin-top:2rem; opacity:0.7;">
            <div class="sched-list-title"><i class="fa-solid fa-history"></i> Histórico (${past.length})</div>
            ${past.slice(0, 10).map(a => `
                <div class="sched-list-row">
                    <div class="sched-list-date"><span>${formatDate(a.date)}</span><span>${a.time}</span></div>
                    <div class="sched-list-info"><strong>${a.clientName}</strong><span>${a.serviceName}</span></div>
                    <div>${formatPrice(a.servicePrice)}</div>
                    <div>${statusBadge(a.status)}</div>
                    <div style="width:60px;"></div>
                </div>`).join('')}
        </div>` : ''}`;
    };

    // ── Modal ─────────────────────────────────────────────────────────────────
    const timeSlots = Array.from({ length: 28 }, (_, i) => {
        const h = Math.floor(i / 2) + 8; // 8:00 to 21:30
        const m = i % 2 === 0 ? '00' : '30';
        return `${pad(h)}:${m}`;
    });

    const modalHtml = `
    <div id="sched-modal" class="modal hidden">
        <div class="modal-content glass" style="max-width:560px; width:95%;">
            <span class="close-modal" id="close-sched-modal">&times;</span>
            <h2 id="sched-modal-title" style="margin-bottom:0.25rem;">Novo Agendamento</h2>
            <p class="text-muted" style="font-size:0.9rem; margin-bottom:1.5rem;">Preencha os dados do agendamento.</p>

            <div style="display:grid; gap:1rem;">
                <div class="form-group">
                    <label class="form-label">Cliente</label>
                    <input type="text" id="sched-client-name" class="form-input" placeholder="Nome do cliente" required>
                </div>
                <div class="form-group">
                    <label class="form-label">WhatsApp do Cliente</label>
                    <input type="tel" id="sched-client-phone" class="form-input" placeholder="Ex: 11999999999">
                </div>
                <div class="form-group">
                    <label class="form-label">Serviço</label>
                    <select id="sched-service" class="form-input">
                        <option value="">Selecione um serviço...</option>
                        ${services.map(s => `<option value="${s.id}" data-price="${s.price}" data-duration="${s.duration || 30}">${s.name} — ${formatPrice(s.price)}</option>`).join('')}
                    </select>
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
                    <div class="form-group">
                        <label class="form-label">Data</label>
                        <input type="date" id="sched-date" class="form-input" value="${selectedDate}">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Horário</label>
                        <select id="sched-time" class="form-input">
                            ${timeSlots.map(t => `<option value="${t}">${t}</option>`).join('')}
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Duração (minutos)</label>
                    <input type="number" id="sched-duration" class="form-input" value="30" min="15" max="480" step="15">
                </div>
                <div class="form-group">
                    <label class="form-label">Status</label>
                    <select id="sched-status" class="form-input">
                        <option value="agendado">⏰ Agendado</option>
                        <option value="confirmado">✅ Confirmado</option>
                        <option value="concluido">🏁 Concluído</option>
                        <option value="cancelado">❌ Cancelado</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Observações</label>
                    <textarea id="sched-notes" class="form-input" rows="3" style="resize:vertical;" placeholder="Alguma informação extra..."></textarea>
                </div>
            </div>

            <div style="display:flex; justify-content:flex-end; gap:0.75rem; margin-top:1.5rem; padding-top:1rem; border-top:1px solid var(--border-color);">
                <button class="btn-secondary" id="cancel-sched-modal">Cancelar</button>
                <button class="btn-primary" id="save-sched-btn" style="min-width:140px;">
                    <i class="fa-solid fa-save"></i> Salvar
                </button>
            </div>
        </div>
    </div>`;

    // ── Setup listeners (deferred) ────────────────────────────────────────────
    setTimeout(() => setupScheduleListeners(), 100);

    // ── Render view content ───────────────────────────────────────────────────
    const renderContent = () => {
        const container = document.getElementById('sched-view-content');
        if (!container) return;
        if (viewMode === 'day') container.innerHTML = renderDayView();
        else if (viewMode === 'week') container.innerHTML = renderWeekView();
        else container.innerHTML = renderListView();
        attachViewListeners();
    };

    const attachViewListeners = () => {
        // Day navigation
        document.getElementById('prev-day')?.addEventListener('click', () => {
            const d = new Date(selectedDate + 'T12:00:00');
            d.setDate(d.getDate() - 1);
            selectedDate = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
            renderContent();
        });
        document.getElementById('next-day')?.addEventListener('click', () => {
            const d = new Date(selectedDate + 'T12:00:00');
            d.setDate(d.getDate() + 1);
            selectedDate = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
            renderContent();
        });
        // Week navigation
        document.getElementById('prev-week')?.addEventListener('click', () => {
            const d = new Date(selectedDate + 'T12:00:00');
            d.setDate(d.getDate() - 7);
            selectedDate = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
            renderContent();
        });
        document.getElementById('next-week')?.addEventListener('click', () => {
            const d = new Date(selectedDate + 'T12:00:00');
            d.setDate(d.getDate() + 7);
            selectedDate = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
            renderContent();
        });
        // "Add for this day" button
        document.getElementById('btn-add-for-day')?.addEventListener('click', () => {
            openModal();
        });
    };

    function openModal(appointment?: Appointment) {
        const modal = document.getElementById('sched-modal');
        if (!modal) return;

        const titleEl = document.getElementById('sched-modal-title');
        const nameEl = document.getElementById('sched-client-name') as HTMLInputElement;
        const phoneEl = document.getElementById('sched-client-phone') as HTMLInputElement;
        const serviceEl = document.getElementById('sched-service') as HTMLSelectElement;
        const dateEl = document.getElementById('sched-date') as HTMLInputElement;
        const timeEl = document.getElementById('sched-time') as HTMLSelectElement;
        const durationEl = document.getElementById('sched-duration') as HTMLInputElement;
        const statusEl = document.getElementById('sched-status') as HTMLSelectElement;
        const notesEl = document.getElementById('sched-notes') as HTMLTextAreaElement;
        const saveBtn = document.getElementById('save-sched-btn');

        if (appointment) {
            titleEl!.innerText = 'Editar Agendamento';
            nameEl.value = appointment.clientName;
            phoneEl.value = appointment.clientPhone;
            serviceEl.value = appointment.serviceId;
            dateEl.value = appointment.date;
            timeEl.value = appointment.time;
            durationEl.value = String(appointment.duration || 30);
            statusEl.value = appointment.status;
            notesEl.value = appointment.notes || '';
            saveBtn!.setAttribute('data-edit-id', appointment.id);
        } else {
            titleEl!.innerText = 'Novo Agendamento';
            nameEl.value = '';
            phoneEl.value = '';
            serviceEl.value = '';
            dateEl.value = selectedDate;
            timeEl.value = '09:00';
            durationEl.value = '30';
            statusEl.value = 'agendado';
            notesEl.value = '';
            saveBtn!.removeAttribute('data-edit-id');
        }

        modal.classList.remove('hidden');
    }

    function setupScheduleListeners() {
        // Modal open button
        document.getElementById('btn-new-appointment')?.addEventListener('click', () => openModal());

        // Modal close
        document.getElementById('close-sched-modal')?.addEventListener('click', () => {
            document.getElementById('sched-modal')?.classList.add('hidden');
        });
        document.getElementById('cancel-sched-modal')?.addEventListener('click', () => {
            document.getElementById('sched-modal')?.classList.add('hidden');
        });

        // Auto-fill duration from selected service
        document.getElementById('sched-service')?.addEventListener('change', (e) => {
            const sel = e.target as HTMLSelectElement;
            const opt = sel.options[sel.selectedIndex];
            const dur = opt.dataset.duration;
            if (dur) {
                (document.getElementById('sched-duration') as HTMLInputElement).value = dur;
            }
        });

        // Save
        document.getElementById('save-sched-btn')?.addEventListener('click', async () => {
            const nameEl = document.getElementById('sched-client-name') as HTMLInputElement;
            const phoneEl = document.getElementById('sched-client-phone') as HTMLInputElement;
            const serviceEl = document.getElementById('sched-service') as HTMLSelectElement;
            const dateEl = document.getElementById('sched-date') as HTMLInputElement;
            const timeEl = document.getElementById('sched-time') as HTMLSelectElement;
            const durationEl = document.getElementById('sched-duration') as HTMLInputElement;
            const statusEl = document.getElementById('sched-status') as HTMLSelectElement;
            const notesEl = document.getElementById('sched-notes') as HTMLTextAreaElement;
            const saveBtn = document.getElementById('save-sched-btn') as HTMLButtonElement;

            if (!nameEl.value.trim()) { toast.warning('Informe o nome do cliente.'); return; }
            if (!serviceEl.value) { toast.warning('Selecione um serviço.'); return; }
            if (!dateEl.value) { toast.warning('Informe a data.'); return; }

            const selectedOpt = serviceEl.options[serviceEl.selectedIndex];
            const serviceData = {
                serviceId: serviceEl.value,
                serviceName: selectedOpt.text.split(' — ')[0],
                servicePrice: parseFloat(selectedOpt.dataset.price || '0'),
            };

            const data: Omit<Appointment, 'id'> = {
                companyId,
                clientName: nameEl.value.trim(),
                clientPhone: phoneEl.value.trim(),
                ...serviceData,
                date: dateEl.value,
                time: timeEl.value,
                duration: parseInt(durationEl.value) || 30,
                status: statusEl.value as Appointment['status'],
                notes: notesEl.value.trim() || undefined,
            };

            const editId = saveBtn.getAttribute('data-edit-id');

            saveBtn.disabled = true;
            saveBtn.innerHTML = '<div class="spinner-small"></div> Salvando...';

            try {
                if (editId) {
                    await dbService.update('agendamentos', editId, data);
                    const idx = appointments.findIndex(a => a.id === editId);
                    if (idx !== -1) appointments[idx] = { id: editId, ...data };
                    toast.success('Agendamento atualizado!');
                } else {
                    const newId = await dbService.create('agendamentos', data) as string;
                    appointments.push({ id: newId, ...data });
                    toast.success('Agendamento criado com sucesso!');
                }

                document.getElementById('sched-modal')?.classList.add('hidden');
                renderContent();
            } catch (err) {
                toast.error('Erro ao salvar agendamento: ' + err);
            } finally {
                saveBtn.disabled = false;
                saveBtn.innerHTML = '<i class="fa-solid fa-save"></i> Salvar';
            }
        });

        // View mode tabs
        document.querySelectorAll('.sched-view-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.sched-view-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                viewMode = (tab as HTMLElement).dataset.view as any;
                renderContent();
            });
        });

        // Date jumper
        document.getElementById('sched-date-jump')?.addEventListener('change', (e) => {
            selectedDate = (e.target as HTMLInputElement).value;
            renderContent();
        });

        // Today button
        document.getElementById('btn-today')?.addEventListener('click', () => {
            selectedDate = todayStr();
            (document.getElementById('sched-date-jump') as HTMLInputElement).value = selectedDate;
            renderContent();
        });

        // Global window functions
        (window as any).editAppointment = (id: string) => {
            const a = appointments.find(ap => ap.id === id);
            if (a) openModal(a);
        };

        (window as any).confirmAppointment = async (id: string) => {
            try {
                await dbService.update('agendamentos', id, { status: 'confirmado' });
                const a = appointments.find(ap => ap.id === id);
                if (a) a.status = 'confirmado';
                renderContent();
                toast.success('Agendamento confirmado!');
            } catch { toast.error('Erro ao confirmar.'); }
        };

        (window as any).completeAppointment = async (id: string) => {
            try {
                await dbService.update('agendamentos', id, { status: 'concluido' });
                const a = appointments.find(ap => ap.id === id);
                if (a) a.status = 'concluido';
                renderContent();
                toast.success('Agendamento concluído!');
            } catch { toast.error('Erro ao concluir.'); }
        };

        (window as any).cancelAppointment = async (id: string) => {
            const ok = await confirm.danger('Excluir Agendamento', 'Deseja excluir este agendamento? Esta ação não pode ser desfeita.');
            if (!ok) return;
            try {
                await dbService.delete('agendamentos', id);
                appointments = appointments.filter(a => a.id !== id);
                renderContent();
                toast.success('Agendamento excluído.');
            } catch { toast.error('Erro ao excluir.'); }
        };

        (window as any).selectWeekDay = (date: string) => {
            selectedDate = date;
            viewMode = 'day';
            document.querySelectorAll('.sched-view-tab').forEach(t => {
                t.classList.toggle('active', (t as HTMLElement).dataset.view === 'day');
            });
            (document.getElementById('sched-date-jump') as HTMLInputElement).value = date;
            renderContent();
        };

        // Initial render
        renderContent();
    }

    return `
    <style>
        /* ── Schedule page styles ── */
        .sched-toolbar {
            display: flex;
            align-items: center;
            gap: 1rem;
            flex-wrap: wrap;
            margin-bottom: 1.5rem;
        }
        .sched-view-tabs {
            display: flex;
            background: var(--surface-hover);
            border: 1px solid var(--border-color);
            border-radius: 10px;
            padding: 3px;
            gap: 2px;
        }
        .sched-view-tab {
            padding: 6px 16px;
            border-radius: 8px;
            font-size: 0.85rem;
            font-weight: 600;
            color: var(--text-muted);
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .sched-view-tab:hover { color: var(--text-main); background: rgba(255,255,255,0.05); }
        .sched-view-tab.active { background: var(--primary); color: #fff; box-shadow: 0 2px 8px var(--primary-glow); }

        .sched-date-jump { background: var(--surface-hover); border: 1px solid var(--border-color); border-radius: 8px; padding: 6px 12px; color: var(--text-main); font-size:0.85rem; cursor:pointer; }

        .sched-nav-btn { width:36px; height:36px; border-radius:8px; background:var(--surface-hover); border:1px solid var(--border-color); color:var(--text-main); display:flex;align-items:center;justify-content:center; transition:all 0.2s; }
        .sched-nav-btn:hover { background: var(--primary); color: #fff; border-color: var(--primary); }

        /* Day view */
        .sched-day-header { display:flex; align-items:center; gap:1rem; margin-bottom:1.5rem; }
        .sched-day-info { text-align:center; flex:1; }
        .sched-day-name { display:block; font-size:0.8rem; font-weight:700; text-transform:uppercase; color:var(--text-dim); letter-spacing:1px; }
        .sched-day-date { display:block; font-size:2rem; font-weight:800; color:var(--text-main); line-height:1; margin: 2px 0; }
        .sched-day-month { display:block; font-size:0.9rem; color:var(--text-muted); }

        .sched-stats-row { display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap; }
        .sched-stat { display:flex; align-items:center; gap:8px; background:var(--surface-hover); border:1px solid var(--border-color); border-radius:10px; padding:10px 16px; font-size:0.9rem; color:var(--text-muted); flex:1; min-width:140px; }
        .sched-stat strong { color:var(--text-main); }

        .sched-appointments-list { display:flex; flex-direction:column; gap:0.75rem; }
        .sched-empty { text-align:center; padding:4rem 2rem; color:var(--text-dim); }
        .sched-empty i { font-size:3rem; margin-bottom:1rem; display:block; opacity:0.4; }

        /* Appointment card */
        .sched-card { display:flex; gap:1rem; background:var(--surface-hover); border:1px solid var(--border-color); border-left:4px solid var(--primary); border-radius:12px; padding:1rem 1.25rem; transition:all 0.2s; align-items:flex-start; }
        .sched-card:hover { border-color: rgba(99,102,241,0.4); transform:translateX(2px); }
        .sched-card-time { display:flex; flex-direction:column; align-items:center; min-width:55px; }
        .sched-time { font-size:1.2rem; font-weight:800; color:var(--text-main); }
        .sched-duration { font-size:0.72rem; color:var(--text-dim); background:rgba(255,255,255,0.06); padding:2px 6px; border-radius:4px; margin-top:4px; }

        .sched-card-body { flex:1; display:flex; flex-direction:column; gap:6px; }
        .sched-client { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
        .sched-client strong { font-size:1rem; color:var(--text-main); }
        .sched-phone { font-size:0.8rem; color:var(--text-dim); display:flex; align-items:center; gap:4px; }
        .sched-service { display:flex; align-items:center; gap:8px; font-size:0.9rem; color:var(--text-muted); }
        .sched-price { font-weight:700; color:var(--text-main); margin-left:auto; }
        .sched-notes { font-size:0.82rem; color:var(--text-dim); background:rgba(255,255,255,0.03); padding:4px 8px; border-radius:6px; border:1px solid var(--border-color); }

        .sched-badge { display:inline-flex; align-items:center; gap:5px; font-size:0.75rem; font-weight:700; padding:3px 10px; border-radius:20px; border:1px solid; width:fit-content; margin-top:4px; }

        .sched-card-actions { display:flex; flex-direction:column; gap:6px; }
        .sched-action-btn { width:32px; height:32px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:0.85rem; transition:all 0.2s; border:1px solid var(--border-color); background:var(--surface-hover); color:var(--text-muted); }
        .sched-action-btn:hover { transform:scale(1.1); }
        .sched-action-btn.confirm:hover { background:#10b98122; color:#10b981; border-color:#10b981; }
        .sched-action-btn.done:hover { background:#6366f122; color:#6366f1; border-color:#6366f1; }
        .sched-action-btn.edit:hover { background:#f59e0b22; color:#f59e0b; border-color:#f59e0b; }
        .sched-action-btn.cancel:hover { background:#ef444422; color:#ef4444; border-color:#ef4444; }

        /* Week view */
        .sched-week-header { display:flex; align-items:center; gap:1rem; justify-content:space-between; margin-bottom:1.25rem; }
        .sched-week-label { font-size:0.95rem; font-weight:700; color:var(--text-main); }
        .sched-week-grid { display:grid; grid-template-columns:repeat(7, 1fr); gap:8px; }
        .sched-week-col { background:var(--surface-hover); border:1px solid var(--border-color); border-radius:10px; overflow:hidden; cursor:pointer; transition:all 0.2s; min-height:160px; }
        .sched-week-col:hover { border-color:rgba(99,102,241,0.4); }
        .sched-week-col.today .sched-week-col-header { background:rgba(99,102,241,0.15); }
        .sched-week-col.selected { border-color:var(--primary); box-shadow:0 0 0 1px var(--primary); }
        .sched-week-col-header { padding:8px 10px; display:flex; flex-direction:column; align-items:center; border-bottom:1px solid var(--border-color); position:relative; }
        .sched-wday { font-size:0.7rem; font-weight:700; text-transform:uppercase; color:var(--text-dim); letter-spacing:0.5px; }
        .sched-wdate { font-size:1.4rem; font-weight:800; color:var(--text-main); }
        .sched-wcount { position:absolute; top:6px; right:8px; background:var(--primary); color:#fff; border-radius:50%; width:18px; height:18px; font-size:0.7rem; font-weight:700; display:flex; align-items:center; justify-content:center; }
        .sched-week-appts { padding:6px; display:flex; flex-direction:column; gap:4px; }
        .sched-week-item { background:rgba(99,102,241,0.1); border:1px solid rgba(99,102,241,0.2); border-left:3px solid; border-radius:6px; padding:4px 6px; font-size:0.75rem; cursor:pointer; transition:all 0.15s; }
        .sched-week-item:hover { background:rgba(99,102,241,0.2); }
        .sched-wtime { font-weight:700; color:var(--text-main); display:block; }
        .sched-wclient { color:var(--text-muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; display:block; }

        /* List view */
        .sched-list-section { background:var(--surface-hover); border:1px solid var(--border-color); border-radius:12px; overflow:hidden; }
        .sched-list-title { padding:1rem 1.25rem; font-weight:700; display:flex; align-items:center; gap:8px; border-bottom:1px solid var(--border-color); color:var(--text-main); background:rgba(255,255,255,0.02); }
        .sched-list-row { display:grid; grid-template-columns:100px 1fr auto auto auto; align-items:center; gap:1rem; padding:0.75rem 1.25rem; border-bottom:1px solid var(--border-color); transition:background 0.2s; }
        .sched-list-row:last-child { border-bottom:none; }
        .sched-list-row:hover { background:rgba(255,255,255,0.03); }
        .sched-list-date { display:flex; flex-direction:column; font-size:0.85rem; }
        .sched-list-date span:first-child { font-weight:700; color:var(--text-main); }
        .sched-list-date span:last-child { color:var(--text-dim); }
        .sched-list-info { display:flex; flex-direction:column; }
        .sched-list-info strong { color:var(--text-main); font-size:0.95rem; }
        .sched-list-info span { color:var(--text-muted); font-size:0.82rem; }
        .sched-list-actions { display:flex; gap:6px; }

        /* Spinner */
        .spinner-small { width:18px; height:18px; border:2px solid rgba(255,255,255,0.3); border-top-color:white; border-radius:50%; animation:spin 0.8s linear infinite; display:inline-block; }
        @keyframes spin { to { transform: rotate(360deg); } }
    </style>

    <div class="page-header" style="justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
        <div>
            <h2 class="page-title" style="margin-bottom:4px;">
                <i class="fa-solid fa-calendar-alt" style="color:var(--primary); margin-right:10px;"></i>Agenda
            </h2>
            <p style="color:var(--text-muted); font-size:0.9rem;">Gerencie os agendamentos dos seus clientes.</p>
        </div>
        <button id="btn-new-appointment" class="btn-primary">
            <i class="fa-solid fa-plus"></i> Novo Agendamento
        </button>
    </div>

    <div class="sched-toolbar">
        <div class="sched-view-tabs">
            <button class="sched-view-tab active" data-view="day"><i class="fa-solid fa-calendar-day"></i> Dia</button>
            <button class="sched-view-tab" data-view="week"><i class="fa-solid fa-calendar-week"></i> Semana</button>
            <button class="sched-view-tab" data-view="list"><i class="fa-solid fa-list"></i> Lista</button>
        </div>
        <input type="date" id="sched-date-jump" class="sched-date-jump" value="${selectedDate}" title="Ir para data">
        <button id="btn-today" class="btn-secondary" style="padding:6px 14px; font-size:0.85rem;">
            <i class="fa-solid fa-crosshairs"></i> Hoje
        </button>
    </div>

    <div class="card" style="padding:1.5rem;" id="sched-view-content">
        <!-- Dynamically rendered -->
    </div>

    ${modalHtml}`;
};
