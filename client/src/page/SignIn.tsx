import { SignIn as SignInComponent } from "@clerk/clerk-react";
const SignIn = () => {
  return (
    <div className="flex w-full items-center min-h-screen justify-center">
      <SignInComponent afterSignOutUrl={"/"} />
    </div>
  );
};

export default SignIn;
