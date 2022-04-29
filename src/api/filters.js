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
