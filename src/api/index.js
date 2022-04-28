import API from './../utils/api'

const coingeckoBaseUrl = 'https://api.coingecko.com/api/v3/coins'

import {
  coinInfo,
  discovery,
  markets,
  defi,
  marketsGlobal,
  news,
} from "./../store";

function normalize(data) {
  if (!data || !data.length) {
    return {
      markets: [],
      points: {}
    }
  }

  const latest = data[data.length - 1]
  const data24 = data[0]
  const sorted = data.sort((a, b) => a.timestamp - b.timestamp)
  const change = (from, to) => (from - to) * 100 / to
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

    points.volume.push({ time, value: item.volume24h })
    points.dominance.push({ time, value: item.dominance_btc })
    points.marketCap.push({ time, value: item.market_cap })
    points.defiMarket.push({ time, value: item.market_cap_defi })
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

export const getMarketsGlobal = async () => {
  try {
    const response = await API.get("/markets/global/24h");
    console.log(normalize(response))
    marketsGlobal.set(normalize(response));
    return response
  } catch (error) {
    console.error(error);
  }
};

export function getMarkets(count = 250) {
  return getMarketsRecursive(1, Math.min(count, 250), count)
}

/**
 * @param {any} ids
 */
export function getMarketsByIds(ids) {
  return API.get(`${coingeckoBaseUrl}/markets?vs_currency=USD&order=market_cap_desc&sparkline=false&price_change_percentage=24h,7d,14d,30d,200d,1y&ids=${ids}`)
}

export function getDefiCoins() {
  return API.get(`/markets/defi?diff_period=24h,7d,30d`)
}

/**
 * @param {any} coin
 */
export function getCoinTvlChart(coin, period = '7d') {
  return API.get(`/markets/defi/${coin}/${period}`)
}

/**
 * @param {any} coin
 */
export function getCoinVolumeChart(coin) {
  return API.get(`${coingeckoBaseUrl}/${coin}/market_chart?vs_currency=USD&days=1`)
}

export function getDefiMarkets() {
  return API.get(`${coingeckoBaseUrl}/markets?vs_currency=USD&order=market_cap_desc&sparkline=false&price_change_percentage=24h,7d,14d,30d,200d,1y&category=decentralized_finance_defi`)
}

/**
 * @param {any} id
 */
export function getCoinInfo(id) {
  return API.get(`${coingeckoBaseUrl}/${id}?localization=false&tickers=true&&sparkline=true`)
}

export function getNews() {
  return API.get('https://min-api.cryptocompare.com/data/v2/news/?feeds=cointelegraph,theblock,decrypt&extraParams=Blocksdecoded&excludeCategories=Sponsored')
}

// @ts-ignore
const getMarketsRecursive = async (page = 1, perPage = 250, count = 250) => {
  const { data } = await API.get(`${coingeckoBaseUrl}/markets?vs_currency=USD&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=24h,7d,14d,30d,200d,1y`)

  if (data.length < perPage || data.length >= count) {
    return data
  }

  return data.concat(await getMarketsRecursive(page + 1, count))
}

