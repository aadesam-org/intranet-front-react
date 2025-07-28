import { cn } from "@/lib/utils"
import { Button } from "@/components/shadcn/ui/button"
import { Input } from "@/components/shadcn/ui/input"
import { Label } from "@/components/shadcn/ui/label"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Acesso ao Sistema</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Digite seu email e senha para acessar o sistema
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="nome.sobrenome@aadesam.org.br" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Esqueceu sua senha?
            </a>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full hover:bg-gray-700 active:scale-95 active:bg-green-600">
          Login
        </Button>
      </div>
      <div className="text-center text-sm">
        Não possui acesso?{" "}
        <a href="http://192.168.0.224/glpi/" target="_blank" className="underline underline-offset-4">
          Abra um chamado para GTI
        </a>
      </div>
    </form>
  )
}
