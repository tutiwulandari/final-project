import React from "react"
import { Typography, Spin, Space, Alert } from "antd"
import "./Home.css"
import NavbarComponent from "../../components/navbar/NavbarComponent"
import { useAuthorizedContext } from "../../AuthorizedContext"
import useGetTransaction from "../../Query/useGetTransaction"
import CardComponent from "../Card/CardComponent"
import Background from "../../assets/image/white-wave-background-vector.jpg"

const { Title } = Typography

function HomeCustomer() {
  const { isLoggedIn, userLevel } = useAuthorizedContext()
  console.log("value >> ", isLoggedIn, userLevel)
 
  const {
    data,
    isError,
    isLoading,
    refetch: refetchTransactions,
  } = useGetTransaction()

  console.log("data ", data)

  return (
    <div className="outer-home">
      <NavbarComponent />
      <div
        className="statusTransaksi"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <div className="title">
          <Title style={{ fontFamily: "Playfair Display", color: "#292961" }}>
            Transaksi Saat Ini
          </Title>
        </div>
        <div className="resume">
          <Space direction="vertical">
            {isLoading ? (
              <Spin tip="Loading..."></Spin>
            ) : isError ? (
              <Alert message="Gagal Memuat Data" type="error" />
            ) : (
              data.map((transaction) => (
                <CardComponent
                  key={transaction.id}
                  transaction={transaction}
                  refetchTransactions={refetchTransactions}
                />
              ))
            )}
          </Space>
        </div>
      </div>
    </div>
  )
}

export default HomeCustomer
