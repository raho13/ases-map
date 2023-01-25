import { Spin } from "antd"
import React from "react"
export function Loading({ready,Comp ,...rest}){
    if(ready===false){
        return <Spin spinning={true}><div style={{"minHeight":"100vh"}}></div></Spin>
    }else{
        return <Comp {...rest}/>
    }
}