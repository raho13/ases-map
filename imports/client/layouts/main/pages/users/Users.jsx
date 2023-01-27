import React, { useEffect } from 'react'
import { MyTable2 } from '../../components/Table2'
import Adduser from './components/Adduser'
import { Button, Modal, Space, Input, Row, Col } from 'antd';
import { AiFillEdit } from 'react-icons/ai'
const unique = "bad_types.all";
const limit_ls_name = unique + "2.limit";



export default function Users() {
  const [UserNameModal, setUserNameModal] = React.useState(false)
  const [PasswordModal, setPasswordModal] = React.useState(false)
  const [modalIsopen, setmodalIsopen] = React.useState(false)
  const [User, setUser] = React.useState({ username: '', password: '', id: '' })
  const [props, setProps] = React.useState({ ready: true, dataSource: [], total: 0 })
  const [query, setQuery] = React.useState({});
  const [sort, setSort] = React.useState({ createdAt: -1 })
  const [limit, setLimit] = React.useState(
    parseInt(localStorage.getItem(limit_ls_name)) || 20
  );
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
      render: (text, record, index) => (
        < >
          {record.profile.number}
        </ >
      )
    },
    {
      title: "İstifadəçi adı",
      dataIndex: "username",
      key: "username"
    },
    {
      title: "Dəyişdir",
      render: (text, record, index) => (
        <>

          <Space size="middle">
            <a onClick={() => {
              setUser({ ...User, username: record.username, id: record._id })
              setUserNameModal(true)
            }}>
              Düzəlt
            </a >
            <a onClick={() => {
              setPasswordModal(true)
              setUser({ ...User, id: record._id })
            }}> Şifrəni dəyiş</a>
          </Space>
        </>
      )
    }
  ]

  function onAnyChange(whatChanged, { new_query = query, new_limit = limit, new_skip = skip, new_sort = sort }) {
    setProps({ ...props, ready: false })
    Meteor.call("get_users", new_query, new_limit, new_skip, new_sort, function (err, res) {
      if (res) {
        res.ready = true
        setProps(res)
      } else {
        console.log(err)
      }
    })
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
  useEffect(() => {
    onAnyChange("", {})
  }, [])

  const editUser = (type) => {
    if (type === "username") {
      Meteor.call("update_username", User.id, User.username, (err, res) => {
        if (res) {
          setUserNameModal(false)
          onAnyChange("ok", {})
        } else if (err) {
          console.log(err)
        }

      })
    }
    else if (type === "password") {
      Meteor.call("setPassword", User.id, User.password, (err, res) => {
        if (res) {
          setPasswordModal(false)
          onAnyChange("ok", {})
        } else if (err) {
          console.log(err)
        }

      })
    }
  }
  return (
    <>
      <Adduser onAnyChange={onAnyChange} />
      <div >
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
      </div>
      <Modal
        title="Düzəlt"
        width={"40%"}
        open={UserNameModal}
        onOk={() => {
          editUser("username")
        }}
        okText="Tədbiq et"
        cancelText="Ləğv et"
        type="warning"
        onCancel={() => {
          setUserNameModal(false)
        }}>

        <Input placeholder="İstifadəçi adı" onChange={(e) => {
          setUser({ ...User, username: e.target.value })
        }}
          value={User.username}
        />
      </Modal>
      <Modal
        title="Şifrəni dəyiş"
        width={"40%"}
        open={PasswordModal}
        onOk={() => {
          editUser("password")
        }}
        okText="Tədbiq et"
        cancelText="Ləğv et"
        type="warning"
        onCancel={() => {
          setPasswordModal(false)
        }}>

        <Input.Password placeholder="Şifrə" onChange={(e) => {
          setUser({ ...User, password: e.target.value })
        }}
          value={User.password}
        />
      </Modal>
    </>
  )
}
