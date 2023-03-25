// URL: https://chat.openai.com/_next/static/chunks/264-13e92c51b0315184.js
// Note: I can't figure out the value of s.Z
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
    var urlSearchParams = new URLSearchParams({code:code,redirect_uri:redirect_uri});
    return this.fetch("".concat("https://chat.openai.com/backend-api","/aip/p/").concat(e,"/user-settings/oauth/callback?").concat(urlSearchParams),{method:"GET",headers:(0,s.Z)({"Content-Type":"application/json"},this.getAuthHeader(accessToken))})
}

// Get Page Metadata
e.getPageMetadata = function(objWithUri){
    var url = objWithUri.url;
    return this.fetch("".concat("https://chat.openai.com/backend-api","/opengraph/tags?url=").concat(encodeURIComponent(url)),{method:"GET",headers:(0,s.Z)({"Content-Type":"application/json"},this.getAuthHeader())})
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

// Check File (likely for plugins)
e.checkFile = function(conversationId,path){
    var urlSearchParams = new URLSearchParams({path:path});
    return this.fetch("".concat("https://chat.openai.com/backend-api","/conversation/").concat(conversationId,"/check_file?").concat(urlSearchParams),{method:"GET",headers:(0,s.Z)({"Content-Type":"application/json"},this.getAuthHeader())})
}

// Get Models
e.getModels = function(accessToken){
    return this.fetch("".concat("https://chat.openai.com/backend-api","/models"),{method:"GET",headers:(0,s.Z)({"Content-Type":"application/json"},this.getAuthHeader(accessToken))})
}

// Get Conversations
e.getConversations = function(offset,limit,accessToken){
    var urlSearchParams = new URLSearchParams({offset:offset.toString(),limit:limit.toString()});
    return this.fetch("".concat("https://chat.openai.com/backend-api","/conversations?").concat(urlSearchParams),{method:"GET",headers:(0,s.Z)({"Content-Type":"application/json"},this.getAuthHeader(accessToken))})
}

// Get Conversation
e.getConversation = function(conversationId,accessToken) {
    return this.fetch("".concat("https://chat.openai.com/backend-api","/conversation/").concat(conversationId),{method:"GET",headers:(0,s.Z)({"Content-Type":"application/json"},this.getAuthHeader(accessToken))})
}

// Completion Stream for Responses
e.publicApiCompletionStream = function(data,errorHandler){
    return(0,o.Z)(function(){
        var abortController,reqData,c;
        return(0,h.__generator)(this,function(c){
            return abortController = new AbortController,reqData={action:data.completionType,messages:data.messages.length>0?data.messages:void 0,conversation_id:data.threadId,parent_message_id:data.parentMessageId,model:data.model,plugin_ids:data.threadId?void 0:data.enabledPluginIds,timezone_offset_min:new Date().getTimezoneOffset()},(0,u.L)("".concat("https://chat.openai.com/backend-api","/conversation"),{method:"POST",credentials:"include",headers:(0,s.Z)({"Content-Type":"application/json"},this.getAuthHeader()),body:JSON.stringify(reqData),signal:abortController.signal,openWhenHidden:true,onopen:function(response){
                return(0,o.Z)(function(){
                    var contentType,sent,jsonData;
                    return(0,h.__generator)(this,function(i){
                        switch(i.label){
                            case 0:
                                if (contentType=response.headers.get("content-type")||"",response.ok && contentType.includes("text/event-stream")) return[2];
                                if(!contentType.includes("application/json")) return[3,2]; return[4,response.json()];
                            case 1:
                                if(sent=i.sent(),console.error(sent),jsonData=(null==sent?void 0:sent.error)||(null==sent?void 0:sent.detail)){
                                    if(response.status>=500) throw new l.kb((null==jsonData?void 0:jsonData.message)||jsonData);
                                    throw((null==jsonData?void 0:jsonData.code)==="expired_session_key"||(null==jsonData?void 0:jsonData.code)==="invalid_api_key"||(null==jsonData?void 0:jsonData.code)==="token_expired")&&window._oaiHandleSessionExpired("stream",JSON.stringify(jsonData)),new l.gK((null==jsonData?void 0:jsonData.message)||jsonData,response.status,null==jsonData?void 0:jsonData.code,null==jsonData?void 0:jsonData.type,void 0,null==jsonData?void 0:jsonData.clears_in)
                                }i.label=2;
                            case 2:
                                throw new l.kb
                        }
                    })
                })()
            },
            onmessage:function(message){if("[DONE]"===message.data)abortController.abort(),errorHandler({finish_reason:"stop"});
            else if("ping"===message.event);
            else try{
            var parsedMessageData=JSON.parse(message.data);
            if(parsedMessageData.error) throw new l.kb(parsedMessageData.error.message);
            errorHandler({message:parsedMessageData.message,threadId:parsedMessageData.conversation_id})
            }
            catch(o){
                if((0,p.T)(o))throw new l.kb(o.message)
            }},
            onerror:function(error){
                throw "Failed to fetch"===error.message&&(error=new l.kb("An error occurred. Either the engine you requested does not exist or there was another issue processing your request. If this issue persists please contact us through our help center at help.openai.com.")),errorHandler({err:error}),error
            }}).catch(function(e){(0,a.Z)(e,l.gK)||(0,a.Z)(e,l.kb)||console.error(e)}),[2,abortController]
        })
    })()
}

// Query Moderation Endpoint
e.runModerationApi = function(input,conversationId,messageId) {
    return this.fetch("".concat("https://chat.openai.com/backend-api","/moderations"),{method:"POST",headers:(0,s.Z)({"Content-Type":"application/json"},this.getAuthHeader()),body:JSON.stringify({input:input,model:"text-moderation-playground",conversation_id:conversationId,message_id:messageId})})
}

// Get Plugin by Domain
e.getPluginByDomain = function(e){
    var domain = e.domain, accessToken = e.accessToken, urlSearchParams = new URLSearchParams({offset:"0",limit:"1",domains:domain});
    return this.fetch("".concat("https://chat.openai.com/backend-api","/aip/p?").concat(urlSearchParams),{method:"GET",headers:(0,s.Z)({"Content-Type":"application/json"},this.getAuthHeader(accessToken))}).then(function(response) {
        return 0===response.items.length?null:response.items[0]
    })
}

// Set Localhost Plugin
e.setLocalhostPlugin = function(data) {
    var localhost = data.localhost, manifest = data.manifest, openApiSpec = data.openapiSpec,accessToken = data.accessToken;
    return this.fetch("".concat("https://chat.openai.com/backend-api","/aip/lhp"),{method:"POST",headers:(0,s.Z)({"Content-Type":"application/json"},this.getAuthHeader(accessToken)),body:JSON.stringify({localhost:localhost,manifest:manifest,openapi_spec:openApiSpec})})
}

// Scrape Plugin Manifest
e.scrapePluginManifest = function(e) {
    var domain = e.domain, manifestAccessToken = e.manifestAccessToken, userAccessToken = e.accessToken;
    return this.fetch("".concat("https://chat.openai.com/backend-api","/aip/p"),{method:"POST",headers:(0,s.Z)({"Content-Type":"application/json"},this.getAuthHeader(userAccessToken)),body:JSON.stringify({domain:domain,manifest_access_token:manifestAccessToken})})
}

// Get Plugin API
e.getPluginApi = function(e) {
    var id = e.id, accessToken = e.accessToken;
    return this.fetch("".concat("https://chat.openai.com/backend-api","/aip/p/").concat(id,"/api"),{method:"GET",headers:(0,s.Z)({"Content-Type":"application/json"},this.getAuthHeader(accessToken))})
}

// Update Plugin User Settings
e.updatePluginUserSettings = function(e) {
    var pluginId = e.pluginId, isInstalled = e.isInstalled, accessToken = e.accessToken;
    return this.fetch("".concat("https://chat.openai.com/backend-api","/aip/p/").concat(pluginId,"/user-settings"),{method:"PATCH",headers:(0,s.Z)({"Content-Type":"application/json"},this.getAuthHeader(accessToken)),body:JSON.stringify({is_installed:isInstalled})})
}

// Set Plugin User HTTP Token
e.setPluginUserHttpToken = function(e) {
    var id = e.id, userAccessToken = e.userAccessToken, accessToken = e.accessToken;
    return this.fetch("".concat("https://chat.openai.com/backend-api","/aip/p/").concat(id,"/user-settings/http-auth"),{method:"POST",headers:(0,s.Z)({"Content-Type":"application/json"},this.getAuthHeader(accessToken)),body:JSON.stringify({access_token:userAccessToken})})
}

// Set Plugin Service HTTP Token
e.setPluginServiceHttpToken = function(e) {
	var id = e.id, serviceAccessToken = e.serviceAccessToken, accessToken = e.accessToken;
    return this.fetch("".concat("https://chat.openai.com/backend-api","/aip/p/").concat(id,"/http-auth"),{method:"POST",headers:(0,s.Z)({"Content-Type":"application/json"},this.getAuthHeader(accessToken)),body:JSON.stringify({access_token:serviceAccessToken})})
}

// Set Plugin OAuth Client Credentials
e.setPluginOAuthClientCredentials = function(e) {
	var id = e.id, clientId = e.clientId, clientSecret = e.clientSecret, accessToken = e.accessToken;
    return this.fetch("".concat("https://chat.openai.com/backend-api","/aip/p/").concat(id,"/oauth"),{method:"POST",headers:(0,s.Z)({"Content-Type":"application/json"},this.getAuthHeader(accessToken)),body:JSON.stringify({client_id:clientId,client_secret:clientSecret})})
}

// Get Account Status
e.getAccountStatus = function(accessToken,obj){
    var headers = (0,s.Z)({"Content-Type":"application/json"},this.getAuthHeader(accessToken));
    if(obj){
        var o={}, i = true,a = false, r = undefined;
        try{
            for(var h,u=Object.entries(obj)[Symbol.iterator]();
            !(i=(h=u.next()).done);i=true) {
                var d=(0,c.Z)(h.value,2),p=d[0],l=d[1];
                g.includes(p.toLowerCase())&&(o[p]=l)}
        } catch(m) {
                a=true,r=m
        }
        finally{
            try {
                i||null==u.return||u.return()
            }
            finally {
                if(a) throw r
            }
        }
        headers=(0,s.Z)({},o,headers)
    }
    return this.fetch("".concat("https://chat.openai.com/backend-api","/accounts/check"),{method:"GET",headers:headers})
}

// Send Document (likely for Plugins)
e.sendDocument = function(){
    return this.fetch("".concat("https://chat.openai.com/backend-api","/private"),{method:"GET",headers:{"Content-Type":"application/json"}})
}

///////// Unknown Purpose /////////////////
// Create Artifacts
e.createArtifact = function(url){
    return this.fetch("".concat("https://chat.openai.com/backend-api","/artifacts"),{method:"POST",headers:(0,s.Z)({"Content-Type":"application/json"},this.getAuthHeader()),body:JSON.stringify({url:url,contents:"\n"})})
}

e.getArtifacts = function() {
    return this.fetch("".concat("https://chat.openai.com/backend-api","/artifacts"),{method:"GET",headers:(0,s.Z)({"Content-Type":"application/json"},this.getAuthHeader())})
}

// Get Retrieval Results
e.getRetrievalResults = function(e){return this.fetch("".concat("https://chat.openai.com/backend-api","/retrieval/public_data"),{method:"POST",headers:(0,s.Z)({"Content-Type":"application/json"},this.getAuthHeader()),body:JSON.stringify({query:e})})}