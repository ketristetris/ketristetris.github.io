const FIELDS = {
    name: 'field_name',
    profession: 'field_profession',
    email: 'field_email',
    contactHeading: 'field_contact_heading',
    interests: 'field_interests',
    experienceDates: 'field_experience_dates',
    roleNames: 'field_role_names',
    aboutWork: 'field_about_work',
    jobPoints: 'field_job_points',
    educationYears: 'field_education_years',
    majors: 'field_education_majors',
    tags: 'field_education_tags',
    schools: 'field_education_schools'
};

// сохраняем исходные значения
document.addEventListener('DOMContentLoaded', () => {
    const DEFAULTS = {
        name: document.querySelector('.greetings-name').textContent,
        profession: document.querySelector('.greetings-profession').textContent,
        email: document.querySelector('.contact-email').textContent,
        contactHeading: document.querySelector('.contact-heading').textContent
    };

    const getDefaultsFromQuery = (selector) => {
        return Array.from(document.querySelectorAll(selector)).map(el => el.textContent);
    };

    const DEFAULT_INTERESTS = getDefaultsFromQuery('.interest');
    const DEFAULT_DATES = getDefaultsFromQuery('.job-date');
    const DEFAULT_ROLES = getDefaultsFromQuery('.role-name');
    const DEFAULT_ABOUT = getDefaultsFromQuery('.about-work');
    const DEFAULT_POINTS = getDefaultsFromQuery('.job-points li');
    const DEFAULT_YEARS = getDefaultsFromQuery('.education-card .year');
    const DEFAULT_MAJORS = getDefaultsFromQuery('.education-card .major');
    const DEFAULT_TAGS = getDefaultsFromQuery('.education-card .tags');
    const DEFAULT_SCHOOLS = getDefaultsFromQuery('.education-card .school-name');

    const clearButton = document.getElementById('clear');
    if (!clearButton) return;

    clearButton.addEventListener('click', () => {

        // удаляем всё из localStorage
        Object.values(FIELDS).forEach(key => {
            localStorage.removeItem(key);
        });

        // восстанавливаем исходные значения
        document.querySelector('.greetings-name').textContent = DEFAULTS.name;
        document.querySelector('.greetings-profession').textContent = DEFAULTS.profession;
        document.querySelector('.contact-email').textContent = DEFAULTS.email;
        document.querySelector('.contact-heading').textContent = DEFAULTS.contactHeading;

        document.querySelectorAll('.interest').forEach((el, i) => {
            el.textContent = DEFAULT_INTERESTS[i];
        });

        document.querySelectorAll('.job-date').forEach((el, i) => {
            el.textContent = DEFAULT_DATES[i];
        });

        document.querySelectorAll('.role-name').forEach((el, i) => {
            el.textContent = DEFAULT_ROLES[i];
        });

        document.querySelectorAll('.about-work').forEach((el, i) => {
            el.textContent = DEFAULT_ABOUT[i];
        });

        document.querySelectorAll('.job-points li').forEach((el, i) => {
            el.textContent = DEFAULT_POINTS[i];
        });

        document.querySelectorAll('.education-card .year').forEach((el, i) => {
            el.textContent = DEFAULT_YEARS[i];
        });

        document.querySelectorAll('.education-card .major').forEach((el, i) => {
            el.textContent = DEFAULT_MAJORS[i];
        });

        document.querySelectorAll('.education-card .tags').forEach((el, i) => {
            el.textContent = DEFAULT_TAGS[i];
        });

        document.querySelectorAll('.education-card .school-name').forEach((el, i) => {
            el.textContent = DEFAULT_SCHOOLS[i];
        });

        location.reload();
    });
});