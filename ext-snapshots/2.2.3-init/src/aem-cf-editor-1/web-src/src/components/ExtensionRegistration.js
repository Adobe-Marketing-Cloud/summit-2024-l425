/*
 * <license header>
 */

import { Text } from "@adobe/react-spectrum";
import { register } from "@adobe/uix-guest";
import { extensionId } from "./Constants";

function ExtensionRegistration() {
  const init = async () => {
    const guestConnection = await register({
      id: extensionId,
      methods: {
        headerMenu: {
          getButtons() {
            return [
              // @todo YOUR HEADER BUTTONS DECLARATION SHOULD BE HERE
              {
                id: 'create-version',
                label: 'Create Version',
                icon: 'OpenIn',
                onClick() {
                  const modalURL = "/index.html#/create-version-modal";
                  console.log("Modal URL: ", modalURL);

                  guestConnection.host.modal.showUrl({
                    title: "Create Version",
                    url: modalURL,
                  });
                },
              },
            ];
          },
        },
      }
    });
  };
  init().catch(console.error);

  return <Text>IFrame for integration with Host (AEM)...</Text>;
}

export default ExtensionRegistration;
