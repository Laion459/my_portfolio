document.addEventListener('DOMContentLoaded', function () {
    // Get the current year and set it as the content of the 'currentYear' element
    const currentYear = new Date().getFullYear();
    document.getElementById('currentYear').textContent = currentYear;
});



