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

let sketch = function(p) {

p.preload = function  () {
	img = p.loadImage("games/natur/img/img4.png");
}

p.setup = function  () {
	p.createCanvas(300, 400)
	p.textSize(150)

	inktrapC = p.color(238, 98, 87);
	p.textAlign(p.CENTER, p.CENTER)

	colWidth = p.float(p.width) / columns
	rowHeight = colWidth
	//rowHeight = float(height)/rows
	diameter = colWidth;

	p.fill(255)
	p.noStroke()
	p.textSize(250)
	p.text(words[p.int(p.random(words.length))], p.width/2, p.height/2-80)
	//image(img, 0, 0, 300, 400)
	let id = 0;
	for (let x = 0; x < columns; x++) {
		for (let y = 0; y < rows; y++) {
			p.noFill()
			p.rect(x * colWidth, y * rowHeight, colWidth, rowHeight)
			let c = p.get(x * colWidth + colWidth / 2, y * rowHeight + rowHeight / 2)
			if (p.red(c) > 125) {
				p.fill(inktrapC)
				p.ellipse(x * colWidth, y * rowHeight, colWidth, rowHeight)
				commandPoints.push(new CommandPoint(x * colWidth, y * rowHeight, id));
				id++;
			}
		}
	}
	p.background(10)
	p.createNewPositions()

	if (formBool) {
		p.fill(10, 80)
		p.stroke(250)

	} else {
		p.fill(250)
		p.stroke(10)
	}
	p.rect(0, 0, p.width, p.height)
	p.noFill()
	p.stroke(255)
	for (let p of commandPoints) {
		p.display(diameter / 2)
		for (let other of commandPoints) {
			if (p !== other) {
				p.isNeighbour(other)
			}
		}
	}

}

p.draw = function  () {
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



p.mousePressed = function  () {
	p.background(0)
	for (let i = 0; i < commandPoints.length; i++) {
		commandPoints.splice(i, commandPoints.length);
		console.log("done")
	}
	columns = p.int(p.map(p.mouseX,0,300,5,40))
	rows = columns*1.3
	colWidth = p.float(p.width) / columns
	rowHeight = colWidth
	//rowHeight = float(height)/rows
	diameter = colWidth;
	p.text(words[p.int(p.random(words.length))], p.width/2, p.height/2-80)
	
	p.image(img, 0, 0, 300, 400)
	let id = 0;
	for (let x = 0; x < columns; x++) {
		for (let y = 0; y < rows; y++) {
			p.noFill()
			//rect(x * colWidth, y * rowHeight, colWidth, rowHeight)
			let c = p.get(x * colWidth + colWidth / 2, y * rowHeight + rowHeight / 2)
			if (p.red(c) > 125) {
				p.fill(inktrapC)
				//ellipse(x * colWidth, y * rowHeight, colWidth, rowHeight)
				commandPoints.push(new CommandPoint(x * colWidth, y * rowHeight, id));
				id++;
			}
		}
	}
	//background(10)
	p.createNewPositions()

	p.fill(250)
	p.rect(0, 0, p.width, p.height)
	p.noFill()
	p.stroke(255)
	for (let p of commandPoints) {
		p.display(diameter / 2)
		for (let other of commandPoints) {
			if (p !== other) {
				p.isNeighbour(other)
			}
		}
	}
}


p.createNewPositions = function  () {
	// let size = float(width /commandPoints.length/2)
	for (let i = 0; i < commandPoints.length; i++) {
		commandPoints[i].x2 = p.float(p.random(0 + 100, p.width - 100))
		commandPoints[i].y2 = p.float(p.random(0 + 100, p.height - 100))
	}
}

p.windowResized = function  () {
	p.resizeCanvas(p.windowWidth, p.windowHeight)
	colWidth = p.float(p.width) / columns
	rowHeight = p.float(p.height) / rows
}

p.drawForm = function  (x, y, rad) {
	p.push()
	p.translate(x, y)
	p.strokeWeight(1)
	p.noFill()
	let sz = p.map(p.mouseX, p.width / 2, p.width, 5, 30)
	p.stroke(0)
	p.strokeWeight(2)
	p.fill(0)
	p.ellipse(0, 0, diameter, diameter)
	p.pop()
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
		p.drawForm(this.x, this.y, p_rad)
		//this.drawCorner()
	}

	isNeighbour(other) {

		let dx = p.dist(this.x, this.y, other.x, other.y);

		if (dx <= p.float(this.radius + other.radius + 1)) {

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
		let hyp = (this.radius * 2) / p.sin(p.radians(45));

		if ((dx <= hyp) && (dx > p.float(this.radius + other.radius + 1))) {
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
    drawCorner = function  (rad, x_trans) {
	
		p.push()
		p.translate(this.x - x_trans, this.y)
		p.rotate(p.radians(rad))
		p.beginShape();
		p.fill(0);
		p.stroke(0)
		p.strokeWeight(2)
        p.vertex(0 - this.radius, 0)
        let randomNr = p.int(p.random(4,4))
		p.bezierVertex(
			0 - this.radius, 0 - this.radius / 2,
			0 - this.radius / 2, 0 - this.radius,
			0, 0 - this.radius);
        p.vertex(0 - this.radius, 0 - this.radius)
		p.vertex(0 - this.radius, 0)
		p.endShape();
		p.pop()
	}


}

}

let myp5 = new p5(sketch, 'game-content');