import Header from '../Header'
import css from './style.module.css'

type Props = {
    children: React.ReactNode
}

const MainLayout= ({children}: Props) => {
  return (
    <div className={css.container}>
        <Header />
        {children}
    </div>
  )
}

export default MainLayout