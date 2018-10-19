module.exports = {
    info(message, context = []) {
        console.log('[-]', message, context)
    },
    error(message, context = []) {
        console.debug('[!]', message, context)
    },
    debug(message, context = []) {
        console.debug('[+]', message, context)
    },
    // code(code, lang) {
    //     const highlighter = app.make('cli-highlight')
    //     console.log(highlighter.highlight(code, {
    //         language: lang || 'javascript', 
    //         ignoreIllegals: true
    //     }))
    //     console.log('----------------------------------')
    // }
}