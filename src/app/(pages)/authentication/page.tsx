import { SignInForm } from "@/app/(pages)/authentication/components/sign-in-form";
import { SignUpForm } from "@/app/(pages)/authentication/components/sign-up-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Authentication() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/app");
  }

  return (
    <div className="flex w-full flex-col gap-6 p-5">
      <Tabs defaultValue="sign-in">
        <TabsList>
          <TabsTrigger value="sign-in">Entrar</TabsTrigger>
          <TabsTrigger value="sign-up">Criar conta</TabsTrigger>
        </TabsList>
        <TabsContent value="sign-in" className="w-full">
          <SignInForm />
        </TabsContent>
        <TabsContent value="sign-up" className="w-full">
          <SignUpForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
