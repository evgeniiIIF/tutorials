import type { FC } from "react";
import { Outlet } from "react-router";

export const DefaultLayout: FC = ()=>{
  return <>
    <header>header</header>
    <main> <Outlet /></main>
    <footer>footer</footer>
  </>
}