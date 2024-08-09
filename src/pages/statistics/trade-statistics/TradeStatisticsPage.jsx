import BackButton from "@/components/atoms/back-button/BackButton";
import CustomTabs from "@/components/atoms/custom-tabs/CustomTabs";
import ErrorResult from "@/components/molecules/error-result/ErrorResult";
import PageLoader from "@/components/molecules/page-loader/PageLoader";
import PageTitle from "@/components/molecules/page-title/PageTitle";
import { httpGetClientOne } from "@/services/api/requests/clients.requests";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Col, Flex, Row, Tabs, DatePicker } from "antd";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useTradeBreadcrumbItems } from "../breadcrumbs/useTradeBreadcrumb";
import dayjs from "dayjs";
import CustomDateRangePicker from "@/components/atoms/form-elements/custom-date-range-picker/CustomDateRangePicker";

const { RangePicker } = DatePicker;

const TradeStatisticsPage = () => {
  const { id } = useParams();

  const { t } = useTranslation();

  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
    isRefetching,
    ...rest
  } = useQuery({
    queryKey: ["client-one", id],
    queryFn: () => httpGetClientOne(7),
    select: (response) => response.data,
  });

  const BREADCRUMB_ITEMS = useTradeBreadcrumbItems();

  return (
    <>
      <Helmet>
        <title>{t("Savdo statistikasi")}</title>
      </Helmet>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Flex align="center" justify="space-between">
            <PageTitle>{t("Savdo statistikasi")}</PageTitle>
            <Flex gap={"middle"}>
              <CustomDateRangePicker
                defaultValue={[dayjs("2015/01/01"), dayjs("2015/01/01")]}
                // format={dateFormat}
              />
              <BackButton />
            </Flex>
          </Flex>
        </Col>
        <Col span={24}>
          <Breadcrumb items={BREADCRUMB_ITEMS} />
        </Col>
        <Col span={24}>
          {isLoading ? (
            <PageLoader />
          ) : (
            <>
              {error ? (
                <ErrorResult error={error} />
              ) : (
                <>
                  <CustomTabs tabPosition={"top"}>
                    <Tabs.TabPane tab={t("Umumiy ma'lumotlar")} key="1">
                      B
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={t("Savdolar")} key="2">
                      B
                    </Tabs.TabPane>
                  </CustomTabs>
                </>
              )}
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default TradeStatisticsPage;
