// ./js/save-data.js

// Ключи для localStorage
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

// Функции для работы с localStorage
function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorage(key, defaultValue) {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
}

// Основная логика: загрузка и редактирование
document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        name: document.querySelector('.greetings-name'),
        profession: document.querySelector('.greetings-profession'),
        email: document.querySelector('.contact-email'),
        contactHeading: document.querySelector('.contact-heading'),
        interests: document.querySelectorAll('.interest'),
        experienceDates: document.querySelectorAll('.job-date'),
        roleNames: document.querySelectorAll('.role-name'),
        aboutWork: document.querySelectorAll('.about-work'),
        jobPoints: document.querySelectorAll('.job-points li'),
        educationYears: document.querySelectorAll('.education-card .year'),
        majors: document.querySelectorAll('.education-card .major'),
        tags: document.querySelectorAll('.education-card .tags'),
        schools: document.querySelectorAll('.education-card .school-name')
    };

    // Загружаем сохранённые значения
    elements.name.textContent = loadFromStorage(FIELDS.name, elements.name.textContent);
    elements.profession.textContent = loadFromStorage(FIELDS.profession, elements.profession.textContent);
    elements.email.textContent = loadFromStorage(FIELDS.email, elements.email.textContent);
    elements.contactHeading.textContent = loadFromStorage(FIELDS.contactHeading, elements.contactHeading.textContent);

    // Универсальная функция для списков
    const updateList = (list, savedKey) => {
        const saved = loadFromStorage(savedKey, []);
        list.forEach((el, i) => {
            el.textContent = saved[i] || el.textContent;
        });
    };

    updateList(elements.interests, FIELDS.interests);
    updateList(elements.experienceDates, FIELDS.experienceDates);
    updateList(elements.roleNames, FIELDS.roleNames);
    updateList(elements.aboutWork, FIELDS.aboutWork);
    updateList(elements.jobPoints, FIELDS.jobPoints);
    updateList(elements.educationYears, FIELDS.educationYears);
    updateList(elements.majors, FIELDS.majors);
    updateList(elements.tags, FIELDS.tags);
    updateList(elements.schools, FIELDS.schools);

    // Делаем отдельные элементы редактируемыми
    const makeEditable = (el, key) => {
        el.addEventListener('blur', () => {
            saveToStorage(key, el.textContent);
        });
    };

    // Делаем списки редактируемыми
    const makeListEditable = (list, key) => {
        list.forEach(el => {
            el.addEventListener('blur', () => {
                const values = Array.from(list).map(item => item.textContent);
                saveToStorage(key, values);
            });
        });
    };

    // Применяем ко всем полям
    makeEditable(elements.name, FIELDS.name);
    makeEditable(elements.profession, FIELDS.profession);
    makeEditable(elements.email, FIELDS.email);
    makeEditable(elements.contactHeading, FIELDS.contactHeading);

    makeListEditable(elements.interests, FIELDS.interests);
    makeListEditable(elements.experienceDates, FIELDS.experienceDates);
    makeListEditable(elements.roleNames, FIELDS.roleNames);
    makeListEditable(elements.aboutWork, FIELDS.aboutWork);
    makeListEditable(elements.jobPoints, FIELDS.jobPoints);
    makeListEditable(elements.educationYears, FIELDS.educationYears);
    makeListEditable(elements.majors, FIELDS.majors);
    makeListEditable(elements.tags, FIELDS.tags);
    makeListEditable(elements.schools, FIELDS.schools);
});