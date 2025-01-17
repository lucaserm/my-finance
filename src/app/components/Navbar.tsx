import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white px-4 py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo ou Título */}
        <Link href="/" className="text-lg font-bold">
          MyFinance
        </Link>

        {/* Links de navegação */}
        <ul className="flex gap-6">
          <li>
            <Link
              href="/transactions"
              className="hover:text-blue-400 transition duration-200"
            >
              Gerenciar Transações
            </Link>
          </li>
          <li>
            <Link
              href="/categories"
              className="hover:text-blue-400 transition duration-200"
            >
              Gerenciar Categorias
            </Link>
          </li>
          <li>
            <Link
              href="/investments"
              className="hover:text-blue-400 transition duration-200"
            >
              Gerenciar Investimentos
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
