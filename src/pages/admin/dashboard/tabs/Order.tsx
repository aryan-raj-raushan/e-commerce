import React from "react";

const columns = [
  { key: "index", label: "S.No." },
  { key: "paymentId", label: "Payment Id" },
  { key: "imageUrl", label: "Image", isImage: true },
  { key: "title", label: "Title" },
  { key: "price", label: "Price" },
  { key: "category", label: "Category" },
  { key: "allorder.addressInfo.name", label: "Name" },
  { key: "address", label: "Address" },
  { key: "pincode", label: "Pincode" },
  { key: "phoneNumber", label: "Phone Number" },
  { key: "email", label: "Email" },
  { key: "date", label: "Date" },
];

const Order = ({ mode, orderDetails,darkText,darkBg }: any) => {

  return (
    <div className="relative overflow-x-auto mb-16">
      <h1
        className=" text-center mb-5 text-3xl font-semibold underline"
        style={darkText}
      >
        Order Details
      </h1>
      <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
        <thead
          className="text-xs border border-gray-600 text-black uppercase bg-gray-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]"
          style={darkBg}
        >
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col" className="px-2 py-3">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        {orderDetails.map((allorder: any, index: number) => (
          <tbody key={index}>
            {allorder.cartItems.map((item: any, serial: number) => {
              const { title, category, imageUrl, price } = item;
              const {
                name,
                mobileNumber,
                email,
                date,
                fullAddress,
              } = allorder.addressInfo;
              const {paymentId} = allorder
              const { state, pincode, address, city } = fullAddress;

              const rowData = [
                { label: index + 1 },
                { label: paymentId },
                { content: <img className="w-16" src={imageUrl.imageUrl0} alt="img" /> },
                { label: title },
                { label: `₹${price}` },
                { label: category },
                { label: name },
                { label: `${address}, ${city}, ${state}` },
                { label: pincode },
                { label: mobileNumber },
                { label: email },
                { label: date },
              ];
              return (
                <tr
                  key={serial}
                  className={`bg-gray-50 border-b ${
                    mode === "dark" ? "dark:border-gray-700" : ""
                  }`}
                  style={darkBg}
                >
                  {rowData.map((cellData, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="px-2 py-4 text-black"
                      style={darkText}
                    >
                      {cellData.content || cellData.label}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default Order;
