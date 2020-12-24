import { Component } from 'react';

class CollectionOverviewErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError)
      return (
        <>
          <h5>Looks like you lost your connection. Please try again</h5>
          {/* <button onClick={() => this.setState({ hasError: false })}></button> */}
        </>
      );

    return this.props.children;
  }
}

export default CollectionOverviewErrorBoundary;
