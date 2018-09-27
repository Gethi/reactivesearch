import React from 'react';
import ReactDOM from 'react-dom';
import {
	ReactiveBase,
	SingleList,
	SelectedFilters,
} from '@appbaseio/reactivesearch';
import { ReactiveMap } from '@appbaseio/reactivemaps';

import './index.css';

const Main = () => (
	<ReactiveBase
		app="earthquake"
		credentials="OrXIHcgHn:d539c6e7-ed14-4407-8214-c227b0600d8e"
		type="places"
		mapKey="AIzaSyBQdVcKCe0q_vOBDUvJYpzwGpt_d_uTj4Q"
	>
		<div className="row">
			<div className="col">
				<SingleList
					title="Places"
					componentId="places"
					dataField="place.raw"
					size={50}
					showSearch
				/>
			</div>
			<div className="col">
				<SelectedFilters />
				<ReactiveMap
					componentId="map"
					dataField="location"
					react={{
						and: 'places',
					}}
					/* onData={result => ({
						label: result.mag,
					})} */
					onPopoverClick={() => <div>wasssssssaaaa</div>}
					autoClosePopover
					showSearchAsMove
					customClusterMarker={
						(coordinates, pointCount)=> {
							 return (
								<svg width="30px" height="30px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" key="content">
									<circle className="circle first-circle" fill="#FF6347" cx="10" cy="10" r="10"></circle>
									<text x="7" y="14" fill="black">{pointCount}</text>
								</svg>
					        );
						}
					}
					customMarker={
						(item, markerProps)=> {
							 return (
								<img src={`https://gkv.com/wp-content/uploads/leaflet-maps-marker-icons/map_marker-orange.png`} width="24px" />
					        );
						}
					}
				/>
			</div>
		</div>
	</ReactiveBase>
);

ReactDOM.render(<Main />, document.getElementById('root'));
