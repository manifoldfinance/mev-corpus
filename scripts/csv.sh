#!/bin/bash 
if [ "$1" = "" ]
then
	echo "You must enter the name of the database. Please check the README."
	exit 1
fi

db=$1

t=($(sqlite3 $db ".tables"))

for i in "${t[@]}"
do
	sqlite3 $db<<- EXIT_HERE
	.mode csv
	.headers on
	.output $i.csv
	SELECT * FROM $i;
	.exit
	EXIT_HERE
  echo "$i.csv generated"
done