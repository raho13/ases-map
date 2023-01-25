import React, { useEffect, useState } from 'react'
import { Space, Table, Modal, Button, Input, Row, Col, Select, Form } from 'antd';
import { useTracker } from 'meteor/react-meteor-data'
import { LocationsCollection } from '../../../../../api/locations/collection';
import LocationModal from './components/LocationModal';
import Header from './components/Header';
import LocationsTable from './components/LocationsTable';


export default function Locations() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMiniModalOpen, setIsMiniModalOpen] = useState(false);
    const [limit, setLimit] = useState(10)
    const [skip, setSkip] = useState(0)
    const [query, setQuery] = useState({ status: true })
    const [sort, setSort] = useState({ createdAt: -1 })
    const [total, setTotal] = useState(0)
    const [LocationData, setLocationData] = useState({
        name: "",
        shortname: "",
        lat: "",
        long: "",
        country: "",
        city: "",
        stage: "",
        region: "",
        street: "",
        number: "",
        id: "",
        famous_name: "",
        status: true,
        locationId: "",
    })
    const [resetData, setResetData] = useState(LocationData)
    //Get
    const data = useTracker(() => {
        const result = {}
        result.ready = Meteor.subscribe('get_locations', query, limit, skip, sort).ready()
        result.locations = LocationsCollection.find(
            query,
        ).fetch()
        return result;
    }, [limit, skip, query, sort])

    useEffect(() => {
        Meteor.call('count_locations', query, function (err, res) {
            if (res) {
                setTotal(res)
            }
            else if (err) {
                console.log(err)
            }
        })
    }, [query, data.locations.length])


    useEffect(() => {
        !isModalOpen ? setLocationData(resetData) : null
    }, [isModalOpen])

    const showModal = () => {
        setIsModalOpen(true);
    };

    const deleteCancel = () => {
        setIsMiniModalOpen(false)
    };

    // // const deleteLocation = () => {
    // //     Meteor.call("delete_location", isMiniModalOpen._id)
    // //     setIsMiniModalOpen(false)
    // // };
    const onLimitChange = (limit) => {
        setLimit(limit)
    }
    const onSkipChange = (skip) => {
        setSkip(skip)
    }
    function onQueryChange(new_query) {
        setQuery({ ...query, ...new_query })
    }
    function ModalVisible(record, index) {
        if (index === 1) {
            setLocationData(record)
            showModal()
        } else if (index === 0) {
            setIsMiniModalOpen(record)
        }
    }
    return (
        <>
            <Header onQueryChange={onQueryChange}
                showModal={showModal} query={query} />

            <LocationsTable limit={limit}
                total={total}
                skip={skip}
                onLimitChange={onLimitChange}
                data={data}
                onSkipChange={onSkipChange}
                setLocationData={setLocationData}
                ModalVisible={ModalVisible} />

            <LocationModal
                setIsMiniModalOpen={setIsMiniModalOpen}
                LocationData={LocationData}
                setLocationData={setLocationData}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                resetData={resetData}
                showModal={showModal} />

            {/* <Modal
                title="Diqqət!!!"
                width={"40%"}
                open={isMiniModalOpen}
                 onOk={deleteLocation}
                okText="Sil"
                cancelText="ləğv et"
                type="warning"
                onCancel={deleteCancel}>
                Seçilən element silinsin?
            </Modal> */}
        </>
    )
}
