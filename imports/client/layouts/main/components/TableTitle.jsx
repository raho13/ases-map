
export function NumberCol(){
    const {skip}=this
    return   {
        title: "#",
        dataIndex: "number",
        key: "number",
        fixed: "left",
        width: 80,
        render: (_, record,index) => {
          index=index+1
  
          return <>#{skip+index}</>
        },
      }
}