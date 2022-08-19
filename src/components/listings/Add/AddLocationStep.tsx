import { Select, TextInput } from "@mantine/core"
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"
import { UseFormReturnType } from "@mantine/form"
import { FormValues, SelectData } from "./AddListing"
import { LatLngExpression, Point } from "leaflet"
import { useEffect, useState } from "react"

type Props = {
    form: UseFormReturnType<FormValues>,
    selectData: Array<any>,
}

const RecenterAutomatically = ({location} : {location: LatLngExpression}) => {
    const map = useMap();
    useEffect(() => {
        map.setView(location);
        map.setZoom(17);
    }, [location, map]);
    return null;
}

function AddLocationStep(props: Props) {
    const { form, selectData } = props;
    const [marker, setMarker] = useState<LatLngExpression>([form.values.location.x, form.values.location.y])

    const changeHandler = (item: string) => {
        const index = Number.parseInt(item)
        const data: SelectData = selectData[index]
        const lat = Number.parseFloat(data.lat)
        const lon = Number.parseFloat(data.lon)
        setMarker([lat, lon])
        form.setFieldValue('city', data.address.city)
        form.setFieldValue('country', data.address.country_code.toUpperCase())
        form.setFieldValue('location', new Point(lat, lon))
    }

    return (
        <>
            <Select label="Country" placeholder="Choose country"
                data={[
                    { value: 'PL', label: 'Poland' },
                    { value: 'DE', label: 'Germany' }
                ]}
                {...form.getInputProps('country')}
            />
            <TextInput label="City" placeholder="Enter city" {...form.getInputProps('city')} />
            <TextInput label="Address" placeholder="Enter address" {...form.getInputProps('address')} />
            <Select label="Confirm address" placeholder="Confirm your address"
                data={selectData} onChange={changeHandler}
            />
            <MapContainer center={marker} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={marker}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
                <RecenterAutomatically location={marker} />
            </MapContainer>
        </>
    )
}
export { AddLocationStep }