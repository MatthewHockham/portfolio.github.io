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
        tags: ['Python', 'Streamlit'],
        embedBlocked: true,
        icon: 'fa-address-book',
        launchNote: 'This app is built with Streamlit, which prevents it from loading inside an iframe for security reasons. + '
        + ' Click the button below to open it in a new tab - it\'s fully live and interactive!' 
    },
    game: {
        title: 'Unity 2D Game',
        subtitle: 'Team Project - Unity Engine',
        url: 'https://game.mhockham.co.uk/',
        tags: ['Unity', 'C#', 'Team Project'],
        embedBlocked: false,
        wrapClass= 'game-embed'
    },
    mobile: {
        title: 'Android Mobile App',
        subtitle: 'Built with Android Studio, Java & XML',
        url: 'https://mhockham.co.uk/MobileApp/',
        tags: ['Java', 'Android', 'XML', 'Appetize.io'],
        embedBlocked: true,
        icon: 'fa-mobile-screen',
        launchNote: 'This app is built with Appetize.io which blockes embedding inside iframes. + '
        + ' Click the button below to open the live Android emulator in a new tab - it\'s fully live and interactive!'
    },
    facerec: {
        title: 'Facial Recognition Applicaiton',
        subtitle: 'Python, Computer Vision & Machine Learning',
        url: 'https://github.com/',
        tags: ['Python', 'Machine Learning', 'OpenCV', 'Git'],
        embedBlocked: true,
        icon: 'fa-eye',
        launchNote: 'This was a collaborative college project - I contributed to building a facial recognition application + '
        + ' in Python, working with computer vision libraries. The team used Git and GitHub throughout the version control and +'
        + ' task coordination. I do not have a link to this for intellectual property purposes.'
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

    const iframeWrap = document.getElementById('modal-iframe-wrap');

    if (p.embedBlocked) {
        iframeWrap.innerHTML = `
        <div style="
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            height: 100%; gap: 28px; padding: 40px; text-align: center;
        ">
            <div style="
                width: 80px; height: 80px; border-radius: 50%; background: var(--teal-glow); border: 1px solid rgba(62,207,178,0.3);
                display: flex; align-items: center; justify-content: center;
            ">
                <i class="fa-solid ${p.icon}" style="font-size: 32px; color: var(--teal);"></i>
            </div>
            <div style="max-width: 420px;">
                <div style="font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; margin-bottom: 12px;">${p.title}</div>
                <p style="font-size: 14px; color: var(--text-muted); line-height: 1.7; margin: 0 0 28px;">${p.launchNote}</p>
                <a href="${p.url}" target="_blank" class="btn-primary" style="display: inline-flex";">
                    Launch Project <i class="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
            </div>
        </div>`;
    } else {
        if (p.wrapClass) iframeWrap.classList.add(p.wrapClass);
        iframeWrap.innerHTML = `
          <div class="modal-loading" id="modal-loading" style="display: flex;">
            <i class="fa-solid fa-spinner"></i>
            <span>Loading project...</span>
          </div>
          <iframe src="${p.url}" title="${p.title}" allowfullscreen
            allow="autoplay; gamepad"
            style="position: absolute;inset: 0;width: 100%;height: 100%;border: none;opacity: 0;transition: opacity 0.3s;"
            onload="this.style.opacity='1'; document.getElementById('modal-loading').style.display='none';">
          </iframe>`;
      }

    document.getElementById('modal-backdrop').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modal-backdrop').classList.remove('open');
    const wrap = document.getElementById('modal-iframe-wrap');
    wrap.innerHTML = '';
    wrap.className = 'modal-iframe-wrap';
    document.body.style.overflow = '';
}

function handleBackdropClick(e) {
    if (e.target === document.getElementById('modal-backdrop')) closeModal();
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
});

