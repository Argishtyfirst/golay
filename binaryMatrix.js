class BinaryMatrix extends Matrix {
	constructor(...args) {
		super(...args);
		this.onChange(binarize);
	}

	get isBinaryMatrix() {
		return true;
	}
}

function binarize(matrix) {
	for (let i in matrix.elements) {
		matrix.elements[i] %= 2;
	}
}