/**
 * WebPrint — Epson L360 Frontend Logic
 */

// 1. Canvas Animation Galaksi
const canvas = document.getElementById('galaxy-canvas');
const ctx = canvas.getContext('2d');
let width, height, stars = [];

function initGalaxy() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    stars = [];
    for (let i = 0; i < 150; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 1.5,
            dy: (Math.random() * 0.4) + 0.1,
            alpha: Math.random()
        });
    }
}

function animateGalaxy() {
    ctx.clearRect(0, 0, width, height);
    stars.forEach(s => {
        s.y -= s.dy;
        if (s.y < 0) {
            s.y = height;
            s.x = Math.random() * width;
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
        ctx.fill();
    });
    requestAnimationFrame(animateGalaxy);
}

window.addEventListener('resize', initGalaxy);
initGalaxy();
animateGalaxy();

// 2. Drag & Drop / Input File Handling
const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('print-file');
const fileDisplay = document.getElementById('file-name-display');

dropzone.addEventListener('click', () => fileInput.click());

['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add('dragover');
    });
});

['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove('dragover');
    });
});

dropzone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    if (files.length) {
        fileInput.files = files;
        updateFileDisplay(files[0].name);
    }
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length) {
        updateFileDisplay(e.target.files[0].name);
    }
});

function updateFileDisplay(name) {
    fileDisplay.textContent = name;
    fileDisplay.style.color = 'var(--brand-gold)';
}

// 3. Tab Switching
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        tabPanels.forEach(p => p.style.display = 'none');
        const activePanel = document.getElementById(`tab-${btn.dataset.tab}`);
        if (activePanel) {
            activePanel.style.display = 'block';
        }
    });
});

// 4. Mock Auth / Session Toggle
const pinForm = document.getElementById('pin-form');
const pinScreen = document.getElementById('pin-screen');
const appScreen = document.getElementById('app');
const logoutBtn = document.getElementById('logout-btn');

pinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    pinScreen.style.display = 'none';
    appScreen.style.display = 'block';
});

logoutBtn.addEventListener('click', () => {
    appScreen.style.display = 'none';
    pinScreen.style.display = 'block';
});