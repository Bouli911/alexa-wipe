# Alexa Wipe

**[English](#english) · [Français](#français)**

---

## English

Bookmarklet tool to remove devices from your Amazon Alexa account — a single selection or all of them at once. Runs from a hosted web page **or** as a local file.

Based on a community script (found in a GitHub comment thread), modified to add selective/bulk wiping and dual-mode (online / local) operation.

### Files

| File | Role |
|------|------|
| `alexa-wipe.html` | Launcher page — pick your region, grab the bookmarklet, read the mode instructions. |
| `alexa-wipe-console.js` | Console script loaded by the bookmarklet; fetches your devices and performs the wipe. |

Both files must sit in the **same folder** (locally or on your site).

### How to use

1. Open `alexa-wipe.html` (double-click locally, or via your site URL).
2. Select your **location** on the page.
3. Drag the generated **shortcut into your browser's bookmarks bar**.
4. Go to your Alexa page while **logged into your Amazon account**.
5. **Click the bookmark once** → your devices load (a progress bar appears).
6. Once the bar has finished, **click the bookmark a second time** → console mode loads.
7. Choose to wipe **selected** devices or **all** of them.

### Configuration

Only one value to edit in the HTML: **`$domain`**.

#### Hosted mode — `$domain = 'domain.ltd'`

- Page served online at `https://domain.ltd/alexa-wipe.html`.
- The tool's prompt shows: `https://domain.ltd/alexa-wipe.html>`
- Visitor country comes from the Cloudflare **`CF-IPCountry`** header, injected by nginx:
  ```
  sub_filter @@=CFCOUNTRY=@@
  ```

#### Local mode — `$domain = 'local'`

- File opened directly in the browser (`file://`).
- The tool's prompt shows: `C:\alexa-wipe.html>` with the title bar `C:\Windows\System32\cmd.exe`.
- Country is detected via external API, in order:
  1. `api.country.is`
  2. `ipwho.is`
  3. browser time zone / language (fallback)

> The file name is read automatically from the URL. If the page is in an online subfolder, the full path is preserved.

### Requirements

- Logged into your Amazon / Alexa account in the **same browser**.
- A modern desktop browser **with a bookmarks bar**.
- Hosted mode with header-based country detection requires **nginx + Cloudflare** (`CF-IPCountry`). Without it, detection falls back to the external API.

### Warning

- Removing devices is **permanent** and cannot be undone.
- Use on **your own account only**, at your own risk.
- Not affiliated with, or endorsed by, Amazon.

---

## Français

Outil (bookmarklet) pour supprimer des appareils de votre compte Amazon Alexa — une sélection précise ou tous d'un coup. Fonctionne depuis une page web hébergée **ou** en fichier local.

Basé sur un script communautaire (trouvé dans les commentaires d'un dépôt GitHub), modifié pour ajouter la suppression sélective/totale et le double mode (en ligne / local).

### Fichiers

| Fichier | Rôle |
|---------|------|
| `alexa-wipe.html` | Page de lancement — choisissez votre région, récupérez le bookmarklet, lisez les instructions des modes. |
| `alexa-wipe-console.js` | Script console chargé par le bookmarklet ; récupère vos appareils et effectue la suppression. |

Les deux fichiers doivent être dans le **même dossier** (en local ou sur votre site).

### Utilisation

1. Ouvrez `alexa-wipe.html` (double-clic en local, ou via l'URL de votre site).
2. Sélectionnez votre **localisation** sur la page.
3. Glissez le **raccourci généré dans la barre de favoris** de votre navigateur.
4. Rendez-vous sur votre page Alexa en étant **connecté à votre compte Amazon**.
5. **Cliquez une première fois sur le favori** → vos appareils se chargent (une barre de progression apparaît).
6. Une fois la barre terminée, **cliquez une seconde fois sur le favori** → le mode console se charge.
7. Choisissez de supprimer les appareils **sélectionnés** ou **tous**.

### Configuration

Une seule valeur à modifier dans le HTML : **`$domain`**.

#### Mode hébergé — `$domain = 'domain.ltd'`

- Page servie en ligne à `https://domain.ltd/alexa-wipe.html`.
- Le prompt de l'outil affiche : `https://domain.ltd/alexa-wipe.html>`
- Le pays du visiteur provient de l'en-tête Cloudflare **`CF-IPCountry`**, injecté par nginx :
  ```
  sub_filter @@=CFCOUNTRY=@@
  ```

#### Mode local — `$domain = 'local'`

- Fichier ouvert directement dans le navigateur (`file://`).
- Le prompt de l'outil affiche : `C:\alexa-wipe.html>` avec la barre de titre `C:\Windows\System32\cmd.exe`.
- Le pays est détecté via une API externe, dans l'ordre :
  1. `api.country.is`
  2. `ipwho.is`
  3. fuseau horaire / langue du navigateur (repli)

> Le nom du fichier est lu automatiquement dans l'URL. Si la page est dans un sous-dossier en ligne, le chemin complet est conservé.

### Prérequis

- Être connecté à votre compte Amazon / Alexa dans le **même navigateur**.
- Un navigateur de bureau moderne **avec une barre de favoris**.
- Le mode hébergé avec détection du pays par en-tête nécessite **nginx + Cloudflare** (`CF-IPCountry`). Sans cela, la détection bascule sur l'API externe.

### Avertissement

- La suppression des appareils est **définitive** et irréversible.
- À utiliser **uniquement sur votre propre compte**, à vos risques et périls.
- Sans aucune affiliation avec Amazon, ni approbation de sa part.
