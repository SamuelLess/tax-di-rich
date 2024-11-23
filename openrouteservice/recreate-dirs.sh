#!/usr/bin/bash
rm -rf ors-docker
wget https://download.geofabrik.de/europe/germany/bayern/oberbayern-latest.osm.pbf -O oberbayern.osm.pbf
mkdir -p ors-docker/config ors-docker/elevation_cache ors-docker/files ors-docker/graphs ors-docker/logs
mv oberbayern.osm.pbf ors-docker/files/bayern.osm.pbf
