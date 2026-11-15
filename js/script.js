// Explore Pakistan - all JavaScript in one file
// ===== Mobile menu (used on every page) =====
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));


// ===== Home page =====
(function () {
  if (!document.getElementById('factBtn')) return; // run only on this page
  // ===== Animated counters =====
  const counters = document.querySelectorAll('.count-up');
  function runCounter(el) {
    const target = Number(el.dataset.target);
    let current = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = current;
    }, 25);
  }
  // start counting when the stats section is visible
  const statsBox = document.querySelector('.stats');
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      counters.forEach(runCounter);
      observer.disconnect();
    }
  });
  observer.observe(statsBox);

  // ===== Random "Did you know?" facts =====
  const facts = [
    'K2 in Gilgit-Baltistan is the second highest mountain in the world.',
    'Mohenjo-daro in Sindh is over 4,500 years old.',
    'The Badshahi Mosque in Lahore was the largest mosque in the world for 313 years.',
    'Pakistan has five of the fourteen highest peaks on Earth.',
    'The Khyber Pass has connected South and Central Asia for centuries.',
    'Hingol National Park in Balochistan is the largest national park in Pakistan.'
  ];
  const factText = document.getElementById('factText');
  document.getElementById('factBtn').addEventListener('click', () => {
    const random = Math.floor(Math.random() * facts.length);
    factText.textContent = facts[random];
  });

  // ===== Greeting by time of day =====
  const hour = new Date().getHours();
  let greeting = 'Welcome';
  if (hour < 12) greeting = 'Good morning';
  else if (hour < 18) greeting = 'Good afternoon';
  else greeting = 'Good evening';
  document.getElementById('greet').textContent = greeting + ', traveller!';
})();

// ===== Gallery & Info page =====
(function () {
  if (!document.getElementById('gallery')) return; // run only on this page
  // ===== Gallery data =====
  const photos = [
    { src: '1.png', title: 'Gilgit-Baltistan', region: 'gilgit' },
    { src: '2.png', title: 'Azad Kashmir', region: 'kashmir' },
    { src: '3.png', title: 'Punjab', region: 'punjab' },
    { src: '4.png', title: 'Sindh', region: 'sindh' },
    { src: '5.png', title: 'Khyber Pakhtunkhwa', region: 'kpk' },
    { src: '6.png', title: 'Balochistan', region: 'balochistan' },
    { src: '7.png', title: 'Hunza Valley', region: 'gilgit' },
    { src: '8.png', title: 'Neelum Valley', region: 'kashmir' },
    { src: '9.png', title: 'Lahore Fort', region: 'punjab' },
    { src: '10.png', title: 'Mohenjo-daro', region: 'sindh' },
    { src: '11.png', title: 'Swat Valley', region: 'kpk' },
    { src: '12.png', title: 'Ziarat', region: 'balochistan' }
  ];
  const gallery = document.getElementById('gallery');
  let visible = [];   // photos currently shown
  let index = 0;      // photo open in lightbox

  function showGallery(region) {
    gallery.innerHTML = '';
    visible = photos.filter(p => region === 'all' || p.region === region);
    visible.forEach((p, i) => {
      const fig = document.createElement('figure');
      fig.innerHTML = `<img src="images/${p.src}" alt="${p.title}"><figcaption>${p.title}</figcaption>`;
      fig.addEventListener('click', () => openBox(i));
      gallery.appendChild(fig);
    });
  }
  document.querySelectorAll('.filters button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.filters .on').classList.remove('on');
      btn.classList.add('on');
      showGallery(btn.dataset.region);
    });
  });

  // ===== Lightbox =====
  const box = document.getElementById('lightbox');
  const boxImg = document.getElementById('boxImg');
  const boxCap = document.getElementById('boxCap');
  function openBox(i) {
    index = i;
    boxImg.src = 'images/' + visible[i].src;
    boxCap.textContent = visible[i].title + ' (' + (i + 1) + '/' + visible.length + ')';
    box.classList.add('show');
  }
  function closeBox() { box.classList.remove('show'); }
  function move(step) {
    index = (index + step + visible.length) % visible.length;
    openBox(index);
  }
  document.getElementById('closeBox').addEventListener('click', closeBox);
  document.getElementById('prev').addEventListener('click', () => move(-1));
  document.getElementById('next').addEventListener('click', () => move(1));
  document.addEventListener('keydown', (e) => {
    if (!box.classList.contains('show')) return;
    if (e.key === 'Escape') closeBox();
    if (e.key === 'ArrowLeft') move(-1);
    if (e.key === 'ArrowRight') move(1);
  });

  showGallery('all');
})();

