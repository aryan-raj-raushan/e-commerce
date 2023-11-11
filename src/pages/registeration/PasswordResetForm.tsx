// PasswordResetForm.js
import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { firebaseAuth } from "../../firebase/firebase.config";

const PasswordResetForm = ({ onClose }: any) => {
  const [email, setEmail] = useState("");
  const [resetStatus, setResetStatus] = useState<any>(null);

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(firebaseAuth, email);
      setResetStatus("success");
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      setResetStatus("error");
    }
  };

  return (
    <div className="password-reset-form w-[30vw]">
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        Email address
      </label>
      <div className="mt-1">
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={handleEmailChange}
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mt-4">
        <button
          onClick={handleForgotPassword}
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Reset Password
        </button>
      </div>

      {resetStatus === "success" && (
        <p className="mt-2 text-sm text-green-600">
          Password reset email sent successfully. Check your inbox.
        </p>
      )}

      {resetStatus === "error" && (
        <p className="mt-2 text-sm text-red-600">
          Error sending password reset email.
        </p>
      )}
    </div>
  );
};

export default PasswordResetForm;
