document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('popup');
    const popupImg = document.getElementById('popup-img');
    const popupName = document.getElementById('popup-name');
    const popupText = document.getElementById('popup-text');
    const popupLink = document.getElementById('popup-link'); // New element for the link
    const closeBtn = document.querySelector('.close-btn');

    document.querySelectorAll('.popup-btn').forEach(button => {
        button.addEventListener('click', async (event) => {
            const slide = event.target.closest('.slider__container').parentNode;
            const id = slide.getAttribute('data-id');
            const data = await fetchData(id);

            if (data) {
                console.log('Data found for ID:', id, data); // Log the fetched data

                popupImg.src = data.image;
                popupName.textContent = data.name;
                popupText.textContent = data.text;

                // Handle link
                if (data.link) {
                    popupLink.href = data.link;
                    popupLink.style.display = 'flex'; // Show the link if it exists
                } else {
                    popupLink.style.display = 'none'; // Hide the link if it doesn't exist
                }

                popup.style.display = 'flex';
                document.body.classList.add('no-scroll'); // Disable background scroll
            } else {
                console.error('Data not found for ID:', id);
            }
        });
    });

    closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
        document.body.classList.remove('no-scroll'); // Enable background scroll
    });

    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.style.display = 'none';
            document.body.classList.remove('no-scroll'); // Enable background scroll
        }
    });
});

async function fetchData(id) {
    try {
        const response = await fetch('./data.json');
        const data = await response.json();
        console.log('Fetched data:', data); // Log the fetched data
        return data[id];
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}
