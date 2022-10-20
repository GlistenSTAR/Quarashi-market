//@ts-nocheck
import axios from 'axios'
import isEmpty from '../../../../utils/is-empty'

const baseUrl = 'https://api.coingecko.com/api/v3/coins'
const history = {}

const coingecko = {
  history: history,

  getBars: function (coinId, resolution, from, to, first) {
    if (typeof localStorage !== "undefined") {
      let bars;
      let rangeData = JSON.parse(localStorage.getItem('rangeData'));
      if (
        !isEmpty(rangeData) &&
        !isEmpty(rangeData['data']) &&
        rangeData['id'] == coinId &&
        new Date().getTime() - rangeData['time'] < 24 * 60 * 60 * 1000
      ) {
        const myPromise = new Promise((resolve, reject) => {
            resolve("foo");
        });
        return myPromise.then(() => {
          bars = rangeData['data']
          if (first) {
            history[coinId] = {
              lastBar: bars[bars.length - 1]
            }
          }
          bars = rangeData['data']
          return bars
        })
      } else {
        return axios.get(`${baseUrl}/${coinId}/market_chart/range?vs_currency=usd&from=${from}&to=${to}`)
          .then(({ data }) => {
            if (data && data.prices) {
              const bars = data.prices.map(([time, open = 0, high = 0, low = 0, close = 0]) => ({
                time,
                low: open,
                high: open,
                open: open,
                close: open
              }))

              if (first) {
                history[coinId] = {
                  lastBar: bars[bars.length - 1]
                }
              }

              localStorage.setItem('rangeData', JSON.stringify({
                id: coinId,
                time: new Date().getTime(),
                data: bars
              }))

              return bars
            } else {
              return []
            }
          })
      }
    }

  },

  getBarsOHLC: function (symbolInfo, resolution, from, to, first) {
    if (!first) {
      return []
    }

    return axios.get(`${baseUrl}/${symbolInfo.name}/ohlc?vs_currency=usd&days=1`).then(({ data }) => {
      if (data && data.length) {
        const bars = data.map(([time, open, high, low, close]) => ({
          time,
          low,
          high,
          open,
          close
        }))

        if (first) {
          history[symbolInfo.name] = {
            lastBar: bars[bars.length - 1]
          }
        }

        return bars
      } else {
        return []
      }
    })
  }
}

export default coingecko
