import {
  Box,
  Text,
  TextField,
  Image,
  Button,
  Icon,
} from "@skynexui/components";
import React, { useEffect, useState } from "react";
import { Bars } from "react-loading-icons";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";

import appConfig from "../config.json";
import { ButtonSendSticker } from "../src/components/ButtonSendSticker";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzQxODY2MywiZXhwIjoxOTU4OTk0NjYzfQ.6zbGZhmdGLLD7HMQkXVecSfOmMZVQOF92qv0aYp6TZw";
const SUPABASE_URL = "https://egyyqmydgzrkncfpijid.supabase.co";
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function ChatPage() {
  const root = useRouter();
  const userLogged = root.query.username;

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(true);

  function catchMessageRealTime(addMessage) {
    return supabaseClient
      .from("messages")
      .on("INSERT", (data) => {
        addMessage(data.new);
      })
      .subscribe();
  }

  useEffect(() => {
    setTimeout(() => {
      supabaseClient
        .from("messages")
        .select("*")
        .order("id", { ascending: false })
        .then(({ data }) => {
          setChat(data);
        });
      setLoading(false);

      catchMessageRealTime((newMessage) => {
        setChat((actualValue) => {
          return [newMessage, ...actualValue];
        });
      });
    }, 3000);
  }, []);

  function handleNewMessage(newMessage) {
    const mess = {
      from: userLogged,
      text: newMessage,
    };

    supabaseClient
      .from("messages")
      .insert([mess])
      .then(({}) => {});
    setMessage("");
  }

  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: "url(https://wallpapercave.com/wp/wp8393404.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          height: "100%",
          maxWidth: "95%",
          maxHeight: "95vh",
          padding: "32px",
          backgroundColor: "rgba(0, 0, 0, 0.63)",
          border: "2px solid rgba(255,101,80,1)",
          borderColor: appConfig.theme.colors.neutrals[999],
          borderRadius: "16px",
          minHeight: "240px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(2.6px)",
          webkitBackdropFilter: "blur(2.6px)",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            flexDirection: "column",
            padding: "16px",
            backgroundColor: "rgba(0, 0, 0, 0.63)",
            border: "1px solid rgba(0, 0, 0, 0.88)",
            borderColor: appConfig.theme.colors.primary[200],
            borderRadius: "16px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(2.6px)",
            webkitBackdropFilter: "blur(2.6px)",
          }}
        >
          {loading ? (
            <Box
              styleSheet={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Bars
                fill={appConfig.theme.colors.primary["900"]}
                height="16px"
              />
            </Box>
          ) : (
            <MessageList chatMessages={chat} setChat={setChat} />
          )}

          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              value={message}
              onChange={(event) => {
                const valor = event.target.value;
                setMessage(valor);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleNewMessage(message);
                }
              }}
              placeholder="Digite a sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
            <ButtonSendSticker
              onStickerClick={(sticker) => {
                handleNewMessage(":sticker:" + sticker);
              }}
            />
            <Button
              variant="primary"
              colorVariant="positive"
              label="Enviar"
              onClick={(event) => {
                event.preventDefault();
                handleNewMessage(message);
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          variant="heading5"
          styleSheet={{
            fontFamily: "Poppins",
            fontSize: "20px",
            color: appConfig.theme.colors.primary[200],
          }}
        >
          Piececord - Chat:
        </Text>
        <Button
          variant="tertiary"
          colorVariant="negative"
          label="Logout"
          href="/"
        />
      </Box>
    </>
  );
}

function MessageList(props) {
  function handleRemove(id) {
    const list = props.chatMessages.filter((mensagem) => mensagem.id !== id);
    props.setChat(list);
  }

  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: "scroll",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
        overflowX: "hidden",
      }}
    >
      {props.chatMessages.map((message) => {
        return (
          <Text
            tag="li"
            key={message.id}
            styleSheet={{
              borderRadius: "5px",
              padding: "6px",
              marginBottom: "12px",
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: "8px",
              }}
            >
              <Image
                styleSheet={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px",
                }}
                src={`https://github.com/${message.from}.png`}
              />
              <Text
                tag="a"
                href={`https://github.com/${message.from}`}
                target="_blank"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  textDecoration: "none",
                  hover: {
                    color: appConfig.theme.colors.primary[500],
                  },
                }}
              >
                {message.from}
              </Text>
              <Text
                styleSheet={{
                  fontSize: "10px",
                  marginLeft: "8px",
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {new Date(message.created_at).toLocaleString("pt-BR", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </Text>
              <Icon
                styleSheet={{
                  width: "15px",
                  height: "15px",
                  marginLeft: "95%",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px",
                  cursor: "pointer",
                  hover: {
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                  },
                }}
                onClick={() => {
                  handleRemove(message.id);
                }}
                name="FaTrashAlt"
                variant="tertiary"
                colorVariant="neutral"
              />
            </Box>
            {message.text.startsWith(":sticker:") ? (
              <Image
                src={message.text.replace(":sticker:", "")}
                width="150"
                height="150"
              />
            ) : (
              message.text
            )}
          </Text>
        );
      })}
    </Box>
  );
}
