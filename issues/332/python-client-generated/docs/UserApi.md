# swagger_client.UserApi

All URIs are relative to *http://bd69592b551e.ngrok.io/*

Method | HTTP request | Description
------------- | ------------- | -------------
[**authenticate_user**](UserApi.md#authenticate_user) | **POST** /user/login | Log in a User.
[**get_user_by_id**](UserApi.md#get_user_by_id) | **GET** /user/{id} | Fetch data about a specific User.
[**new_user**](UserApi.md#new_user) | **POST** /user | 

# **authenticate_user**
> InlineResponse200 authenticate_user(body)

Log in a User.

Authenticate a specific User with their email address and password. 

### Example
```python
from __future__ import print_function
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint

# create an instance of the API class
api_instance = swagger_client.UserApi()
body = swagger_client.LoginInfo() # LoginInfo | Email address and plain-text password for the User being authenticated.


try:
    # Log in a User.
    api_response = api_instance.authenticate_user(body)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling UserApi->authenticate_user: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**LoginInfo**](LoginInfo.md)| Email address and plain-text password for the User being authenticated.
 | 

### Return type

[**InlineResponse200**](InlineResponse200.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_user_by_id**
> UserInfo get_user_by_id(id)

Fetch data about a specific User.

Returns information about the specified User. Include username and church jointed. 

### Example
```python
from __future__ import print_function
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint

# create an instance of the API class
api_instance = swagger_client.UserApi()
id = swagger_client.Id() # Id | Unique ID of a User.  Exact type/format will depend on your implementation but will likely be either an integer or a string. 

try:
    # Fetch data about a specific User.
    api_response = api_instance.get_user_by_id(id)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling UserApi->get_user_by_id: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**Id**](.md)| Unique ID of a User.  Exact type/format will depend on your implementation but will likely be either an integer or a string.  | 

### Return type

[**UserInfo**](UserInfo.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **new_user**
> InlineResponse201 new_user(body)



register a new user

### Example
```python
from __future__ import print_function
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint

# create an instance of the API class
api_instance = swagger_client.UserApi()
body = swagger_client.LoginInfo() # LoginInfo | user email and password.

try:
    api_response = api_instance.new_user(body)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling UserApi->new_user: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**LoginInfo**](LoginInfo.md)| user email and password. | 

### Return type

[**InlineResponse201**](InlineResponse201.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

