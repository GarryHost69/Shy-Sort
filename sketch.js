var obj, choice, randbut, sortbut, sorting = false, capture, tracker;

function setup() {
	createCanvas(windowWidth, windowHeight);
	randbut = createButton('Randomize');
	randbut.position(10, 350);
	choice = createSelect();
	choice.position(10, 400);
	sortbut = createButton('Sort');
	sortbut.position(10, 450);
	choice.option('Bubble Sort');
	choice.option('Selection Sort');
	choice.option('Insertion Sort');
	obj = new shySort(350, -280, 280);
	sortbut.mousePressed(sSort);
	randbut.mousePressed(randomize);
	capture = createCapture(VIDEO);
	capture.size(300, 300);
	tracker = new clm.tracker();
    tracker.init();
    tracker.start(capture.elt);
}

function draw() {
	background(192, 239, 255);
	image(capture, 0, 0, 300, 300);
	var positions = tracker.getCurrentPosition();
    noFill();
    stroke(0);
    beginShape();
    for (var i = 0; i < positions.length; i++) {
        vertex(positions[i][0], positions[i][1]);
    }
    endShape();
	obj.display();
	if (sorting) {
		obj.sort();
	}
	if (obj.sorted) {
		sorting = false;
	}
}

function shySort(size, lowrange, highrange) {
	this.array = [];
	this.i = 1;
	this.j = 0;
	this.sorted = false;
	for (let i = 0; i < size; i++) {
		this.array.push(floor(random(lowrange, highrange)));
	}
	this.sort = function () {
		textSize(30);
		fill(255, 0, 0);
		if (tracker.getScore() < 0.5) {
			text("No one's Watching", 10, 550);
			switch (choice.value()) {
				case "Bubble Sort" :	this.bubbleSort();
				break;
				case "Selection Sort" :	this.selectionSort();
				break;
				case "Insertion Sort" :	this.insertionSort();
				break;
			}
		}
		else {
			text("Please Look Away!!", 10, 550);
		}
	}
	this.bubbleSort = function () {
		if (this.j < this.array.length) {
			for (let i = 0; i < this.array.length - this.j - 1; i++) {
				if (this.array[i] > this.array[i + 1]) {
					this.swap(i, i + 1);
				}
			}
			this.j += 1;
		}
		else {
			this.sorted = true;
		}
		this.pause(2);
	}
	this.insertionSort = function () {
		if (this.i < this.array.length) {
			let j = this.i;
			while (j > 0 && this.array[j - 1] > this.array[j]) {
				this.swap(j, j - 1);
				j -= 1;
			}
			this.i += 1;
		}
		else {
			this.sorted = true;
		}
		this.pause(2);
	}
	this.selectionSort = function () {
		if (this.j < this.array.length) {
			let m = this.j;
			for (let i = this.j + 1; i < this.array.length; i++) {
				if (this.array[i] < this.array[m]) {
					m = i;
				}
			}
			if (m != this.j) {
				this.swap(this.j, m);
			}
			this.j += 1;
		}
		else {
			this.sorted = true;
		}
		this.pause(2);
	}
	this.swap = function (i, j) {
		let temp = this.array[i];
		this.array[i] = this.array[j];
		this.array[j] = temp;
	}
	this.display = function () {
		let x = 310, y = 328;
		fill(253, 145, 153);
		for (let i = 0; i < this.array.length; i++) {
			rect(x, y, 1, - this.array[i]);
			x += 3;
		}
	}
	this.pause = function (t) {
		for (let i = 0; i < t * 33000000; i++) {

		}
	}
}

function sSort() {
	if (!obj.sorted) {
		sorting = true;
	}
	else {
		window.alert('Array is already sorted!!');
	}
}

function randomize() {
	obj = new shySort(350, -280, 280);
}
