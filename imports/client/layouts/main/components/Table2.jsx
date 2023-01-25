import React from "react";
import { Table } from "antd";
import { Loading } from "./Loading";
import Column from "antd/lib/table/Column";

export const MyTable2 = React.memo(({ unique, limit, skip, dataSource, onSkipChange, onLimitChange, ready, ...props }) => {
  const limit_ls_name = unique + ".limit";

  React.useEffect(() => {

    return () => {
      localStorage.setItem(limit_ls_name, limit);
    }
  }, [limit, skip]);
  return (
    <Loading
      ready={ready}
      Comp={TheTable}
      {...props}
      dataSource={dataSource}
      limit={limit}
      skip={skip}
      onSkipChange={onSkipChange}
      onLimitChange={onLimitChange}
    ></Loading>
  );
}, (prev, next) => {
  return false
  // const limit = prev.limit === next.limit
  // const skip = prev.skip === next.skip
  // const unique = prev.unique === next.unique
  // const sort = JSON.stringify(prev.sort) === JSON.stringify(next.sort)
  // const query = JSON.stringify(prev.query) === JSON.stringify(next.query)
  // const length = prev.dataSource.length === next.dataSource.length
  // const readyChanged = prev.ready === next.ready
  // const firstItemChange = prev.dataSource?.[0]?._id === next.dataSource?.[0]?._id
  // if (!readyChanged) console.log("readyChanged deyisdi")
  // if (!firstItemChange) console.log("firstItemChange deyisdi")
  // if (!length) console.log("length deyisdi")
  // if (!limit) console.log("limit deyisdi")
  // if (!skip) console.log("skip deyisdi")
  // if (!unique) console.log("unique deyisdi")
  // if (!sort) console.log("sort deyisdi")
  // if (!query) console.log("query deyisdi")
  // return limit && skip && unique && sort && query
});
const TheTable = ({
  total,
  columns,
  dataSource,
  onSkipChange,
  limit,
  skip,
  onLimitChange,
}) => {
  const [y, setY] = React.useState(500);

  React.useEffect(() => {
    setY(window.innerHeight - 190);
  }, []);
  return (

    <Table
      rowKey="_id"
      size="small"
      scroll={{
        y,
      }}
      pagination={{
        pageSize: limit,
        position: ["none", "bottomCenter"],
        showSizeChanger: true,
        total: total,
        onShowSizeChange: (e, newSize) => {
          onLimitChange(newSize)
          // setLimit(newSize);
          // setSkip(0);
        },
        onChange(page_num, pageSize) {
          onSkipChange(page_num * pageSize - pageSize)
          // setSkip(page_num * pageSize - pageSize);
        },
        showQuickJumper: true,
        locale: {
          items_per_page: "hər səhifədə / " + total,
          jump_to: "get",
          page: "səhifəyə",
        },
        current: (skip + limit) / limit,
      }}
      dataSource={dataSource}
    >
      {columns.map(column => {
        return <Column title={column.title} dataIndex={column.dataIndex} key={column.key} fixed={column.fixed} width={column.width} render={column.render} />
      })}
    </Table>
  );
};
