/*
 * <license header>
 */

import React, { useState, useEffect } from "react";
import { attach } from "@adobe/uix-guest";
import {
  Provider,
  defaultTheme,
  ProgressBar,
  Form,
  TextField,
  TextArea,
  ButtonGroup,
  Button,
} from "@adobe/react-spectrum";

import { extensionId } from "./Constants";

export default function () {
  const [guestConnection, setGuestConnection] = useState();
  const [submitted, setSubmitted] = useState();

  useEffect(() => {
    (async () => {
      const guestConnection = await attach({ id: extensionId });

      setGuestConnection(guestConnection);
    })();
  }, []);

  const onCloseHandler = () => {
    guestConnection.host.modal.close();
  };

  const onCreateHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <Provider theme={defaultTheme} colorScheme="light">
      {guestConnection && !submitted ? (
        <Form
          validationBehavior="native"
          onSubmit={onCreateHandler}
          marginX="size-150"
        >
          <TextField name="label" label="Label" isRequired />

          <TextArea name="comment" label="Comment" />

          <ButtonGroup align="end">
            <Button type="reset" variant="action" onClick={onCloseHandler}>
              Close
            </Button>

            <Button type="submit" variant="cta">
              Create
            </Button>
          </ButtonGroup>
        </Form>
      ) : (
        <ProgressBar
          label={submitted ? "Creating..." : "Connecting..."}
          isIndeterminate
        />
      )}
    </Provider>
  );
}
