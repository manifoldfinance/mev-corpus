select count(gasprice_gwei)
from eth.transactions
where eth.transactions.to = 'd78a3280085ee846196cb5fab7d510b279486d44'
and gasprice_gwei = 1
-- and blocknumber >= 11834049
and blocknumber >= 12165347

select date_trunc('day',dttimestamp) as day, count(distinct blocknumber)
-- select distinct blocknumber
from eth.transactions
where eth.transactions.from = lower('f6da21E95D74767009acCB145b96897aC3630BaD')
and gasprice_gwei = 1
and blocknumber >= 11834049
and blocknumber < 12196601
group by day
