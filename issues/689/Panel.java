import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
import javax.swing.JFrame;
import javax.swing.JPanel;

public class Panel extends JPanel {
   public void paintComponent(Graphics g) {
      super.paintComponent(g);
      Graphics2D g2d = (Graphics2D) g;
      g2d.setColor(new Color(31, 21, 1));
      g2d.fillRect(250, 195, 90, 60);
   } 
   public static void main(String[] args) {
      Panel rects = new Panel();
      JFrame frame = new JFrame("Rectangles");
      frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
      frame.add(rects);
      frame.setSize(360, 300);
      frame.setLocationRelativeTo(null);
      frame.setVisible(true);
   }
}