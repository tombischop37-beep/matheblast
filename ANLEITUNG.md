# MatheBlast – Deployment Anleitung

## Einmalige Einrichtung

### 1. GitHub Konto erstellen
→ https://github.com/signup

### 2. Neues Repository erstellen
- Name: `matheblast`
- Public ✓
- README NICHT hinzufügen

### 3. Dateien hochladen
Alle Dateien aus diesem Ordner direkt in das Repository ziehen
(NICHT in einem Unterordner!)

### 4. GitHub Pages aktivieren
- Repository → Settings → Pages
- Source: "Deploy from a branch"
- Branch: `main` / Ordner: `/ (root)`
- Save

→ Deine URL wird: `https://DEIN-USERNAME.github.io/matheblast/`

---

## Stripe Payment Link einrichten

### 5. Payment Link erstellen
- https://dashboard.stripe.com → Payment Links → Create
- Produkt: "MatheBlast 4. Klasse freischalten"
- Preis: 2,00 € / Einmalig
- Nach Zahlung → Redirect: `https://DEIN-USERNAME.github.io/matheblast/?payment=success`
- Link erstellen → URL kopieren (z.B. `https://buy.stripe.com/abc123`)

### 6. Payment Link in index.html eintragen
In `index.html` diese Zeile suchen:
```
const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/HIER_EINTRAGEN';
```
Ersetzen mit deinem echten Link:
```
const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/dein-echter-link';
```

### 7. Datei speichern und auf GitHub hochladen
- Geänderte `index.html` auf GitHub hochladen (drag & drop)
- Warten bis GitHub Pages neu deployt (~2 Minuten)

---

## Fertig! 🎮

Das Spiel läuft unter:
`https://DEIN-USERNAME.github.io/matheblast/`

**Kein Backend, kein Server, keine Kosten!**

---

## Wie die Zahlung funktioniert
1. Nutzer klickt "Jetzt freischalten"
2. → Weiterleitung zu Stripe (sicher, zuverlässig)
3. Zahlung abgeschlossen
4. → Stripe leitet zurück zur Spiel-URL mit `?payment=success`
5. Spiel erkennt das und schaltet 4. Klasse dauerhaft frei
6. URL wird automatisch gesäubert

