/**
 * @param {any[]} data
 */
export function normalize(data) {
    if (!data || !data.length) {
        return {
            markets: [],
            points: {}
        }
    }

    const latest = data[data.length - 1]
    const data24 = data[0]
    const sorted = data.sort((a, b) => a.timestamp - b.timestamp)
    const change = (/** @type {number} */ from, /** @type {number} */ to) => (from - to) * 100 / to
    const points = {
        volume: [],
        dominance: [],
        marketCap: [],
        defiMarket: [],
        tvl: []
    }

    for (let i = 0; i < sorted.length; i++) {
        const item = sorted[i]
        const time = parseInt(item.timestamp)

        // @ts-ignore
        points.volume.push({ time, value: item.volume24h })
        // @ts-ignore
        points.dominance.push({ time, value: item.dominance_btc })
        // @ts-ignore
        points.marketCap.push({ time, value: item.market_cap })
        // @ts-ignore
        points.defiMarket.push({ time, value: item.market_cap_defi })
        // @ts-ignore
        points.tvl.push({ time, value: item.tvl })
    }

    return {
        points,
        marketCap: latest.market_cap,
        marketCapDefi: latest.market_cap_defi,
        volume24h: latest.volume24h,
        dominanceBTC: latest.dominance_btc,
        totalValueLocked: latest.tvl,
        marketCapDiff24h: change(latest.market_cap, data24.market_cap),
        marketCapDefiDiff24h: change(latest.market_cap_defi, data24.market_cap_defi),
        dominanceBTCDiff24h: change(latest.dominance_btc, data24.dominance_btc),
        volume24hDiff: change(latest.volume24h, data24.volume24h),
        totalValueLockedDiff24h: change(latest.tvl, data24.tvl)
    }
}

/**
 * @param {any[]} markets
 */
export function normalizeCoins(markets) {
    return markets.map(item => ({
        id: item.id,
        name: item.name,
        image: item.image,
        symbol: item.symbol,
        rank: item.market_cap_rank,
        price: item.current_price,
        priceChange24h: item.price_change_percentage_24h,
        priceChange7d: item.price_change_percentage_7d_in_currency,
        priceChange14d: item.price_change_percentage_14d_in_currency,
        priceChange30d: item.price_change_percentage_30d_in_currency,
        priceChange200d: item.price_change_percentage_200d_in_currency,
        priceChange1y: item.price_change_percentage_1y_in_currency,
        marketCap: item.market_cap,
        totalVolume: item.total_volume,
    }))
}

/**
 * @param {any[] | Promise<any>} markets
 */
export function normalizeDefiCoins(markets) {
    console.log('marktes for deficoin', markets);
    const coins = []
    const chains = {}
    const multiChain = 'Multi-Chain'

    // @ts-ignore
    const marketsSorted = markets.sort((a, b) => b.tvl - a.tvl)

    for (let i = 0; i < marketsSorted.length; i++) {
        const item = marketsSorted[i];
        const coin = {
            id: item.coingecko_id,
            name: item.name,
            image: item.image_url,
            symbol: normalizeSymbol(item),
            rank: item.id,
            rankTvl: i + 1,
            priceChange1h: item.change_1h,
            priceChange24h: item.tvl_diff_24h,
            priceChange7d: item.tvl_diff_7d,
            tvl: item.tvl,
            chains: item.chains
        }

        const chain = item.chains.length > 1 ? multiChain : item.chains[0]
        if (chain) {
            // @ts-ignore
            coin.chain = chain.toLowerCase()
            // @ts-ignore
            chains[coin.chain] = true
        }
        coins.push(coin)
    }

    return {
        coins,
        chains: Object.keys(chains)
    }
}

/**
 * @param {{ code: string; name: any; coingecko_id: any; }} item
 */
function normalizeSymbol(item) {
    if (item.code === '-') {
        return item.name
    }

    return item.code || item.name || item.coingecko_id
}

/**
 * @param {any[]} data
 */
export function selectTopGainers5(data) {
    return selectTopGainers(data).slice(0, 5);
}

/**
 * @param {any[]} data
 */
export function selectTopLosers5(data) {
    return selectTopLosers(data).slice(0, 5);
}

/**
 * @param {any} data
 */
export function selectDefiCoins5(data) {
    return selectDefiCoins(data).slice(0, 5);
}

export const selectTopGainers = (/** @type {any[]} */ arrays) => {
    return arrays.slice().sort((a, b) => b.priceChange24h - a.priceChange24h)
}

export const selectTopLosers = (/** @type {any[]} */ arrays) => {
    return arrays.slice().sort((a, b) => a.priceChange24h - b.priceChange24h)
}

export const selectDefiCoins = (/** @type {any[]} */ arrays) => {
    return arrays.slice().sort((a, b) => b.priceChange24h - a.priceChange24h)
}