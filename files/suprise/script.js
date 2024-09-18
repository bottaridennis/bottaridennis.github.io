function getRandomBrightColor() {
    // Genera un colore casuale in tonalità accese
    const letters = '0123456789ABCDEF';
    let color = '#';
    
    // Limitiamo la gamma per ottenere colori accesi
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 10) + 6]; // Evita numeri bassi per avere colori più brillanti
    }
    
    return color;
  }
  
  function changeBackgroundColor() {
    // Seleziona gli elementi con la classe specificata
    const elements = document.querySelectorAll('.spinner');
    
    // Cambia il colore di sfondo di ciascun elemento
    elements.forEach((element) => {
      element.style.backgroundColor = getRandomBrightColor();
    });
  }
  
  // Cambia il colore ogni secondo
  setInterval(changeBackgroundColor, 350);
  