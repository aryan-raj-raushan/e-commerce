import Input from "./Input";
import FormAction from "./FormAction";
import useRegisterationHook from "./useRegisterationHook";
import { FallingLines } from "react-loader-spinner";

const Signup = () => {
  const {
    error,
    handleSubmit,
    handleSignUp,
    loading,
    isSignUpValid,
    signupFields,
    signupState,
  } = useRegisterationHook();
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center">
          <FallingLines color="#4fa94d" width="100" visible={true} />
        </div>
      ) : (
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="">
            {signupFields.map((field: any) => (
              <div key={field.id}>
                <Input
                  key={field.id}
                  handleChange={handleSignUp}
                  value={signupState[field.id]}
                  labelText={field.labelText}
                  labelFor={field.labelFor}
                  id={field.id}
                  name={field.name}
                  type={field.type}
                  isRequired={field.isRequired}
                  placeholder={field.placeholder}
                />
              </div>
            ))}
            {error && (
              <p className="text-red-500 text-sm font-medium">{error}</p>
            )}
            <FormAction
              handleSubmit={handleSubmit}
              text="Signup"
              disabled={!isSignUpValid}
            />
          </div>
        </form>
      )}
    </>
  );
};

export default Signup;
