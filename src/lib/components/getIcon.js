
import Blockchains from "./../../assets/img/coins/blockchains.svg";
import Dexes from "./../../assets/img/coins/dexes.svg";
import Lending from "./../../assets/img/coins/lending.svg";
import Privacy from "./../../assets/img/coins/privacy.svg";
import Scale from "./../../assets/img/coins/scale.svg";
import Oracles from "./../../assets/img/coins/oracle.svg";
import PredictionMarkets from "./../../assets/img/coins/predictoin.svg";
import Yield from "./../../assets/img/coins/yield.svg";
import Fiat from "./../../assets/img/coins/fiat.svg";
import RebaseTokens from "./../../assets/img/coins/rebase.svg";
import AlgoStablecoins from "./../../assets/img/coins/stablecoin.svg";
import TokenizedBitcoin from "./../../assets/img/coins/tokenized.svg";
import StablecoinIssuer from "./../../assets/img/coins/issuer.svg";
import ExchangeTokens from "./../../assets/img/coins/chart.svg";
import RiskManagement from "./../../assets/img/coins/risk.svg";
import Wallets from "./../../assets/img/coins/wallet.svg";
import Synthetics from "./../../assets/img/coins/synthetics.svg";
import IndexFunds from "./../../assets/img/coins/funds.svg";
import Nft from "./../../assets/img/coins/nft.svg";
import Fundraising from "./../../assets/img/coins/fundrising.svg";
import Gaming from "./../../assets/img/coins/gaming.svg";
import B2b from "./../../assets/img/coins/b2b.svg";
import Infrastructure from "./../../assets/img/coins/settings.svg";
import StakingEth20 from "./../../assets/img/coins/stacking.svg";
import CrossChain from "./../../assets/img/coins/link.svg";
import Computing from "./../../assets/img/coins/computing.svg";
import FanTokens from "./../../assets/img/coins/fan.svg";
import InvestmentTools from "./../../assets/img/coins/investment.svg";
import Storage from "./../../assets/img/coins/storage.svg";
import Identity from "./../../assets/img/coins/identity.svg";
import YieldTokens from "./../../assets/img/coins/yield_tokens.svg";

/**
 * @param {any} id
 */
export function getCardIcon(id) {
    switch (id) {
        case 'dexes':
            return Dexes
        case 'lending':
            return Lending
        case 'privacy':
            return Privacy
        case 'scaling':
            return Scale
        case 'oracles':
            return Oracles
        case 'prediction_markets':
            return PredictionMarkets
        case 'yield_aggregators':
            return Yield
        case 'fiat_stablecoins':
            return Fiat
        case 'rebase_tokens':
            return RebaseTokens
        case 'algo_stablecoins':
            return AlgoStablecoins
        case 'tokenized_bitcoin':
            return TokenizedBitcoin
        case 'stablecoin_issuers':
            return StablecoinIssuer
        case 'exchange_tokens':
            return ExchangeTokens
        case 'risk_management':
            return RiskManagement
        case 'wallets':
            return Wallets
        case 'synthetics':
            return Synthetics
        case 'index_funds':
            return IndexFunds
        case 'nft':
            return Nft
        case 'fundraising':
            return Fundraising
        case 'gaming':
            return Gaming
        case 'b2b':
            return B2b
        case 'infrastructure':
            return Infrastructure
        case 'staking_eth_2_0':
            return StakingEth20
        case 'cross_chain':
            return CrossChain
        case 'computing':
            return Computing
        case 'fan_tokens':
            return FanTokens
        case 'investment_tools':
            return InvestmentTools
        case 'storage':
            return Storage
        case 'identity':
            return Identity
        case 'yield_tokens':
            return YieldTokens
        default:
            return Blockchains
    }
}