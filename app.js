const GRADES = [
  { label: 'A+  — 10 pts', value: 10 },
  { label: 'A   —  9 pts', value: 9  },
  { label: 'B+  —  8 pts', value: 8  },
  { label: 'B   —  7 pts', value: 7  },
  { label: 'C+  —  6 pts', value: 6  },
  { label: 'C   —  5 pts', value: 5  },
  { label: 'D   —  4 pts', value: 4  },
  { label: 'E   —  0 pts', value: 0  },
  { label: 'F   —  0 pts', value: 0  },
];

const REMARKS = [
  { min: 9,    label: 'Outstanding',  cls: 'remark-outstanding' },
  { min: 8,    label: 'Excellent',    cls: 'remark-excellent'   },
  { min: 6.5,  label: 'Good',         cls: 'remark-good'        },
  { min: 5,    label: 'Average',      cls: 'remark-average'     },
  { min: 0,    label: 'Below Average',cls: 'remark-below'       },
];

let rowCount = 0;
const list = document.getElementById('subject-list');

function gradeOptions() {
  return GRADES.map(g =>
    `<option value="${g.value}">${g.label}</option>`
  ).join('');
}

function addRow(name = '', credits = '', gradeVal = 10) {
  rowCount++;
  const id = rowCount;
  const row = document.createElement('div');
  row.className = 'subject-row';
  row.id = `row-${id}`;
  row.setAttribute('role', 'listitem');
  row.innerHTML = `
    <input type="text" placeholder="e.g. Mathematics" value="${name}"
      aria-label="Subject name" autocomplete="off" />
    <input type="number" min="1" max="10" step="1"
      placeholder="4" value="${credits}"
      aria-label="Credits for subject" />
    <select aria-label="Grade received">${gradeOptions()}</select>
    <button class="del-row-btn" onclick="removeRow(${id})" aria-label="Remove this subject">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      </svg>
    </button>
  `;

  // Set selected grade after inserting
  const sel = row.querySelector('select');
  sel.value = gradeVal;

  list.appendChild(row);
  hideResult();
  hideError();
}

function removeRow(id) {
  const el = document.getElementById(`row-${id}`);
  if (!el) return;
  el.style.opacity = '0';
  el.style.transform = 'translateX(8px)';
  el.style.transition = 'opacity 0.15s, transform 0.15s';
  setTimeout(() => el.remove(), 150);
  hideResult();
}

function calculate() {
  const rows = list.querySelectorAll('.subject-row');
  if (rows.length === 0) {
    showError('Add at least one subject before calculating.');
    return;
  }

  let totalCredits = 0;
  let weightedSum = 0;
  let hasError = false;

  rows.forEach(row => {
    const nameInput = row.querySelectorAll('input')[0];
    const creditInput = row.querySelectorAll('input')[1];
    const sel = row.querySelector('select');

    const credits = parseFloat(creditInput.value);
    const gp = parseFloat(sel.value);

    if (!creditInput.value || isNaN(credits) || credits <= 0) {
      creditInput.style.borderColor = 'var(--red)';
      hasError = true;
    } else {
      creditInput.style.borderColor = '';
    }

    if (!hasError) {
      totalCredits += credits;
      weightedSum += credits * gp;
    }
  });

  if (hasError) {
    showError('Please enter valid credit values (greater than 0) for all subjects.');
    return;
  }

  hideError();

  const sgpa = weightedSum / totalCredits;
  const rounded = Math.round(sgpa * 100) / 100;
  const pct = (sgpa / 10) * 100;

  document.getElementById('sgpa-display').textContent = rounded.toFixed(2);
  document.getElementById('result-meta').textContent =
    `${rows.length} subject${rows.length > 1 ? 's' : ''} · ${totalCredits} total credit${totalCredits !== 1 ? 's' : ''}`;

  const remark = REMARKS.find(r => sgpa >= r.min) || REMARKS[REMARKS.length - 1];
  const remarkEl = document.getElementById('result-remark');
  remarkEl.textContent = remark.label;
  remarkEl.className = `result-remark ${remark.cls}`;

  const resultArea = document.getElementById('result-area');
  resultArea.classList.remove('hidden');

  // Animate bar after a tick so transition fires
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.getElementById('result-bar').style.width = `${Math.min(pct, 100)}%`;
    });
  });

  resultArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function reset() {
  list.innerHTML = '';
  rowCount = 0;
  hideResult();
  hideError();
  addRow();
  addRow();
  addRow();
}

function hideResult() {
  const r = document.getElementById('result-area');
  r.classList.add('hidden');
  document.getElementById('result-bar').style.width = '0%';
}

function hideError() {
  const e = document.getElementById('error-msg');
  e.classList.add('hidden');
  e.textContent = '';
}

function showError(msg) {
  const e = document.getElementById('error-msg');
  e.textContent = msg;
  e.classList.remove('hidden');
}

// Wire up buttons
document.getElementById('add-btn').addEventListener('click', () => addRow());
document.getElementById('calc-btn').addEventListener('click', calculate);
document.getElementById('reset-btn').addEventListener('click', reset);

// Enter key triggers calculate
document.addEventListener('keydown', e => {
  if (e.key === 'Enter') calculate();
});

// Init with 3 rows
addRow();
addRow();
addRow();
