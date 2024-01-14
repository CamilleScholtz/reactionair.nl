#!/usr/bin/env sh

PATH=/sbin:/bin:/usr/sbin:/usr/bin:/usr/local/sbin:/usr/local/bin

if [ "$1" = "--pull" ]; then
	git pull
fi

trap 'rm -rf "/usr/local/www/reactionair.nl/build"' EXIT

hugo -s "/usr/local/www/reactionair.nl" --cleanDestinationDir -d "/usr/local/www/reactionair.nl/build"

if [ -d "/usr/local/www/reactionair.nl/public" ]; then
	rm -rf "/usr/local/www/reactionair.nl/public"
fi
mv "/usr/local/www/reactionair.nl/build" "/usr/local/www/reactionair.nl/public"
