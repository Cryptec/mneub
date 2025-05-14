# Backend für Kontaktformular

Dies ist das Backend für das Kontaktformular der Website. Es verwendet Express.js und Nodemailer, um E-Mails zu versenden.

## Erste Schritte

1. **Umgebungsvariablen einrichten**
   - Kopieren Sie die `.env.example`-Datei zu `.env`
   - Füllen Sie die erforderlichen Einstellungen aus

   ```bash
   cp .env.example .env
   ```

2. **Erforderliche Variablen**
   - `SMTP_HOST`: Ihr SMTP-Server (z.B. smtp.gmail.com)
   - `SMTP_PORT`: SMTP-Port (meist 587 oder 465)
   - `SMTP_USER`: Ihre E-Mail-Adresse
   - `SMTP_PASS`: Ihr E-Mail-Passwort oder App-Passwort
   - `SMTP_FROM`: Absender-E-Mail (kann gleich wie SMTP_USER sein)
   - `SMTP_TO`: Empfänger-E-Mail (wohin die Kontaktanfragen gesendet werden)
   - `PORT`: Port auf dem der Server laufen soll (Standard: 3001)

## Installation

```bash
npm install
```

## Starten des Servers

```bash
# Entwicklung
npm run dev

# Produktion
npm start
```

## API-Endpunkte

- `GET /api/health` - Überprüft, ob die API läuft
- `POST /api/contact` - Sendet eine Kontaktanfrage

### Beispiel für eine Kontaktanfrage

```json
{
  "name": "Max Mustermann",
  "email": "max@example.com",
  "message": "Das ist eine Testnachricht"
}
```

## Sicherheitshinweise

- Geben Sie niemals Ihre E-Mail-Passwörter weiter
- Nutzen Sie für Produktionsumgebungen einen speziellen E-Mail-Account
- Aktivieren Sie die Zwei-Faktor-Authentifizierung für Ihren E-Mail-Account
- Für Gmail müssen Sie möglicherweise "Weniger sichere Apps" aktivieren oder einen App-spezifischen Passwort erstellen
