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

import actionWebInvoke from "../utils";
import actionsConfig from "../config.json";

async function createVersion({
  repo,
  fragmentId,
  versionInfo,
  auth
}) {
  const resp =  await actionWebInvoke(
    actionsConfig['create-version'], 
    {
      "x-gw-ims-org-id": auth?.imsOrg,
      "Authorization": `Bearer ${auth?.imsToken}`
    },
    Object.assign({
      repo,
      fragmentId
    }, versionInfo)
  );

  if (!resp || resp.error) {
    throw new Error(resp?.error || "Version creation failed.");
  }

  return resp;
}

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
    setSubmitted(true);

    const versionInfo = Object.fromEntries(new FormData(e.currentTarget));
    createVersion({
      repo: await guestConnection.sharedContext.get("aemHost"),
      fragmentId: (await guestConnection.host.contentFragment.getContentFragment())?.fragmentId,
      versionInfo: versionInfo,
      auth: await guestConnection.sharedContext.get("auth")
    }).then(() => {
      guestConnection.host.toaster.display({
        variant: "positive",
        message: `Version ${versionInfo.label} created!`,
        timeout: 500
      });
      guestConnection.host.modal.close();
    }).catch(e => {
      console.log(`Create version request failed!`, e);
      guestConnection.host.toaster.display({
        variant: "negative",
        message: "Unable to create new version!",
        timeout: 500
      });
      guestConnection.host.modal.close();
    });
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
