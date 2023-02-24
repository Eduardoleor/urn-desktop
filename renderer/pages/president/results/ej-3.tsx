import React, { CSSProperties, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Box, SxProps, Typography, Button as ButtonIcon } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import Layout from "@/components/layout";

import useStore from "@/store/useStore";
import { fetchUrnResult3 } from "@/api/vote";

export default function ResultsEj2() {
  const router = useRouter();
  const user = useStore((state) => state.user);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Nombre", width: 300 },
    { field: "owner", headerName: "Propietario", width: 200 },
  ];

  const handleBack = () => {
    router.back();
  };

  const obtainTotalVotes = async () => {
    setLoading(true);
    try {
      const list = await fetchUrnResult3(user[0]?.id);
      if (list.length === 0) {
        setData([]);
      } else {
        const newList = list.map((item: any, index: number) => {
          return { ...item, id: index + 1 };
        });
        setData(newList);
      }
    } catch (err) {
      alert(
        err.response?.data.message || "Error al obtener el estado de la urna"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtainTotalVotes();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>No hay datos</div>;

  return (
    <React.Fragment>
      <Layout>
        <Box sx={styles.container}>
          <ButtonIcon
            variant="text"
            color="secondary"
            startIcon={<ArrowBackIosIcon />}
            sx={{
              width: "100px",
              marginLeft: "120px",
              marginTop: "30px",
            }}
            onClick={handleBack}
          >
            Regresar
          </ButtonIcon>
          <Typography sx={styles.title}>Resultados Ejemplo 1</Typography>
          <Typography sx={styles.subtitle}>
            Elección de Representante
          </Typography>
          <Box sx={styles.form}>
            <DataGrid rows={data} columns={columns} />
          </Box>
        </Box>
      </Layout>
    </React.Fragment>
  );
}

const styles: Record<string, CSSProperties | SxProps> = {
  container: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "20px",
  },
  title: {
    color: "#000000",
    fontSize: "70px",
    fontWeight: "400",
    marginBottom: "10px",
    textAlign: "center",
  },
  subtitle: {
    color: "#000000",
    fontSize: "40px",
    textAlign: "center",
    marginBottom: "30px",
  },
  form: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    paddingX: "30%",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50px",
  },
  buttonTextOutline: {
    color: "#000000",
    fontSize: "35px",
    fontWeight: "700",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: "35px",
    fontWeight: "700",
  },
  containerLogout: {
    display: "flex",
    justifyContent: "flex-end",
    position: "absolute",
    bottom: "20px",
    right: "20px",
    "&:hover": {
      cursor: "pointer",
    },
  },
};
