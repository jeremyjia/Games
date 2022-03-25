import java.awt.*;
import java.awt.image.MemoryImageSource;

public class Main {
   public static void main(String[] argv) throws Exception {
      int[] pixels = new int[16 * 16];
      Image image = Toolkit.getDefaultToolkit().createImage(
         new MemoryImageSource(16, 16, pixels, 0, 16));
      Cursor transparentCursor = Toolkit.getDefaultToolkit().createCustomCursor(
         image, new Point(0, 0), "invisibleCursor");
      System.out.println("Transparent Cursor created.");
   }
}