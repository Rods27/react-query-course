import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
body {
  margin: 10px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #ecedf2;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}


li {
  margin-top: 8px;
}

li.post-title {
  cursor: pointer;
}

li.post-title:hover {
  opacity: 0.6;
}

div.pages {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

`;
