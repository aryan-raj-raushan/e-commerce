const userDetails = [
  {
    id: 1,
    name: "name",
    address: "india",
    pincode: "82828",
    phoneNumber: "929929929929",
    email: "kkakka@gmail.com",
    date: "12 Aug 2019",
  },
  // Add more data objects as needed
];
const columns = [
  { key: "id", label: "S.No" },
  { key: "name", label: "Name" },
  { key: "address", label: "Address" },
  { key: "pincode", label: "Pincode" },
  { key: "phoneNumber", label: "Phone Number" },
  { key: "email", label: "Email" },
  { key: "date", label: "Date" },
];

const User = ({ mode }: any) => {
  return (
    <div className="relative overflow-x-auto mb-16">
      <h1
        className=" text-center mb-5 text-3xl font-semibold underline"
        style={{ color: mode === "dark" ? "white" : "" }}
      >
        User Details
      </h1>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          className="text-xs border border-gray-600 text-black uppercase bg-gray-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]"
          style={{
            backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
            color: mode === "dark" ? "white" : "",
          }}
        >
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col" className="px-6 py-3">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {userDetails.map((item: any, index: number) => (
            <tr
              key={item.id}
              className={`${
                index % 2 === 0 ? "bg-gray-50" : ""
              } border-b  dark:border-gray-700`}
              style={{
                backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                color: mode === "dark" ? "white" : "",
              }}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="px-6 py-4 text-black"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  {item[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
