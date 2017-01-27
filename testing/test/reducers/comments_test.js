import { expect } from '../test_helper';
import commentReducer from '../../src/reducers/comments';
import { SAVE_COMMENT } from '../../src/actions/types';

describe('Comments Reducer', () => {
	const comment = 'New Comment';

	it('handle action with unknown type', () => {
		
		expect(commentReducer(undefined, {})).to.eql([]);
	});
	it('handle action type of SAVE_COMMENT', () => {
		
		const action = { type: SAVE_COMMENT, payload: comment}
		expect(commentReducer([], action)).to.eql([comment]);
	});
})