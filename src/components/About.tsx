import * as React from "react";

const About = (props: any) => (
  <div id="page-container"
    style={{
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }}>
    <h1>Author: Tien Nguyen Khac</h1>
    <h2>Find more cool stuffs that I do here</h2>
    <h3><a href="https://github.com/crazycat9x">GitHub</a> - <a href="https://www.linkedin.com/in/nktien/">Linkedin</a></h3>
  </div>
);

export default About;
