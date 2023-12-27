#!/usr/bin/env sh

if [ "$1" = "--pull" ]; then
	git pull
fi

hugo -s "/usr/local/www/reactionair.nl" --cleanDestinationDir -d "/usr/local/www/reactionair.nl/build"

if [ -d "/usr/local/www/reactionair.nl/public" ]; then
	rm -rf "/usr/local/www/reactionair.nl/public"
fi
mv "/usr/local/www/reactionair.nl/build" "/usr/local/www/reactionair.nl/public"
