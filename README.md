# Dennis Bottari · Portfolio

Sito pubblicato su GitHub Pages (dominio `dennisbottari.it`) tramite la build Vite in `.github/workflows/deploy.yml`.

## Struttura

| Percorso | Cosa contiene |
| --- | --- |
| `index.html` | Landing pixel art: scelta della versione del portfolio. Il cielo segue l'ora (giorno, tramonto, notte) e si può cambiare dal pulsante in basso. |
| `public/dede-os.html` | **Dede.OS**, il portfolio come sistema operativo (pagina statica, copiata così com'è). |
| `public/playground.js` / `.css` | Estensioni di Dede.OS: comandi extra del terminale, temi segreti, achievement, mascotte. |
| `classic/index.html` + `src/` | Versione **Classic** (app React). |
| `public/` | Immagini, audio e giochi: in produzione sono serviti dalla radice del sito (es. `/Dede.png`). |

Per aggiungere una versione alla landing basta modificare l'array `VERSIONS` in `index.html`
(un `href` che inizia con `LINK_` mostra la voce come "In arrivo").

## Sviluppo locale

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # output in dist/
```
