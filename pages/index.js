import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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

export default function PaginaInicial() {
  const [github, setGithub] = useState("");
  const [username, setUsername] = useState("");
  const root = useRouter();
  const image = "https://avatars.githubusercontent.com/u/46856822?v=4";

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setGithub(result);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [username]);

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
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            width: "100%",
            maxWidth: "700px",
            padding: "32px",
            margin: "16px",
            backgroundColor: "rgba(0, 0, 0, 0.63)",
            border: "1px solid rgba(0, 0, 0, 0.88)",
            borderColor: appConfig.theme.colors.neutrals[999],
            borderRadius: "16px",
            flex: 1,
            minHeight: "240px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(2.6px)",
            webkitBackdropFilter: "blur(2.6px)",
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (event) {
              event.preventDefault();
              root.push("/chat");
            }}
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", sm: "50%" },
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            <Titulo tag="h2">Bem vindo a Grand Line!</Titulo>
            <Text
              variant="body3"
              styleSheet={{
                marginBottom: "32px",
                color: appConfig.theme.colors.neutrals["050"],
                fontWeight: "bold",
              }}
            >
              {appConfig.name}
            </Text>
            <TextField
              required
              placeholder="Informe seu usuário do Github"
              value={username}
              onChange={function (event) {
                const valor = event.target.value;
                setUsername(valor);
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type="submit"
              label="Entrar"
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "200px",
              padding: "16px",
              backgroundColor: "rgba(0, 0, 0, 0.23)",
              border: "1px solid rgba(0, 0, 0, 0.88)",
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: "16px",
              flex: 1,
              minHeight: "240px",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(4.7px)",
              webkitBackdropFilter: "blur(4.7px)",
            }}
          >
            <Image
              styleSheet={{
                borderRadius: "50%",
                marginBottom: "16px",
              }}
              src={
                username.length > 2
                  ? `https://github.com/${username}.png`
                  : image
              }
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: "3px 10px",
                borderRadius: "10px",
              }}
            >
              {username.length > 2 ? (
                <Text
                  tag="a"
                  href={`https://github.com/${username}`}
                  target="_blank"
                  styleSheet={{
                    color: appConfig.theme.colors.neutrals[200],
                    fontSize: "12px",
                    textDecoration: "none",
                    hover: {
                      color: appConfig.theme.colors.primary[500],
                    },
                  }}
                >
                  {username}
                </Text>
              ) : (
                ""
              )}
            </Text>
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals["200"],
                  padding: "3px 10px",
                  borderRadius: "1000px",
                  marginTop: "8px",
                }}
              >
                {username.length > 2 ? github.location : ""}
              </Text>
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals["200"],
                  padding: "3px 10px",
                  borderRadius: "1000px",
                  marginTop: "8px",
                }}
              >
                {username.length > 2 ? `Followers: ${github.followers}`: ""}
              </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