// ===== Services page =====
(function () {
  if (!document.getElementById('packages')) return; // run only on this page
  // ===== Tour packages (data) =====
  const packages = [
    { name: 'Hunza Valley Escape', region: 'Gilgit-Baltistan', days: 5, price: 45000, img: '1.png', text: 'Attabad Lake, Baltit Fort and Passu Cones.' },
    { name: 'Neelum Valley Retreat', region: 'Kashmir', days: 4, price: 38000, img: '2.png', text: 'Riverside stays, Arang Kel and Sharda.' },
    { name: 'Lahore Heritage Walk', region: 'Punjab', days: 2, price: 15000, img: '3.png', text: 'Badshahi Mosque, Lahore Fort and food street.' },
    { name: 'Mohenjo-daro & Thatta', region: 'Sindh', days: 3, price: 22000, img: '4.png', text: 'Ancient ruins and Makli necropolis.' },
    { name: 'Swat & Kalam Tour', region: 'KPK', days: 4, price: 32000, img: '5.png', text: 'Green valleys, waterfalls and Malam Jabba.' },
    { name: 'Ziarat & Hingol', region: 'Balochistan', days: 4, price: 35000, img: '6.png', text: 'Juniper forest and the Princess of Hope.' }
  ];
  const grid = document.getElementById('packages');
  const select = document.getElementById('tourSelect');

  function showPackages(region) {
    grid.innerHTML = '';
    packages.forEach(p => {
      if (region !== 'All' && p.region !== region) return;
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `<img src="images/${p.img}" alt="${p.name}">
        <div class="card-body"><span class="tag">${p.region} | ${p.days} days</span>
        <h3>${p.name}</h3><p>${p.text}</p>
        <div class="price">Rs ${p.price.toLocaleString()} per person</div>
        <button class="btn">Calculate cost</button></div>`;
      card.querySelector('button').addEventListener('click', () => {
        select.value = p.name;
        calculate();
        document.getElementById('calc').scrollIntoView();
      });
      grid.appendChild(card);
    });
  }
  document.querySelectorAll('.filters button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.filters .on').classList.remove('on');
      btn.classList.add('on');
      showPackages(btn.dataset.region);
    });
  });

  // ===== Cost calculator =====
  packages.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.name;
    opt.textContent = p.name;
    select.appendChild(opt);
  });
  function calculate() {
    const pack = packages.find(p => p.name === select.value);
    const people = Number(document.getElementById('people').value);
    const hotel = document.getElementById('hotel').checked;
    const out = document.getElementById('result');
    if (!pack || people < 1) { out.textContent = 'Choose a tour and number of travellers.'; return; }
    let total = pack.price * people;
    let note = '';
    if (people >= 5) { total = total * 0.9; note = ' (10% group discount applied)'; }
    if (hotel) { total = total * 1.2; note += ' (+20% hotel upgrade)'; }
    out.innerHTML = `Total for ${people} traveller(s): <b>Rs ${Math.round(total).toLocaleString()}</b>${note}`;
  }
  document.getElementById('calcBtn').addEventListener('click', calculate);

  // ===== FAQ accordion =====
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      document.querySelectorAll('.faq-item').forEach(i => { if (i !== item) i.classList.remove('open'); });
      item.classList.toggle('open');
    });
  });

  showPackages('All');
  calculate();
})();

