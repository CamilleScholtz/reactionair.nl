#!/usr/bin/env sh

if [ "$1" = "--pull" ]; then
	git pull
fi

hugo -s "/usr/local/www/reactionair.nl" --cleanDestinationDir -d "/usr/local/www/reactionair.nl/build"
rm -r "/usr/local/www/reactionair.nl/public"
mv "/usr/local/www/reactionair.nl/build" "/usr/local/www/reactionair.nl/public"
