import java.awt.*;
import java.awt.image.BufferedImage;
import javax.swing.JFrame;

public class Panel {
   public static void main(String[] argv) throws Exception {
      JFrame frame = new JFrame();
      frame.setCursor(frame.getToolkit().createCustomCursor(
         new BufferedImage(3, 3, BufferedImage.TYPE_INT_ARGB), new Point(0, 0),"null"));
   }
}