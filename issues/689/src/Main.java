import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) throws Exception {

        getUrlContent();

        String newString = "b:200";
        String serverName = "b";
        String logString = "a:1";
        
        String filter = ";\n";
        // print
        String res = getNewLongString(logString, serverName, newString, filter);
        System.out.println(res);
        res = getNewLongString(res, serverName, newString, filter);
        System.out.println(res);
        System.out.println("Bye");

    }

    private static String getNewLongString(String logString, String serverName, String newString, String filter) {
        String[] arr = logString.split(filter);
        int i = 0;
        boolean b = false;
        for (String s : arr) {
            if (s.contains(serverName)) {
                arr[i] = newString;
                b = true;
            }
            i++;
        }

        String res = "";
        if (!b) {
            res += logString;
            if (res.length() > 0 && !res.endsWith(filter)) {
                res += filter;
            }
            res += newString + filter;
        } else {
            for (String s1 : arr) {
                res += s1 + filter;
            }
        }

        return res;
    }

    private static void getUrlContent() throws Exception {
        // TODO Auto-generated method stub
        URL url = new URL("http://www.baidu.com");
        BufferedReader reader = new BufferedReader(new InputStreamReader(url.openStream()));
        BufferedWriter writer = new BufferedWriter(new FileWriter("data.html"));
        String line;

        while ((line = reader.readLine()) != null) {
            System.out.println(line);
            writer.write(line);
            writer.newLine();
        }
        reader.close();
        writer.close();
    }
}