// ===== Portfolio page =====
(function () {
  if (!document.getElementById('tourList')) return; // run only on this page
  // ===== Past tours (data) =====
  const tours = [
    { title: 'Hunza Autumn Trip', region: 'Gilgit-Baltistan', year: 2025, people: 18, img: '7.png', text: 'Golden poplars, apricot orchards and a sunrise at Eagle\'s Nest.' },
    { title: 'Neelum Family Tour', region: 'Kashmir', year: 2025, people: 12, img: '8.png', text: 'Three days along the Neelum river with cabin stays.' },
    { title: 'Lahore Food & Fort', region: 'Punjab', year: 2024, people: 25, img: '9.png', text: 'A heritage walk through the Walled City ending with a street food dinner.' },
    { title: 'Indus Civilization Visit', region: 'Sindh', year: 2024, people: 20, img: '10.png', text: 'A guided tour of Mohenjo-daro with a local archaeologist.' },
    { title: 'Swat Spring Break', region: 'KPK', year: 2025, people: 30, img: '11.png', text: 'Blossoms, waterfalls and a jeep ride to Kalam.' },
    { title: 'Ziarat Winter Camp', region: 'Balochistan', year: 2024, people: 14, img: '12.png', text: 'Juniper forests under snow and a bonfire night.' }
  ];
  const list = document.getElementById('tourList');
  const modal = document.getElementById('modal');
  const likes = {};   // remembers likes while the page is open

  function showTours(year) {
    list.innerHTML = '';
    tours.forEach((t, i) => {
      if (year !== 'all' && t.year !== Number(year)) return;
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `<img src="images/${t.img}" alt="${t.title}">
        <div class="card-body"><span class="tag">${t.region}</span><h3>${t.title}</h3>
        <p class="meta">${t.year} | ${t.people} travellers</p>
        <button class="like">&hearts; <span>${likes[i] || 0}</span></button></div>`;
      card.addEventListener('click', () => openModal(t));
      const like = card.querySelector('.like');
      like.addEventListener('click', (e) => {
        e.stopPropagation();   // do not open the modal
        likes[i] = (likes[i] || 0) + 1;
        like.querySelector('span').textContent = likes[i];
        like.classList.add('liked');
      });
      list.appendChild(card);
    });
  }
  document.querySelectorAll('.filters button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.filters .on').classList.remove('on');
      btn.classList.add('on');
      showTours(btn.dataset.year);
    });
  });

  // ===== Modal =====
  function openModal(t) {
    document.getElementById('mImg').src = 'images/' + t.img;
    document.getElementById('mTitle').textContent = t.title;
    document.getElementById('mText').textContent = t.text;
    document.getElementById('mMeta').textContent = t.region + ' | ' + t.year + ' | ' + t.people + ' travellers';
    modal.classList.add('show');
  }
  document.getElementById('closeModal').addEventListener('click', () => modal.classList.remove('show'));
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('show'); });

  // ===== Testimonial slider =====
  const reviews = [
    { text: 'The Hunza trip was perfectly organised. We saw everything we wanted.', who: 'Ayesha, Lahore' },
    { text: 'Our guide knew every story behind Mohenjo-daro. Highly recommended.', who: 'Hamza, Karachi' },
    { text: 'Swat was beautiful and the pricing was honest. We will book again.', who: 'Sana, Islamabad' }
  ];
  const rText = document.getElementById('rText');
  const rWho = document.getElementById('rWho');
  const dots = document.getElementById('dots');
  let current = 0;
  reviews.forEach((r, i) => {
    const d = document.createElement('span');
    d.addEventListener('click', () => { current = i; showReview(); });
    dots.appendChild(d);
  });
  function showReview() {
    rText.textContent = '"' + reviews[current].text + '"';
    rWho.textContent = reviews[current].who;
    [...dots.children].forEach((d, i) => d.classList.toggle('on', i === current));
  }
  setInterval(() => { current = (current + 1) % reviews.length; showReview(); }, 4000);

  showTours('all');
  showReview();
})();

