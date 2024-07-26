const popupTexts = {
    'Lorem Ipsum': 'This is the detailed information for Lorem Ipsum.',
    // Add more key-value pairs for different names and texts
};

function getPopupText(name) {
    return popupTexts[name] || 'No detailed information available.';
}
