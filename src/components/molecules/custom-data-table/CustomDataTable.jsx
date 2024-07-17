import CustomSelect from "@/components/atoms/form-elements/custom-select/CustomSelect";
import { Checkbox, Col, Divider, Flex, Row, Select, Space, Table } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
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

    .ant-table-title {
      padding: 10px 10px;
    }
  }

  .ant-table-pagination {
    margin: 30px 0 !important;
  }
`;

const CustomDataTable = ({ columns, data, pagination, loading, onChange }) => {
  const { t } = useTranslation();
  // Filter out the columns with keys 'id' and 'operation' for selection
  const selectableColumns = columns.filter(
    (column) => column.key !== "id" && column.key !== "operation"
  );

  // Initially visible columns include all columns that are not hidden plus id and operation columns
  const [visibleColumns, setVisibleColumns] = useState(
    columns.filter(
      (column) =>
        !column.hidden || column.key === "id" || column.key === "operation"
    )
  );

  const handleColumnChange = (selectedColumns) => {
    const newColumns = columns
      .map((column) => ({
        ...column,
        hidden:
          !selectedColumns.includes(column.key) &&
          column.key !== "id" &&
          column.key !== "operation",
      }))
      .filter((column) => !column.hidden);
    setVisibleColumns(newColumns);
  };

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <>
        <StyledCustomDataTable
          locale={{
            filterReset: t("Tozalash"),
          }}
          bordered={true}
          style={{ maxWidth: "100%" }}
          scroll={{ x: true }}
          columns={visibleColumns}
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
          // title={() => (
          //   <>
          //     <Flex align="center" justify="end">
          //       <CustomSelect
          //         mode="multiple"
          //         placeholder={t("Ustunlarni tanlang")}
          //         defaultValue={selectableColumns
          //           .filter((column) => !column.hidden)
          //           .map((column) => column.key)}
          //         onChange={handleColumnChange}
          //         style={{ width: "150px" }}
          //         // allowClear={false}
          //         // autoClearSearchValue={false}
          //       >
          //         {selectableColumns.map((column) => (
          //           <Option key={column.key} value={column.key}>
          //             {column.title}
          //           </Option>
          //         ))}
          //       </CustomSelect>
          //     </Flex>
          //   </>
          // )}

          title={() => (
            <>
              <Flex align="center" justify="end">
                <Select
                  mode="multiple"
                  showSearch={false}
                  placeholder={t("Ustunlarni tanlang")}
                  onChange={handleColumnChange}
                  style={{ width: "180px" }}
                  dropdownRender={(menu) => (
                    <div style={{ padding: "5px", cursor: "pointer" }}>
                      <Checkbox.Group
                        value={visibleColumns.map((column) => column.key)}
                        onChange={(checkedValues) => {
                          handleColumnChange(checkedValues);
                        }}
                      >
                        {selectableColumns.map((column) => (
                          <div style={{ width: "100%", margin: "3px 0" }}>
                            <Checkbox
                              key={column.key}
                              value={column.key}
                              style={{ lineHeight: "25px" }}
                            >
                              {column.title}
                            </Checkbox>
                          </div>
                        ))}
                      </Checkbox.Group>
                    </div>
                  )}
                >
                  {selectableColumns.map((column) => (
                    <Option key={column.key} value={column.key}>
                      {column.title}
                    </Option>
                  ))}
                </Select>
              </Flex>
            </>
          )}
        />
      </>
    </Space>
  );
};

export default CustomDataTable;
