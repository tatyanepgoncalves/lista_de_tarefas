import { Moon, Sun } from 'lucide-react'
import { useEffect } from 'react'
import { useThemeStore } from '@/stores/themeStore'

export default function Header() {
  const { theme, toggleTheme } = useThemeStore()

  useEffect(() => {
    document.body.classList.remove('light', 'dark')
    document.body.classList.add(theme)
  }, [theme])

  return (
    <header>
      <div className="relative mx-auto flex w-[80%] max-w-3xl items-center justify-center p-4 md:max-w-6xl">
        <section className="">
          <h1 className="font-bold font-poppins text-lg tracking-wider md:text-xl">
            OrganizAI
          </h1>
        </section>

        <button
          className="absolute right-4 cursor-pointer"
          onClick={toggleTheme}
          type="button"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </header>
  )
}
