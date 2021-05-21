import connexion
import six

from swagger_server.models.error import Error  # noqa: E501
from swagger_server.models.id import Id  # noqa: E501
from swagger_server.models.inline_response200 import InlineResponse200  # noqa: E501
from swagger_server.models.inline_response201 import InlineResponse201  # noqa: E501
from swagger_server.models.login_info import LoginInfo  # noqa: E501
from swagger_server.models.user_info import UserInfo  # noqa: E501
from swagger_server import util


def authenticate_user(body):  # noqa: E501
    """Log in a User.

    Authenticate a specific User with their email address and password.  # noqa: E501

    :param body: Email address and plain-text password for the User being authenticated.

    :type body: dict | bytes

    :rtype: InlineResponse200
    """
    if connexion.request.is_json:
        body = LoginInfo.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def get_user_by_id(id):  # noqa: E501
    """Fetch data about a specific User.

    Returns information about the specified User. Include username and church jointed.  # noqa: E501

    :param id: Unique ID of a User.  Exact type/format will depend on your implementation but will likely be either an integer or a string. 
    :type id: dict | bytes

    :rtype: UserInfo
    """
    if connexion.request.is_json:
        id = Id.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def new_user(body):  # noqa: E501
    """new_user

    register a new user # noqa: E501

    :param body: user email and password.
    :type body: dict | bytes

    :rtype: InlineResponse201
    """
    if connexion.request.is_json:
        body = LoginInfo.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'
