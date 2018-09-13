"""Download and load a small open dataset for testing
"""
# -*- coding: utf-8 -*-
import os
import osmnx

# configure logging/caching
osmnx.config(log_console=True, use_cache=True)

# configure the image display
size = 256

# load buildings from about 1.5km² around UCL
point = (51.524498, -0.133874)
dist = 612
gdf = osmnx.buildings_from_point(point=point, distance=dist)

# preview image
gdf_proj = osmnx.project_gdf(gdf, to_crs={'init': 'epsg:3857'})
fig, ax = osmnx.plot_buildings(gdf_proj, bgcolor='#333333', color='w', figsize=(4,4),
                               save=True, show=False, close=True,
                               filename='test_buildings_preview', dpi=600)

# save as geojson
test_data_file = os.path.join(os.path.dirname(__file__), 'test_buildings.geojson')

gdf_to_save = gdf_proj.reset_index(
)[
    ['index', 'geometry']
]

gdf_to_save.rename(
    columns={'index': 'fid'}
).to_file(
    test_data_file, driver='GeoJSON'
)