/**
 * Bhangaha & Sitapur (VV8Q+WXC) Interactive Map & Discovery Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  const BHANGAHA_LAT = 26.86731;
  const BHANGAHA_LNG = 85.88994;

  // 1. Initialize Interactive Leaflet Map
  let map;
  const mapContainer = document.getElementById('leafletMap');

  if (mapContainer && typeof L !== 'undefined') {
    map = L.map('leafletMap', {
      scrollWheelZoom: false
    }).setView([BHANGAHA_LAT, BHANGAHA_LNG], 15);

    // OpenStreetMap Tile Layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Custom Main Marker for VV8Q+WXC (Sitapur, Bhangaha)
    const mainIcon = L.divIcon({
      className: 'custom-map-pin',
      html: `
        <div style="background-color: #C2410C; color: #FFFFFF; width: 36px; height: 36px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.3); border: 2px solid #FFFFFF;">
          <div style="transform: rotate(45deg); font-weight: 900; font-size: 16px;">★</div>
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      popupAnchor: [0, -32]
    });

    const marker = L.marker([BHANGAHA_LAT, BHANGAHA_LNG], { icon: mainIcon }).addTo(map);
    marker.bindPopup(`
      <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 4px;">
        <strong style="color: #C2410C; font-size: 14px;">📍 VV8Q+WXC</strong><br>
        <span style="font-weight: 700; color: #1C2434;">Sitapur (सीतापुर), Ward 05</span><br>
        <span style="font-size: 12px; color: #64748B;">Bhangaha Municipality, Mahottari, Nepal</span><br>
        <span style="font-size: 11px; color: #D97706; font-weight: bold;">Postal Code: 45700 / 20405</span>
      </div>
    `).openPopup();

    // Secondary Landmark Markers
    const landmarks = [
      {
        name: '🛕 Siddhanath Mahadev Temple (सिद्धनाथ महादेव)',
        desc: 'Ancient Shiva sanctuary at the confluence of Ratu and Badahari rivers (Bhangaha-6)',
        coords: [26.8830, 85.8920]
      },
      {
        name: '🚂 Bhangaha Railway Station (Bijalpura Terminus)',
        desc: 'Broad-gauge terminus connecting to Janakpur & Jayanagar',
        coords: [26.8655, 85.8980]
      },
      {
        name: '🌊 Rato River (रातो खोला)',
        desc: 'Alluvial river basin providing fertile soils to Bhangaha',
        coords: [26.8720, 85.8750]
      }
    ];

    landmarks.forEach(item => {
      L.marker(item.coords).addTo(map).bindPopup(`
        <div style="font-family: 'Plus Jakarta Sans', sans-serif;">
          <strong>${item.name}</strong><br>
          <span style="font-size: 12px; color: #64748B;">${item.desc}</span>
        </div>
      `);
    });

    // POI Quick Jump Buttons
    const poiButtons = document.querySelectorAll('.poi-btn');
    poiButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        poiButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const lat = parseFloat(btn.getAttribute('data-lat'));
        const lng = parseFloat(btn.getAttribute('data-lng'));
        const zoom = parseInt(btn.getAttribute('data-zoom'), 10) || 15;

        map.flyTo([lat, lng], zoom, { duration: 1.2 });
      });
    });
  }

  // 2. Copy Clipboard Helpers
  function setupCopyButton(btnId, textToCopy, successMsg) {
    const btn = document.getElementById(btnId);
    if (!btn) return;

    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = btn.innerText;
        btn.innerText = successMsg || 'Copied!';
        btn.style.backgroundColor = '#D1FAE5';
        btn.style.color = '#059669';

        setTimeout(() => {
          btn.innerText = originalText;
          btn.style.backgroundColor = '';
          btn.style.color = '';
        }, 2000);
      }).catch(err => {
        console.error('Clipboard copy failed:', err);
      });
    });
  }

  setupCopyButton('copyCodeBtn', 'VV8Q+WXC, Bhangaha 45700, Nepal', 'Copied!');
  setupCopyButton('headerCodeBtn', 'VV8Q+WXC, Bhangaha 45700, Nepal', 'Copied Code!');
  setupCopyButton('copyCoordsBtn', '26.86731, 85.88994', 'Copied!');

  // 3. Interactive Distance & Connectivity Calculator
  const destinationData = {
    janakpur: {
      distance: '18 km',
      time: '~ 35 mins via Janakpur-Bhangaha Road',
      note: 'Frequent local buses, electric rickshaws, and passenger rail line directly into Janakpurdham.'
    },
    bardibas: {
      distance: '16 km',
      time: '~ 25 mins via Jaleshwor-Bardibas Highway',
      note: 'Northern gateway connecting to East-West Mahendra Highway and BP Highway to Kathmandu.'
    },
    jaleshwor: {
      distance: '32 km',
      time: '~ 50 mins via District Road',
      note: 'Administrative headquarters of Mahottari District and Nepal-India Bhithamore customs border.'
    },
    sindhuli: {
      distance: '78 km',
      time: '~ 2 hours via BP Highway from Bardibas',
      note: 'Picturesque hill route connecting Terai to Sindhuli Madi and central mid-hills.'
    },
    kathmandu: {
      distance: '215 km',
      time: '~ 5.5 hours via BP Highway & Bardibas',
      note: 'Scenic mountain highway route connecting the federal capital to Bhangaha.'
    },
    birgunj: {
      distance: '120 km',
      time: '~ 2.5 hours via East-West Highway',
      note: 'Major industrial gateway and trade corridor in central Madhesh Province.'
    }
  };

  const destinationSelect = document.getElementById('destinationSelect');
  const calcDistance = document.getElementById('calcDistance');
  const calcTime = document.getElementById('calcTime');
  const calcRouteNote = document.getElementById('calcRouteNote');

  if (destinationSelect && calcDistance && calcTime && calcRouteNote) {
    destinationSelect.addEventListener('change', () => {
      const selected = destinationSelect.value;
      const data = destinationData[selected] || destinationData.janakpur;

      calcDistance.style.opacity = '0';
      calcTime.style.opacity = '0';

      setTimeout(() => {
        calcDistance.innerText = data.distance;
        calcTime.innerText = data.time;
        calcRouteNote.innerText = data.note;
        calcDistance.style.opacity = '1';
        calcTime.style.opacity = '1';
      }, 150);
    });
  }
});
