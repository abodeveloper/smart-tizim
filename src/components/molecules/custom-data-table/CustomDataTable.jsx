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
    margin: 30px 0 !important;
  }
`;

const CustomDataTable = ({ columns, data, pagination, loading, onChange }) => {
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <>
        <StyledCustomDataTable
          locale={{
            // emptyText: (
            //   <Empty description={"No data"} style={{ padding: "50px 0" }} />
            // ),
            // filterTitle: "Filter menu",
            // filterConfirm: "Saqlash",
            filterReset: "Tozalash",
            // filterEmptyText: "Filtrlar yo'q",
            // filterCheckall: "Barcha elementlarni tanlash",
            // filterSearchPlaceholder: "Filtrlarda qidiruv",
          }}
          bordered={true}
          style={{ maxWidth: "100%" }}
          scroll={{ x: true }}
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={data}
          pagination={
            pagination
              ? {
                  current: pagination.current,
                  pageSize: pagination.pageSize,
                  total: pagination.total,
                  showSizeChanger: true,
                  showTotal: (total, range) =>
                    `${range[0]}-${range[1]} of ${total} items`,
                }
              : false
          }
          loading={loading}
          onChange={onChange}
        />
      </>
    </Space>
  );
};

export default CustomDataTable;
