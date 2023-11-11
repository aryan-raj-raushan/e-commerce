import Input from "./Input";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import { loginFields } from "../../const/Const";
import { FallingLines } from "react-loader-spinner";
import useRegisterationHook from "./useRegisterationHook";
import GoogleLogo from "../../assets/logo/google-logo.png";

const Login = () => {
  const {
    loading,
    handleLogin,
    error,
    handleSubmitLogin,
    isLoginValid,
    loginState,
    handleGoogleLogin,
  } = useRegisterationHook();

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center">
          <FallingLines color="#4fa94d" width="100" visible={true} />
        </div>
      ) : (
        <form className="space-y-6">
          <div className="space-y-2">
            {loginFields.map((field) => (
              <Input
                key={field.id}
                handleChange={handleLogin}
                value={loginState[field.id] || ""}
                labelText={field.labelText}
                labelFor={field.labelFor}
                id={field.id}
                name={field.name}
                type={field.type}
                isRequired={field.isRequired}
                placeholder={field.placeholder}
              />
            ))}
          </div>
          <FormExtra />
          {error && <p className="text-red-500 text-sm font-normal">{error}</p>}
          <FormAction
            handleSubmit={handleSubmitLogin}
            text="Login"
            disabled={!isLoginValid}
          />
          <button
            className="flex items-center justify-center w-full border py-1 rounded-lg"
            onClick={handleGoogleLogin}
            style={{ backgroundColor: "white", color: "black" }}
          >
            Sign in with Google
            <img
              src={GoogleLogo}
              alt="Google Logo"
              style={{ width: "20px", marginLeft: "6px" }}
            />
          </button>
        </form>
      )}
    </>
  );
};

export default Login;
