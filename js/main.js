// import { Carte } from './Carte.js';
// import { Restaurant } from './Restaurant.js';
// import { restaurants } from './restaurants-json.js';

function start() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: 48.8566969, lng: 2.3514616 },
		zoom: 10,
	});
	// let carte = new Carte(document.getElementById('map'), {
	// 	zoom: 10,
	// 	center: { lat: 45.91971, lng: 6.14393 },
	// });

	carte = new Carte(map);

	carte.getUserPosition();

	for (let i = 0; i < restaurants.length; i++) {
		let restauJson = restaurants[i];
		let restaurant = new Restaurant(restauJson);
		carte.addMarker({
			coords: {
				lat: restaurant.lat,
				lng: restaurant.lng,
			},
			iconImage: 'http://maps.google.com/mapfiles/kml/shapes/dining.png',
			content: `<h1>${restaurant.name}</h1>`,
		});

		let name = `<button type="button" class="accordion_button">${restaurant.name}<button>`;
		$('.accordion').append(name);
		let address = `<div class="accordion_content">${restaurant.address}<div>`;
		$('.accordion_content').append(address);
	}
}

document.querySelectorAll('.accordion_button').forEach((button) => {
	button.addEventListener('click', () => {
		button.classList.toggle('accordion_button--active');
	});
});
