import API from './../utils/api'

const marketsBaseUrl = 'markets.horizontalsystems.xyz/api/v1'
const coingeckoBaseUrl = 'api.coingecko.com/api/v3/coins'

import {
  coinInfo,
  discovery,
  markets,
  defi,
  marketsGlobal,
  news,
} from "./../store";

import { normalize, normalizeCoins, normalizeDefiCoins } from './filters';

export async function getMarketsGlobal() {
  try {
    const response = await API.get(marketsBaseUrl + "/markets/global/24h");
    marketsGlobal.set(normalize(response));
    return response
  } catch (error) {
    console.error(error);
  }
}

export async function getMarkets(count = 250) {
  const data = markets.set(normalizeCoins(await getMarketsRecursive(1, Math.min(count, 250), count)))
  return data
}

/**
 * @param {any} ids
 */
export function getMarketsByIds(ids) {
  return API.get(`${coingeckoBaseUrl}/markets?vs_currency=USD&order=market_cap_desc&sparkline=false&price_change_percentage=24h,7d,14d,30d,200d,1y&ids=${ids}`)
}

export async function getMarkets() {
  const data = await API.get(`${marketsBaseUrl}/markets/defi?diff_period=24h,7d,30d`)
  const result = normalizeDefiCoins(data);
  defi.set(result);
  // console.log('>>>>>', defi)
  return data
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
  try {
    const data = await API.get(coingeckoBaseUrl + `/markets?vs_currency=USD&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=24h,7d,14d,30d,200d,1y`)
    if (data.length < perPage || data.length >= count) {
      return data
    }
    return data.concat(await getMarketsRecursive(page + 1, count))

  } catch (error) {
    console.error(error);
  }
}

