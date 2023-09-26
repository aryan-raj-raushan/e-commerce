import Input from "./Input";
import FormAction from "./FormAction";
import useRegisterationHook from "./useRegisterationHook";

const Signup = () => {
  const {
    error,
    handleSubmit,
    handleChange,
    loading,
    isFormValid,
    signupFields,
    signupState,
  } = useRegisterationHook();
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center">Loading...</div>
      ) : (
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="">
            {signupFields.map((field: any) => (
              <div key={field.id}>
                <Input
                  key={field.id}
                  handleChange={handleChange}
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
              disabled={!isFormValid}
            />
          </div>
        </form>
      )}
    </>
  );
};

export default Signup;
