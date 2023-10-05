export const cardData = [
  {
    title: "Premium Tshirts",
    description: "Our T-Shirts are 100% made of cotton.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="text-pink-600 w-12 h-12 mb-3 inline-block"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
        />
      </svg>
    ),
  },
  {
    title: "Free Shipping",
    description: "We ship all over India for FREE.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="text-pink-600 w-12 h-12 mb-3 inline-block"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
        />
      </svg>
    ),
  },
  {
    title: "Exciting Offers",
    description: "We provide amazing offers & discounts",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="text-pink-600 w-12 h-12 mb-3 inline-block"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

export const testimonialData = [
  {
    name: "Aryan Raj",
    role: "Frontend Developer",
    imageSrc: "https://cdn-icons-png.flaticon.com/128/4140/4140048.png",
    text: "Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk...",
  },
  {
    name: "Punit Dwivedi",
    role: "Senior Product Designer",
    imageSrc: "https://cdn-icons-png.flaticon.com/128/560/560216.png",
    text: "Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk...",
  },
  {
    name: "Kumar Sahil",
    role: "Senior Testing Manager",
    imageSrc: "https://cdn-icons-png.flaticon.com/128/4140/4140037.png",
    text: "Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk...",
  },
];

export const signupFields = [
  {
    labelText: "Name",
    labelFor: "name",
    id: "name",
    name: "name",
    type: "text",
    autoComplete: "name",
    isRequired: true,
    placeholder: "Full Name",
  },
  {
    labelText: "Email address",
    labelFor: "email",
    id: "email",
    name: "email",
    type: "email",
    autoComplete: "email",
    isRequired: true,
    placeholder: "Email address",
  },
  {
    labelText: "Password",
    labelFor: "password",
    id: "password",
    name: "password",
    type: "password",
    autoComplete: "current-password",
    isRequired: true,
    placeholder: "Password",
  },
  {
    labelText: "Confirm Password",
    labelFor: "confirm-password",
    id: "confirm-password",
    name: "confirm-password",
    type: "password",
    autoComplete: "confirm-password",
    isRequired: true,
    placeholder: "Confirm Password",
  },
];

export const loginFields = [
  {
    labelText: "Email address",
    labelFor: "email",
    id: "email",
    name: "email",
    type: "email",
    autoComplete: "email",
    isRequired: true,
    placeholder: "Email address",
  },
  {
    labelText: "Password",
    labelFor: "password",
    id: "password",
    name: "password",
    type: "password",
    autoComplete: "current-password",
    isRequired: true,
    placeholder: "Password",
  },
];

export const buyingData = [
  {
    label: "Enter Full Name",
    type: "text",
    name: "name",
    id: "name",
    md: 12
  },
  {
    label: "Full Address",
    type: "text",
    name: "address",
    id: "street",
    md: 12
  },
  {
    label: "State",
    type: "Select",
    name: "state",
    id: "state",
    md: 4
  },
  {
    label: "City",
    type: "Select",
    name: "city",
    id: "city",
    md: 4
  },
  {
    label: "Pincode",
    type: "text",
    name: "pincode",
    id: "pincode",
    md: 4
  },
  {
    label: "Enter Email address",
    type: "text",
    name: "email",
    id: "email",
    md: 6
  },
  {
    label: "Enter Mobile Number",
    type: "text",
    name: "mobileNumber",
    id: "mobileNumber",
    md: 6
  },
];

export const stateCodes:any = {
  "Andhra Pradesh": "AP",
  "Arunachal Pradesh": "AR",
  "Assam": "AS",
  "Bihar": "BR",
  "Chhattisgarh": "CG",
  "Goa": "GA",
  "Gujarat": "GJ",
  "Haryana": "HR",
  "Himachal Pradesh": "HP",
  "Jammu and Kashmir": "JK",
  "Jharkhand": "JH",
  "Karnataka": "KA",
  "Kerala": "KL",
  "Madhya Pradesh": "MP",
  "Maharashtra": "MH",
  "Manipur": "MN",
  "Meghalaya": "ML",
  "Mizoram": "MZ",
  "Nagaland": "NL",
  "Odisha": "OD",
  "Punjab": "PB",
  "Rajasthan": "RJ",
  "Sikkim": "SK",
  "Tamil Nadu": "TN",
  "Telangana": "TG",
  "Tripura": "TR",
  "Uttarakhand": "UK",
  "Uttar Pradesh": "UP",
  "West Bengal": "WB",
  "Andaman and Nicobar Islands": "AN",
  "Chandigarh": "CH",
  "Dadra and Nagar Haveli": "DN",
  "Daman and Diu": "DD",
  "Delhi": "DL",
  "Lakshadweep": "LD",
  "Puducherry": "PY"
};