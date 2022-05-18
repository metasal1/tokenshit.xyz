import { TokenListProvider, TokenInfo } from '@solana/spl-token-registry';

module.exports = async(req, res) => {
try {
    const Provider = new TokenListProvider();
    const Resolved = await Provider.resolve();
    const TokenList = await Resolved.filterByClusterSlug('mainnet-beta').getList();
    const tokens = TokenList.reverse();
    const count = tokens.length;
    console.log(count);
    res
      .status(200)
      .json({
        count,
      });
}
catch(error) {
console.log(error)
res.status(404).json({data: error})
}
}