import { renderComponent, expect } from '../test_helper';
import CommentBox from '../../src/components/comment_box';



describe('CommentBox', () => {
	let component, textarea, button;
	let className = 'comment-box';

	beforeEach(() => {
		component = renderComponent(CommentBox);
		textarea = component.find('textarea');
		button = component.find('button');
	})
	it('has class ' + className, () => {		
		expect(component).has.class(className);
	});
	it('has a textarea', () => {		
		expect(textarea).to.exist;
	});
	it('has a button', () => {
		expect(button).to.exist;
	});

	describe('when entering some text', () => {
		let comment = 'new comment';
		
		beforeEach(() => {
			// Simulating an user entering text
			textarea.simulate('change', comment);
		});
		it('shows that text in the textarea', () => {
			expect(textarea).to.has.value(comment);
		});
		it('when submitted, it clears the input', () => {
			component.simulate('submit');
			expect(textarea).to.has.value('');
		});
	})
	
})