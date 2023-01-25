import React from "react";
import { MyTable2 } from "../../../components/Table2";
const unique = "bad_types.all";
const limit_ls_name = unique + "2.limit";
export function Regions() {
    const [props, setProps] = React.useState({ ready: false, dataSource: [], total: 0 })
    const [query, setQuery] = React.useState({});
    const [sort, setSort] = React.useState({createdAt:-1})
    const [limit, setLimit] = React.useState(
        parseInt(localStorage.getItem(limit_ls_name)) || 20
    );
    const [skip, setSkip] = React.useState(0);
    function onAnyChange(whatChanged, { query, limit, skip, sort }) {
        setProps({ ...props, ready: false })
        Meteor.call("active_requests_page", query, limit, skip, sort, function (err, res) {
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

    return (
        <div className="w-full" >

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
    );
}

