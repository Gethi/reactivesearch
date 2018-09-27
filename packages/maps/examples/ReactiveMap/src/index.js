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
	<ReactiveBase url="https://search-pop-staging-zukwe7tuull7zntiuqs3mp3gr4.eu-west-3.es.amazonaws.com" app={['merimee', 'memoire'].join(',')}>
		<div className="row">
			<div className="col">
				<SingleList
					title="Locations"
					componentId="locations"
					dataField="POP_CONTIENT_GEOLOCALISATION.keyword"
					size={50}
					showSearch
				/>
			</div>
			<div className="col">
				<SelectedFilters />
				<ReactiveMap
					componentId="map"
					dataField="POP_COORDONNEES"
					react={{
						and: 'locations',
					}}
					size={200}
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
									{
										pointCount < 10
										 ? <text x="7" y="14" fill="white">{pointCount}</text>
										 : <text x="3" y="14" fill="white">{pointCount}</text>
									}
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
