import React, { useEffect, useState, useTransition } from "react";
import { Empty, Space, Table } from "antd";
import styled from "styled-components";

export const StyledCustomDataTable = styled(Table)`
  .ant-table {
    .ant-table-thead {
      .ant-table-cell {
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: -0.07px;
      }
    }
    .ant-table-tbody {
      .ant-table-cell {
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: -0.07px;
      }
    }

    .ant-table-footer {
    }
  }

  .ant-table-pagination {
    margin: 20px 0 !important;
  }
`;

const CustomDataTable = ({ loading = false, columns, data }) => {
  const [tableData, setTableData] = useState();

  useEffect(() => {
    setTableData(data);
  }, [loading]);

  const [tableParams, setTableParams] = useState({
    pagination: {
      defaultPageSize: 10,
      showSizeChanger: true,
      pageSizeOptions: ["5", "10", "50", "100"],
    },
  });

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({ ...tableParams, pagination });

    console.log(pagination);
    console.log(filters);
    console.log(sorter);
  };

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <>
        <StyledCustomDataTable
          locale={{
            emptyText: (
              <Empty description={"No data"} style={{ padding: "50px 0" }} />
            ),
          }}
          loading={loading}
          columns={columns}
          rowKey={"id"}
          style={{ maxWidth: "100%" }}
          scroll={{ x: true }}
          dataSource={tableData}
          pagination={{
            ...tableParams.pagination,
            showSizeChanger: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
          onChange={handleTableChange}
        />
      </>
    </Space>
  );
};

export default CustomDataTable;
