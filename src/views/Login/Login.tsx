import { useState } from 'react'
import { useNavigate } from 'react-router'
import styles from './Login.module.scss'
import { User } from '../../db/users'
import { validateUser } from '../../db'

type LoginProps = {
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

const Login = (props: LoginProps) => {
  const { setUser } = props
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setError(false)

    const user = validateUser(email, password)

    if (user) {
      setUser(user)
      navigate('/', { replace: true })
    } else {
      setError(true)
    }
  }

  return (
    <section className={styles.login}>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit} name="login">
        <label htmlFor="email">Email</label>
        <input
          autoComplete="current-password"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          type="email"
          placeholder="Email"
        />
        <label htmlFor="password">Password</label>
        <input
          autoComplete="current-password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          type="password"
          placeholder="Password"
        />
        <div className={styles.errorWrapper}>
          {error && (
            <p className={styles.errorMessage}>Invalid email or user name</p>
          )}
        </div>
        <button disabled={!email.length || !password.length}>Submit</button>
      </form>
    </section>
  )
}

export default Login
