const FACTS = [
];


const cardsEl = document.getElementById('cards');
const spotlight = document.getElementById('spot-title');
const searchInput = document.getElementById('search');
const surpriseBtn = document.getElementById('surprise');


function renderCards(list) {
    cardsEl.innerHTML = '';
    list.forEach((item, idx) => {
        const card = document.createElement('article');
        card.className = 'card';
        card.tabIndex = 0;
        card.innerHTML = `
<h3 class="title">${escapeHTML(item.title)}</h3>
<p class="fact">${escapeHTML(item.fact)}</p>
<div class="small-meta">
<span>Fact #${idx + 1}</span>
<button aria-label="Show in spotlight" data-index="${idx}" class="btn" style="padding:6px 8px;font-size:12px;border-radius:8px;">Show</button>
</div>
`;
        cardsEl.appendChild(card);
    });


    // attach small event handlers for 'Show' buttons
    cardsEl.querySelectorAll('button[aria-label]').forEach(btn => {
        btn.addEventListener('click', e => {
            const i = Number(btn.dataset.index);
            showSpotlight(list[i]);
            btn.blur();
        });
    });
}


function showSpotlight(item) {
    spotlight.textContent = `${item.title}: ${item.fact}`;
}


function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}


function escapeHTML(str) {
    return str.replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": "&#39;"
    }[c]));
}


// initial render
renderCards(FACTS);


// Surprise button
surpriseBtn.addEventListener('click', () => {
    const r = pickRandom(FACTS);
    showSpotlight(r);
});


// search filter
searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    if (!q) { renderCards(FACTS); return; }
    const filtered = FACTS.filter(f => (f.title + ' ' + f.fact).toLowerCase().includes(q));
    if (filtered.length === 0) {
        cardsEl.innerHTML = '<div style="padding:20px;color:var(--muted)">No facts found. Try another word.</div>';
    } else {
        renderCards(filtered);
    }
});


// keyboard accessibility: press 's' to surprise
window.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 's' && document.activeElement.tagName !== 'INPUT') {
        surpriseBtn.click();
    }
})