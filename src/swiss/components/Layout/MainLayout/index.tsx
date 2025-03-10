import { auth } from '@/auth'
import Header from '../Header'
import css from './style.module.css'
import { User } from '@/services/lib/definitions'
import UserNav from '@/src/swiss/views/UserNav/usernav'

type Props = {
    children: React.ReactNode
}

const MainLayout = async ({children}: Props) => {

  const session = await auth()
  
    const user: User = {
      name: session?.user?.name!,
      player_id: session?.user?.id!,
      email: session?.user?.email!,
      password: "what?"
    }
  return (
    <div className={css.container}>
        <Header />
        <UserNav user_email={user.email} />
        {children}
    </div>
  )
}

export default MainLayout