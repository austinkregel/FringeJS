module.exports = {
    info(message, context = []) {
        console.log('[-]', message, context)
    },
    error(message, context = []) {
        console.debug('[!]', message, context)
    },
    debug(message, context = []) {
        if (process.env.APP_ENV !== 'production') {
            console.debug('[+]', message, context)
        }
    }
}
