#!/usr/bin/env bash

echo "Open http://localhost:8090 to view app after app boot."

# docker run -d -p 80 -v `pwd`:/www fnichol/uhttpd
docker run --rm -p 8090:80 -v $(pwd)/www:/www fnichol/uhttpd