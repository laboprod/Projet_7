class Restaurant {
	constructor({ restaurantName, lat, long, address, ratings, placeId }, carte) {
		this.name = restaurantName;
		this.address = address;
		this.lat = lat;
		this.lng = long;
		this.ratings = ratings;
		this.averageRating = 0;
		this.totalRatings = 0;
		this.placeId = placeId;
		this.carte = carte;
	}

	calculateAverageRating() {
		let totalRatings = 0;
		let averageRating = 0;

		this.ratings.forEach((ratings) => {
			totalRatings += ratings.stars;
		});

		if (this.ratings.length === 0) {
			averageRating = 0;
		} else {
			averageRating = totalRatings / this.ratings.length;
		}

		let roundedAverageRating = Math.round(averageRating * 10) / 10; // pour avoir 1 decimale
		this.averageRating = roundedAverageRating;
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

	listenForCommentForm() {
		document.getElementById('modal-button-' + this.placeId).addEventListener('click', () => {
			document.getElementById('modal-restaurant-name').innerHTML = this.name;
			showModal('add-comment-modal');
			document.getElementById('form-comment').reset();

			this.listenCommentSubmission();
			document.getElementById('close-comment').addEventListener('click', () => {
				hideModal('add-comment-modal');
			});
		});
	}

	renderHTML() {
		return `
			<div class="name" id="${this.placeId}-name">${this.name}</div>
			<div class="address" id="${this.placeId}-address">${this.address}</div>
			<img class="streetView" id="${this.placeId}-streetView">
			<div class="ratings" id="${this.placeId}-ratings">${this.displayStars()}</div>
			<div class="comment" id="${this.placeId}-comment">${this.showComments()}</div>
			<button class="button" data-id="${this.placeId}" id="modal-button-${this.placeId}">Ajouter un commentaire</button>
		`;
	}

	listenCommentSubmission() {
		let self = this;
		document.getElementById('form-comment').addEventListener(
			'submit',
			(e) => {
				e.preventDefault();

				let review = {
					stars: parseInt(document.getElementById('my-rating').value),
					comment: document.getElementById('my-comment').value,
				};

				self.ratings.push(review);
				self.calculateAverageRating();

				document.getElementById(self.placeId + '-comment').innerHTML = self.showComments();
				document.getElementById(self.placeId + '-ratings').innerHTML = self.displayStars();

				hideModal('add-comment-modal');
			},
			{ once: true }
		);
	}

	show() {
		this.showOnMap();
		this.showOnList();
		this.showStreetViewImage();
		this.listenForCommentForm();
	}

	showOnMap() {
		this.carte.addMarker('restaurant', { lat: this.lat, lng: this.lng }, this.name);
	}

	showOnList() {
		let restaurants_element = document.getElementById('restaurants');

		let restaurant_element = document.createElement('div');
		restaurant_element.classList.add('restaurant');
		if (this.open) {
			restaurant_element.classList.add('open');
		}

		restaurant_element.addEventListener('click', function () {
			this.open = true;
			this.classList.toggle('open');
		});
		restaurant_element.innerHTML = this.renderHTML();

		restaurants_element.prepend(restaurant_element);
	}

	showComments() {
		let comments = '';

		this.ratings.forEach((ratings) => {
			comments += `<div class="comment">${ratings.comment}</div>`;
		});

		return comments;
	}

	showStreetViewImage() {
		let image = `https://maps.googleapis.com/maps/api/streetview?location=${this.lat},${this.lng}&size=300x200&key=AIzaSyBuqGWfwnf0jqwfu8WJprNaJoLcD00sol4`;
		let element = document.getElementById(this.placeId + '-streetView');
		$(element).attr('src', image);
		return;
	}

	fetchReviews() {
		let self = this;

		let request = {
			placeId: this.placeId,
			fields: ['reviews'],
		};

		return new Promise((resolve, reject) => {
			self.carte.placeService.getDetails(request, (result, status) => {
				if (status == google.maps.places.PlacesServiceStatus.OK) {
					if ('reviews' in result) {
						result.reviews.forEach((review) => {
							self.ratings.push({
								stars: review.rating,
								comment: review.text,
							});
						});

						self.calculateAverageRating();
					}

					resolve();
				}
			});
		});
	}
}

// export { Restaurant };
