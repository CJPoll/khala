import Reflux from 'reflux';
import Character from 'character';

const CharactersActions = Reflux.createActions({
	index: {children: ['completed', 'failed']}
});

CharactersActions.index.listen(function() {
	Character.index()
		.then((response) => this.completed(response.data))
		.catch(this.failed);
});

export default CharactersActions;
