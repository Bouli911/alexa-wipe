(function () {
  var PATH = '/api/behaviors/entities?skillId=amzn1.ask.1p.smarthome';
  var LANG_DEFAULT = '__LANG__';   /* remplacé par 'fr' ou 'en' à la génération */
  var HOME = '__HOME__';           /* adresse de la page de l'outil (remplacée à la génération) */
  var LANG_KEY = 'alexaWipeLang';
  var MANUAL_KEY = 'alexaWipeManual';
  var RELOAD_DELAY = 2000;
  var EU_FALLBACK_TLD = 'fr';
  var DEFAULT_TLD = 'com';

  /* [tld, libellé FR, libellé EN, codes pays] */
  var DOMAINS = [
    ['ca', 'Canada (.ca)', 'Canada (.ca)', ['CA']],
    ['com', 'États-Unis (.com)', 'United States (.com)', ['US']],
    ['fr', 'France (.fr)', 'France (.fr)', ['FR', 'BE', 'LU', 'MC']],
    ['co.uk', 'Royaume-Uni (.co.uk)', 'United Kingdom (.co.uk)', ['GB', 'IE']],
    ['de', 'Allemagne (.de)', 'Germany (.de)', ['DE', 'AT', 'CH', 'LI']],
    ['it', 'Italie (.it)', 'Italy (.it)', ['IT']],
    ['es', 'Espagne (.es)', 'Spain (.es)', ['ES', 'PT']],
    ['co.jp', 'Japon (.co.jp)', 'Japan (.co.jp)', ['JP']],
    ['com.au', 'Australie (.com.au)', 'Australia (.com.au)', ['AU', 'NZ']],
    ['in', 'Inde (.in)', 'India (.in)', ['IN']],
    ['com.br', 'Brésil (.com.br)', 'Brazil (.com.br)', ['BR']],
    ['com.mx', 'Mexique (.com.mx)', 'Mexico (.com.mx)', ['MX']]
  ];
  /* Autres pays européens -> .fr ; reste du monde -> .com */
  var EU = ['NL', 'SE', 'DK', 'FI', 'NO', 'PL', 'CZ', 'SK', 'HU', 'RO', 'BG', 'GR', 'HR', 'SI', 'EE', 'LV', 'LT', 'CY', 'MT', 'IS'];

  var T = {
    fr: {
      country: 'Pays : ',
      auto: '🌐 Auto (détection IP)',
      detecting: 'Détection IP…',
      notDetected: 'Pays non détecté',
      detected: 'Détecté : {cc} → .{tld}',
      redirecting: ' — redirection vers alexa.amazon.{tld} (recliquez ensuite le favori)…',
      refresh: 'Rafraîchir',
      wipe: '⚠ Effacer tous les appareils',
      wiping: 'Effacement en cours…',
      nonJson: 'réponse non JSON (session expirée ? reconnectez-vous sur {host} puis recliquez le favori)',
      allDeleted: '✔ Tous les appareils ont été effacés — la page est vide.',
      emptyPage: '(page vide)',
      count: '-- {n} appareil(s) --',
      error: 'Erreur : ',
      none: '(aucun appareil)',
      skipped: "(ignoré – pas d'applianceId) ",
      reloading: 'Rechargement de la page dans {s} s…',
      reloaded: 'Effacement exécuté — page rechargée.',
      warn1Title: '⚠ Avertissement',
      warn1: 'Ceci efface TOUS les appareils de votre Alexa ({host}). Êtes-vous sûr ?',
      yes1: 'Oui, continuer',
      warn2Title: '⚠ DERNIER AVERTISSEMENT',
      warn2: 'Action IRRÉVERSIBLE : tous les appareils seront supprimés définitivement. Voulez-vous vraiment continuer ?',
      yes2: 'EFFACER TOUT',
      cancel: 'Annuler',
      goAlexa: 'Redirection vers alexa.amazon.{tld}. Une fois sur la page Alexa, recliquez le favori.',
      devices: 'Appareils',
      selectAll: 'Tout sélectionner',
      selected: '{n} sélectionné(s)',
      wipeSel: '⚠ Effacer la sélection ({n})',
      warnSel: 'Ceci efface {n} appareil(s) de votre Alexa ({host}) :\n{names}\nÊtes-vous sûr ?',
      warnSel2: 'Action IRRÉVERSIBLE : les appareils sélectionnés seront supprimés définitivement. Voulez-vous vraiment continuer ?',
      yesSel: 'EFFACER LA SÉLECTION',
      deletedN: '✔ {n} appareil(s) effacé(s).',
      echoTag: 'Echo (AlexaBridge)',
      noId: "(pas d'applianceId)"
    },
    en: {
      country: 'Country: ',
      auto: '🌐 Auto (IP detection)',
      detecting: 'Detecting IP…',
      notDetected: 'Country not detected',
      detected: 'Detected: {cc} → .{tld}',
      redirecting: ' — redirecting to alexa.amazon.{tld} (then click the bookmark again)…',
      refresh: 'Refresh',
      wipe: '⚠ Delete all devices',
      wiping: 'Deleting…',
      nonJson: 'non-JSON response (session expired? sign in again on {host}, then click the bookmark again)',
      allDeleted: '✔ All devices have been deleted — the page is empty.',
      emptyPage: '(empty page)',
      count: '-- {n} device(s) --',
      error: 'Error: ',
      none: '(no devices)',
      skipped: '(skipped – no applianceId) ',
      reloading: 'Reloading the page in {s} s…',
      reloaded: 'Deletion done — page reloaded.',
      warn1Title: '⚠ Warning',
      warn1: 'This deletes ALL the devices from your Alexa ({host}). Are you sure?',
      yes1: 'Yes, continue',
      warn2Title: '⚠ FINAL WARNING',
      warn2: 'IRREVERSIBLE action: all devices will be permanently deleted. Do you really want to continue?',
      yes2: 'DELETE ALL',
      cancel: 'Cancel',
      goAlexa: 'Redirecting to alexa.amazon.{tld}. Once on the Alexa page, click the bookmark again.',
      devices: 'Devices',
      selectAll: 'Select all',
      selected: '{n} selected',
      wipeSel: '⚠ Delete selection ({n})',
      warnSel: 'This deletes {n} device(s) from your Alexa ({host}):\n{names}\nAre you sure?',
      warnSel2: 'IRREVERSIBLE action: the selected devices will be permanently deleted. Do you really want to continue?',
      yesSel: 'DELETE SELECTION',
      deletedN: '✔ {n} device(s) deleted.',
      echoTag: 'Echo (AlexaBridge)',
      noId: '(no applianceId)'
    }
  };

  var LANG = LANG_DEFAULT;
  try { LANG = localStorage.getItem(LANG_KEY) || LANG; } catch (e) {}
  if (!T[LANG]) LANG = 'fr';
  function t(k, v) {
    var s = T[LANG][k];
    if (v) for (var key in v) s = s.split('{' + key + '}').join(v[key]);
    return s;
  }

  /* Commande exacte (telle que tapée dans la console), affichée dans le faux prompt */
  var CMD = "devices = await (await fetch('/nexus/v1/graphql', { method: 'POST', headers: {\"Content-Type\": \"application/json\",\"Accept\": \"application/json\"}, body: JSON.stringify({query: `query { endpoints { items { friendlyName legacyAppliance { applianceId }}} } `})})).json();for (const device of devices.data.endpoints.items) console.log(await fetch(`/api/phoenix/appliance/${encodeURIComponent(device.legacyAppliance.applianceId)}`, { method: \"DELETE\", headers: { \"Accept\": \"application/json\", \"Content-Type\": \"application/json\"}}))";

  var host = location.hostname;
  var m = host.match(/^alexa\.amazon\.([a-z.]+)$/);
  var currentTld = m ? m[1] : '';
  var onAlexa = !!m && location.pathname.indexOf('/api/behaviors/entities') === 0;

  function tldFor(cc) {
    if (!cc) return null;
    for (var i = 0; i < DOMAINS.length; i++) if (DOMAINS[i][3].indexOf(cc) >= 0) return DOMAINS[i][0];
    return EU.indexOf(cc) >= 0 ? EU_FALLBACK_TLD : DEFAULT_TLD;
  }
  function urlFor(tld, hash) { return 'https://alexa.amazon.' + tld + PATH + (hash || ''); }
  async function getJson(url) {
    try { return await (await fetch(url, { cache: 'no-store' })).json(); } catch (e) { return null; }
  }
  /* Secours hors ligne (CSP / bloqueur de pub) : fuseau horaire, puis région de la langue du navigateur */
  var TZ = {
    'America/Toronto': 'CA', 'America/Montreal': 'CA', 'America/Vancouver': 'CA', 'America/Edmonton': 'CA', 'America/Winnipeg': 'CA', 'America/Halifax': 'CA', 'America/St_Johns': 'CA', 'America/Regina': 'CA', 'America/Moncton': 'CA', 'America/Whitehorse': 'CA', 'America/Yellowknife': 'CA',
    'America/New_York': 'US', 'America/Chicago': 'US', 'America/Denver': 'US', 'America/Los_Angeles': 'US', 'America/Phoenix': 'US', 'America/Anchorage': 'US', 'America/Detroit': 'US', 'America/Boise': 'US', 'America/Indiana/Indianapolis': 'US', 'America/Kentucky/Louisville': 'US', 'Pacific/Honolulu': 'US',
    'Europe/Paris': 'FR', 'Europe/London': 'GB', 'Europe/Dublin': 'IE', 'Europe/Berlin': 'DE', 'Europe/Vienna': 'AT', 'Europe/Zurich': 'CH', 'Europe/Rome': 'IT', 'Europe/Madrid': 'ES', 'Europe/Lisbon': 'PT', 'Europe/Brussels': 'BE', 'Europe/Luxembourg': 'LU', 'Europe/Monaco': 'MC', 'Europe/Amsterdam': 'NL',
    'Asia/Tokyo': 'JP', 'Asia/Kolkata': 'IN', 'Asia/Calcutta': 'IN', 'America/Sao_Paulo': 'BR', 'America/Mexico_City': 'MX', 'Pacific/Auckland': 'NZ',
    'Australia/Sydney': 'AU', 'Australia/Melbourne': 'AU', 'Australia/Brisbane': 'AU', 'Australia/Perth': 'AU', 'Australia/Adelaide': 'AU', 'Australia/Hobart': 'AU', 'Australia/Darwin': 'AU'
  };
  function offlineCountry() {
    var tz = '';
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) {}
    if (TZ[tz]) return TZ[tz];
    var lang = (navigator.languages && navigator.languages[0]) || navigator.language || '';
    var mm = lang.match(/-([A-Za-z]{2})$/);
    if (mm) return mm[1].toUpperCase();
    if (tz.indexOf('Europe/') === 0) return 'FR';
    return null;
  }
  async function detectCountry() {
    var j = await getJson('https://api.country.is/');
    if (j && j.country) return j.country;
    j = await getJson('https://ipwho.is/');
    if (j && j.country_code) return j.country_code;
    return offlineCountry();
  }

  /* Favori cliqué hors de la page Alexa : aller sur la page Alexa du bon pays */
  if (!onAlexa) {
    detectCountry().then(function (cc) {
      var tld = tldFor(cc) || DEFAULT_TLD;
      alert(t('goAlexa', { tld: tld }));
      location.href = urlFor(tld);
    });
    return;
  }

  if (location.hash === '#manual') { try { localStorage.setItem(MANUAL_KEY, '1'); } catch (e) {} }
  function isManual() { try { return !!localStorage.getItem(MANUAL_KEY); } catch (e) { return false; } }
  function setManual(on) { try { on ? localStorage.setItem(MANUAL_KEY, '1') : localStorage.removeItem(MANUAL_KEY); } catch (e) {} }

  /* ---------- Construction de la page (styles via CSSOM : insensible au CSP) ---------- */
  function E(tag, css, text) {
    var e = document.createElement(tag);
    if (css) e.style.cssText = css;
    if (text != null) e.textContent = text;
    return e;
  }
  var FONT = 'font-family:"Segoe UI",Arial,sans-serif;';
  var SELECT = 'padding:6px 10px;font-size:14px;background:#2d2d2d;color:#eee;border:1px solid #555;border-radius:4px;';
  var BTN = 'padding:10px 18px;font-size:15px;border:0;border-radius:4px;cursor:pointer;background:#444;color:#eee;' + FONT;
  var DANGER = BTN + 'background:#c62828;color:#fff;font-weight:bold;';

  document.title = 'Alexa – ' + host;
  document.documentElement.style.cssText = 'background:#1e1e1e;';
  /* Contenu déjà affiché par la page (le JSON), capturé avant de vider la page */
  var pre0 = document.querySelector('pre');
  var pageText = pre0 ? pre0.textContent : (document.body ? document.body.textContent : '');
  var body = document.body;
  body.innerHTML = '';
  body.style.cssText = 'margin:0;padding:20px;min-height:100vh;box-sizing:border-box;background:#1e1e1e;color:#ddd;' + FONT;

  var header = E('div', 'display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin-bottom:14px;');
  var label = E('label');
  var countryLbl = E('span');
  var sel = E('select', SELECT);
  var optAuto = E('option');
  optAuto.value = 'auto';
  sel.appendChild(optAuto);
  var domainOpts = DOMAINS.map(function (d) { var o = E('option'); o.value = d[0]; sel.appendChild(o); return o; });
  sel.value = currentTld;
  label.appendChild(countryLbl);
  label.appendChild(sel);
  var geo = E('span', 'color:#888;');
  var langSel = E('select', SELECT + 'margin-left:auto;');
  [['fr', 'Français'], ['en', 'English']].forEach(function (l) { var o = E('option', '', l[1]); o.value = l[0]; langSel.appendChild(o); });
  langSel.value = LANG;
  header.appendChild(label);
  header.appendChild(geo);
  header.appendChild(langSel);

  var win = E('div', 'border:1px solid #444;border-radius:6px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,.6);');
  var bar = E('div', 'background:#3c3c3c;color:#ccc;padding:6px 10px;font-size:13px;display:flex;align-items:center;gap:6px;');
  ['#ff5f56', '#ffbd2e', '#27c93f'].forEach(function (c) {
    bar.appendChild(E('i', 'width:12px;height:12px;border-radius:6px;display:inline-block;background:' + c + ';'));
  });
  bar.appendChild(E('span', 'margin-left:4px;', (HOME.indexOf('C:\\') === 0 ? 'C:\\Windows\\System32\\cmd.exe' : HOME) + ' — ' + host));
  var term = E('pre', 'margin:0;padding:12px;height:45vh;overflow:auto;background:#0c0c0c;color:#ccc;font:13px/1.45 Consolas,"Courier New",monospace;white-space:pre-wrap;word-break:break-all;');
  win.appendChild(bar);
  win.appendChild(term);

  /* Liste des appareils avec cases à cocher */
  var panel = E('div', 'margin-top:16px;border:1px solid #444;border-radius:6px;background:#252526;overflow:hidden;');
  var phead = E('div', 'display:flex;align-items:center;gap:10px;padding:8px 12px;background:#3c3c3c;font-size:13px;');
  var ptitle = E('b', 'margin-right:auto;color:#fff;');
  var selAll = E('input', 'width:16px;height:16px;cursor:pointer;');
  selAll.type = 'checkbox';
  var selAllLbl = E('label', 'display:flex;align-items:center;gap:6px;cursor:pointer;');
  selAllLbl.appendChild(selAll);
  selAllLbl.appendChild(E('span'));
  var selCount = E('span', 'color:#aaa;');
  phead.appendChild(ptitle);
  phead.appendChild(selAllLbl);
  phead.appendChild(selCount);
  var listBox = E('div', 'max-height:32vh;overflow:auto;padding:4px 0;');
  panel.appendChild(phead);
  panel.appendChild(listBox);

  var actions = E('div', 'margin-top:16px;display:flex;gap:12px;flex-wrap:wrap;');
  var refreshBtn = E('button', BTN);
  var selBtn = E('button', DANGER);
  var wipeBtn = E('button', DANGER);
  actions.appendChild(refreshBtn);
  actions.appendChild(selBtn);
  actions.appendChild(wipeBtn);

  var modal = E('div', 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.75);display:none;align-items:center;justify-content:center;z-index:9999;');
  var box = E('div', 'background:#2d2d2d;padding:24px;border-radius:8px;max-width:480px;border:2px solid #c62828;color:#ddd;' + FONT);
  var mTitle = E('h2', 'margin:0 0 12px;color:#ff5252;');
  var mText = E('p', 'margin:0;white-space:pre-line;');
  var btns = E('div', 'display:flex;justify-content:flex-end;gap:10px;margin-top:18px;');
  var mNo = E('button', BTN);
  var mYes = E('button', DANGER);
  btns.appendChild(mNo);
  btns.appendChild(mYes);
  box.appendChild(mTitle);
  box.appendChild(mText);
  box.appendChild(btns);
  modal.appendChild(box);

  body.appendChild(header);
  body.appendChild(win);
  body.appendChild(panel);
  body.appendChild(actions);
  body.appendChild(modal);

  /* ---------- Sélection ---------- */
  var busy = false;
  var devices = [];      /* [{name, id}] issus de /nexus/v1/graphql */
  var selected = {};     /* id -> true */
  var checks = [];
  function selectable() { return devices.filter(function (d) { return d.id; }); }
  function selection() { return devices.filter(function (d) { return d.id && selected[d.id]; }); }
  function updateSel() {
    var n = selection().length, total = selectable().length;
    selCount.textContent = t('selected', { n: n });
    selBtn.textContent = t('wipeSel', { n: n });
    selBtn.disabled = busy || n === 0;
    selBtn.style.opacity = selBtn.disabled ? '.5' : '1';
    selBtn.style.cursor = selBtn.disabled ? 'not-allowed' : 'pointer';
    selAll.checked = total > 0 && n === total;
    selAll.indeterminate = n > 0 && n < total;
    selAll.disabled = total === 0;
  }
  function renderList() {
    listBox.innerHTML = '';
    checks = [];
    devices.forEach(function (d) {
      var row = E('label', 'display:flex;align-items:center;gap:10px;padding:6px 12px;cursor:' + (d.id ? 'pointer' : 'default') + ';border-bottom:1px solid #333;');
      var cb = E('input', 'width:16px;height:16px;cursor:pointer;flex:none;');
      cb.type = 'checkbox';
      cb.disabled = !d.id;
      cb.checked = !!(d.id && selected[d.id]);
      cb.onchange = function () { selected[d.id] = cb.checked; updateSel(); };
      row.appendChild(cb);
      row.appendChild(E('span', 'color:#fff;', d.name));
      if (d.id && d.id.indexOf('AlexaBridge_') === 0) row.appendChild(E('span', 'color:#f9f1a5;font-size:12px;', t('echoTag')));
      row.appendChild(E('span', 'color:#777;font:12px Consolas,"Courier New",monospace;margin-left:auto;word-break:break-all;', d.id || t('noId')));
      listBox.appendChild(row);
      checks.push(cb);
    });
    updateSel();
  }
  selAll.onchange = function () {
    var on = selAll.checked;
    selectable().forEach(function (d) { selected[d.id] = on; });
    checks.forEach(function (cb) { if (!cb.disabled) cb.checked = on; });
    updateSel();
  };

  var geoState = { s: 'detecting' };   /* detecting | none | ok(cc,tld,redirect) */
  function renderGeo() {
    if (geoState.s === 'detecting') geo.textContent = t('detecting');
    else if (geoState.s === 'none') geo.textContent = t('notDetected');
    else geo.textContent = t('detected', geoState) + (geoState.redirect ? t('redirecting', geoState) : '');
  }
  function applyLang() {
    document.documentElement.lang = LANG;
    countryLbl.textContent = t('country');
    optAuto.textContent = t('auto');
    domainOpts.forEach(function (o, i) { o.textContent = DOMAINS[i][LANG === 'fr' ? 1 : 2]; });
    refreshBtn.textContent = t('refresh');
    wipeBtn.textContent = busy ? t('wiping') : t('wipe');
    mNo.textContent = t('cancel');
    ptitle.textContent = t('devices');
    selAllLbl.lastChild.textContent = t('selectAll');
    renderList();
    renderGeo();
  }
  langSel.onchange = function () {
    LANG = T[langSel.value] ? langSel.value : 'fr';
    try { localStorage.setItem(LANG_KEY, LANG); } catch (e) {}
    applyLang();
  };
  applyLang();

  /* ---------- Faux terminal ---------- */
  var COLORS = { p: '#fff', ok: '#16c60c', err: '#e74856', warn: '#f9f1a5', dim: '#888' };
  var PROMPT = HOME + '>';
  function print(text, cls) {
    term.appendChild(E('span', cls ? 'color:' + COLORS[cls] + ';' : '', text + '\n'));
    term.scrollTop = term.scrollHeight;
  }
  function cmdline(x) { print(PROMPT + x, 'p'); }
  function banner() { print('Alexa Smart Home – ' + host, 'dim'); }
  function fmtResponse(r) {
    /* Même format que la console Chrome pour console.log(response) */
    return "Response {type: '" + r.type + "', url: '" + r.url + "', redirected: " + r.redirected + ', status: ' + r.status + ', ok: ' + r.ok + ', …}';
  }

  var afterWipe = false;
  function parseJson(txt) { try { return JSON.parse(txt); } catch (e) { return undefined; } }
  function excerpt(txt) { return String(txt).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 240); }
  var GQL = 'query { endpoints { items { friendlyName legacyAppliance { applianceId }}} } ';
  function csrf() { var mm = document.cookie.match(/(?:^|;\s*)csrf=([^;]*)/); return mm ? mm[1] : null; }
  function ctype(r) { return r.headers.get('content-type') || ''; }
  async function fetchText(url, opts) { var r = await fetch(url, opts); return { r: r, txt: await r.text() }; }

  /* Page entities : 1) texte déjà affiché par la page, 2) fetch avec les en-têtes de l'app Alexa, 3) fetch simple */
  async function loadEntities(useCaptured) {
    var data, res, last = null;
    if (useCaptured) { data = parseJson(pageText); if (data !== undefined) return { data: data }; }
    var h = { 'Accept': 'application/json', 'Routines-Version': '3.0.128540' };
    var c = csrf();
    if (c) h.csrf = c;
    var tries = [{ headers: h, cache: 'no-store' }, { cache: 'no-store' }];
    for (var i = 0; i < tries.length; i++) {
      try { res = await fetchText(PATH, tries[i]); } catch (e) { continue; }
      data = parseJson(res.txt);
      if (data !== undefined) return { data: data };
      last = res;
    }
    if (!last) return { error: 'fetch failed' };
    if (last.r.status === 200 && !last.txt.trim()) return { empty: true, info: 'HTTP 200 ' + ctype(last.r) };
    return { error: 'HTTP ' + last.r.status + ' ' + ctype(last.r) + ' \u2192 ' + last.r.url + '\n' + excerpt(last.txt) };
  }

  async function showEntities(useCaptured) {
    /* 1) la page entities telle qu'affichée par le navigateur */
    cmdline('curl https://' + host + PATH);
    try {
      var res = await loadEntities(useCaptured);
      if (res.error) throw new Error(t('nonJson', { host: host }) + '\n' + res.error);
      if (res.empty || (Array.isArray(res.data) && res.data.length === 0)) {
        /* Page blanche */
        print('\n\n\n\n');
        print(t('emptyPage') + (res.info ? ' \u2013 ' + res.info : ''), 'dim');
      } else {
        print(JSON.stringify(res.data, null, 2));
      }
    } catch (e) {
      print(t('error') + e.message, 'err');
    }
    print('');

    /* 2) la liste des appareils (même requête que la commande d'effacement) */
    cmdline('curl -X POST https://' + host + '/nexus/v1/graphql -d \'{"query":"' + GQL.trim() + '"}\'');
    try {
      var g = await fetchText('/nexus/v1/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ query: GQL })
      });
      var j = parseJson(g.txt);
      if (j === undefined) throw new Error(t('nonJson', { host: host }) + '\nHTTP ' + g.r.status + ' ' + ctype(g.r) + '\n' + excerpt(g.txt));
      var items = (j.data && j.data.endpoints && j.data.endpoints.items) || [];
      devices = items.map(function (it) { return { name: it.friendlyName, id: it.legacyAppliance && it.legacyAppliance.applianceId }; });
      renderList();
      print(JSON.stringify(j, null, 2));
      if (items.length) print(t('count', { n: items.length }), 'ok');
      else print(afterWipe ? t('allDeleted') : t('none'), afterWipe ? 'ok' : 'warn');
    } catch (e) {
      print(t('error') + e.message, 'err');
    }
    print('');
  }

  function setBusy(b) {
    busy = b;
    refreshBtn.disabled = b;
    updateSel();
    wipeBtn.disabled = b;
    wipeBtn.style.opacity = b ? '.5' : '1';
    wipeBtn.style.cursor = b ? 'not-allowed' : 'pointer';
    wipeBtn.textContent = b ? t('wiping') : t('wipe');
  }

  function cmdFor(ids) {
    return 'for (const id of ' + JSON.stringify(ids) + ') console.log(await fetch(`/api/phoenix/appliance/${encodeURIComponent(id)}`, { method: "DELETE", headers: { "Accept": "application/json", "Content-Type": "application/json"}}))';
  }
  async function wipe(mode) {
    setBusy(true);
    var success = true, list = [], ok = 0;
    try {
      if (mode === 'sel') {
        list = selection().map(function (d) { return { friendlyName: d.name, legacyAppliance: { applianceId: d.id } }; });
        cmdline(cmdFor(list.map(function (d) { return d.legacyAppliance.applianceId; })));
      } else {
        cmdline(CMD);
        var devs = await (await fetch('/nexus/v1/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ query: GQL })
        })).json();
        list = (devs.data && devs.data.endpoints && devs.data.endpoints.items) || [];
      }
      if (!list.length) print(t('none'), 'warn');
      for (var i = 0; i < list.length; i++) {
        var device = list[i];
        var id = device.legacyAppliance && device.legacyAppliance.applianceId;
        if (!id) { print(t('skipped') + device.friendlyName, 'warn'); continue; }
        var r = await fetch('/api/phoenix/appliance/' + encodeURIComponent(id), {
          method: 'DELETE',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
        });
        if (r.ok) ok++;
        print(fmtResponse(r) + '   // ' + device.friendlyName, r.ok ? 'ok' : 'err');
      }
      print('undefined', 'dim');
      if (mode === 'sel') print(t('deletedN', { n: ok }), 'ok');
    } catch (e) {
      success = false;
      print('Uncaught ' + e.name + ': ' + e.message, 'err');
    }
    print('');
    if (!success) { setBusy(false); return; }

    /* "Rechargement" : on vide le prompt et on réaffiche la page entities + la liste */
    print(t('reloading', { s: RELOAD_DELAY / 1000 }), 'warn');
    setTimeout(async function () {
      afterWipe = mode !== 'sel';
      selected = {};
      term.textContent = '';
      banner();
      print(t('reloaded'), 'dim');
      print('');
      await showEntities();
      setBusy(false);
    }, RELOAD_DELAY);
  }

  /* ---------- Double avertissement ---------- */
  var modalResolve = null;
  function ask(title, text, yes) {
    mTitle.textContent = title;
    mText.textContent = text;
    mYes.textContent = yes;
    mNo.textContent = t('cancel');
    modal.style.display = 'flex';
    return new Promise(function (res) { modalResolve = res; });
  }
  function closeModal(v) {
    modal.style.display = 'none';
    if (modalResolve) { modalResolve(v); modalResolve = null; }
  }
  mYes.onclick = function () { closeModal(true); };
  mNo.onclick = function () { closeModal(false); };
  wipeBtn.onclick = async function () {
    if (!await ask(t('warn1Title'), t('warn1', { host: host }), t('yes1'))) return;
    if (!await ask(t('warn2Title'), t('warn2'), t('yes2'))) return;
    wipe('all');
  };
  selBtn.onclick = async function () {
    var list = selection();
    if (!list.length) return;
    var names = list.map(function (d) { return '\u2022 ' + d.name; }).join('\n');
    if (!await ask(t('warn1Title'), t('warnSel', { n: list.length, host: host, names: names }), t('yes1'))) return;
    if (!await ask(t('warn2Title'), t('warnSel2'), t('yesSel'))) return;
    wipe('sel');
  };
  refreshBtn.onclick = function () { showEntities(); };

  /* ---------- Pays / domaine ---------- */
  sel.onchange = function () {
    var v = sel.value;
    if (v === 'auto') { setManual(false); geoInit(true); return; }
    setManual(true);
    if (v !== currentTld) location.href = urlFor(v, '#manual');
  };

  async function geoInit(force) {
    geoState = { s: 'detecting' };
    renderGeo();
    var cc = await detectCountry();
    if (!cc) { geoState = { s: 'none' }; renderGeo(); sel.value = currentTld; return; }
    var tld = tldFor(cc);
    geoState = { s: 'ok', cc: cc, tld: tld, redirect: false };
    renderGeo();
    if (isManual() && !force) return;
    if (tld === currentTld) { sel.value = currentTld; return; }
    geoState.redirect = true;
    renderGeo();
    setTimeout(function () { location.href = urlFor(tld); }, 1500);
  }

  /* ---------- Démarrage ---------- */
  banner();
  print('');
  showEntities(true);
  geoInit(false);
})();
