import { expect } from '../test_helper';
import { SAVE_COMMENT } from '../../src/actions/types';
import { saveComment } from '../../src/actions';

describe('actions', () => {
	describe('saveComment', () => {
		const comment = "New Comment";
		let action;

		beforeEach(() => {
			action = saveComment(comment);
		})
		it('has correct type', () => {
			expect(action.type).to.equal(SAVE_COMMENT);

		});
		it('has correct payload', () => {
			expect(action.payload).to.equal(comment);
		});
	})
})