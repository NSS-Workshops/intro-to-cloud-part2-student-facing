As part of this workshop, you'll need to install and set up AI tooling to enhance your learning and development experience. Follow the steps below to get started:

## Install the Roo Code Extension

Open Visual Studio code and install the "Roo Code" extension from the marketplace. This extension provides seamless integration with large language models (LLMs) and offers various features to assist you in coding.

## Configure RooCode with an AI Provider

After installation, you'll need to configure RooCode with your API credentials to connect it to an AI provider. RooCode supports multiple AI providers, each with different strengths and pricing models.

Google Gemini offers a free tier when you use a specific model, making it ideal for learning and experimentation.

## Gemini API Key Generation

You are going to be using Google Gemini's gemini-2.5-flash model which is free to use with harsh rate limiting. As always, you get what you pay for.

1. Visit Google AI Studio
2. Click Get API Key at the bottom
3. Click Create API Key at the top
4. Name your key "AI Workshop"
5. Choose an existing Cloud Project if you have one. If you don't, create a new one. It can be anything.
6. Click Create Key button
7. Do not close the tab. Move on to next steps

## Setting Up Gemini in Roo Code

1. In VS Code, click the kangaroo icon in your extension strip
2. Open Roo Code settings by clicking the gear ⚙️ icon in the top right corner of the Roo Code panel
3. Click the + sign next to the Configuration Profile dropdown
4. Name the profile "Gemini" and click Create Profile
5. In the API Provider field, choose "Google Gemini"
6. Go back to the browser and copy your API key and paste it into the Gemini API Key field in Roo Code
7. Choose gemini-2.5-flash from the Model dropdown
8. Expand the Advanced Settings further down in the panel
9. Update the Rate limit slider to be 10 seconds.
10. Click Save at the top of the panel, then Done

## Verifying Your Setup

Test your basic connection to ensure RooCode can communicate with your chosen AI provider.

1. Open Roo Code extension
2. Click Start New Task at the bottom, or the pencil ✏️ icon at the top
3. At the bottom, make sure the selected mode is Ask and that Gemini is the selected model
4. Ask a simple question like "Can you explain what RooCode is?" If your setup is working correctly, you should receive a detailed response about RooCode's capabilities, confirming that your API key is properly configured and the connection is established.