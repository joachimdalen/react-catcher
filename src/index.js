import React, { Component } from "react";
import styles from "./styles.css";
import PropTypes from "prop-types";

class Catcher extends Component {
  static propTypes = {
    expandError: PropTypes.bool,
  };
  static defaultProps = {
    expandError: false,
  };

  state = {
    error: null,
    errorInfo: null
  };

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    const env = process.env.NODE_ENV;
    const { error, errorInfo } = this.state;
    const { children, component, expandError } = this.props;
    if (this.state.errorInfo) {
      if (component) {
        return component;
      }
      if (env === "development") {
        return (
          <div className={styles["React-Catcher"]}>
            <div className={styles["React-Catcher__content"]}>
              <h2 className={styles["React-Catcher__content__title"]}>
                {error.message || "Something went wrong."}
              </h2>
              <details open={expandError}>
                {error && error.toString()}
                <br />
                {errorInfo.componentStack}
                <br />
                {error.stack}
              </details>
            </div>
            <div className={styles["React-Catcher__overlay"]} />
          </div>
        );
      }
      return (
        <div className={styles["React-Catcher"]}>
          <div className={styles["React-Catcher__content"]}>
            <h2 className={styles["React-Catcher__content__title--regular"]}>
              {"Something went wrong."}
            </h2>
          </div>
        </div>
      );
    }
    return children;
  }
}
export default Catcher;
