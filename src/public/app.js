const els = {
  refreshBtn: document.getElementById('refreshBtn'),
  healthDot: document.getElementById('healthDot'),
  bookingForm: document.getElementById('bookingForm'),
  customerForm: document.getElementById('customerForm'),
  menuForm: document.getElementById('menuForm'),
  bookingMessage: document.getElementById('bookingMessage'),
  customerMessage: document.getElementById('customerMessage'),
  menuMessage: document.getElementById('menuMessage'),
  customerSelect: document.getElementById('customer_id'),
  bookingsBody: document.getElementById('bookingsBody'),
  customersList: document.getElementById('customersList'),
  menuGrid: document.getElementById('menuGrid'),
  bookingsCount: document.getElementById('bookingsCount'),
  customersCount: document.getElementById('customersCount'),
  menuCount: document.getElementById('menuCount')
};

const fmtMoney = (value) => `LKR ${Number(value).toFixed(2)}`;

function setMessage(element, text, type = 'ok') {
  element.textContent = text;
  element.style.color =
    type === 'ok' ? '#2f8f5b' : type === 'warn' ? '#b85e00' : '#b31a2a';
}

function clearMessages() {
  setMessage(els.bookingMessage, '');
  setMessage(els.customerMessage, '');
  setMessage(els.menuMessage, '');
}

function normalizeTime(t) {
  if (!t) return '';
  return t.length === 5 ? `${t}:00` : t;
}

async function api(path, options = {}) {
  const res = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });

  const contentType = res.headers.get('content-type') || '';
  const data = contentType.includes('application/json')
    ? await res.json()
    : await res.text();

  if (!res.ok) {
    const message = data?.error || data?.message || `Request failed: ${res.status}`;
    throw new Error(message);
  }

  return data;
}

function renderCustomers(customers) {
  els.customersCount.textContent = customers.length;

  els.customerSelect.innerHTML =
    '<option value="">Select customer</option>' +
    customers
      .map((c) => `<option value="${c.customer_id}">${c.full_name} (${c.phone})</option>`)
      .join('');

  els.customersList.innerHTML = customers
    .map(
      (c) =>
        `<li><span><strong>${c.full_name}</strong></span><span>${c.phone}</span></li>`
    )
    .join('');
}

function renderBookings(bookings) {
  els.bookingsCount.textContent = bookings.length;

  if (!bookings.length) {
    els.bookingsBody.innerHTML = '<tr><td colspan="6">No bookings found.</td></tr>';
    return;
  }

  els.bookingsBody.innerHTML = bookings
    .map(
      (b) => `
      <tr>
        <td>${b.booking_id}</td>
        <td>${String(b.booking_date).slice(0, 10)}</td>
        <td>${String(b.booking_time).slice(0, 5)}</td>
        <td>${b.table_number}</td>
        <td>${b.number_of_guests}</td>
        <td>${b.full_name || b.customer_id}</td>
      </tr>
    `
    )
    .join('');
}

function renderMenu(items) {
  els.menuCount.textContent = items.length;

  if (!items.length) {
    els.menuGrid.innerHTML = '<p>No menu items found.</p>';
    return;
  }

  els.menuGrid.innerHTML = items
    .map(
      (m) => `
      <div class="menu-item">
        <p><strong>${m.item_name}</strong></p>
        <p>${m.category}</p>
        <p>${fmtMoney(m.cost)}</p>
      </div>
    `
    )
    .join('');
}

async function checkHealth() {
  try {
    await api('/health');
    els.healthDot.textContent = 'API online';
    els.healthDot.style.color = '#2f8f5b';
  } catch {
    els.healthDot.textContent = 'API offline';
    els.healthDot.style.color = '#b31a2a';
  }
}

async function refreshAll() {
  try {
    clearMessages();
    const [customers, bookings, menu] = await Promise.all([
      api('/api/customers'),
      api('/api/bookings'),
      api('/api/menu')
    ]);
    renderCustomers(customers);
    renderBookings(bookings);
    renderMenu(menu);
  } catch (err) {
    setMessage(els.bookingMessage, err.message, 'error');
  }
}

els.bookingForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const payload = {
    booking_date: document.getElementById('booking_date').value,
    booking_time: normalizeTime(document.getElementById('booking_time').value),
    table_number: Number(document.getElementById('table_number').value),
    number_of_guests: Number(document.getElementById('number_of_guests').value),
    customer_id: Number(document.getElementById('customer_id').value)
  };

  try {
    await api('/api/bookings', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    setMessage(els.bookingMessage, 'Booking created successfully.', 'ok');
    els.bookingForm.reset();
    await refreshAll();
  } catch (err) {
    if (err.message.toLowerCase().includes('already booked')) {
      setMessage(els.bookingMessage, err.message, 'warn');
      return;
    }
    setMessage(els.bookingMessage, err.message, 'error');
  }
});

els.customerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const payload = {
    full_name: document.getElementById('customer_full_name').value.trim(),
    phone: document.getElementById('customer_phone').value.trim()
  };

  try {
    await api('/api/customers', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    setMessage(els.customerMessage, 'Customer created successfully.', 'ok');
    els.customerForm.reset();
    await refreshAll();
  } catch (err) {
    setMessage(els.customerMessage, err.message, 'error');
  }
});

els.menuForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const payload = {
    item_name: document.getElementById('menu_item_name').value.trim(),
    category: document.getElementById('menu_category').value,
    cost: Number(document.getElementById('menu_cost').value),
    ingredients: document.getElementById('menu_ingredients').value.trim() || null
  };

  try {
    await api('/api/menu', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    setMessage(els.menuMessage, 'Menu item created successfully.', 'ok');
    els.menuForm.reset();
    await refreshAll();
  } catch (err) {
    setMessage(els.menuMessage, err.message, 'error');
  }
});

els.refreshBtn.addEventListener('click', refreshAll);

(async function init() {
  await checkHealth();
  await refreshAll();
})();
