(() => {
  const selectedLang = new URLSearchParams(location.search).get('lang');
  const browserLang = navigator.language || navigator.languages?.[0] || 'en';
  const lang = selectedLang === 'de' || selectedLang === 'en'
    ? selectedLang
    : /^de(?:-|$)/i.test(browserLang) ? 'de' : 'en';
  const copy = {
    de: {skip:'Zum Katalog',eyebrow:'Oink Games am Messestand',title:'Unser SPIEL-Sortiment',intro:'Unser Sortiment und die Preise auf der SPIEL 2026.',games:'Spiele',merch:'Merch',boothPrices:'Preise am Messestand',imageHint:'Bild antippen für Produktdetails',availability:'Solange der Vorrat reicht. Verfügbarkeit bitte am Stand erfragen.'},
    en: {skip:'Skip to catalog',eyebrow:'Oink Games at SPIEL',title:'Our SPIEL lineup',intro:'Our games, merch and booth prices at SPIEL 2026.',games:'Games',merch:'Merch',boothPrices:'Booth prices',imageHint:'Tap an image for product details',availability:'While supplies last. Please ask at the booth about availability.'}
  };
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {el.innerHTML = copy[lang][el.dataset.i18n];});
  document.querySelectorAll('.languages a').forEach(el => {if(el.id === `language-${lang}`) el.setAttribute('aria-current','page'); else el.removeAttribute('aria-current');});
  document.getElementById('brand-link').href = `https://oinkgames.com/${lang}/`;
  document.getElementById('footer-link').href = `https://oinkgames.com/${lang}/`;
  document.getElementById('categories').setAttribute('aria-label', lang === 'en' ? 'Catalog' : 'Katalog');
  fetch('products.json?v=20261009-merch-categories').then(r => {if(!r.ok) throw new Error('Catalog unavailable'); return r.json();}).then(products => {
    products.forEach(p => {
      const article = document.querySelector(`[data-id="${p.id}"]`);
      if(!article) return;
      const title = p[lang === 'en' ? 'titleEn' : 'titleDe'];
      const bonusBadge = article.querySelector('.badge-bonus');
      if(bonusBadge) bonusBadge.textContent = lang === 'en' ? 'Event bonus' : 'Messe-Bonus';
      const bonusDetail = article.querySelector('.bonus-detail');
      if(bonusDetail) bonusDetail.textContent = (lang === 'en' ? 'Event bonus: ' : 'Messe-Bonus: ') + p[lang === 'en' ? 'bonusEn' : 'bonusDe'];
      const image = p[lang === 'en' ? 'imageEn' : 'imageDe'];
      const url = p[lang === 'en' ? 'urlEn' : 'urlDe'];
      article.querySelector('h3').textContent = title;
      const link = article.querySelector('a.product-image');
      if(link && url) {link.href = url; link.setAttribute('aria-label',`${title} – ${lang==='en'?'product details':'Produktdetails'}`);}
      const img = article.querySelector('img');
      if(img && image){img.src = image; img.alt = title;}
      const pending = article.querySelector('.photo-pending');
      if(pending) pending.textContent = lang === 'en' ? 'Photo coming soon' : 'Bild folgt';
      let variants = p.variants.join(' · ');
      if(variants && p.category==='games') variants = 'Edition: '+variants;
      if(variants && p.id.includes('tshirt')) variants = (lang==='en'?'Sizes: ':'Größen: ')+variants;
      article.querySelector('.variants').textContent = variants;
      const note = article.querySelector('.photo-note');
      if(note) note.textContent = lang==='en'?'Product range shown':'Abbildung der Produktreihe';
    });
  }).catch(() => {
    // The complete German catalog remains usable if the data request fails.
    if(lang==='en') {
      const notice = document.createElement('p');notice.className='availability';
      notice.textContent='The English catalog could not load. The German product list is shown; please reload to try again.';
      document.querySelector('.intro').append(notice);
    }
  });
})();
