## HNG TASK 1
Develop a server that returns the client's ip, location and temperature location when a user hits an endpoint with the name as a query

GET https://hng-task-i.onrender.com/api/hello?visitor_name=test

RESPONSE:

```
{
  "client_ip": x.x.x.x,
  "location": example_location,
  "greeting": Hello test!, the temperature is "location temp" degrees celsuis in example_location
}
```
