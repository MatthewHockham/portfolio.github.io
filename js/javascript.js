new Typed('.hero-typed', {
    strings: ['Software Developer', 'Web Developer', 'Python Programmer', 'Game Developer', 'Computing Graduate'],
    typeSpeed: 35,
    backSpeed: 20,
    backDelay: 2000,
    loop: true
});

const projects = {
    phonebook: {
        title: 'Python Phonebook',
        subtitle: 'Built with Python & Streamlit',
        url: 'https://matthewhockham-phonebook.streamlit.app/',
        tags: ['Python', 'Streamlit']
    },
    game: {
        title: 'Unity 2D Game',
        subtitle: 'Team Project - Unity Engine',
        url: 'https://game.mhockham.co.uk/',
        tags: ['Unity', 'C#', 'Team Project']
    },
    mobile: {
        title: 'Android Mobile App',
        subtitle: 'Built with Android Studio, Java & XML',
        url: 'https://mhockham.co.uk/MobileApp/',
        tags: ['Java', 'Android', 'XML', 'Appetize.io']
    }
};

function openModal(key) {
    const p = projects[key];
    document.getElementById('modal-title').textContent = p.title;
    document.getElementById('modal-subtitle').textContent = p.subtitle;
    document.getElementById('modal-ext-link').href = p.url;

    const tagsEl = document.getElementById('modal-tags');
    tagsEl.innerHTML = p.tags.map(t =>
        `<span class="project-tag">${t}</span>`
    ).join('');

    document.getElementById('modal-loading').style.display = 'flex';
    const iframe = document.getElementById('modal-iframe');
    iframe.style.opacity = '0';
    iframe.src = p.url;

    document.getElementById('modal-backdrop').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function iframeLoaded() {
    document.getElementById('modal-loading').style.display = 'none';
    const iframe = document.getElementById('modal-iframe');
    iframe.style.opacity = '1';
    iframe.style.transition = 'opacity 0.3s';
}

function closeModal() {
    document.getElementById('modal-backdrop').classList.remove('open');
    document.getElementById('modal-iframe').src = '';
    document.body.style.overflow = '';
}

function handleBackdropClick(e) {
    if (e.target === document.getElementById('modal-backdrop')) closeModal();
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
});