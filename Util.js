const weight = (vec) => {
	// not sure about this
	let vector = vec;
	if (vector.isMatrx)
		vector = vector.elements;

	let res = 0;
	for (let i in vector) {
		if (vector[i] !== 0)
			res++;
	}
	return res;
};

const makeArray = (length, value = 0) => {
	const res = [];
	for (let i = 0; i < length; i++) {
		res.push(value);
	}
	return res;
};

const addVectors = (a, b) => {
	if (a.length !== b.length) {
		throw new Error('Vectors must have the same length');
	}

	const res = [];
	for (let i in a) {
		res[i] = a[i] + b[i];
	}
	return res;
};

const modTwo = (vec) => {
	return vec.map(x => x % 2);
};

const eyeVector = (size, n) => {
	const res = [];
	for (let i = 0; i < size; i++) {
		res[i] = (i == n) + 0;
	}
	return res;
};

const noiseVector = (size, noise) => {
	let res = [];
	let noiseAmount = 0;
	for (let i = 0; i < size; i++) {
		if (Math.random() * size < noise) {
			res.push(1);
			noiseAmount++;
		}
		else {
			res.push(0);
		}
	}
	return {vec: res, noise: noiseAmount};
};