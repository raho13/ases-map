// import { Menu, Table } from "antd"
// import React from "react"
// ///import { BadTypes } from "./components/BadTypes"

// // const MenuComonents = {
// //     BadTypes
// // }
// export function Settings() {
//     const [choosen_item, setChoosenItem] = React.useState("BadTypes")
//     const MenuItem = MenuComonents[choosen_item]
//     return <div className="flex flex-row">
//         <div className="flex w-1/5 p-2">
//             <Menu
//                 onClick={(e) => {
//                     setChoosenItem(e.key)
//                 }}
//                 defaultSelectedKeys={[choosen_item]}
//                 className="w-full"
//                 mode="inline"
//                 items={[
//                     {
//                         key: "BadTypes",
//                         label: "Şikayət tipləri",
//                     },

//                 ]}
//             />
//         </div>
//         <div className="flex w-4/5 p-2">
//             <MenuItem />
//         </div>
//     </div>
// }
import React from 'react'

export default function Settings() {
  return (
    <div>Settings</div>
  )
}
