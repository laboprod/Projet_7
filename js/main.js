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
}
