#!/usr/bin/env bash

# docker run -d -p 80 -v `pwd`:/www fnichol/uhttpd
docker run --rm -p 8090:80 -v $(pwd)/www:/www fnichol/uhttpd