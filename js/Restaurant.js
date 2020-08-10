class Restaurant {
	constructor({ restaurantName, lat, long, address, ratings }, carte) {
		this.name = restaurantName;
		this.address = address;
		this.lat = lat;
		this.lng = long;
		this.ratings = ratings;
		this.averageRating = this.calculateAverageRating();
		this.totalRatings = 0;
		this.totalComments = 0;
		this.carte = carte;
		this.id = String(lat) + String(long);
		// this.elementParent = $('.restaurants');
		// this.html = `
		// 	<div class="restaurant">
		// 			<div class="name" id="${this.id}-name">
		// 			<div class="address" id="${this.id}-address">
		// 			<div class="streetView" id="${this.id}-streetView">
		// 			<div class="comment" id="${this.id}-comment">
		// 	</div>`;
	}

	showOnMap() {
		this.carte.addMarker({
			coords: {
				lat: this.lat,
				lng: this.lng,
			},
			iconImage: 'http://maps.google.com/mapfiles/kml/shapes/dining.png',
			content: `<h1>${this.name}</h1>`,
		});
	}

	calculateAverageRating() {
		let totalRatings = 0;
		let averageRating = 0;

		this.ratings.forEach(function (ratings) {
			totalRatings += ratings.stars;
		});

		if (this.ratings.length === 0) {
			averageRating = 0;
		} else {
			averageRating = totalRatings / this.ratings.length;
		}

		let roundedAverageRating = Math.round(averageRating * 10) / 10; // pour avoir 1 decimale
		return roundedAverageRating;
	}

	displayStars() {
		let rate = this.averageRating;
		let starPercentage = (rate / 5) * 100;
		return `<div class="stars-outer">
				<i class="fa fa-star-o"></i>
				<i class="fa fa-star-o"></i>
				<i class="fa fa-star-o"></i>
				<i class="fa fa-star-o"></i>
				<i class="fa fa-star-o"></i>

				<div class="stars-inner" style="width: ${starPercentage}%">
					<i class="fa fa-star"></i>
					<i class="fa fa-star"></i>
					<i class="fa fa-star"></i>
					<i class="fa fa-star"></i>
					<i class="fa fa-star"></i>
				</div>
			</div> &nbsp ${this.ratings.length} avis`;
	}

	showList() {
		let restaurants_element = document.querySelector('.restaurants');

		let restaurant_element = document.createElement('div');
		restaurant_element.classList.add('restaurant');
		if (this.open) {
			restaurant_element.classList.add('open');
		}

		restaurant_element.addEventListener('click', function () {
			this.open = true;
			this.classList.toggle('open');
		});
		restaurant_element.innerHTML = `
				<div class="name" id="${this.id}-name">${this.name}</div>
				<div class="address" id="${this.id}-address">${this.address}</div>
				<img class="streetView" id="${this.id}-streetView">
				<div class="ratings" id="${this.id}-ratings">${this.displayStars()}</div>
				<div class="comment" id="${this.id}-comment">${this.showComments()}</div>
		`;
		restaurants_element.appendChild(restaurant_element);
	}

	showComments() {
		let commentToShow = '';
		this.ratings.forEach((ratings) => {
			commentToShow += `<div class="comment">${ratings.comment}</div>`;
		});
		return commentToShow;
	}

	getStreetViewImage() {
		let image = `https://maps.googleapis.com/maps/api/streetview?location=${this.lat},${this.lng}&size=300x200&key=AIzaSyBuqGWfwnf0jqwfu8WJprNaJoLcD00sol4`;
		$('.streetView').attr('src', image);
		return;
	}

	filterResto(ratingMin, ratingMax) {
		let filteredList = restaurants.filter((restaurant) => {
			if (restaurant.averagerating >= ratingMin && restaurant.averageRating <= ratingMax) {
				return true;
			}
		});
		return filteredList;
	}
}

// export { Restaurant };
