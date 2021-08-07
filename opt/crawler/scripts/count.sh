#/bin/bash

function printCount() {
  COUNT=$(ls -l contracts | wc -l)
  GT=$(grep -nr "function generateTokens" contracts | wc -l)
  clear
  echo processed $COUNT contracts
  echo found $GT minimeToken contracts
}

while sleep 1; do printCount; done
