SELECT
  concat('0x', substring(data from 25 for 40)) as banned_addresses,
  dttimestamp as ban_time,
  CONCAT('https://etherscan.io/tx/0x', txhash) as tx
FROM eth.event_logs AS logs
WHERE contractaddress = 'dac17f958d2ee523a2206206994597c13d831ec7'
  AND topic0 = '42e160154868087d6bfdc0ca23d96a1c1cfa32f1b72ba9ba27b69b98a0d819dc'
ORDER BY ban_time DESC
