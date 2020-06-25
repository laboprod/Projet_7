let restaurants = [];

function initMap(e) {
	console.log(e);
	let options = {
		zoom: 10,
		center: { lat: 45.91971, lng: 6.14393 },
	};

	let map = new google.maps.Map(document.getElementById('map'), options);

	let markers = [
		{
			coords: { lat: 45.91971, lng: 6.14393 },
			iconImage: 'http://maps.google.com/mapfiles/kml/shapes/dining.png',
			content: '<h1>Les Papilles</h1>',
		},
		{
			coords: { lat: 46.91971, lng: 6.14393 },
			iconImage: 'http://maps.google.com/mapfiles/kml/shapes/dining.png',
			content: '<h1>Le Clocher</h1>',
		},
		{
			coords: { lat: 45.91971, lng: 5.14393 },
			iconImage: 'http://maps.google.com/mapfiles/kml/shapes/dining.png',
			content: '<h1>Auberge</h1>',
		},
	];

	for (let i = 0; i < markers.length; i++) {
		addMarker(markers[i]);
	}

	function addMarker(props) {
		let marker = new google.maps.Marker({
			position: props.coords,
			map: map,
			icon: props.iconImage,
		});

		if (props.content) {
			let infoWindow = new google.maps.InfoWindow({
				content: props.content,
			});

			marker.addListener('click', () => {
				infoWindow.open(map, marker);
			});
		}
	}
}
