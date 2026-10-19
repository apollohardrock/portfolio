/**
 * ==========================================================================
 * 1. API - BUSCA DE DADOS
 * ==========================================================================
 */
async function fetchProfileData() {
    const url = './assets/data/profile.json';
    const response = await fetch(url);
    return await response.json();
}

/**
 * ==========================================================================
 * 2. ATUALIZAÇÃO DO DOM (Funções de Renderização)
 * ==========================================================================
 */
function updateProfileInfo(profileData) {
    // CORREÇÃO: Todos os IDs agora utilizam hifens para coincidir com o HTML otimizado
    const photo = document.getElementById('profile-photo');
    photo.src = profileData.photo;
    photo.alt = profileData.name;

    const name = document.getElementById('profile-name');
    name.innerText = profileData.name;

    const job = document.getElementById('profile-job');
    job.innerText = profileData.job;

    const location = document.getElementById('profile-location');
    location.innerText = profileData.location;

    const phone = document.getElementById('profile-phone');
    phone.innerText = profileData.phone;
    phone.href = `tel:${profileData.phone}`;

    const email = document.getElementById('profile-email');
    email.innerText = profileData.email;
    email.href = `mailto:${profileData.email}`;
    
    const bio = document.getElementById('profile-bio');
    if(profileData.bio && bio) {
        // Divide o texto onde tem quebra de linha (\n)
        const lines = profileData.bio.split('\n');
        let formattedBio = '';
        let hasList = false;

        lines.forEach(line => {
            let currentLine = line.trim();
            
            // Se a linha começar com '+', transforma em lista
            if (currentLine.startsWith('+')) {
                if (!hasList) {
                    formattedBio += '<ul class="bio-list">';
                    hasList = true;
                }
                
                let text = currentLine.substring(1).trim(); // Remove o sinal de '+'
                
                // Se houver dois-pontos na frase, deixa o título em negrito
                if(text.includes(':')) {
                    const parts = text.split(':');
                    text = `<strong>${parts[0]}:</strong>${parts.slice(1).join(':')}`;
                }
                
                formattedBio += `<li>${text}</li>`;
            } else {
                if (hasList) {
                    formattedBio += '</ul>';
                    hasList = false;
                }
                formattedBio += `<p>${currentLine}</p>`;
            }
        });
        
        if (hasList) formattedBio += '</ul>';

        // Usa innerHTML ao invés de innerText para renderizar as tags de formatação
        bio.innerHTML = formattedBio; 
    }

}

function updateHardSkills(profileData) {
    const hardSkills = document.getElementById('profile-skills-hardskills');
    hardSkills.innerHTML = profileData.skills.hardSkills.map(skill => `<li><img src="${skill.logo}" alt="${skill.name}" title="${skill.name}"></li>`).join('');
}

function updateSoftSkills(profileData) {
    const softSkills = document.getElementById('profile-skills-softskills');
    softSkills.innerHTML = profileData.skills.softSkills.map(skill => `<li>${skill}</li>`).join('');
}

function updateLanguages(profileData) {
    const languages = document.getElementById('profile-languages');
    languages.innerHTML = profileData.languages.map(language => `<li>${language}</li>`).join('');
}

function updateProjects(profileData) {
    const projects = document.getElementById('profile-projects');
    projects.innerHTML = profileData.projects.map(project => {
        return `
            <li>
                <h3 ${project.github ? 'class="github"' : 'class="www"'}>${project.name}</h3>
                <a href="${project.url}" target="_blank">${project.url}</a>
            </li>
        `;
    }).join('');
}

function updateCertifications(profileData) {
    const certifications = document.getElementById('profile-certifications');
    certifications.innerHTML = profileData.certifications.map(cert => {
        return `
            <li>
                <h3>${cert.name}</h3>
                <p>Date: ${cert.period}</p>
                <a href="${cert.url}" target="_blank">${cert.url}</a>
            </li>
        `;
    }).join('');
}

/**
 * ==========================================================================
 * 3. INTERAÇÕES DE UI (Acordeon)
 * ==========================================================================
 */
function initAccordion() {
    const acordeonTriggers = document.querySelectorAll('.acordeon .trigger');

    acordeonTriggers.forEach((trigger) => {
        trigger.addEventListener('click', (e) => {
            const acordeon = trigger.parentElement;
            const isOpen = acordeon.classList.contains('open');

            // Passo 1: Fecha todos os acordeões e reseta a acessibilidade
            acordeonTriggers.forEach((otherTrigger) => {
                otherTrigger.parentElement.classList.remove('open');
                otherTrigger.setAttribute('aria-expanded', 'false');
            });

            // Passo 2: Se o acordeon clicado estava fechado, abre ele
            if (!isOpen) { 
                acordeon.classList.add('open');
                trigger.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

/**
 * ==========================================================================
 * 4. INICIALIZAÇÃO DO SCRIPT
 * ==========================================================================
 */
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Inicia os eventos de clique do acordeon
    initAccordion();

    // 2. Busca os dados e preenche a página
    try {
        const profileData = await fetchProfileData();
        updateProfileInfo(profileData);
        updateHardSkills(profileData);
        updateSoftSkills(profileData);
        updateLanguages(profileData);
        updateProjects(profileData);
        updateCertifications(profileData);
    } catch (error) {
        console.error('Erro ao buscar e preencher os dados do perfil:', error);
    }
});