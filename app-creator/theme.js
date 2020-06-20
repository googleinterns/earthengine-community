window.onload = () => {
  const currentTheme = localStorage.getItem('theme');
  const root = document.querySelector('html');
  if (root != null) {
    root.classList.add(currentTheme ?? 'light');
  }
};
