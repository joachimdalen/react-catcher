import React, {
  Component
} from 'react';
import styles from './styles.css';

class Catcher extends Component {
  static propTypes = {};
  static defaultProps = {};

  state = {
    error: { message: 'Some error', stack: 'stack', toString = () => {return ''} },
    errorInfo: {
      componentStack: 'other error',
    }
  };

  /* componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  } */

  render() {
    const env = process.env.NODE_ENV;
    const { error, errorInfo, } = this.state;
    const { children, component } = this.props
    if (this.state.errorInfo) {
      if (component) {
        return component;
      }
      if (env === 'developmesnt') {
        return (
          <div className={styles['React-Catcher']}>
            <div className={styles['React-Catcher__content']}>
              <h2 className={styles['React-Catcher__content__title']}>{error.message || 'Something went wrong.'}</h2>
              <details>
                {error && error.toString()}
                <br />
                {errorInfo.componentStack}
                <br />
                {error.stack}
              </details>
            </div>
            <div className={styles['React-Catcher__overlay']}></div>
          </div>
        )
      }
      return (
        <div className={styles['React-Catcher']}>
          <div className={styles['React-Catcher__content']}>
            <h2 className={styles['React-Catcher__content__title--regular']}>{'Something went wrong.'}</h2>
          </div>
        </div>
      )
    }
    return children;
  }
}
export default Catcher;
