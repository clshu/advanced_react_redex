import { renderComponent, expect } from '../test_helper';
import CommentList from '../../src/components/comment_list';

describe('CommentList', () => {
	let className = 'comment-list';
	let component;
	let props;

	beforeEach(() => {
		props = { comments: ['new comment', "this is a test"]};
		component = renderComponent(CommentList, null, props);
	});

	it ('has class ' + className, () => {
		expect(component).to.has.class(className);
	});

	it ('shows an <li> for each comment', () => {
		expect(component.find('li').length).to.equal(props.comments.length)
	});
	it ('shows each comment that is provided', () => {
		expect(component).to.contain(props.comments[0]);
		expect(component).to.contain(props.comments[1]);
	});
})