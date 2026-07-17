#!/bin/sh

# Parse command line arguments
PULL=0
INDEXNOW=1
while [ $# -gt 0 ]; do
    case "$1" in
        -p|--pull)
            PULL=1
            shift
            ;;
        -n|--no-indexnow)
            INDEXNOW=0
            shift
            ;;
        *)
            echo "Unknown option: $1"
            echo "Usage: $0 [-p|--pull] [-n|--no-indexnow]"
            exit 1
            ;;
    esac
done

# Pull latest changes if requested
if [ "$PULL" -eq 1 ]; then
    git pull
fi

# Install dependencies
yarn install

# Set up trap to clean up build directory on interrupt
trap 'rm -rf "/www/reactionair.nl/build"' INT TERM

# Build Hugo site
hugo -s "/www/reactionair.nl" --cleanDestinationDir -d "/www/reactionair.nl/build"

# Atomically replace public directory
if [ -d "/www/reactionair.nl/public" ]; then
    rm -rf "/www/reactionair.nl/public"
fi
mv "/www/reactionair.nl/build" "/www/reactionair.nl/public"

# Generate search index
/www/reactionair.nl/node_modules/@pagefind/freebsd-x64/bin/pagefind_extended --site "/www/reactionair.nl/public"

# Submit changed pages to IndexNow
if [ "$INDEXNOW" -eq 1 ]; then
    ./indexnow.sh || true
fi