// ===== Contact page =====
(function () {
  if (!document.getElementById('contactForm')) return; // run only on this page
  // ===== Live Pakistan time =====
  const clock = document.getElementById('clock');
  function updateClock() {
    clock.textContent = new Date().toLocaleTimeString('en-PK', { timeZone: 'Asia/Karachi' });
  }
  updateClock();
  setInterval(updateClock, 1000);

  // ===== Character counter =====
  const msg = document.getElementById('message');
  const count = document.getElementById('count');
  const MAX = 300;
  msg.addEventListener('input', () => {
    const left = MAX - msg.value.length;
    count.textContent = left + ' characters left';
    count.classList.toggle('warn', left < 30);
    if (left < 0) msg.value = msg.value.slice(0, MAX);
  });

  // ===== Validation =====
  const form = document.getElementById('contactForm');
  function err(id, text) { document.getElementById(id + 'Err').textContent = text; return text === ''; }
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cname').value.trim();
    const email = document.getElementById('cemail').value.trim();
    const subject = document.getElementById('subject').value;
    const text = msg.value.trim();
    const valid = [
      err('cname', name.length < 3 ? 'Please enter your name.' : ''),
      err('cemail', !/^\S+@\S+\.\S+$/.test(email) ? 'Enter a valid email address.' : ''),
      err('subject', subject === '' ? 'Choose a subject.' : ''),
      err('message', text.length < 10 ? 'Message must be at least 10 characters.' : '')
    ];
    if (valid.includes(false)) return;
    const ok = document.getElementById('sent');
    ok.style.display = 'block';
    ok.textContent = 'Thank you, ' + name + '! We received your message about "' + subject + '" and will reply to ' + email + ' soon.';
    form.reset();
    count.textContent = MAX + ' characters left';
  });
})();

// ===== Register page =====
(function () {
  if (!document.getElementById('regForm')) return; // run only on this page
  const form = document.getElementById('regForm');
  const pw = document.getElementById('password');
  const bar = document.querySelector('.strength div');

  function setError(id, msg) { document.getElementById(id + 'Err').textContent = msg; return msg === ''; }

  // ===== Password strength meter =====
  pw.addEventListener('input', () => {
    const v = pw.value;
    let score = 0;
    if (v.length >= 8) score++;
    if (/[A-Z]/.test(v)) score++;
    if (/[0-9]/.test(v)) score++;
    if (/[^A-Za-z0-9]/.test(v)) score++;
    const colors = ['#c0392b', '#e67e22', '#f1c40f', '#27ae60'];
    bar.style.width = (score * 25) + '%';
    bar.style.background = colors[Math.max(score - 1, 0)];
  });

  // ===== Show / hide password =====
  document.getElementById('showPw').addEventListener('click', () => {
    pw.type = pw.type === 'password' ? 'text' : 'password';
  });

  // ===== Validation on submit =====
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const region = document.getElementById('region').value;
    const ok = [
      setError('fullname', name.length < 3 ? 'Enter your full name (min 3 letters).' : ''),
      setError('email', !/^\S+@\S+\.\S+$/.test(email) ? 'Enter a valid email address.' : ''),
      setError('phone', !/^03\d{2}-?\d{7}$/.test(phone) ? 'Use format 03XX-XXXXXXX.' : ''),
      setError('password', pw.value.length < 8 ? 'Password needs at least 8 characters.' : ''),
      setError('region', region === '' ? 'Choose a favourite region.' : '')
    ];
    if (ok.includes(false)) return;

    const interests = [...document.querySelectorAll('.checks input:checked')].map(c => c.value);
    const out = document.getElementById('success');
    out.style.display = 'block';
    out.innerHTML = `<b>Registration successful!</b><br>Name: ${name}<br>Email: ${email}<br>Favourite region: ${region}<br>Interests: ${interests.length ? interests.join(', ') : 'none selected'}`;
    form.reset();
    bar.style.width = '0';
  });
})();
