// public/script.js
function updateCityDetails() {
  const selectedCity = document.getElementById('cityDropdown').value;

  // Call the server to update the word document on the server-side
  fetch('/update-document', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ selectedCity }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update document');
      }
      return response.text();
    })
    .then(message => {
      console.log(message);
    })
    .catch(error => console.error('Error:', error));
}

// public/script.js
function generateHotelBill() {
  const selectedCity = document.getElementById('cityDropdown').value;

  const data = {
    customerName: 'John Doe',
    checkInDate: formatDate(document.getElementById('checkInDate').value),
    checkInTime: document.getElementById('checkInTime').value,
    numberOfNights: document.getElementById('Nights').value,
    amount: document.getElementById('Amount').value,
    bookingDate: formatDate(document.getElementById('dateBook').value),
    checkOutDate: formatDate(document.getElementById('checkOutDate').value),
    cityDropdown: selectedCity,
    confirmationMessage: getConfirmationMessage(selectedCity),
    place: getPlaceDetails(selectedCity),
    add: getAddress(selectedCity),
    phone: getPhoneNumbers(selectedCity),
    mail: getEmail(selectedCity),
  };

  fetch('/generate-bill', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.blob())
    .then(blob => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'generated_document.docx';
      link.style.display = 'none';

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
    })
    .catch(error => console.error('Error:', error));
}

// Rest of the script remains unchanged

function getAddress(city) {
  switch (city) {
    case 'Mathura':
      return 'Bharatpur-Mathura road, near railway station Mathura, IN';
    case 'Kasganj':
      return 'Near Kasganj Junction Railway station Kasganj, IN';
    case 'Jhansi':
      return 'Burf Khana Elite Chouraha, Jhansi, IN';
    case 'Etah':
      return 'Station road, Etah, IN';
    case 'Etawah':
      return 'Near Guru Kripa Diagnostic Center, Civil Lines, Etawah, IN';
    default:
      return '';
  }
}

function getPhoneNumbers(city) {
  switch (city) {
    case 'Mathura':
      return '7159046031, 8034582118, 7706338424, 8056527789';
    case 'Kasganj':
      return '8573490757, 7308917549';
    case 'Jhansi':
      return '8460949896, 7081525940, 9800002231, 9579860480';
    case 'Etah':
      return '8713900000, 9055512888, 9906383424, 9055528888';
    case 'Etawah':
      return '7984350397, 9089140844, 9230505073, 6177002246';
    default:
      return '';
  }
}

function getEmail(city) {
  switch (city) {
    case 'Mathura':
      return 'hotel.mathuraramapalace@gmail.com';
    case 'Kasganj':
      return 'Ganga.hotelkasganj@icloud.com';
    case 'Jhansi':
      return 'sukhsagarjhansi@gmail.com';
    case 'Etah':
      return 'hotelsheetlapalace@gmail.com';
    case 'Etawah':
      return 'thegrandserene.hotel@gmail.com';
    default:
      return '';
  }
}

function getPlaceDetails(city) {
  switch (city) {
    case 'Etah':
      return {
        place: 'Hotel Sheetla Palace, Etah',
        add: 'Station road, Etah, IN',
        phone: '8713900000, 9055512888, 9906383424, 9055528888',
        mail: 'hotelsheetlapalace@gmail.com',
      };
    case 'Mathura':
      return {
        place: 'Hotel Rama Palace, Mathura',
        add: 'Bharatpur-Mathura road, near railway station Mathura, IN',
        phone: '7159046031, 8034582118, 7706338424, 8056527789',
        mail: 'hotel.mathuraramapalace@gmail.com',
      };
    case 'Etawah':
      return {
        place: 'Hotel The Grand Serene, Etawah',
        add: 'Near Guru Kripa Diagnostic Center, Civil Lines, Etawah, IN',
        phone: '7984350397, 9089140844, 9230505073, 6177002246',
        mail: 'thegrandserene.hotel@gmail.com',
      };
    case 'Jhansi':
      return {
        place: 'Hotel Sukh Sagar, Jhansi',
        add: 'Burf Khana Elite Chouraha, Jhansi, IN',
        phone: '8460949896, 7081525940, 9800002231, 9579860480',
        mail: 'sukhsagarjhansi@gmail.com',
      };
    case 'Kasganj':
      return {
        place: 'Hotel Ganga Palace, Kasganj',
        add: 'Near Kasganj Junction Railway station Kasganj, IN',
        phone: '8573490757, 7308917549',
        mail: 'Ganga.hotelkasganj@icloud.com',
      };
    default:
      return {};
  }
}


function getConfirmationMessage(city) {
  switch (city) {
    case 'Mathura':
      return 'Your booking at Hotel Rama Palace, Mathura is confirmed';
    case 'Kasganj':
      return 'Your booking at Hotel Ganga Palace, Kasganj is confirmed';
    case 'Jhansi':
      return 'Your booking at Hotel Sukh Sagar, Jhansi is confirmed';
    case 'Etah':
      return 'Your booking at Hotel Sheetla Palace, Etah is confirmed';
    case 'Etawah':
      return 'Your booking at Hotel The Grand Serene, Etawah is confirmed';
    default:
      return 'Please select a city';
  }
}

function getHotelDetails(city) {
  switch (city) {
    case 'Mathura':
      return 'Hotel Rama Palace, Mathura';
    case 'Kasganj':
      return 'Hotel Ganga Palace, Kasganj';
    case 'Jhansi':
      return 'Hotel Sukh Sagar, Jhansi';
    case 'Etah':
      return 'Hotel Sheetla Palace, Etah';
    case 'Etawah':
      return 'Hotel The Grand Serene, Etawah';
    default:
      return '';
  }
}

function formatDate(inputDate) {
  const date = new Date(inputDate);
  const day = String(date.getDate()).padStart(2, '0');
  const monthAbbreviation = date.toLocaleString('default', { month: 'short' });
  const year = String(date.getFullYear()).slice(-2);

  return `${day}/${monthAbbreviation}/${year}`;
}
