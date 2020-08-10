// import { Carte } from './Carte.js';
// import { Restaurant } from './Restaurant.js';
// import { restaurants } from './restaurants-json.js';

function start() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: 48.8566969, lng: 2.3514616 },
		zoom: 10,
	});

	carte = new Carte(map);

	carte.getUserPosition();

	for (let i = 0; i < restaurants.length; i++) {
		let restauJson = restaurants[i];
		let restaurant = new Restaurant(restauJson, carte);

		restaurant.showOnMap();
		restaurant.showList();
		restaurant.getStreetViewImage();

		$('#filter').click(function () {
			restaurant.filterResto($('#rating_min').val(), $('#rating_max').val());
		});
	}

	const modal = document.querySelector('#my-modal');
	const modalBtn = document.querySelector('#modal-btn');
	const closeBtn = document.querySelector('.close');

	// Events
	modalBtn.addEventListener('click', openModal);
	closeBtn.addEventListener('click', closeModal);
	window.addEventListener('click', outsideClick);

	// Open
	function openModal() {
		modal.style.display = 'block';
	}

	// Close
	function closeModal() {
		modal.style.display = 'none';
	}

	// Close If Outside Click
	function outsideClick(e) {
		if (e.target == modal) {
			modal.style.display = 'none';
		}
	}
}
