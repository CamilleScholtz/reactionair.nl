#!/bin/sh

# Parse command line arguments
PULL=0
while [ $# -gt 0 ]; do
    case "$1" in
        -p|--pull)
            PULL=1
            shift
            ;;
        *)
            echo "Unknown option: $1"
            echo "Usage: $0 [-p|--pull]"
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
pagefind --site "/www/reactionair.nl/public"
