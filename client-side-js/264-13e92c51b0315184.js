// URL: https://chat.openai.com/_next/static/chunks/264-13e92c51b0315184.js
// Note: This isn't every function. I took a few and tried to make sense out of them and that is what you see here. The only thing I'm annoyed about is that I can't figure out the value of s.Z
// If you want to contribute, follow the instructions in /CONTRIBUTING.md

// Get Auth Header
e.getAuthHeader = function(accessToken){var accessToken=accessToken||this.accessToken;if(!accessToken)throw console.error("No access token when trying to use AuthHeader"),Error("No access token when trying to use AuthHeader");return{Authorization:"Bearer ".concat(accessToken)}}

// ChatGPT Plus Link
e.getLoginLink = function(email){
    return this.fetch("".concat("https://chat.openai.com/backend-api","/bypass/link"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:email})})
}

// Generate Title
e.generateTitle = function(conversationId,messageId){
    return this.fetch("".concat("https://chat.openai.com/backend-api","/conversation/gen_title/").concat(conversationId),{method:"POST",headers:(0,s.Z)({"Content-Type":"application/json"},this.getAuthHeader()),body:JSON.stringify({message_id:messageId})})
}

// PATCH Conversation (Used for deleting a conversation)
e.patchConversation = function(conversationId,requestBody){
    return this.fetch("".concat("https://chat.openai.com/backend-api","/conversation/").concat(conversationId),{method:"PATCH",headers:(0,s.Z)({"Content-Type":"application/json"},this.getAuthHeader()),body:JSON.stringify(requestBody)})
}

// Clear Conversations
e.deleteConversations = function() {
    return this.fetch("".concat("https://chat.openai.com/backend-api","/conversations"),{method:"PATCH",headers:(0,s.Z)({"Content-Type":"application/json"},this.getAuthHeader()),body:JSON.stringify({is_visible:false})})
}

// Moderations endpoint
e.runModerationApi = function(input,conversationId,messageId){
    return this.fetch("".concat("https://chat.openai.com/backend-api","/moderations"),{method:"POST",headers:(0,s.Z)({"Content-Type":"application/json"},this.getAuthHeader()),body:JSON.stringify({input:input,model:"text-moderation-playground",conversation_id:conversationId,message_id:messageId})})
}

// Thumbs Up/Thumbs Down feedback
e.submitMessageFeedback = function(bodyObj){
    return this.fetch("".concat("https://chat.openai.com/backend-api","/conversation/message_feedback"),{method:"POST",headers:(0,s.Z)({"Content-Type":"application/json"},this.getAuthHeader()),body:JSON.stringify(bodyObj)})
}

// Regenerated Response Feedback (Better/Worse/Same)
e.submitMessageComparisonFeedback = function(bodyObj){
    return this.fetch("".concat("https://chat.openai.com/backend-api","/conversation/message_comparison_feedback"),{method:"POST",headers:(0,s.Z)({"Content-Type":"application/json"},this.getAuthHeader()),body:JSON.stringify(bodyObj)})
}

// Checkout
e.submitCheckoutForm = function(){
    return this.fetch("".concat("https://chat.openai.com/backend-api","/payments/checkout"),{method:"POST",headers:(0,s.Z)({"Content-Type":"application/json"},this.getAuthHeader())})
}

// Fetch Customer Portal URL
e.fetchCustomerPortalUrl = function(e){
    return this.fetch("".concat("https://chat.openai.com/backend-api","/payments/customer_portal"),{method:"GET",headers:(0,s.Z)({"Content-Type":"application/json"},this.getAuthHeader(e))})
}

// Get List of Plugins
e.getPlugins = function(e){
    var offset=e.offset,limit=e.limit,statuses=e.statuses,isInstalled=e.isInstalled,accessToken=e.accessToken,mappings=[["offset",offset.toString()],["limit",limit.toString()],];
    if(statuses){var c=true,h=false,u=undefined;
    try{for(var d,p=statuses[Symbol.iterator]();!(c=(d=p.next()).done);c=!0){
        var statuses=d.value;mappings.push(["statuses",statuses])
    }
    }
    catch(g){
        h=true,u=g
    }
    finally{
        try{
            c||null==p.return||p.return()
        }
        finally{
            throw u
        }
    }
    }
    isInstalled && mappings.push(["is_installed","true"]);
    var mappingURLSearchParams = new URLSearchParams(mappings);
    return this.fetch("".concat("https://chat.openai.com/backend-api","/aip/p?").concat(mappingURLSearchParams),{method:"GET",headers:(0,s.Z)({"Content-Type":"application/json"},this.getAuthHeader(accessToken))
    })
}

