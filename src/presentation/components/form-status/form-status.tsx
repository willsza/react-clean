import React, { useContext } from 'react'

import Styles from './form-status-styles.scss'
import { Spinner } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

const FormStatus: React.FC = () => {
  const { state, stateError } = useContext(Context)

  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      { state.isLoading && <Spinner className={Styles.spinner} /> }
      { stateError.main && <span className={Styles.error}>{stateError.main}</span> }
    </div>
  )
}

export default FormStatus