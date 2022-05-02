import data from './coins.json'

const mappedCoins = () => {
  const map = {}

  for (let i = 0; i < data.coins.length; i++) {
    const coin = data.coins[i]
    // @ts-ignore
    map[coin.coingeckoId] = coin
  }

  return map
}

const mappedFunds = () => {
  const map = {}

  for (let i = 0; i < data.funds.length; i++) {
    const fund = data.funds[i]
    // @ts-ignore
    map[fund.id] = fund
  }

  return map
}

const mappedCategoryCoins = () => {
  const map = {}

  for (let i = 0; i < data.categories.length; i++) {
    const category = data.categories[i]
    // @ts-ignore
    map[category.id] = data.coins.filter(coin =>
      // @ts-ignore
      coin.categories.indexOf(category.id) > -1
    )
  }

  return map
}

const mapped = {
  coins: mappedCoins(),
  funds: mappedFunds(),
  categories: data.categories,
  categoryCoins: mappedCategoryCoins()
}

export default mapped
