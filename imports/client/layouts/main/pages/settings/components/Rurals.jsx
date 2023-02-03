import React from "react";
import { Button, Modal, Input, Space } from "antd";
import { MyTable2 } from "../../../components/Table2";
import AddRural from "./AddRural";
import moment from 'moment'
const unique = "bad_types.all";
import { AiFillEdit } from 'react-icons/ai'
const limit_ls_name = unique + "2.limit";



export function Rurals() {
    const [props, setProps] = React.useState({ ready: false, dataSource: [], total: 0 })
    const [query, setQuery] = React.useState({});
    const [sort, setSort] = React.useState({ createdAt: -1 })
    const [limit, setLimit] = React.useState(
        parseInt(localStorage.getItem(limit_ls_name)) || 20
    );
    const [modalIsopen, setmodalIsopen] = React.useState(false)
    const [inputValue, setinputValue] = React.useState({})
    const [skip, setSkip] = React.useState(0);
    const columns = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => (
                < >
                    {index + 1}
                </ >
            )
        },
        {
            title: 'Nömrəsi',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: "Ad",
            dataIndex: "data",
            key: "data"
        },
        {
            title: "Yaranma tarixi",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text, record, index) => (

                moment(record.createdAt).format('DD.MM.YYYY')
            )
        },
        {
            title: "Edit",
            render: (text, record, index) => (
                <Space size="middle">
                    <Button onClick={() => {
                        setmodalIsopen(true)
                        setinputValue(record)
                    }}>
                        <AiFillEdit />
                    </Button>
                </Space>
            )
        }
    ]
   

    function onAnyChange(whatChanged, { new_query = query, new_limit = limit, new_skip = skip, new_sort = sort }) {
        setProps({ ...props, ready: false })
        Meteor.call("get_rurals", new_query, new_limit, new_skip, new_sort, function (err, res) {
            if (res) {
                res.ready = true
                setProps(res)
            } else {
                console.log(err)
            }
        })
    }
    function onQueryChange(query) {
        console.log("query", query)
        setQuery(query)
        setSkip(0)
        onAnyChange("query", { query: query, limit, skip: 0, sort })
    }
    function onLimitChange(number) {
        setSkip(0)
        setLimit(number)
        onAnyChange("limit", { query, limit: number, skip: 0, sort })
    }
    function onSkipChange(number) {
        setSkip(number)
        onAnyChange("skip", { query, limit, skip: number, sort })
    }
    function onSortChange(sort) {
        setSkip(0)
        setSort(sort)
        onAnyChange("sort", { query, limit, skip: 0, sort: sort })
    }
    React.useEffect(() => {
        onAnyChange("init", { query, limit, skip, sort })
    }, [])

    const editvillage = () => {
        Meteor.call("update_rural", inputValue._id, inputValue, (err, res) => {
            if (res) {
                setmodalIsopen(false)
                onAnyChange("ok", {})
            } else if (err) {
                console.log(err)
            }

        })
    }
    return (
        <>

            <div className="w-full" >
                <AddRural onAnyChange={onAnyChange} />
                <MyTable2
                    {...props}
                    columns={columns}
                    onLimitChange={onLimitChange}
                    onSkipChange={onSkipChange}
                    sort={sort}
                    unique={unique}
                    query={query}
                    limit={limit}
                    skip={skip}
                />
                <Modal
                    title="Düzəlt"
                    width={"40%"}
                    open={modalIsopen}
                    onOk={() => {
                        editvillage()
                    }}
                    okText="Tədbiq et"
                    cancelText="Ləğv et"
                    type="warning"
                    onCancel={() => {
                        setmodalIsopen(false)
                    }}>
                    <Input placeholder="Rayon adı" onChange={(e) => {
                        setinputValue({ ...inputValue, data: e.target.value })
                    }}
                        value={inputValue.data}
                    />
                </Modal>
            </div>
        </>
    );
}

