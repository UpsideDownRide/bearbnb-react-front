import { Button, Space, Table } from "@mantine/core"
import { DateRangePicker, DateRangePickerValue } from "@mantine/dates"
import { UseFormReturnType } from "@mantine/form"
import { CurrencyInput } from "components/controls/CurrencyInput"
import { useState } from "react"
import { FormValues, PricingDates, AvailabilityDates } from "./AddListing"

type Props = {
    form: UseFormReturnType<FormValues>
}

type CurrencyInputValue = [number | undefined, string | undefined]

function AddPricingAndAvailabilityStep(props: Props) {
    const form = props.form
    
    const [dates, setDates] = useState<DateRangePickerValue>([
        new Date(),
        new Date()
    ])
    
    const [rate, setRate] = useState<CurrencyInputValue>([
        0,
        'EUR'
    ])

    const [availability, setAvailability] = useState<DateRangePickerValue>([
        new Date(),
        new Date()
    ])

    const addAvailability = () => {
        if (availability[0] === null || availability[1] === null) { return }
        const newAvailableDate: AvailabilityDates = {
            startDate: availability[0],
            endDate: availability[1]
        }
        form.values.availabilityDates.push(newAvailableDate)
        setAvailability(() => [null, null])
    }

    const addPricing = () => {
        if (dates[0] === null || dates[1] === null || rate[0] === undefined || rate[1] === undefined) { return }
        const newPricingDate: PricingDates = {
            startDate: dates[0],
            endDate: dates[1],
            rate: rate[0],
            currency: rate[1]
        };
        form.values.pricingDates.push(newPricingDate)
        setDates(() => [null, null]);
        setRate(prev => [0, prev[1]])
    }

    const pricingDatesUpdate = (updatedArray: PricingDates[]) => form.setFieldValue('pricingDates', updatedArray)
    const availabilityDatesUpdate = (updatedArray: AvailabilityDates[]) => form.setFieldValue('availabilityDates', updatedArray)
    
    return (
        <>
            <PricingDatesTable pricingDatesUpdate={pricingDatesUpdate} pricings={form.values.pricingDates} />
            <Space h="lg" />
            <DateRangePicker value={dates} onChange={setDates} label="Choose pricing period" />
            <CurrencyInput rate={rate} setRate={setRate} label="Price per person" />
            <Space h="sm" />
            <Button onClick={addPricing}>Add pricing</Button>
            <Space h="lg" />
            <ReservationDatesTable availabilityDatesUpdate={availabilityDatesUpdate} availability={form.values.availabilityDates} />
            <Space h="lg" />
            <DateRangePicker value={availability} onChange={setAvailability} label="When is your property available?" />
            <Button onClick={addAvailability}>Add availability</Button>
        </>
    )
}

type PricingTableProps = {
    pricings: PricingDates[]
    pricingDatesUpdate: (updatedArray: PricingDates[]) => void
}

function handlePricingDelete(index: number, pricings: PricingDates[], pricingDatesUpdate: (updatedArray: PricingDates[]) => void) {
    pricingDatesUpdate(pricings.filter((_, i) => i !== index))
}

function PricingDatesTable(props: PricingTableProps) {
    const rows = props.pricings.map((pricing, index) => (
        <tr key={index}>
            <td>{pricing.startDate.toDateString()}</td>
            <td>{pricing.endDate.toDateString()}</td>
            <td>{pricing.rate}</td>
            <td>{pricing.currency}</td>
            <td><Button onClick={() => handlePricingDelete(index, props.pricings, props.pricingDatesUpdate)} variant="outline" color="red">Remove</Button></td>
        </tr>
    ))
    return (
        <>
            <Table striped>
                <caption>Your prices</caption>
                <thead>
                    <tr>
                        <th>Start date</th>
                        <th>End date</th>
                        <th>Rental rate</th>
                        <th>Currency</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        </>
    )
}

type AvailabilityTableProps = {
    availability: AvailabilityDates[]
    availabilityDatesUpdate: (updatedArray: AvailabilityDates[]) => void
}

function handleReservationDelete(index: number, reservations: AvailabilityDates[], availabilityDatesUpdate: (updatedArray: AvailabilityDates[]) => void) {
    availabilityDatesUpdate(reservations.filter((_, i) => i !== index))
}

function ReservationDatesTable(props: AvailabilityTableProps) {
    const rows = props.availability.map((available, index) => (
        <tr key={index}>
            <td>{available.startDate.toDateString()}</td>
            <td>{available.endDate.toDateString()}</td>
            <td><Button onClick={() => handleReservationDelete(index, props.availability, props.availabilityDatesUpdate)} variant="outline" color="red">Remove</Button></td>
        </tr>
    ))
    return (
        <>
            <Table striped>
                <caption>Property availability</caption>
                <thead>
                    <tr>
                        <th>Start date</th>
                        <th>End date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        </>
    )
}

export { AddPricingAndAvailabilityStep }