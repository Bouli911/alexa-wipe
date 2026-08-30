# Alexa Wipe

Bookmarklet tool to remove devices from your Amazon Alexa account — a single selection or all of them at once. Runs from a hosted web page **or** as a local file.

Based on a community script (found in a GitHub comment thread), modified to add selective/bulk wiping and dual-mode (online / local) operation.

---

## Files

| File | Role |
|------|------|
| `alexa-wipe.html` | Launcher page — pick your region, grab the bookmarklet, read the mode instructions. |
| `alexa-wipe-console.js` | Console script loaded by the bookmarklet; fetches your devices and performs the wipe. |

Both files must sit in the **same folder** (locally or on your site).

---

## How to use

1. Open `alexa-wipe.html` (double-click locally, or via your site URL).
2. Select your **location** on the page.
3. Drag the generated **shortcut into your browser's bookmarks bar**.
4. Go to your Alexa page while **logged into your Amazon account**.
5. **Click the bookmark once** → your devices load (a progress bar appears).
6. Once the bar has finished, **click the bookmark a second time** → console mode loads.
7. Choose to wipe **selected** devices or **all** of them.

---

## Configuration

Only one value to edit in the HTML: **`$domain`**.

### Hosted mode — `$domain = 'domain.ltd'`

- Page served online at `https://domain.ltd/alexa-wipe.html`.
- The tool's prompt shows: `https://domain.ltd/alexa-wipe.html>`
- Visitor country comes from the Cloudflare **`CF-IPCountry`** header, injected by nginx:
  ```
  sub_filter @@=CFCOUNTRY=@@
  ```

### Local mode — `$domain = 'local'`

- File opened directly in the browser (`file://`).
- The tool's prompt shows: `C:\alexa-wipe.html>` with the title bar `C:\Windows\System32\cmd.exe`.
- Country is detected via external API, in order:
  1. `api.country.is`
  2. `ipwho.is`
  3. browser time zone / language (fallback)

> The file name is read automatically from the URL. If the page is in an online subfolder, the full path is preserved.

---

## Requirements

- Logged into your Amazon / Alexa account in the **same browser**.
- A modern desktop browser **with a bookmarks bar**.
- Hosted mode with header-based country detection requires **nginx + Cloudflare** (`CF-IPCountry`). Without it, detection falls back to the external API.

---

## Warning

- Removing devices is **permanent** and cannot be undone.
- Use on **your own account only**, at your own risk.
- Not affiliated with, or endorsed by, Amazon.
