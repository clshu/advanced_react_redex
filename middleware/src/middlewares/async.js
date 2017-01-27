export default function ({dispatch}) {
	return next => action => {

		if (!action.payload || !action.payload.then) {
			// if action.payload is not a Promise
			// pass it to the next middleware
			return next(action);
		}

		action.payload
		.then(response => {
			const newAction = {...action, payload: response};
			// restart from the top of middleware statck
			// because we don't know the order of middlewares
			// restart it again
			dispatch(newAction);
		})
	}
}