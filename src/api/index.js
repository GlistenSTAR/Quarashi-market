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

// @ts-ignore
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

// @ts-ignore
export async function getDefiCoins() {
  const data = await API.get(`${marketsBaseUrl}/markets/defi?diff_period=24h,7d,30d`)
  const result = normalizeDefiCoins(data);
  defi.set(result);
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

export async function getNews() {
  try{
    const data = await API.get('min-api.cryptocompare.com/data/v2/news/?feeds=cointelegraph,theblock,decrypt&extraParams=Blocksdecoded&excludeCategories=Sponsored&api_key=02453520162496255e8bdfe89cd6ecceaad5437712c8960762045544c9bf0857')
    if(data.Message == "News list successfully returned"){
      news.set(data.Data)
    } else {
      console.log(data.Message)
    }
    return data
  } catch (error){
    console.log(error)
  }
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

