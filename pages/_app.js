import React from "react";
import App, { Container } from "next/app";

// https://nextjs.org/docs/#custom-app

class CustomApp extends App {
  render() {
    const { Component } = this.props;

    return (
      <Container>
        <Component />
      </Container>
    );
  }
}

export default CustomApp;
