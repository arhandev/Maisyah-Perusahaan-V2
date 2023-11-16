const generateSeed = () => {
	if (sessionStorage.getItem('seed') === null) {
		const randomSeed = Math.floor(Math.random() * 10000) + 1;
		sessionStorage.setItem('seed', randomSeed);
	}
	return sessionStorage.getItem('seed');
};

export default generateSeed;
