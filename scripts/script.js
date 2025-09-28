// JavaScript Document Noah Veder

// Selecteer het hart-knopje waarmee je iets kunt opslaan
const heartBtn = document.querySelector('.heart-btn');
// Selecteer het pop-up element dat aangeeft dat iets is opgeslagen/verwijderd
const opslaanPopUp = document.querySelector('.opslaanPopUp');
// Selecteer de sluitknop in de pop-up om deze handmatig te kunnen sluiten
const sluitPopUp = document.querySelector('.sluitPopUp');

let isSaved = false; // Houdt bij of het item momenteel 'opgeslagen' is (true/false)

// Luister naar klik op het hart-knopje
heartBtn.addEventListener('click', () => {
  isSaved = !isSaved; // Wissel de status om: opgeslagen wordt niet opgeslagen, andersom

  // Voeg of verwijder de 'active' class op het hartje (bijv. verandert kleur)
  heartBtn.classList.toggle('active');

  // Pas de tekst in de popup aan afhankelijk van de status
  if (isSaved) {
    opslaanPopUp.querySelector('p').textContent = 'Vagstranda werd opgeslagen in mijn lijst';
  } else {
    opslaanPopUp.querySelector('p').textContent = 'Vagstranda werd verwijderd van mijn lijst';
  }

  // Toon de popup door 'hidden' te verwijderen en 'show' toe te voegen
  opslaanPopUp.classList.remove('hidden');
  opslaanPopUp.classList.add('show');

  // Zorg dat eerdere timers om de popup te verbergen niet blijven hangen
  clearTimeout(opslaanPopUp.hideTimeout);
  // Zet een nieuwe timer om de popup na 3 seconden weer te verbergen
  opslaanPopUp.hideTimeout = setTimeout(() => {
    opslaanPopUp.classList.remove('show');
  }, 3000);
});

// Luister naar klik op de sluitknop van de popup om deze handmatig te sluiten
sluitPopUp.addEventListener('click', () => {
  opslaanPopUp.classList.remove('show');
});

// ----------------------------
// DONKER THEMA en LICHT THEMA
// ----------------------------

// Selecteer de knop die het thema wisselt
const themeToggleBtn = document.getElementById('themeToggleBtn');

// Functie om het thema te bepalen op basis van de voorkeur van de gebruiker
function applyPreferredTheme() {
  // Check of het systeem voorkeur voor donker thema heeft
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-mode'); // Voeg klasse toe voor donker thema
  } else {
    document.body.classList.remove('dark-mode'); // Verwijder klasse voor licht thema
  }
}

// Roep meteen aan bij het laden van de pagina
applyPreferredTheme();

// Luister naar veranderingen in systeem voorkeur (optioneel, fijn voor dynamisch wisselen)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (e.matches) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
});

// Wissel thema bij klik op de thema-knop
themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// ----------------------------
// Slider voor lettergrootte aanpassen
// ----------------------------

// Selecteer het input element (range slider) waarmee je lettergrootte kunt aanpassen
const fontSizeRange = document.getElementById('fontSizeRange');

// Originele fontgroottes als basiswaarden
const originalSizes = {
  base: 16,
  small: 12,
  medium: 14,
  large: 24
};

// Luister naar veranderingen op de slider
fontSizeRange.addEventListener('input', () => {
  // Bepaal de schaalfactor op basis van sliderwaarde ten opzichte van basisfontgrootte
  const scale = fontSizeRange.value / originalSizes.base;

  // Pas CSS custom properties (variabelen) aan voor fontgroottes
  document.documentElement.style.setProperty('--font-size-base', fontSizeRange.value + 'px');
  document.documentElement.style.setProperty('--font-size-small', (originalSizes.small * scale).toFixed(2) + 'px');
  document.documentElement.style.setProperty('--font-size-medium', (originalSizes.medium * scale).toFixed(2) + 'px');
  document.documentElement.style.setProperty('--font-size-large', (originalSizes.large * scale).toFixed(2) + 'px');
});

// ----------------------------
// Modal (postcode popup) functionaliteit
// ----------------------------

// Selecteer de modal zelf
const modal = document.querySelector('.modal');
// Selecteer de trigger knop (de link/button met aria-label 'Vul je postcode in')
const trigger = document.querySelector('[aria-label="Vul je postcode in"]');
// Selecteer de knop binnenin de modal om deze te sluiten
const button = modal.querySelector('button');

// Open de modal bij klikken op de trigger
trigger.addEventListener('click', e => {
  e.preventDefault(); // Voorkom standaard link-actie
  modal.classList.add('active'); // Voeg class toe die modal zichtbaar maakt
  document.body.classList.add('modal-open'); // Voorkom scrollen op de achtergrond
});

// Sluit modal bij klik op de sluitknop binnen de modal
button.addEventListener('click', () => {
  modal.classList.remove('active');
  document.body.classList.remove('modal-open');
});

// Sluit modal bij klikken buiten de inhoud (op de overlay)
modal.addEventListener('click', e => {
  if (e.target === modal) { // Check of klik op overlay zelf is
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
  }
});

// ----------------------------
// Hamburger menu open/close functionaliteit
// ----------------------------

// Selecteer de knop die het hamburger menu opent
const openButton = document.querySelector('button[aria-label="Open menu"]');
// Selecteer de knop in het menu om te sluiten
const closeButton = document.querySelector('section.menu button[aria-label="Sluit menu"]');
// Selecteer het menu element zelf
const menu = document.querySelector('section.menu');

// Open menu bij klik op hamburger knop
openButton.addEventListener('click', () => {
  menu.classList.add('active'); // Maak menu zichtbaar
  document.body.classList.add('menu-open'); // Voorkom scrollen op achtergrond
});

// Sluit menu bij klik op sluit knop
closeButton.addEventListener('click', () => {
  menu.classList.remove('active'); // Verberg menu
  document.body.classList.remove('menu-open'); // Sta scrollen weer toe
});

// Klikken buiten content hoeft hier niet behandeld te worden,
// want het menu neemt het hele scherm in en sluitknop is expliciet aanwezig.
