import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import appConfig from "../config.json";

function Titulo(props) {
  const Tag = props.tag || "h1";

  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.primary["900"]};
          font-size: 24px;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}

export default function ErrorPage() {

    const image= "https://c.tenor.com/63MMfGUKHlgAAAAC/one-piece-monkey-d-luffy.gif";

  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appConfig.theme.colors.neutrals["300"],
          backgroundImage: "url(https://wallpapercave.com/wp/wp8393404.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
          <Box
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "200px",
              textAlign: "center",
              padding: "16px",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              border: "1px solid rgba(0, 0, 0, 0.88)",
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: "16px",
              flex: 1,
              minHeight: "240px",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(8px)"
            }}
          >
            <Image
              styleSheet={{
                borderRadius: "25%",
                marginBottom: "16px",
              }}
              src={image}
            />
             <Titulo tag="h2">ERRO 404: PÁGINA NÃO ENCONTRADA</Titulo>
             <Button
             href="/"
              label="Voltar a página inicial"
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
        </Box>
    </>
  );
}