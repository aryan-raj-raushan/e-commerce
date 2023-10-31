import React from "react";
import { formatDate } from "../../../../HOC/hoc/HOC";

const columns = [
  { key: "uid", label: "UID" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
];
const User = ({ userData, darkText, darkBg }: any) => {
  return (
    <div className="relative overflow-x-auto mb-16">
      <h1
        className=" text-center mb-5 text-3xl font-semibold underline"
        style={darkText}
      >
        User Details
      </h1>
      <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
        <thead
          className="text-xs border border-gray-600 text-black uppercase bg-gray-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]"
          style={darkBg}
        >
          <tr>
            <th scope="col" className="px-6 py-3">
              S.No.
            </th>

            {columns.map((column) => (
              <th key={column.key} scope="col" className="px-6 py-3">
                {column.label}
              </th>
            ))}
            <th scope="col" className="px-6 py-3">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {userData.map((item: any, index: number) => {
            const myDate = new Date(item.time);
            const formattedDate = formatDate(myDate);
            return (
              <tr
                key={item.uid}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : ""
                } border-b  dark:border-gray-700`}
                style={darkBg}
              >
                <td className="px-6 py-4 text-black " style={darkText}>
                  {index + 1}.
                </td>
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-6 py-4 text-black"
                    style={darkText}
                  >
                    {item[column.key]}
                  </td>
                ))}
                <td className="px-6 py-4 text-black " style={darkText}>
                  {formattedDate}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default User;
