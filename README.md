Important :

1-The Marvel Comics API’s base endpoint is http(s)://gateway.marvel.com/.

2-All endpoints currently accept only HTTP GET requests.

3-Most successful results will contain an “etag” attribute and ETag HTTP header with a digest of the returned content. In order to save bandwidth and make your application more performant, you may optionally pass an “if-none-match” HTTP header with that digest for subsequent requests to the same URL.
