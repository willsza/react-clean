import React, { useState } from 'react'
import Context from '@/presentation/contexts/form/form-context'

import Styles from './login-styles.scss'
import { Footer, FormStatus, LoginHeader, Input } from '@/presentation/components'

const Login: React.FC = () => {
  const [state] = useState({
    isLoading: false
  })

  const [stateError] = useState({
    email: 'Campo obrigatório',
    password: 'Campo obrigatório',
    main: ''
  })

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{state, stateError}}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <button data-testid="submit" disabled className={Styles.submit} type="submit">Entrar</button>
          <span className={Styles.link}>Criar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login