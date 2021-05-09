package io.swagger.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * user infomation include username and church     
 */
@Schema(description = "user infomation include username and church     ")
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2021-05-08T16:44:27.195Z[GMT]")


public class UserInfo   {
  @JsonProperty("username")
  private String username = null;

  @JsonProperty("church")
  private OneOfUserInfoChurch church = null;

  public UserInfo username(String username) {
    this.username = username;
    return this;
  }

  /**
   * user's username
   * @return username
   **/
  @Schema(example = "Amy Chan", description = "user's username")
  
    public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public UserInfo church(OneOfUserInfoChurch church) {
    this.church = church;
    return this;
  }

  /**
   * the id of the church that the user joined
   * @return church
   **/
  @Schema(description = "the id of the church that the user joined")
  
    public OneOfUserInfoChurch getChurch() {
    return church;
  }

  public void setChurch(OneOfUserInfoChurch church) {
    this.church = church;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    UserInfo userInfo = (UserInfo) o;
    return Objects.equals(this.username, userInfo.username) &&
        Objects.equals(this.church, userInfo.church);
  }

  @Override
  public int hashCode() {
    return Objects.hash(username, church);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class UserInfo {\n");
    
    sb.append("    username: ").append(toIndentedString(username)).append("\n");
    sb.append("    church: ").append(toIndentedString(church)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}
