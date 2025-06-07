import { SignUp as SignUpComponent } from "@clerk/clerk-react";
const SignUp = () => {
  return (
    <div className="flex w-full items-center min-h-screen justify-center">
      <SignUpComponent afterSignOutUrl={"/"} />
    </div>
  );
};

export default SignUp;
