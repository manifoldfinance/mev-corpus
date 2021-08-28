# MEV Data Corpus

> This repo is in the middle of being made actually usable as opposed to just a cleaned up data dump

### Citation in published works
```latex
 @article{MEV Data Corpus, 
          title={MEV Data Corpus: Identifiying Contracts, Addresses, Transactions and proccess used in MEV}, 
          url={https://github.com/manifoldfinance/mev-corpus}, 
          author={Bacha, Sam}} 
```

> Miner Extracted Value Data Corpus

### Flashbots Bundle Archive ( as of August 2, 2021 )

[https://mev-corpus.sfo3.digitaloceanspaces.com/mev-corpus-august2021.zip](https://mev-corpus.sfo3.digitaloceanspaces.com/mev-corpus-august2021.zip)

- both `bundles` and `rogue bundles` are included in two seperate files (*.csv)

<!-- START pkgtoc, keep to allow update -->

**Packages**

| Package                                                                | Description                      |
| :--------------------------------------------------------------------- | :------------------------------- |
| **[mev-corpus-exchanges](packages/exchange-accounts/)**                | list of known exchange addresses |
| **[mev-ethereum-txs](packages/mev-transactions/)**                     | mev transaction hashes           |
| **[mev-known-bots](packages/known-bots/)**                             | known bots                       |
| **[mev-miner-txs](packages/mev-miner-txs/)**                           | miner transaction hashes         |
| **[mev-pending-classification](packages/mev-pending-classification/)** | miner transaction hashes         |
| **[mev-sql-format](packages/mev-sql/)**                                | data format                      |
| **[verified-contracts](packages/verified-contracts/)**                 | etherscan verified contracts     |

<!-- END pkgtoc, keep to allow update -->

## Overview

- mev-corpus:
  - exchange-accounts
    = mev-accounts
    = mev-contracts-list
    = mev-miner-txs
    = solidity-utils


## License

See Licenses in respective packages, otherwise Apache-2.0
