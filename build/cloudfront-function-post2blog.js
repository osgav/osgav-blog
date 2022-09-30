function handler(event) {
    // this function is for a viewer request event trigger 
    
    var request = event.request;

    // intercept request for "/post" URL
    if (request.uri.substr(0,5) === "/post") {
        
        var newUri;
        
        // handle request for blog index page
        if (request.uri.substr(0,10) === "/post.html") {
            newUri = "/blog." + request.uri.substr(6)
        }
        
        // handle request for specific blog post
        if (request.uri.substr(0,6) === "/post/") {
            newUri = "/blog/" + request.uri.substr(6)
        }
        
        // catch any other "/post" request and 
        // redirect to the blog index page
        if (newUri === undefined) {
            newUri = "/blog.html"
        }
        
        // construct HTTP 302 response
        var response = {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                'location': { value: newUri }
            }
        }
        
        // return HTTP 302
        return response
        
    }

    // request didn't match intercept rule
    // return the request for regular processing
    return request;

}
