// Targetting Dom Elements
const loginForm = document.getElementById('loginForm');
const createForm = document.getElementById('createForm');
const login = document.getElementById('login');
const create = document.getElementById('create');
const title = document.getElementById('title');

// Event Listener Functions
const click = (element, task) => {
    return(element.addEventListener('click', task));
}
const showSections = (hide, show) => {
    hide.className = 'hide';
    show.className = '';
}

// Handling events
click(login, () => {
    title.innerHTML = 'Sign In';
    showSections(createForm, loginForm);
});

click(create, () => {
    title.innerHTML = 'Sign Up';
    showSections(loginForm, createForm);
});