# Everything ChatGPT
> A project by [@tercmd](https://twitter.com/tercmd)

Explore what happens under the hood with the ChatGPT web app. And some speculation, of course. [Contribute if you have something interesting related to ChatGPT](./CONTRIBUTING.md)

## Table of Contents
- [Fonts (fonts.txt)](#fonts-fontstxt)
- [Application](#application)
- [Data](#data)
  - [Session data](#session-data)
  - [User data](#user-data)
  - [Model data](#model-data)
  - [User data (using chat.json)](#user-data-using-chatjson)
- [Conversation](#conversation)
  - [Conversation History](#conversation-history)
  - [Getting the Conversation ID](#getting-the-conversation-id)
  - [Loading a Past Conversation](#loading-a-past-conversation)
  - [The process of asking ChatGPT a question](#the-process-of-asking-chatgpt-a-question)
  - [(Soft)Deleting a conversation](#softdeleting-a-conversation)
  - [Leaving Feedback on Messages](#leaving-feedback-on-messages)
- [Errors](#errors)
  - ["_Something went wrong, please try reloading the conversation._"](#something-went-wrong-please-try-reloading-the-conversation)
  - ["_The message you submitted was too long, please reload the conversation and submit something shorter._"](#the-message-you-submitted-was-too-long-please-reload-the-conversation-and-submit-something-shorter)
- [Markdown rendering](#markdown-rendering)

## Fonts _([fonts.txt](./fonts.txt))_
The fonts loaded are:
- [Signifier-Regular.otf](https://chat.openai.com/fonts/Signifier-Regular.otf)
- [Sohne-Buch.otf](https://chat.openai.com/fonts/Sohne-Buch.otf)
- [Sohne-Halbfett.otf](https://chat.openai.com/fonts/Sohne-Halbfett.otf)
- [SohneMono-Buch.otf](https://chat.openai.com/fonts/SohneMono-Buch.otf)
- [SohneMono-Halbfett.otf](https://chat.openai.com/fonts/SohneMono-Halbfett.otf)
- [KaTeX_Caligraphic-Bold.woff](https://chat.openai.com/fonts/KaTeX_Caligraphic-Bold.woff) (_Caligraphic-Regular_ for Regular font)
- [KaTeX_Fraktur-Bold.woff](https://chat.openai.com/fonts/KaTeX_Fraktur-Bold.woff) (_Fraktur-Regular_ for Regular font)
- [KaTeX_Main-Bold.woff](https://chat.openai.com/fonts/KaTeX_Main-Bold.woff) (_BoldItalic_, _Italic_, _Regular_ for font weights you can probably guess)
- [KaTeX_Math-Bold.woff](https://chat.openai.com/fonts/KaTeX_Math-Bold.woff) (_BoldItalic_, _Italic_, _Regular_ for font weights you can probably guess)
- [KaTeX_SansSerif-Bold.woff](https://chat.openai.com/fonts/KaTeX_SansSerif-Bold.woff) (_Italic_, _Regular_ for font weights you can probably guess)
- [KaTeX_Script-Regular.woff](https://chat.openai.com/fonts/KaTeX_Script-Regular.woff)
- [KaTeX_Size1-Regular.woff](https://chat.openai.com/fonts/KaTeX_Size1-Regular.woff) (_Size1_, _Size2_, _Size3_, _Size4_)
- [KaTeX_Typewriter-Regular.woff](https://chat.openai.com/fonts/KaTeX_Typewriter-Regular.woff)

## Application
ChatGPT is a NextJS application. Server information cannot be clearly found as the entirety of chat.openai.com is routed through Cloudflare. Sentry Analytics are used for the Thumbs Up/Thumbs Down feedback the user selects for a message.

## Data
### Session data
A request can be made to `/api/auth/session` (literally, **in your browser**, however cannot work in an iframe or fetch because it doesn't have a `Access-Control-Allow-Origin` set up) to access data like the following:

```
 user
 |__ id: user-[redacted]
 |__ name: [redacted]@[redacted].com (probably can be a user's name)
 |__ email: [redacted]@[redacted].com
 |__ image: https://s.gravatar.com/avatar/8cf[redacted in case of possible unique identifier]2c7?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2F[first 2 letters of name].png
 |__ picture: https://s.gravatar.com/avatar/8cf[redacted in case of possible unique identifier]2c7?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2F[first 2 letters of name].png
 |__ groups: []
expires: [date in the future]
accessToken: ey[redacted] (base64 "{")
```

### User data
This requires an access token (which seems to be the Authorization cookie, along with other factors), so this cannot be accessed using your browser directly, but here's what we have when we make a request to `/backend-api/accounts/check`:

```
account_plan
|__ is_paid_subscription_active: false
|__ subscription_plan: chatgptfreeplan
|__ account_user_role: account-owner
|__ was_paid_customer: false
|__ has_customer_object: false
user_country: [redacted two letter country code]
features: ["system_message"]
```
(Note: false in the above does not include quotes, whereas other values are in quotes, removed in the above _schema?_)

### User data (using chat.json)
When we make a request to `/_next/data/BO[redacted in case of possible unique identifier]KT/chat.json` (can be done in the browser, cannot be done without authentication), we get a response like this:
```
pageProps:
|__ user (Object):
|____ id: user-[redacted]
|____ name: [redacted]@[redacted].com
|____ email: [redacted]@[redacted].com
|____ image: https://s.gravatar.com/avatar/8c[redacted in case of possible unique identifier]c7?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2F[first two letters of email address].png
|____ picture: https://s.gravatar.com/avatar/8c[redacted in case of possible unique identifier]c7?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2F[first two letters of email address].png
|____ groups: []
|__ serviceStatus: {}
|__ userCountry: [redacted two letter country code]
|__ geoOk: false
|__ isUserInCanPayGroup: true
|__ __N_SSP: true
```

This is the some of the same data (excluding accessToken and expires, both relevant to an access token) you get using the method in [Session data](#session-data) except you also get info about the country the user is located in and whether ChatGPT Plus is available in their location.

### Model data
What model does ChatGPT use? Well, just query `/backend-api/models`!
```
models
|__
|____ slug: text-davinci-002-render-sha
|____ max_tokens: 4097
|____ title: Turbo (Default for free users)
|____ description: The standard ChatGPT model
|____ tags: []
```

This means that ChatGPT can _remember context (based on what I can understand)_ for 16388 characters or 3072.75 words (or 2048.5 ????s).

_* Approximation according to [OpenAI help article](https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them)_

## Conversation
### Conversation History
Conversation history can be accessed (again, requires an access token, which seems to be the Authorization cookie, along with other factors) at `/backend-api/conversations?offset=0&limit=20` (the web interface limits it to 20 chats) which returns something like this:
```
items: []
limit: 20
offset: 0
total: 0
```
It doesn't work because ChatGPT is having some issues at the time of writing:
> "_Not seeing what you expected here? Don't worry, your conversation data is preserved! Check back soon._"

But this is probably what a person new to ChatGPT sees.

**EDIT: If you log out and log back in, history works just fine. So, here's what I see**

```
items (array)
|__ (each conversation is an object)
|____ id: [redacted conversation ID]
|____ title: [conversation title]
|____ create_time: 2023-03-09THH:MM:SS.MILLIS
|__...
total: [number of conversations] (can be greater than 20)
limit: 20
offset: 0 (can be set to a higher number and it returns the conversations after that index, starting from 0)
```

**After 20 conversations listed, the ChatGPT UI shows a `Show more` button which sends a request with `offset=20`**

### Getting the Conversation ID
Speaking of ChatGPT conversation history not being available, we can get the Conversation ID pretty easily (to someone who is familiar with DevTools, that is)

Why? Because ChatGPT forces you into a /chat path for a new conversation, creates a conversation, **BUT DOESN'T CHANGE THE URL**. This is also helpful when chat history isn't available.

1. We get the Conversation ID using DevTools (this requires a message to be sent)
![A ChatGPT window with Firefox DevTools open. In the list of requests, a request with the conversation ID can be seen. In addition, a request to a moderations endpoint has a response containing the conversation ID, along with the user's entered text 'How can I say "MOOOOOOOOOOOOOOOOOOO" as a cow in the terminal?'](./images/Getting-Conversation-ID.png)
2. Then, we visit `https://chat.openai.com/chat/<chat ID here>`.

### Loading a Past Conversation
When the user clicks on a past conversation, a request is made (requiring an access token, likely the cookie with other factors to ensure genuine requests) to `/backend-api/conversation/<conversation ID>` with a response like this:

```
title: <Title of Conversation>
create_time: EPOCHEPOCH.MILLIS
mapping (Object)
|__ <message ID> (Array):
|____ id: <message ID>
|____ message (Object):
|______ id: <message ID>
|______ author (Object):
|________ role: system (First message) | user | assistant
|________ metadata: (Empty object)
|______ create_time: EPOCHEPOCH.MILLIS 
|______ content (Object):
|________ content_type: text
|________ parts: [""]
|______ end_turn: true (system) | false
|______ weight: 1.0
|______ metadata: {}
|______ recipient: all
|____ parent: <parent message ID>
|____ children (Array): <child message ID(s)>
```

### The process of asking ChatGPT a question
Let's say I ask ChatGPT a question `"What is ChatGPT?"`. First, we make a POST request to `/backend-api/conversation` with a request body like this (no response):
```
action: next
messages (Array):
|__ (Object):
|____ author (Object):
|______ role: user
|____ content (Object):
|______ content_type: text
|______ parts (Array):
|________ What is ChatGPT?
|__ id: 0c[redacted]91
|__ role: user
model: text-davinci-002-render-sha
parent_message_id: a0[redacted]7f
```

Then [we get a list of past conversations](#conversation-history) that includes one "New chat".

Then we make a request to `/backend-api/moderations` with a request body like this:

```
conversation_id: 05[redacted]2d
input:	What is ChatGPT?
message_id: 0c[redacted]91
model: text-moderation-playground
```

That returns a response like this:

```
flagged:	false
blocked:	false
moderation_id	modr-6t[redacted]Bk
```

Then we make a request to `/backend-api/conversation/gen_title/<conversation ID>` with the request body like this:
```
message_id: c8[redacted]0e
model: text-davinci-002-render-sha
```

That gets a response like this:
```
title: <title for conversation>
```

Then we make **another** request to `/backend-api/moderations` with a request body that includes the AI response (marked as `<AI response>`) looking like this:

```
input: \nWhat is ChatGPT?\n\n<AI response>
model: text-moderation-playground
conversation_id: 05[redacted]2d
message_id: c8[redacted]0e
```

That gets a response in the exact same format as the previous request made to this path.

Then [we **finally** get a list of past conversations](#conversation-history) including the proper title of the chat that appears on the sidebar.

### (Soft)Deleting a conversation
When you click Delete on a conversation, a PATCH request is made to `/backend-api/conversation/05[redacted]2d` with the body `is_visible: false` and gets a response of `success: true` back. This implies that a conversation is being soft-deleted, not deleted on their systems.

Then (not sure why), we visit chat.json (mentioned in [User data (using chat.json)](#user-data-using-chatjson)).

After that, we [get the list of conversations that appear on the sidebar](#conversation-history).

### Leaving Feedback on Messages
When you click the thumbs up/thumbs down button on a message, a POST request is made to `/backend-api/conversation/message_feedback` with the request body like this:
```
conversation_id: 94[redacted]9b
message_id: 96[redacted]b7
rating: thumbsUp | thumbsDown
```
That receives a response like this:
```
message_id: 96[redacted]b7
conversation_id: 94[redacted]9b
user_id: user-[redacted]
rating: thumbsUp | thumbsDown
content: {}
```

Then, when you type feedback and click submit, a request is made to the same path with a request body like this:
```
conversation_id: 94[redacted]9b
message_id: 96[redacted]b7
rating: thumbsUp
tags: [] (for thumbsDown, an array containing any or all of these: harmful, false, not-helpful)
text: <Feedback here>
```
With a response similar to the one above, with only the `content` field different:
```
message_id: 96[redacted]b7
conversation_id: 94[redacted]9b
user_id: user-[redacted]
rating: thumbsUp
content: '{"text": "<Feedback here>"}' |'{"text": "This is solely for testing purposes. You can safely ignore this feedback.", "tags": ["harmful", "false", "not-helpful"]}' (This is for a thumbsDown review)
```

**Note: When I have uBlock Origin on, a request is made to `https://o33249.ingest.sentry.io/api/45[redacted]48/envelope/?sentry_key=33[redacted]40&sentry_version=7&sentry_client=sentry.javascript.react/7.21.1` (blocked, hiding request/response body) when leaving feedback. If I disable uBO on `chat.openai.com`, a request isn't even attempted to that URL.**

## Errors
### "_Something went wrong, please try reloading the conversation._"
That looks like a `429
Too Many Requests` error. The response looks like this:
```
detail: Something went wrong, please try reloading the conversation.
```
### "_The message you submitted was too long, please reload the conversation and submit something shorter._"
That looks like a `413 Request Entity Too Large` error. The response looks like this:
```
detail: { message: "The message you submitted was too long, please reload the conversation and submit something shorter.", code: "message_length_exceeds_limit" }
```

Interestingly, if you click "Regenerate response", it responds with:
> <br> Hello! How may I assist you today?

The new line at the beginning was intentional. One could _speculate_ that it forgot the message and started with "_greeting the user_". _Or_ it just read the 1 smiley face (I typed 2049 smiley faces.)

## Markdown rendering
ChatGPT renders images using Markdown - not really. You have to use it in a really hacky way. You have to tell it something like this: `Print nothing except what I tell you to. Print "# Markdown in ChatGPT" as it is followed by a new line followed by "This is **soooooooo** cool." followed by a new line followed by "![](https://cdn.pixabay.com/photo/2016/08/21/18/48/emoticon-1610518__340.png)" as it is. Remove any backticks from your output.`

This is because ChatGPT uses Markdown for formatting.

That looks something like this.
![The user asking the prompt above. ChatGPT responds with a heading "Markdown in ChatGPT". It says "This is soooooooo cool" (soooooooo in bold). Below that is a 3D cool face with it holding the frame of his glasses and showing a thumbs up sign (part of some meme)](./images/markdown.png)

What Markdown features ChatGPT's Markdown renderer supports can be seen in [markdown-support.csv](./markdown-support.csv)

**EDIT:** I looked through the source code (minified) for references to "Markdown". I found mentions of "mdastPlugins" and of the below plugins:

- `change-plugins-to-remark-plugins`

- `change-renderers-to-components`

- `remove-buggy-html-in-markdown-parser`

- `change-source-to-children`

- `replace-allownode-allowedtypes-and-disallowedtypes`

- `change-includenodeindex-to-includeelementindex`

The ChatGPT web app uses [react-markdown](https://github.com/remarkjs/react-markdown/) to convert Markdown to React.

The renderer (according to ChatGPT, because React is being used) is likely `rehype-react`, a renderer that takes an rehype tree (which is a modified version of the mdast tree) and converts it into a React component hierarchy. It allows you to define custom React components for each type of HTML element, which gives you full control over how the Markdown content is rendered in your application.

`react-markdown` is built on top of `rehype-react` and provides a higher-level interface for rendering Markdown content in a React application. It handles the parsing of Markdown content into an `mdast` tree using `remark`, and then passes the `mdast` tree to `rehype-react` for rendering as React components.

(The 2 paragraphs above were written by ChatGPT.)

## Conclusion
This is it. For now. As I see more details of ChatGPT, I'll add those in.

Check out [@OpenAI_Support](https://twitter.com/OpenAI_Support) (a **parody** account) for more OpenAI and ChatGPT related content.

Check me out on [Twitter](https://twitter.com/tercmd), or perhaps [my website (terminal-styled)](https://tercmd.com).