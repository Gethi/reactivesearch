import React from 'react';
import ReactDOM from 'react-dom';
import {
	ReactiveBase,
	SingleList,
	SelectedFilters,
} from '@appbaseio/reactivesearch';
import { ReactiveMap } from '@appbaseio/reactivemaps';

import './index.css';


const renderImage = (data)=> {
    if (data.MEMOIRE && data.MEMOIRE.length) {
        const img = data.MEMOIRE[0].url;
        if (img) {
            if (img.match(/^http/)) {
                return <img src={img} alt={data.REF} className="image_popup" />;
            } else {
                return <img src={`${bucket_url}${img}`} alt={data.REF} className="image_popup" />;
            }
        }
    } else if (data.IMG && data.IMG.length) {
        const img = typeof data.IMG === "string" ? data.IMG : data.IMG[0];
        if (img.match(/^http/)) {
            return <img src={img} alt={data.REF} className="image_popup" />;
        } else {
            return <img src={`${bucket_url}${img}`} alt={data.REF} className="image_popup" />;
        }
    }
}

const bases = [
    {
        label: "Photographies (Mémoire)",
        value : "Photographies (Mémoires)",
        pin: "https://mt.googleapis.com/vt/icon/name=icons/onion/SHARED-mymaps-pin-container-bg_4x.png,icons/onion/SHARED-mymaps-pin-container_4x.png,icons/onion/1899-blank-shape_pin_4x.png&highlight=ff000000,FF6347&scale=2.0"
    }
    ,
    {
        label: "Patrimoine mobilier (Palissy)",
        value: "Patrimoine mobilier (Palissy)",
        pin: "https://mt.googleapis.com/vt/icon/name=icons/onion/SHARED-mymaps-pin-container-bg_4x.png,icons/onion/SHARED-mymaps-pin-container_4x.png,icons/onion/1899-blank-shape_pin_4x.png&highlight=ff000000,FFAE47&scale=2.0"
    }
    ,
    {
        label: "Collections des musées de France (Joconde)",
        value: "Collections des musées de France (Joconde)",
        pin: "https://mt.googleapis.com/vt/icon/name=icons/onion/SHARED-mymaps-pin-container-bg_4x.png,icons/onion/SHARED-mymaps-pin-container_4x.png,icons/onion/1899-blank-shape_pin_4x.png&highlight=ff000000,39EA4B&scale=2.0"
    }
    ,
    {
        label: "Patrimoine architectural (Mérimée)",
        value: "Patrimoine architectural (Mérimée)",
        pin: "https://mt.googleapis.com/vt/icon/name=icons/onion/SHARED-mymaps-container-bg_4x.png,icons/onion/SHARED-mymaps-container_4x.png,icons/onion/1499-shape_circle_4x.png&highlight=ff000000,9C27B0&scale=2.0"
    }
    ,
    {
        label: "Oeuvres spoliées (MNR Rose-Valland)",
        value: "Oeuvres spoliées (MNR Rose-Valland)",
        pin: "https://mt.googleapis.com/vt/icon/name=icons/onion/SHARED-mymaps-pin-container-bg_4x.png,icons/onion/SHARED-mymaps-pin-container_4x.png,icons/onion/1899-blank-shape_pin_4x.png&highlight=ff000000,43CCF1&scale=2.0"
    }
];

const Main = () => (
	<ReactiveBase url="https://search-pop-staging-zukwe7tuull7zntiuqs3mp3gr4.eu-west-3.es.amazonaws.com" app={["merimee", "palissy", "memoire", "joconde", "mnr"].join(',')}>
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
                    defaultZoom={5}
					componentId="map"
					dataField="POP_COORDONNEES"
					react={{
						and: 'locations',
					}}
					size={2000}
					/* onData={result => ({
						label: result.mag,
					})} */
					onPopoverClick={
						(item, closePopup) => {
							if(item.CONTIENT_IMAGE === "oui") {
                                return (
                                    <div onClick={closePopup}>
                                        <h1>{item.TICO || item.TITR}</h1>
										{renderImage(item)}
                                        {item.WADRS}
									</div>
                                );
							}
                            return (
                            	<div onClick={closePopup}>
									<h1>{item.TICO || item.TITR}</h1>
									{item.WADRS}
								</div>
							);
                        }
					}
					autoClosePopover
					showSearchAsMove
					customClusterMarker={
						(coordinates, pointCount)=> {
							const color = {
								rouge: "#ff6347",
								orange: "#ffae47",
                                jaune: "#fffb47",
                                vertDense: "#39ea4b",
                                vert: "#c8ff47",
                                bleu: "#43ccf1",
								purple: "#db43f1",
                            };
							 return (
                                 <svg width="30px" height="30px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" key="content">
                                     <circle className="circle first-circle" fill={
                                         pointCount < 10
                                             ? color.vertDense
                                             : pointCount < 100
												 ? color.jaune
												 : pointCount < 1000
													 ? color.orange
													 : color.rouge
									 } cx="16" cy="16" r="16"></circle>
                                     {
                                         pointCount < 10
                                             ? <text x="13" y="19" fill="white">{pointCount}</text>
                                             :  pointCount < 100
                                             ? <text x="10" y="19" fill="black">{pointCount}</text>
											 : pointCount < 1000
                                                 ? <text x="6" y="19" fill="white">{pointCount}</text>
                                                 : <text x="2" y="19" fill="white">{pointCount}</text>
                                     }
                                 </svg>
					        );
						}
					}
					customMarker={
						(item, markerProps)=> {
                            let pin = `https://gkv.com/wp-content/uploads/leaflet-maps-marker-icons/map_marker-orange.png`;
							for(let i=0; i< bases.length ; i++) {
								if(item.BASE === bases[i].value) {
                                    pin = bases[i].pin;
								}
                            }
							 return (
								<img src={pin} width="24px" />
					        );
						}
					}
				/>
			</div>
		</div>
	</ReactiveBase>
);

ReactDOM.render(<Main />, document.getElementById('root'));