// Refresh API Key
e.refreshApiKey = function(){
    if(this.apiKeyRefreshing)return this.apiKeyRefreshing;return this.apiKeyRefreshing=(0,o.Z)(function(){var e;return(0,h.__generator)(this,function(n){switch(n.label){case 0:return[4,(0,d.getSession)()];case 1:return(e=n.sent())&&this.setAccessToken(e.accessToken),[2];case 2:throw Error("Cannot refresh access token outside of browser");case 3:return[2]}})})
}

// OAuth callback for plugins
e.pluginOauthCallback = function(e,code,redirect_uri,accessToken) {
    var i=new URLSearchParams({code:code,redirect_uri:redirect_uri});
    return this.fetch("".concat("https://chat.openai.com/backend-api","/aip/p/").concat(e,"/user-settings/oauth/callback?").concat(i),{method:"GET",headers:(0,s.Z)({"Content-Type":"application/json"},this.getAuthHeader(accessToken))})
}

// Get Page Metadata
e.getPageMetadata = function(objWithUri){
    var t = objWithUri.url;
    return this.fetch("".concat("https://chat.openai.com/backend-api","/opengraph/tags?url=").concat(encodeURIComponent(t)),{method:"GET",headers:(0,s.Z)({"Content-Type":"application/json"},this.getAuthHeader())})
}

// Get Message Cap of Model (Turns out, the auth header isn't required, from what I can tell)
e.getModelMessageCap = function(){
    return this.fetch("https://chat.openai.com/public-api/conversation_limit",{method:"GET",headers:(0,s.Z)({"Content-Type":"application/json"},this.getAuthHeader())})
}
// As of March 24 6:08PM UTC, the returned response of the above endpoint is this:
// message_cap: 25
// message_cap_window: 180
// message_disclaimer: 
// textarea: "GPT-4 currently has a cap of 25 messages every 3 hours. Expect significantly lower caps, as we adjust for demand."
// model-switcher: "You've reached the GPT-4 cap, which gives all ChatGPT Plus users a chance to try the model.\n\nPlease check back soon."

// Delete Plugin
e.deletePlugin = function(e){
    var id = e.id,accessToken = e.accessToken;
    return this.fetch("".concat("https://chat.openai.com/backend-api","/aip/p/").concat(id),{method:"DELETE",headers:(0,s.Z)({"Content-Type":"application/json"},this.getAuthHeader(accessToken))})
}

// Upload File (likely for plugins)
e.upload = function(parentMessageId,conversationId,model,file){
    var formData = new FormData;
    return conversationId&&formData.append("conversation_id",conversationId),formData.append("model",model),formData.append("parent_message_id",parentMessageId),formData.append("file",file),this.fetch("".concat("https://chat.openai.com/backend-api","/conversation/upload"),{method:"POST",headers:(0,s.Z)({},this.getAuthHeader()),body:formData})
}

// Fetch File (likely for plugins)
e.fetchFileForDownload = function(e,path){
    var urlSearchParams = new URLSearchParams({path:path});return fetch("".concat("https://chat.openai.com/backend-api","/conversation/").concat(e,"/download?").concat(urlSearchParams),{method:"GET",headers:(0,s.Z)({},this.getAuthHeader())})
}

///////// Unknown Purpose /////////////////
// Create Artifacts
e.createArtifact = function(url){
    return this.fetch("".concat("https://chat.openai.com/backend-api","/artifacts"),{method:"POST",headers:(0,s.Z)({"Content-Type":"application/json"},this.getAuthHeader()),body:JSON.stringify({url:url,contents:"\n"})})
}

// Send Document
e.sendDocument = function(){
    return this.fetch("".concat("https://chat.openai.com/backend-api","/private"),{method:"GET",headers:{"Content-Type":"application/json"}})
}

// Get Retrieval Results
e.getRetrievalResults = function(e){return this.fetch("".concat("https://chat.openai.com/backend-api","/retrieval/public_data"),{method:"POST",headers:(0,s.Z)({"Content-Type":"application/json"},this.getAuthHeader()),body:JSON.stringify({query:e})})}