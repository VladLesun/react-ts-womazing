import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import style from './Map.module.scss';

const Map = () => {
	return (
		<div className={style.map}>
			<MapContainer
				center={[55.6861, 37.5596]}
				zoom={15}
				style={{ height: '100%', width: '100%' }}
			>
				<TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

				<Marker position={[55.6861, 37.5596]}>
					<Popup>3-я ул. Строителей, 25</Popup>
				</Marker>
			</MapContainer>
		</div>
	);
};

export default Map;
