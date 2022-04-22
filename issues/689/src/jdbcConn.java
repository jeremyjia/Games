import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class jdbcConn {
   public static void main(String[] args) {
      try {
         Class.forName("com.mysql.jdbc.Driver");
      } catch(ClassNotFoundException e) {
         System.out.println("Class not found "+ e);
      }
      System.out.println("JDBC Class found");
      int no_of_rows = 0;
      
      try {
         Connection con = DriverManager.getConnection (
            "jdbc:mysql://localhost:3306/g6DB","root", "password");  
         Statement stmt = con.createStatement();
         ResultSet rs = stmt.executeQuery ("SELECT * FROM Group6User1s");
         while (rs.next()) {
            no_of_rows++;
         }
         System.out.println("There are "+ no_of_rows + " record in the table");
      } catch(SQLException e){
         System.out.println("SQL exception occured: e = " + e);
      }
   }
}