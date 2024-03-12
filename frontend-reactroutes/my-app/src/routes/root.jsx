import { Outlet } from "react-router-dom";

export default function Root() {
  return(
    <>
      <header>
        <h1>header</h1>
      </header>

      <Outlet />

      <footer>
        <h1>footer</h1>
      </footer>
    </>
  )
}