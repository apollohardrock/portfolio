
function updateProfileInfo(profileData) {

    const photo = document.getElementById('profile.photo')
    photo.src = profileData.photo
    photo.alt = profileData.name 

    const name = document.getElementById('profile.name')
    name.innerText = profileData.name

    const job = document.getElementById('profile.job')
    job.innerText = profileData.job

    const location = document.getElementById('profile.location')
    location.innerText = profileData.location

    const phone = document.getElementById('profile.phone')
    phone.innerText = profileData.phone

    const email = document.getElementById('profile.email')
    email.innerText = profileData.email

}

function updateHardSkills(profileData) {
    const hardSkills = document.getElementById('profile.skills.hardskills')
    hardSkills.innerHTML = profileData.skills.hardSkills.map(skill => `<li><img src="${skill.logo}" alt="${skill.name}" title="${skill.name}"></li>`).join('')

}

function updateSoftSkills(profileData) {
    const softSkills = document.getElementById('profile.skills.softskills')
    softSkills.innerHTML = profileData.skills.softSkills.map(skill => `<li>${skill}</li>`).join('')

}

function updateLanguages(profileData) {
    const languages = document.getElementById('profile.languages')
    languages.innerHTML = profileData.languages.map(languages => `<li>${languages}</li>`).join('')

}

function updateProjects(profileData) {
    const projects = document.getElementById('profile.projects')
    projects.innerHTML = profileData.projects.map(projects =>{
        return `
            <li>
                <h3 ${projects.github ? 'class="github"' : 'class="www"'}>${projects.name}</h3>
                <a href="${projects.url}" target="_blank">${projects.url}</a>
            </li>
        `
    }).join('')

}

function updateCertifications(profileData) {
    const certifications = document.getElementById('profile.certifications')
    certifications.innerHTML = profileData.certifications.map(certifications =>{
        return `
            <li>
                <h3>${certifications.name}</h3>
                <p>Date: ${certifications.period}</p>
                <a href="${certifications.url}" target="_blank">${certifications.url}</a>
            </li>
        `
    }).join('')

}

(async () => {
    const profileData = await fetchProfileData ()
    updateProfileInfo(profileData)
    updateHardSkills(profileData)
    updateSoftSkills(profileData)
    updateLanguages(profileData)
    updateProjects(profileData)
    updateCertifications(profileData)

})()