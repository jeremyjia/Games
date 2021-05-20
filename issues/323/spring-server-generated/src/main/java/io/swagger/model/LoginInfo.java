package io.swagger.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * An object representing information about a Tarpaulin application user. 
 */
@Schema(description = "An object representing information about a Tarpaulin application user. ")
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2021-05-08T16:44:27.195Z[GMT]")


public class LoginInfo   {
  @JsonProperty("email")
  private String email = null;

  @JsonProperty("password")
  private String password = null;

  public LoginInfo email(String email) {
    this.email = email;
    return this;
  }

  /**
   * Email address for the User.  This is required to be unique among all Users. 
   * @return email
   **/
  @Schema(example = "doej@oregonstate.edu", description = "Email address for the User.  This is required to be unique among all Users. ")
  
    public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public LoginInfo password(String password) {
    this.password = password;
    return this;
  }

  /**
   * The User's plain-text password.  This is required when creating a new User and when logging in. 
   * @return password
   **/
  @Schema(example = "hunter2", description = "The User's plain-text password.  This is required when creating a new User and when logging in. ")
  
    public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    LoginInfo loginInfo = (LoginInfo) o;
    return Objects.equals(this.email, loginInfo.email) &&
        Objects.equals(this.password, loginInfo.password);
  }

  @Override
  public int hashCode() {
    return Objects.hash(email, password);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class LoginInfo {\n");
    
    sb.append("    email: ").append(toIndentedString(email)).append("\n");
    sb.append("    password: ").append(toIndentedString(password)).append("\n");
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
