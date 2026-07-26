import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    console.log("Error occured")
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by Boundary:", error, errorInfo);
    // send error to logging service
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.container}>
          <div style={styles.card}>
            <h1 style={styles.title}>🛒 Oops! Something went wrong</h1>

            <p style={styles.text}>
              Our shopping cart hit a small issue.  
              Don't worry your items are safe!
            </p>

            <button style={styles.button} onClick={this.handleReload}>
              Reload Store
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #0f4c81, #1e88e5, #42a5f5)",
    fontFamily: "sans-serif",
  },
  card: {
    background: "white",
    padding: "40px",
    borderRadius: "14px",
    textAlign: "center",
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
    maxWidth: "420px",
  },
  title: {
    color: "#1565c0",
    marginBottom: "15px",
  },
  text: {
    color: "#555",
    marginBottom: "25px",
    lineHeight: "1.6",
  },
  button: {
    background: "#1e88e5",
    color: "white",
    border: "none",
    padding: "12px 22px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "0.3s",
  },
};

export default ErrorBoundary;