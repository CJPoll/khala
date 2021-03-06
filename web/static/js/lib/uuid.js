const r = [8, 9, 'a', 'b'];

/**
 * @return { String } Returns a randomly generated subset of a UUID
 */
function s() {
	return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
}

/**
 * @return { UUID } A UUID
 */
function uuid() {
	return s() + s() + '-' + s() + '-4' + s().substr(0, 3) + '-' + r[Math.floor(Math.random() * 4)] + s().substr(0, 3) + '-' + s() + s() + s();

}

export default uuid;
