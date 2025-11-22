const googleMapsConfig = {
  key: process.env.REACT_APP_GOOGLE_API_KEY,
  v: 'weekly',
};

if (!googleMapsConfig.key) {
  console.error('Brak REACT_APP_GOOGLE_API_KEY w .env dla Google Maps.');
  // bardzo ważne: nie próbujemy dalej ładować skryptu
} else {
  // Oficjalny bootstrap Google, tylko przeniesiony z index.html do JS
  ((g) => {
    let h;
    let a;
    let k;
    const p = 'The Google Maps JavaScript API';
    const c = 'google';
    const l = 'importLibrary';
    const q = '__ib__';
    const m = document;
    let b = window;
    b = b[c] || (b[c] = {});
    const d = b.maps || (b.maps = {});
    const r = new Set();
    const e = new URLSearchParams();
    const u = () =>
      h ||
      (h = new Promise(async (f, n) => {
        a = m.createElement('script');
        e.set('libraries', [...r] + '');
        for (k in g) {
          e.set(
            k.replace(/[A-Z]/g, (t) => '_' + t[0].toLowerCase()),
            g[k]
          );
        }
        e.set('callback', c + '.maps.' + q);
        a.src = `https://maps.${c}apis.com/maps/api/js?` + e.toString();
        d[q] = f;
        a.onerror = () => {
          h = n(Error(p + ' could not load.'));
        };
        a.nonce = m.querySelector('script[nonce]')?.nonce || '';
        m.head.append(a);
      }));

    if (d[l]) {
      console.warn(p + ' only loads once. Ignoring:', g);
    } else {
      d[l] = (f, ...n) => {
        r.add(f);
        return u().then(() => d[l](f, ...n));
      };
    }
  })(googleMapsConfig);
}
