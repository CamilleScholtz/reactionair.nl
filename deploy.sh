#!/usr/bin/env sh

PATH=/www/.bin:/sbin:/bin:/usr/sbin:/usr/bin:/usr/local/sbin:/usr/local/bin

if [ "$1" = "--pull" ]; then
	git pull
fi

trap 'rm -rf "/www/reactionair.nl/build"' SIGINT SIGTERM

hugo -s "/www/reactionair.nl" --cleanDestinationDir -d "/www/reactionair.nl/build"

if [ -d "/www/reactionair.nl/public" ]; then
	rm -rf "/www/reactionair.nl/public"
fi
mv "/www/reactionair.nl/build" "/www/reactionair.nl/public"
