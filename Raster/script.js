let words = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "2", "3", "4", "9", "ß", "7", "&", "%"]
let words2 = ["formation", "fication", "figuration", "morthosis", "two", "three"]
let word
// let mic;
let colWidth, rowHeight;
let columns = 20
let rows = 20
let inktrapC;

let counter = 0;
let lineLength = 5;
let lineThikness = 5;
let endVolume = 0;

//class
let commandPoints = [];
let diameter = 20;

let easing = 0.4;
const loopDuration = 7 * 60
let myFont;
let formBool;
let img;

function preload() {
	myFont = loadFont('CantataOne-Regular.ttf');
	img = loadImage("img4.png");
}

function setup() {
	createCanvas(300, 400)
	textSize(150)
	textFont(myFont);
	inktrapC = color(238, 98, 87);
	textAlign(CENTER, CENTER)

	colWidth = float(width) / columns
	rowHeight = colWidth
	//rowHeight = float(height)/rows
	diameter = colWidth;

	fill(255)
	noStroke()
	textSize(250)
	text(words[int(random(words.length))], width/2, height/2-80)
	//image(img, 0, 0, 300, 400)
	let id = 0;
	for (let x = 0; x < columns; x++) {
		for (let y = 0; y < rows; y++) {
			noFill()
			rect(x * colWidth, y * rowHeight, colWidth, rowHeight)
			let c = get(x * colWidth + colWidth / 2, y * rowHeight + rowHeight / 2)
			if (red(c) > 125) {
				fill(inktrapC)
				ellipse(x * colWidth, y * rowHeight, colWidth, rowHeight)
				commandPoints.push(new CommandPoint(x * colWidth, y * rowHeight, id));
				id++;
			}
		}
	}
	background(10)
	createNewPositions()

	if (formBool) {
		fill(10, 80)
		stroke(250)

	} else {
		fill(250)
		stroke(10)
	}
	rect(0, 0, width, height)
	noFill()
	stroke(255)
	for (let p of commandPoints) {
		p.display(diameter / 2)
		for (let other of commandPoints) {
			if (p !== other) {
				p.isNeighbour(other)
			}
		}
	}

}

function draw() {
	//background(245)
	/*  fill(250,20)
	rect(0, 0, width, height)
	noFill()
	stroke(255)
	for (let p of commandPoints) {
		p.display(diameter / 2)
		for (let other of commandPoints) {
			if (p !== other) {
				p.isNeighbour(other)
			}
		}
	}  */

}

function mousePressed() {
	background(0)
	for (let i = 0; i < commandPoints.length; i++) {
		commandPoints.splice(i, commandPoints.length);
		console.log("done")
	}
	columns = int(map(mouseX,0,300,5,40))
	rows = columns*1.3
	colWidth = float(width) / columns
	rowHeight = colWidth
	//rowHeight = float(height)/rows
	diameter = colWidth;
	text(words[int(random(words.length))], width/2, height/2-80)
	
	image(img, 0, 0, 300, 400)
	let id = 0;
	for (let x = 0; x < columns; x++) {
		for (let y = 0; y < rows; y++) {
			noFill()
			//rect(x * colWidth, y * rowHeight, colWidth, rowHeight)
			let c = get(x * colWidth + colWidth / 2, y * rowHeight + rowHeight / 2)
			if (red(c) > 125) {
				fill(inktrapC)
				//ellipse(x * colWidth, y * rowHeight, colWidth, rowHeight)
				commandPoints.push(new CommandPoint(x * colWidth, y * rowHeight, id));
				id++;
			}
		}
	}
	//background(10)
	createNewPositions()

	fill(250)
	rect(0, 0, width, height)
	noFill()
	stroke(255)
	for (let p of commandPoints) {
		p.display(diameter / 2)
		for (let other of commandPoints) {
			if (p !== other) {
				p.isNeighbour(other)
			}
		}
	}
}


function createNewPositions() {
	// let size = float(width /commandPoints.length/2)
	for (let i = 0; i < commandPoints.length; i++) {
		commandPoints[i].x2 = float(random(0 + 100, width - 100))
		commandPoints[i].y2 = float(random(0 + 100, height - 100))
	}
}


function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
	colWidth = float(width) / columns
	rowHeight = float(height) / rows
}

function drawForm(x, y, rad) {

	push()
	translate(x, y)
	strokeWeight(1)
	noFill()
	let sz = map(mouseX, width / 2, width, 5, 30)
	stroke(0)
	strokeWeight(2)
	fill(0)
	ellipse(0, 0, diameter, diameter)
	pop()
}

class CommandPoint {
	constructor(x, y, id) {
		this.x = x;
		this.y = y;
		this.radius = diameter / 2;
		this.id = id;
	}

	// Display the Points
	display(p_rad) {

		p_rad = this.radius;
		drawForm(this.x, this.y, p_rad)
		//this.drawCorner()
	}

	isNeighbour(other) {

		let dx = dist(this.x, this.y, other.x, other.y);

		if (dx <= float(this.radius + other.radius + 1)) {

			let left = (this.x - other.x) > 0;
			let top = (this.y - other.y) > 0;
			let hor_middle = (this.y - other.y) == 0;
			let ver_middle = (this.x - other.x) == 0;
			if (hor_middle && !left) {
				this.drawCorner(180, 0)
				this.drawCorner(90, 0)
			}

			if (hor_middle && left) {
				this.drawCorner(0, 0)
				this.drawCorner(-90, 0)
			}

			if (ver_middle && top) {
				this.drawCorner(90, 0)
				this.drawCorner(0, 0)
			}

			if (ver_middle && !top) {
				this.drawCorner(-90, 0)
				this.drawCorner(180, 0)
			}

		}
		let hyp = (this.radius * 2) / sin(radians(45));

		if ((dx <= hyp) && (dx > float(this.radius + other.radius + 1))) {
			let left = (this.x - other.x) > 0;
			let top = (this.y - other.y) > 0;


			if (left && top) {
				this.drawCorner(0, 0)
				this.drawCorner(90, this.radius * 2)
			}

			if (!left && top) {
				this.drawCorner(0, -this.radius * 2)
				this.drawCorner(90, 0)
			}

			if (!left && !top) {
				this.drawCorner(180, 0)
				this.drawCorner(-90, -this.radius * 2)
			}

			if (left && !top) {
				this.drawCorner(180, this.radius * 2)
				this.drawCorner(-90, 0)
			}

		}

	}

	drawCorner(rad, x_trans) {
		push()
		translate(this.x - x_trans, this.y)
		rotate(radians(rad))
		beginShape();
		fill(0);
		stroke(0)
		strokeWeight(2)
		vertex(0 - this.radius, 0)
		bezierVertex(
			0 - this.radius, 0 - this.radius / 2,
			0 - this.radius / 4, 0 - this.radius,
			0, 0 - this.radius);
		vertex(0 - this.radius, 0 - this.radius)
		vertex(0 - this.radius, 0)
		endShape();
		pop()
	}


}
