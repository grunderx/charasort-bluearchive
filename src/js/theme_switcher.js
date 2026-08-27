const themeIdSessionKey = '_currentThemeId';
const themes = {
  '1': { name: 'Blue (default)', value:'default' },
  '2': { name: 'Green', value: 'green', }
}

function setTheme(themeId) {
  let theme = themes[themeId];

  if (theme === undefined || themeId === '1') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', theme.value);
  }
}

function getCurrentThemeId() {
  let themeId = localStorage.getItem(themeIdSessionKey);
  if (themeId === null) {
    themeId = 1;
  }
  return themeId;
}

function setCurrentThemeId(themeId) {
  localStorage.setItem(themeIdSessionKey, themeId);
}

document.addEventListener('DOMContentLoaded', () => {
  const themeSwitcher = document.getElementById('theme-switcher');
  
  // Check selected theme and apply
  const currentThemeId = getCurrentThemeId();
  setTheme(currentThemeId);

  // Load theme options
  for (const k in themes) {
    const opt = document.createElement('option');
    opt.value = k;
    opt.textContent = themes[k].name;
    if (k === currentThemeId) {
      opt.selected = true;
    }
    themeSwitcher.appendChild(opt);
  }

  themeSwitcher.addEventListener('change', (event) => {
    // Change the theme
    const selectedThemeId = event.target.value;
    setTheme(selectedThemeId);
    setCurrentThemeId(selectedThemeId);
  });
});