import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import javax.swing.JComponent;
import javax.swing.JFrame;

public class Main {
   public static void main(String[] args) {
      JFrame frame = new JFrame();
      frame.add(new MyComponent());
      frame.setSize(300, 300);
      frame.setVisible(true);
   }
}
class MyComponent extends JComponent {
   public void paint(Graphics g) {
      Graphics2D g2 = (Graphics2D) g;
      RenderingHints rh = g2.getRenderingHints();
      boolean bl = rh.containsValue (RenderingHints.VALUE_ANTIALIAS_ON);
      System.out.println(bl);
      g2.setRenderingHint(
         RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
   }
}