import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import javax.swing.JFrame;
import javax.swing.JPanel;

public class Main extends JPanel{
   public void paint(Graphics g) {
      Graphics2D g2 = (Graphics2D)g;
      g2.setRenderingHint(
         RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
      
      Font font = new Font("Serif", Font.PLAIN, 96);
      g2.setFont(font);
      g2.drawString("Text", 40, 120);
   }
   public static void main(String[] args) {
      JFrame f = new JFrame();
      f.getContentPane().add(new Main());
      f.setSize(300, 200);
      f.setVisible(true);
   }
}