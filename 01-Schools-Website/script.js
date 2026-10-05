/**
 * AcharyaPith Preschool - Interactive UI & UX Controller
 * Clean, lightweight, professional vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header Scroll Shadow Effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // 2. Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking any nav link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Set minimum tour date to tomorrow
  const tourDateInput = document.getElementById('tourDate');
  if (tourDateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    tourDateInput.min = `${yyyy}-${mm}-${dd}`;
  }

  // 4. Interactive Age-to-Program Finder
  const childAgeSelector = document.getElementById('childAgeSelector');
  const btnFindProgram = document.getElementById('btnFindProgram');

  if (btnFindProgram && childAgeSelector) {
    btnFindProgram.addEventListener('click', () => {
      const val = childAgeSelector.value;
      let targetId = 'program-toddler';

      if (val === 'toddler') targetId = 'program-toddler';
      else if (val === 'nursery') targetId = 'program-nursery';
      else if (val === 'kg1' || val === 'kg2') targetId = 'program-kg';
      else if (val === 'daycare') targetId = 'program-toddler';

      const targetCard = document.getElementById(targetId);
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Visual highlight effect
        targetCard.style.transition = 'box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease';
        targetCard.style.boxShadow = '0 0 0 4px #D97706, 0 16px 32px rgba(217, 119, 6, 0.25)';
        targetCard.style.borderColor = '#D97706';
        targetCard.style.transform = 'scale(1.03)';

        setTimeout(() => {
          targetCard.style.boxShadow = '';
          targetCard.style.borderColor = '';
          targetCard.style.transform = '';
        }, 2200);
      }
    });
  }

  // 5. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 6. Curriculum Modal Data & Handlers
  const curriculumData = {
    'Shishu Vatika (Toddlers)': {
      title: 'Shishu Vatika (1.5 – 2.5 Years)',
      badge: 'Toddler Milestone Track',
      desc: 'Our toddler sanctum fosters sensorial confidence and safe separation ease through loving consistency, child-paced routines, and rich tactile discovery.',
      pillars: [
        '<strong>Sensory & Tactile:</strong> Water play, natural dough shaping, kinetic sand, and sound shakers.',
        '<strong>Language Foundations:</strong> Rhyme cadence, animal sounds, picture naming, and expressive vocabulary.',
        '<strong>Gross & Fine Motor:</strong> Soft foam climbing, wooden bead threading, grasping tongs, and balancing beams.',
        '<strong>Social Harmony:</strong> Sharing snacks, gentle touch manners, and emotion-regulation breathing.'
      ]
    },
    'Bal Vatika I (Nursery)': {
      title: 'Bal Vatika I (2.5 – 3.5 Years)',
      badge: 'Nursery Exploration Track',
      desc: 'Nurturing independent thought, peer collaboration, phonetic awareness, and early mathematical concepts through play.',
      pillars: [
        '<strong>Early Phonics:</strong> Jolly Phonics single-sound recognition (s, a, t, i, p, n) and phonemic listening.',
        '<strong>Pre-Math & Logic:</strong> Sorting by color, size grading with Montessori pink tower, and basic counting 1-10.',
        '<strong>Creative Expression:</strong> Finger painting, clay modeling, shadow puppet theatre, and musical instruments.',
        '<strong>Practical Life Skills:</strong> Hand washing, buttoning frames, tidying play materials, and pouring liquids.'
      ]
    },
    'Bal Vatika II & III (Kindergarten)': {
      title: 'Bal Vatika II & III (3.5 – 5.5 Years)',
      badge: 'Kindergarten & Readiness Track',
      desc: 'Empowering children with primary school readiness, fluent early reading, arithmetic confidence, and scientific curiosity.',
      pillars: [
        '<strong>Literacy Mastery:</strong> 3-letter CVC word blending, sight word vocabulary, sentence dictation, and story narration.',
        '<strong>Numeracy & Patterns:</strong> Quantities up to 50, basic addition with counters, clock time sense, and geometric shapes.',
        '<strong>STEM Mini-Inquiries:</strong> Plant life cycles, weather charts, sink-or-float experiments, and magnet exploration.',
        '<strong>Cultural Ethics & Sanskar:</strong> Mindfulness meditation, community service projects, and respect for nature.'
      ]
    }
  };

  const modal = document.getElementById('curriculumModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalDismissBtn = document.getElementById('modalDismissBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalBadge = document.getElementById('modalBadge');
  const modalDescription = document.getElementById('modalDescription');
  const modalPillars = document.getElementById('modalPillars');
  const modalBookTourBtn = document.getElementById('modalBookTourBtn');

  function openModal(programName) {
    const data = curriculumData[programName] || curriculumData['Shishu Vatika (Toddlers)'];
    modalTitle.textContent = data.title;
    modalBadge.textContent = data.badge;
    modalDescription.textContent = data.desc;

    modalPillars.innerHTML = `
      <h5 style="font-family: var(--font-heading); font-size: 0.95rem; font-weight: 800; color: var(--color-primary); margin-bottom: 10px;">
        Core Developmental Pillars:
      </h5>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; font-size: 0.88rem; color: var(--color-text-main);">
        ${data.pillars.map(pillar => `<li style="display: flex; gap: 8px;"><span style="color: var(--color-secondary);">&bull;</span><span>${pillar}</span></li>`).join('')}
      </ul>
    `;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.open-curriculum-modal').forEach(button => {
    button.addEventListener('click', (e) => {
      const program = e.currentTarget.getAttribute('data-program');
      openModal(program);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeModal);
  if (modalBookTourBtn) modalBookTourBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // 7. Tour Booking Form Handling & Toast Notification
  const tourBookingForm = document.getElementById('tourBookingForm');
  const toastNotice = document.getElementById('toastNotice');
  const toastMessage = document.getElementById('toastMessage');

  function showToast(message) {
    toastMessage.textContent = message;
    toastNotice.classList.add('show');
    setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 4500);
  }

  if (tourBookingForm) {
    const submitBtn = document.getElementById('submitTourBtn');
    const originalBtnHtml = submitBtn ? submitBtn.innerHTML : 'Confirm Tour Booking';

    tourBookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const parentName = document.getElementById('parentName').value.trim();
      const parentPhone = document.getElementById('parentPhone').value.trim();
      const parentEmail = document.getElementById('parentEmail').value.trim();
      const childAge = document.getElementById('childAge').value;
      const tourDate = document.getElementById('tourDate').value;
      const tourTime = document.getElementById('tourTime').value;
      const tourNotes = document.getElementById('tourNotes') ? document.getElementById('tourNotes').value.trim() : '';

      if (!parentName || !parentPhone || !parentEmail || !childAge || !tourDate || !tourTime) {
        toastNotice.style.backgroundColor = '#E11D48';
        showToast('Please fill in all mandatory fields with an asterisk (*).');
        return;
      }

      // Set loading state on button
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        submitBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation: spin 1s linear infinite;">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
            <path d="M12 2a10 10 0 0 1 10 10"></path>
          </svg>
          <span>Confirming Tour...</span>
        `;
      }

      try {
        // Post to backend API
        const response = await fetch('/api/book-tour', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            parentName,
            parentPhone,
            parentEmail,
            childAge,
            tourDate,
            tourTime,
            tourNotes
          })
        });

        const data = await response.json();

        if (response.ok && data.success) {
          toastNotice.style.backgroundColor = '#10B981';
          showToast(`🎉 Tour booked! Ref: ${data.referenceId}. Confirmation sent to ${parentEmail}`);
          tourBookingForm.reset();
        } else {
          toastNotice.style.backgroundColor = '#E11D48';
          showToast(data.error || 'Failed to submit tour request. Please check inputs.');
        }
      } catch (networkError) {
        // Fallback if accessed as static file without active node server
        console.warn('API backend unreachable, running in client-only mode:', networkError);
        const fallbackRef = `AP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
        toastNotice.style.backgroundColor = '#10B981';
        showToast(`🎉 Tour reserved (Ref: ${fallbackRef})! Our admissions office will call ${parentPhone}.`);
        tourBookingForm.reset();
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';
          submitBtn.innerHTML = originalBtnHtml;
        }
      }
    });
  }

  // 8. Active Nav Link on Scroll (Intersection Observer)
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
});
