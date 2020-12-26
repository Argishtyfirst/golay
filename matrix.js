class Matrix {
	constructor(height = 0, width = 0, data = null) {
		this._onChangeListeners = [];

		this.width = width;
		this.height = height;
		if (!data) {
			this.elements = [];
			for (let i = 0; i < width * height; i++) {
				this.elements.push(0);
			}
		}
		else {
			this.elements = data;
		}

	}

	get isMatrx() {
		return true;
	}

	addRow(row) {
		if (row.length !== this.width) {
			throw new Error('In order to add a row to a Matrix, it must have the same length as Matrix width');
		}

		this.height++;
		this.elements = this.elements.concat(row);
		this._callOnChanged(enforce);
		return this;
	}

	addCol(col) {
		if (col.length !== this.height) {
			throw new Error('In order to add a column to a Matrix, it must have the same length as Matrix height');
		}

		for (let i = 0; i < this.height; i++) {
			this.elements.splice(this.width * i, 0, col[i]);
		}
		this._callOnChanged(enforce);
		return this;
	}

	clone() {
		return new this.constructor(this.width, this.height, this.elements);
	}

	get(i, j) {
		return this.elements[i * this.width + j];
	}

	set(i, j, val) {
		this.elements[i * this.width + j] = val;
		this._callOnChanged(enforce);
		return this;
	}

	getRow(row) {
		return this.elements.slice(this.width * row, this.width * (row + 1));
	}

	getCol(col) {
		const res = [];
		for (let i = 0; i < this.height; i++) {
			res.push(this.get(i, col));
		}
		return res;
	}

	getRows() {
		const res = [];
		for (let i = 0; i < this.height; i++) {
			res.push(this.getRow(i));
		}
		return res;
	}

	add(b) {
		if (this.width !== b.width || this.height !== b.height) {
			throw new Error('In order to add two matrices their width and height must be the same');
		}
		const res = new this.constructor(this.height, this.width);
		for (let i in this.elements) {
			res.elements[i] = this.elements[i] + b.elements[i];
		}

		res._callOnChanged(enforce);
		return res;
	}

	addTo(i, j, val) {
		this.set(i, j, this.get(i, j) + val);
		this._callOnChanged(enforce);
		return this;
	}

	transpose() {
		const res = new this.constructor(this.width, this.height);
		for (let i = 0; i < this.height; i++) {
			for (let j = 0; j < this.width; j++) {
				res.set(j, i, this.get(i, j));
			}
		}
		return res;
	}

	mult(b) {
		if (this.width !== b.height) {
			throw new Error('In order to multiply matrices the number of columns in the first one must be equal to the number of rows in the second one!');
		}
		const res = new this.constructor(this.height, b.width);
		for (let i = 0; i < res.height; i++) {
			for (let j = 0; j < res.width; j++) {
				res.set(i, j, 0);
				for (let g = 0; g < b.height; g++) {
					res.addTo(i, j, this.get(i, g) * b.get(g, j));
				}
			}
		}

		return res;
	}

	toString(lineBreak = '<br>') {
		let res = '';
		for (let i = 0; i < this.height; i++) {
			for (let j = 0; j < this.width; j++) {
				res += this.get(i, j) + ' ';
			}
			res += lineBreak;
		}
		return res;
	}

	printToTable() {
		const tmp = [];
		for (let i = 0; i < this.height; i++) {
			tmp.push(this.elements.slice(this.width * i, this.width * (i + 1)));
		}
		console.table(tmp);
		return this;
	}

	forEach(fcn) {
		for (let i = 0; i < this.height; i++) {
			for (let j = 0; j < this.width; j++) {
				fcn.bind(this)(this.get(i, j), i, j, this);
			}
		}
		this._callOnChanged(enforce);
		return this;
	}

	_callOnChanged(e) {
		if (e !== enforce) {
			throw new Error('_callOnChanged function is a private function, it cannot be called from the outside of class Matrix');
		}
		for (let i in this._onChangeListeners) {
			this._onChangeListeners[i].bind(this)(this);
		}
	}

	onChange(fcn) {
		this._onChangeListeners.push(fcn);
		return this;
	}

	static Identity(size) {
		const res = new this.constructor(size, size);
		for (let i = 0; i < size; i++) {
			res.set(i, i, 1);
		}
		return res;
	}

}