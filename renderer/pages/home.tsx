import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import electron from "electron";

function Home() {
  const [name, setName] = React.useState("");

  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3009/api/diaries")
      .then((res) => res.json())
      .then((res) => {
        const test = res[0].weather;
        setName(test);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(name);

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-typescript)</title>
      </Head>
      <div>
        <Button variant="contained" onClick={() => router.push("/next")}>
          Next {name}
        </Button>
        <p>
          ⚡ Electron + Next.js ⚡ -
          <Link href="/next">
            <a>Go to next page</a>
          </Link>
        </p>
        <img src="/images/logo.png" />
      </div>
    </React.Fragment>
  );
}

export default Home;
