import {
  Box,
  Text,
  TextField,
  Image,
  Button,
  Icon,
} from "@skynexui/components";
import React, { useState } from "react";

import appConfig from "../config.json";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  function handleNewMessage(newMessage) {
    const mess = {
      id: chat.length,
      from: "davimateus1",
      text: newMessage,
    };
    setChat([mess, ...chat]);
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
          <MessageList chatMessages={chat} setChat={setChat} />

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
          Chat:
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
        overflow: "hidden",
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
                src={`https://github.com/davimateus1.png`}
              />
              <Text tag="strong">{message.from}</Text>
              <Text
                styleSheet={{
                  fontSize: "10px",
                  marginLeft: "8px",
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {new Date().toLocaleDateString()}
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
            {message.text}
          </Text>
        );
      })}
    </Box>
  );
}
