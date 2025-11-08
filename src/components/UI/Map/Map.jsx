import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import ContentLoader from 'react-content-loader';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import s from './Map.module.scss';

function Map() {
	const [isLoading, setIsLoading] = useState(true);

	return (
		<div className={s.map}>
			{isLoading && (
				<ContentLoader
					className={s.skeleton}
					speed={2}
					backgroundColor='#808080'
					foregroundColor='#f3f3f3'
				>
					<rect x='0' y='0' rx='0' ry='0' width='100%' height='100%' />
				</ContentLoader>
			)}
			<MapContainer
				center={[55.6861, 37.5596]}
				zoom={15}
				style={{ height: '100%', width: '100%' }}
				whenReady={() => setIsLoading(false)}
			>
				<TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
				<Marker position={[55.6861, 37.5596]}>
					<Popup>3-я ул. Строителей, 25</Popup>
				</Marker>
			</MapContainer>
		</div>
	);
}

export default Map;
