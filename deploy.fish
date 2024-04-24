#!/usr/bin/env fish

argparse 'p/pull' -- $argv
if set -q _flag_pull
    git pull
end

yarn install

trap 'rm -rf "/www/reactionair.nl/build"' SIGINT SIGTERM

hugo -s "/www/reactionair.nl" --cleanDestinationDir -d "/www/reactionair.nl/build"

if test -d "/www/reactionair.nl/public"
	rm -rf "/www/reactionair.nl/public"
end
mv "/www/reactionair.nl/build" "/www/reactionair.nl/public"

pagefind --site "/www/reactionair.nl/public"
