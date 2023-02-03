import React from 'react'
import { Space, Table, Button, Input, Row, Col, Select, Form } from 'antd';
import { BsSearch } from 'react-icons/bs'
import { MdCancel } from 'react-icons/md'
export default function Header({ showModal, query, onQueryChange }) {
    const { Search } = Input;
    const [filterQuery, setfilterQuery] = React.useState({ name: "", status: undefined })
    React.useEffect(() => {
        query.status = filterQuery.status
        query.name = filterQuery.name
        onQueryChange(query)
    }, [filterQuery.status])
    const filterTable = () => {
        query.status = filterQuery.status
        query.name = filterQuery.name
        onQueryChange(query)
    }
    return (
        <Form
        >
            <Row >
                <Col span={12}>
                    <Space size={'large'}>
                        <Button size='large' type="primary" onClick={showModal} >Ünvan əlavə et</Button>
                    </Space>
                </Col>
                <Col span={12}>
                    <Row>
                        <Col>
                            <Form.Item name="search">
                                <Search value={filterQuery.name} placeholder="Axtar" size='large' autoComplete="off" allowClear onChange={(e) => {
                                    setfilterQuery({ ...filterQuery, name: new RegExp(e.target.value) })
                                }}
                                    onSearch={() => {
                                        filterTable()
                                    }}
                                />
                            </Form.Item>

                        </Col>
                        <Col>
                            <Space >
                                <Form.Item name="status">
                                    <Select style={{
                                        width: 100,
                                        marginLeft: 15,
                                        marginRight: 15
                                    }}
                                        onChange={(e) => {
                                            setfilterQuery({ ...filterQuery, status: e })
                                        }}
                                        defaultValue="Hamısı"
                                        size={'large'}>
                                        <Select.Option value={undefined} >Hamısı</Select.Option>
                                        <Select.Option value={false}>Deaktiv</Select.Option>
                                        <Select.Option value={true}>Aktiv</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Space>
                        </Col>
                        {/* <Col>
                            <Button onClick={() => {
                                filterTable()
                            }} size='large' type="primary" htmlType='submit' ><BsSearch /> </Button>
                        </Col> */}

                    </Row>
                </Col>
            </Row>
        </Form>
    )
}
