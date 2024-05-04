function loadNav() {
    const navElement = document.getElementById('nav-container');
    fetch('../components/navigation/navigation.html')
        .then(response => response.text())
        .then(data => {
            navElement.innerHTML = data;
        });
}

window.onload = loadNav;