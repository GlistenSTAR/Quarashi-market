import numbro from 'numbro'

/**
 * @param {any} value
 */
export function formatNumber(value, options = { thousandSeparated: true, mantissa: 2 }) {
    // if (!value) {
    //     return null
    // }

    return numbro(value).format(options)
}

/**
 * @param {any} value
 * @param {string | numbro.Format | undefined} options
 */
export function percentageFormat(value, options, na = '') {
    // if (!value) {
    //     // @ts-ignore
    //     return document.createElement('span', { className: 'text-grey-50' }, na)
    // }

    const number = numbro(value).format({
        trimMantissa: true,
        mantissa: 2,
        forceSign: true,
        // @ts-ignore
        ...options
    })

    return `${number}%`
}

/**
 * @param {any} value
 * @param {string | numbro.Format | undefined} options
 */
export function currencyFormat(value, options) {
    // if (!value) {
    //     return ''
    // }

    return numbro(value).formatCurrency(options)
}

/**
 * @param {any} value
 */
export function currencyFullValue(value, options = { thousandSeparated: true }, na = 'N/A') {
    if (!value) {
        // @ts-ignore
        return document.createElement('span', { className: 'text-grey-50' }, na)
    }

    return currencyFormat(value, options)
}

/**
 * @param {any} value
 */
export function volume(value) {
    return numbro(value).format({
        thousandSeparated: true,
        mantissa: 0
    })
}

/**
 * @param {any} value
 */
export function priceColor(value) {
    if (!value) {
        return null
    }

    // const isPositive = value >= 0
    if(value < 0){
        return 'text-danger'
    } else{
        return 'text-success'
    }
    // return {
    //     'text-success': isPositive,
    //     'text-danger': !isPositive
    // }
}

/**
 * @param {number} partialValue
 * @param {number} totalValue
 */
export function calculatePercentage(partialValue, totalValue) {
    return (100 * partialValue) / totalValue
}

/**
 * @param {number} input
 * @param {number} min
 * @param {number} max
 */
export function percentageBetweenRange(input, min, max) {
    return ((input - min) * 100) / (max - min)
}

/**
 * @param {string} fullText
 * @param {number} maxLen
 */
export function truncateMiddle(fullText, maxLen) {
    if (fullText.length <= maxLen) return fullText

    const separator = '...'
    const sepLen = separator.length,
        charsToShow = maxLen - sepLen,
        frontChars = Math.ceil(charsToShow / 2),
        backChars = Math.floor(charsToShow / 2)

    return fullText.substr(0, frontChars) + separator + fullText.substr(fullText.length - backChars)
}
