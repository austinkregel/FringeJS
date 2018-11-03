module.exports = {
    info(message, context = []) {
        if (process.env.APP_ENV === 'debug') {
            console.log('[-]', message, context)
        }
    },
    error(message, context = []) {
        if (process.env.APP_ENV === 'debug') {
            console.debug('[!]', message, context)
        }
    },
    debug(message, context = []) {
        if (process.env.APP_ENV === 'debug') {
            console.debug('[+]', message, context)
        }
    }
}
