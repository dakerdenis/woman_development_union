document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('popup');
    const popupImg = document.getElementById('popup-img');
    const popupName = document.getElementById('popup-name');
    const popupText = document.getElementById('popup-text');
    const popupLink = document.getElementById('popup-link');
    const closeBtn = document.querySelector('.close-btn');
    const popupSocial = document.querySelector('.popup-social');

    async function openPopup(id) {
        const data = await fetchData(id);

        if (data) {
            console.log('Data found for ID:', id, data);

            popupImg.src = data.image;
            popupName.textContent = data.name;
            popupText.textContent = data.text;

            if (data.link) {
                popupLink.href = data.link;
                popupLink.style.display = 'flex';
            } else {
                popupLink.style.display = 'none';
            }

            generateSocialLinks(id);
            popup.style.display = 'flex';
            document.body.classList.add('no-scroll');
        } else {
            console.error('Data not found for ID:', id);
        }
    }

    function generateSocialLinks(id) {
        const url = window.location.href.split('#')[0] + '#' + id;
        popupSocial.innerHTML = `
          <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}" target="_blank" class="facebook"></a>
          <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}" target="_blank" class="twitter"></a>
          <a href="https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}" target="_blank" class="linkedin"></a>
          <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(url)}" target="_blank" class="whatsapp"></a>
        `;
    }

    document.querySelectorAll('.popup-btn').forEach(button => {
        button.addEventListener('click', async (event) => {
            const slide = event.target.closest('.slider__container').parentNode;
            const id = slide.getAttribute('data-id');
            history.pushState(null, null, `#${id}`);
            openPopup(id);
        });
    });

    closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
        document.body.classList.remove('no-scroll');
        history.pushState(null, null, ' '); // Remove hash from URL
    });

    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.style.display = 'none';
            document.body.classList.remove('no-scroll');
            history.pushState(null, null, ' '); // Remove hash from URL
        }
    });

    window.addEventListener('popstate', () => {
        const id = window.location.hash.substring(1);
        if (id) {
            openPopup(id);
        } else {
            popup.style.display = 'none';
            document.body.classList.remove('no-scroll');
        }
    });

    const initialId = window.location.hash.substring(1);
    if (initialId) {
        openPopup(initialId);
    }
});

async function fetchData(id) {
    try {
        const response = await fetch('./data.json');
        const data = await response.json();
        console.log('Fetched data:', data);
        return data[id];
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

async function fetchData(id) {
    try {
        const response = await fetch('./data.json');
        const data = await response.json();
        console.log('Fetched data:', data);
        return data[id];
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}




document.addEventListener('DOMContentLoaded', () => {
    const mobileBurger = document.getElementById('mobileBurger');
    const mobileNav = document.getElementById('mobileNav');
    const navLinks = mobileNav.querySelectorAll('a');
    
    mobileBurger.addEventListener('click', () => {
      toggleMenu();
    });
  
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });
  
    function toggleMenu() {
      mobileBurger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.classList.toggle('no-scroll');
    }
  
    function closeMenu() {
      mobileBurger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.classList.remove('no-scroll');
    }
  });
  