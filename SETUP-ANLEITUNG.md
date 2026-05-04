# Setup-Anleitung: Förderverein CJD Kita Thorrfalken Website

Diese Anleitung führt Sie Schritt für Schritt durch die technische Einrichtung der Website.

---

## Voraussetzungen

- GitHub-Konto (kostenlos: https://github.com)
- Node.js 20+ installiert (https://nodejs.org)
- Git installiert (https://git-scm.com)

---

## Teil 1: GitHub Repository einrichten

### Schritt 1: Repository erstellen

1. Melden Sie sich auf [github.com](https://github.com) an.
2. Klicken Sie auf **„New repository"** (grüner Button).
3. Einstellungen:
   - **Repository name:** `foerderverein-thorrfalken` (oder beliebig)
   - **Visibility:** `Public` ← Wichtig für GitHub Pages (kostenlos)
   - **Initialize with README:** Nein
4. Klicken Sie auf **„Create repository"**.

### Schritt 2: Projektdateien hochladen

```powershell
# In PowerShell / Terminal:
cd C:\Users\melih\.gemini\antigravity\scratch\kita-thorrfalken

git init
git add .
git commit -m "Initial commit: Kita Thorrfalken Website"
git remote add origin https://github.com/IHR-USERNAME/foerderverein-thorrfalken.git
git push -u origin main
```

---

## Teil 2: GitHub Pages aktivieren

1. Öffnen Sie Ihr Repository auf GitHub.
2. Klicken Sie oben auf **„Settings"**.
3. Im linken Menü: **„Pages"**.
4. Unter **„Source"**: Wählen Sie **„GitHub Actions"**.
5. Speichern.

Der erste Build startet automatisch nach dem Push. Unter dem Tab **„Actions"** können Sie den Fortschritt beobachten.

Nach ca. 3–5 Minuten ist Ihre Seite erreichbar unter:
```
https://IHR-USERNAME.github.io/foerderverein-thorrfalken/
```

---

## Teil 3: Eigene Domain einrichten (optional, empfohlen)

### Schritt 1: CNAME-Datei erstellen

Erstellen Sie die Datei `src/CNAME` (kein Dateiformat) mit Ihrem Domain-Namen:
```
foerderverein-thorrfalken.de
```

Fügen Sie diese Datei zu Eleventy's Passthrough-Kopie hinzu (in `eleventy.config.js` bereits vorbereitet wenn Sie die CNAME Datei in `src/` ablegen).

### Schritt 2: DNS-Einträge beim Hoster konfigurieren

Melden Sie sich bei Ihrem Domain-Hoster (z. B. IONOS, Strato, Hetzner) an und setzen Sie folgende DNS-Einträge:

**A-Records** (für die Apex-Domain `foerderverein-thorrfalken.de`):
```
@ → 185.199.108.153
@ → 185.199.109.153
@ → 185.199.110.153
@ → 185.199.111.153
```

**CNAME-Record** (für `www`):
```
www → IHR-USERNAME.github.io
```

> **Hinweis:** DNS-Änderungen können bis zu 48 Stunden dauern.

### Schritt 3: GitHub Pages konfigurieren

1. GitHub → Repository → Settings → Pages
2. Unter **„Custom domain"**: Tragen Sie `foerderverein-thorrfalken.de` ein.
3. Aktivieren Sie **„Enforce HTTPS"** (erscheint nach DNS-Propagation).

---

## Teil 4: Decap CMS mit Netlify Identity einrichten

> **Warum Netlify?** Decap CMS benötigt einen OAuth-Provider für die Login-Funktion. Netlify Identity stellt diesen kostenlos bereit – auch wenn die Website auf GitHub Pages gehostet wird.

### Schritt 1: Netlify-Konto erstellen

1. Gehen Sie zu [netlify.com](https://netlify.com) und erstellen Sie ein kostenloses Konto.

### Schritt 2: Netlify-Projekt anlegen (nur als Identity-Provider, NICHT als Hosting)

1. Klicken Sie auf **„Add new site"** → **„Import an existing project"**.
2. Verbinden Sie mit GitHub und wählen Sie Ihr Repository.
3. **Build-Einstellungen:** Lassen Sie diese leer oder tragen Sie `npm run build` ein (Netlify wird für den Authentifizierungs-Proxy verwendet, nicht für das eigentliche Hosting).
4. Klicken Sie auf **„Deploy site"**.

### Schritt 3: Identity aktivieren

1. Im Netlify Dashboard Ihres Projekts: **Site settings → Identity**.
2. Klicken Sie auf **„Enable Identity"**.
3. Unter **„Registration"**: Stellen Sie auf **„Invite only"** (!).
4. Scrollen Sie zu **„Git Gateway"**: Klicken Sie auf **„Enable Git Gateway"**.

### Schritt 4: Erste CMS-Benutzer einladen

1. Identity → **„Invite users"**.
2. Tragen Sie die E-Mail-Adressen der Vorstandsmitglieder ein.
3. Diese erhalten einen Einladungslink und können ein Passwort setzen.

### Schritt 5: Netlify-URL in admin/config.yml eintragen (falls nötig)

Falls Ihre Website auf einer eigenen Domain läuft, fügen Sie in `admin/config.yml` hinzu:
```yaml
backend:
  name: git-gateway
  branch: main

# Netlify Identity URL (nur nötig falls abweichend)
# site_url: https://IHR-PROJEKTNAME.netlify.app
```

> **Hinweis:** Netlify bietet auf dem kostenlosen Plan bis zu 1.000 aktive Benutzer und 5 GB Bandbreite – für einen Kleinverein mehr als ausreichend.

---

## Teil 5: Lokale Entwicklung

```powershell
# Dependencies installieren
npm install

# Entwicklungsserver starten (mit Hot-Reload)
npm run dev

# Seite unter http://localhost:8080 aufrufen
```

### Produktions-Build testen:
```powershell
npm run build
# Ergebnis liegt in _site/
```

---

## Teil 6: Erstes Deployment – Checkliste

- [ ] GitHub-Repository erstellt und erstes Commit gepusht
- [ ] GitHub Pages auf „GitHub Actions" gestellt
- [ ] Erster Build erfolgreich (Tab „Actions" prüfen)
- [ ] Netlify-Konto erstellt und with GitHub Repository verbunden
- [ ] Netlify Identity aktiviert (Invite-only)
- [ ] Git Gateway aktiviert
- [ ] Mindestens ein CMS-Benutzer eingeladen und Login getestet
- [ ] Custom Domain konfiguriert (DNS-Einträge + GitHub Pages Custom Domain)
- [ ] HTTPS aktiviert

---

## Fehlerbehebung

| Problem | Lösung |
|---------|--------|
| Build schlägt fehl | Actions-Tab prüfen, Node-Version in workflow.yml sicherstellen |
| CMS-Login funktioniert nicht | Netlify Identity + Git Gateway prüfen; Browser-Konsole auf Fehler prüfen |
| CSS wird nicht angewendet | `npm run build:css` lokal ausführen, dann committen |
| Beiträge erscheinen nicht | Frontmatter (`date`, `title`, `tags`) auf Korrektheit prüfen |
| Domain zeigt GitHub-Seite nicht | DNS-Propagation abwarten (bis 48h); CNAME-Datei prüfen |
