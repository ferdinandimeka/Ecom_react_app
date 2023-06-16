export function checkStateMiddleware(store) {
    return function(next) {
        return function(action) {
            // Check the state before action is dispatched
            console.log('State before action:', store.getState());

            // Call the next middleware in the chain, or the reducer 
            // if this is the last middleware
            const result = next(action)

            // Check the state after the action is dispatched
            console.log('State after the action:', store.getState());

            return result;
        }
    }
}